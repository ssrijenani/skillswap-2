import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessions, completeSession as completeSessionApi, cancelSession as cancelSessionApi } from '../api/index.js';

const STATUS_CONFIG = {
  upcoming:    { label: 'Upcoming',    dot: 'bg-blue-500',   badge: 'bg-blue-50 text-blue-700 border-blue-100'    },
  in_progress: { label: 'In Progress', dot: 'bg-emerald-500',badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  completed:   { label: 'Completed',   dot: 'bg-slate-300',  badge: 'bg-slate-100 text-slate-500 border-slate-200' },
};

const GROUP_ORDER = ['in_progress', 'upcoming', 'completed'];

const GROUP_LABELS = {
  in_progress: 'Happening now',
  upcoming:    'Scheduled',
  completed:   'Completed',
};

function SessionCard({ session, onCancel, onComplete }) {
  const cfg = STATUS_CONFIG[session.status];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-200">

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${session.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {session.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{session.partner}</p>
            <p className="text-xs text-slate-400 mt-0.5">{session.duration} min session</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${cfg.badge}`}>
          {cfg.label}
        </span>
      </div>

      <p className="text-sm text-slate-600 leading-snug">
        {session.topic}
      </p>

      <div className="flex items-center gap-2 text-xs">
        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-medium">
          You teach: {session.youTeach}
        </span>
        <span className="text-slate-300">⇄</span>
        <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-full font-medium">
          They teach: {session.theyTeach}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span>📅</span> {session.date}
        </span>
        <span className="flex items-center gap-1.5">
          <span>🕐</span> {session.time}
        </span>
      </div>

      {session.status === 'upcoming' && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onComplete(session.id)}
            className="flex-1 text-sm font-semibold py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Mark complete
          </button>
          <button
            onClick={() => onCancel(session.id)}
            className="flex-1 text-sm font-semibold py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {session.status === 'in_progress' && (
        <button
          onClick={() => onComplete(session.id)}
          className="w-full text-sm font-semibold py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        >
          Mark complete
        </button>
      )}

      {session.status === 'completed' && (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <span>✅</span>
          <span>Exchange completed</span>
        </div>
      )}

    </div>
  );
}

function TimelineGroup({ groupKey, sessions, onCancel, onComplete }) {
  const cfg = STATUS_CONFIG[groupKey];
  if (!sessions.length) return null;

  return (
    <div className="flex gap-5">

      <div className="flex flex-col items-center pt-1 shrink-0">
        <div className={`w-3 h-3 rounded-full ${cfg.dot} ring-4 ring-white shrink-0`} />
        <div className="w-px flex-1 bg-slate-200 mt-2" />
      </div>

      <div className="flex-1 pb-10">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          {GROUP_LABELS[groupKey]}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              onCancel={onCancel}
              onComplete={onComplete}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

function EmptyState({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-4xl mb-4">📅</span>
      <p className="text-base font-semibold text-slate-700 mb-1">No sessions yet</p>
      <p className="text-sm text-slate-400 mb-6">
        Request a session from a match to get started.
      </p>
      <button
        onClick={() => navigate('/matches')}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Browse Matches
      </button>
    </div>
  );
}

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
      <span>✅</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white transition-colors">
        ✕
      </button>
    </div>
  );
}

export default function Sessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState(null);

  useEffect(() => {
    async function loadSessions() {
      try {
        const res = await getSessions('u1');
        setSessions(res.data.data);
      } catch (err) {
        console.error('Failed to load sessions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }

  async function handleComplete(id) {
    try {
      await completeSessionApi(id);
      setSessions((prev) =>
        prev.map((s) => s.id === id ? { ...s, status: 'completed' } : s)
      );
      showToast('Session marked as complete');
    } catch (err) {
      console.error('Failed to complete session:', err);
      showToast('Failed to complete session');
    }
  }

  async function handleCancel(id) {
    try {
      await cancelSessionApi(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      showToast('Session cancelled');
    } catch (err) {
      console.error('Failed to cancel session:', err);
      showToast('Failed to cancel session');
    }
  }

  const grouped = GROUP_ORDER.reduce((acc, key) => {
    acc[key] = sessions.filter((s) => s.status === key);
    return acc;
  }, {});

  const hasAnySessions = sessions.length > 0;

  const upcomingCount   = grouped.upcoming.length + grouped.in_progress.length;
  const completedCount  = grouped.completed.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Schedule
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Your Sessions</h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? 'Loading...' : `${upcomingCount} upcoming · ${completedCount} completed`}
          </p>
        </div>

        <button
          onClick={() => navigate('/matches')}
          className="shrink-0 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors"
        >
          + New session
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading sessions...</div>
      ) : !hasAnySessions
        ? <EmptyState navigate={navigate} />
        : (
          <div className="pt-2">
            {GROUP_ORDER.map((key) => (
              <TimelineGroup
                key={key}
                groupKey={key}
                sessions={grouped[key]}
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )
      }

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

    </div>
  );
}
