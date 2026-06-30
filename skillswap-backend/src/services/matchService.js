import { v4 as uuid } from 'uuid';
import store, {
  findById,
  findWhere,
  insertOne,
  updateById,
} from '../data/store.js';
import { rankMatches } from './matchingEngine.js';

export function getMatchesForUser(userId) {
  const user = findById('users', userId);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const matches = findWhere('matches', (m) => m.userId === userId)
    .map((match) => {
      const partner = findById('users', match.partnerId);
      return {
        ...match,
        partnerName: partner?.name || 'Unknown',
        partnerInitials: partner?.initials || '??',
        avatarColor: partner?.avatarColor || 'bg-slate-500',
        offers: partner?.skillsOffered || [],
        wants: partner?.skillsWanted || [],
      };
    })
    .sort((a, b) => b.score - a.score);

  return matches;
}

export function requestSession(matchId) {
  const match = findById('matches', matchId);

  if (!match) {
    const err = new Error('Match not found');
    err.status = 404;
    throw err;
  }

  if (match.status === 'session_booked') {
    const err = new Error('Session already booked for this match');
    err.status = 400;
    throw err;
  }

  const partner = findById('users', match.partnerId);
  const user = findById('users', match.userId);

  const newSession = {
    id: uuid(),
    userId: match.userId,
    partnerId: match.partnerId,
    partner: partner?.name || 'Unknown',
    initials: partner?.initials || '??',
    avatarColor: partner?.avatarColor || 'bg-slate-500',
    topic: `Skill exchange: ${partner?.skillsOffered?.[0] || 'skill'} for ${user?.skillsWanted?.[0] || 'skill'}`,
    youTeach: user?.skillsWanted?.[0] || 'skill',
    theyTeach: partner?.skillsOffered?.[0] || 'skill',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: 'Pending',
    duration: 60,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };

  insertOne('sessions', newSession);

  const updatedMatch = updateById('matches', matchId, { status: 'session_booked' });

  return { session: newSession, match: updatedMatch };
}

export function generateMatches(userId) {
  const targetUser = findById('users', userId);
  if (!targetUser) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const allOtherUsers = store.users.filter((u) => u.id !== userId);
  const ranked = rankMatches(targetUser, allOtherUsers);

  for (const { user: partner, score } of ranked) {
    const existing = store.matches.find(
      (m) => m.userId === userId && m.partnerId === partner.id
    );

    if (existing) {
      updateById('matches', existing.id, { score });
    } else {
      insertOne('matches', {
        id: uuid(),
        userId,
        partnerId: partner.id,
        score,
        status: 'new',
        bio: buildBio(partner),
        createdAt: new Date().toISOString(),
      });
    }
  }

  return getMatchesForUser(userId);
}

function buildBio(partner) {
  const offers = partner.skillsOffered.slice(0, 2).join(' and ');
  const wants = partner.skillsWanted.slice(0, 2).join(' and ');
  return `Knows ${offers}. Wants to learn ${wants}.`;
}
