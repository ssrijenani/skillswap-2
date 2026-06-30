import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/index.js';

const stats = [
  { label: 'Matches Found',       value: '12', icon: '⚡', color: 'text-blue-600',  bg: 'bg-blue-50'  },
  { label: 'Sessions Completed',  value: '4',  icon: '✅', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Skills You Offer',    value: '3',  icon: '🎯', color: 'text-violet-600',bg: 'bg-violet-50'},
  { label: 'Skills You Want',     value: '3',  icon: '📚', color: 'text-amber-600', bg: 'bg-amber-50' },
];

const recentActivity = [
  { id: 1, type: 'match',   text: 'New match with Sara K. — she knows Figma',      time: '2 hours ago'  },
  { id: 2, type: 'session', text: 'Session with Leo M. completed — React basics',   time: 'Yesterday'    },
  { id: 3, type: 'match',   text: 'New match with Priya T. — she knows Branding',   time: '2 days ago'   },
  { id: 4, type: 'session', text: 'Session with James R. scheduled — Node.js',      time: '3 days ago'   },
];

const activityIcon = { match: '⚡', session: '📅' };

function StatCard({ label, value, icon, color, bg }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-card flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center text-xl shrink-0`}>
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function SkillPill({ label, variant }) {
  const styles =
    variant === 'offer'
      ? 'bg-blue-50 text-blue-700 border border-blue-100'
      : 'bg-amber-50 text-amber-700 border border-amber-100';
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${styles}`}>
      {label}
    </span>
  );
}

function ActivityRow({ type, text, time }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="text-base mt-0.5 shrink-0">{activityIcon[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 leading-snug">{text}</p>
        <p className="text-xs text-slate-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUserById('u1');
        setUser(res.data.data);
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  if (loading) {
    return <div className="max-w-4xl mx-auto py-12 text-center text-slate-400">Loading...</div>;
  }

  if (!user) {
    return <div className="max-w-4xl mx-auto py-12 text-center text-slate-400">Failed to load user data</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
          Overview
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          Good to see you, {user.name} 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Member since {user.memberSince}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-400">Your skill profile</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              You offer
            </p>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((s) => (
                <SkillPill key={s} label={s} variant="offer" />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              You want to learn
            </p>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((s) => (
                <SkillPill key={s} label={s} variant="want" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Recent activity
          </p>
          <div>
            {recentActivity.map((a) => (
              <ActivityRow key={a.id} {...a} />
            ))}
          </div>
        </div>

      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Quick actions
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/matches')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            <span>⚡</span> Browse Matches
          </button>
          <button
            onClick={() => navigate('/sessions')}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors"
          >
            <span>📅</span> View Sessions
          </button>
        </div>
      </div>

    </div>
  );
}
