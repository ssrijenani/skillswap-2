import { v4 as uuid } from 'uuid';
import store, {
  findById,
  findWhere,
  insertOne,
  updateById,
  deleteById,
} from '../data/store.js';

export function getSessionsForUser(userId) {
  const sessions = findWhere('sessions', (s) => s.userId === userId);

  const ORDER = { in_progress: 0, upcoming: 1, completed: 2 };

  return sessions
    .slice()
    .sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9));
}

export function createSession({
  userId,
  partnerId,
  topic,
  youTeach,
  theyTeach,
  date,
  time,
  duration = 60,
}) {
  const user = findById('users', userId);
  const partner = findById('users', partnerId);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  if (!partner) {
    const err = new Error('Partner user not found');
    err.status = 404;
    throw err;
  }

  const duplicate = findWhere(
    'sessions',
    (s) =>
      s.userId === userId &&
      s.partnerId === partnerId &&
      s.status !== 'completed'
  );
  if (duplicate.length > 0) {
    const err = new Error(
      'An active session already exists with this partner'
    );
    err.status = 409;
    throw err;
  }

  const newSession = {
    id: uuid(),
    userId,
    partnerId,
    partner: partner.name,
    initials: partner.initials,
    avatarColor: partner.avatarColor,
    topic: topic ?? `Skill exchange with ${partner.name}`,
    youTeach: youTeach ?? '',
    theyTeach: theyTeach ?? '',
    date: date ?? formatDate(new Date().toISOString()),
    time: time ?? '12:00 PM',
    duration,
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };

  insertOne('sessions', newSession);

  syncMatchStatus(userId, partnerId, 'session_booked');

  return newSession;
}

export function completeSession(id) {
  const session = findById('sessions', id);

  if (!session) {
    const err = new Error('Session not found');
    err.status = 404;
    throw err;
  }

  if (session.status === 'completed') {
    return session;
  }

  return updateById('sessions', id, { status: 'completed' });
}

export function cancelSession(id) {
  const session = findById('sessions', id);

  if (!session) {
    const err = new Error('Session not found');
    err.status = 404;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Completed sessions cannot be cancelled');
    err.status = 409;
    throw err;
  }

  syncMatchStatus(session.userId, session.partnerId, 'contacted');

  deleteById('sessions', id);
  return { id, cancelled: true };
}

function syncMatchStatus(userId, partnerId, newStatus) {
  const match = store.matches.find(
    (m) => m.userId === userId && m.partnerId === partnerId
  );
  if (match) {
    updateById('matches', match.id, { status: newStatus });
  }
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
