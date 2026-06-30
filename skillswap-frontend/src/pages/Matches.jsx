import { useState, useEffect } from 'react';
import { getMatches, requestSession as requestSessionApi } from '../api/index.js';

const STATUS = {
  new:            { label: 'New',            style: 'bg-blue-50 text-blue-700 border border-blue-100'    },
  contacted:      { label: 'Contacted',      style: 'bg-amber-50 text-amber-700 border border-amber-100' },
  session_booked: { label: 'Session Booked', style: 'bg-green-50 text-green-700 border border-green-100' },
};

function scoreColor(n) {
  if (n >= 90) return { bar: 'bg-blue-600',   text: 'text-blue-600'   };
  if (n >= 75) return { bar: 'bg-emerald-500', text: 'text-emerald-600' };
  return             { bar: 'bg-amber-400',   text: 'text-amber-600'  };
}

function SkillPill({ label, variant }) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full border
        ${variant === 'offer'
          ? 'bg-blue-50 text-blue-700 border-blue-100'
          : 'bg-amber-50 text-amber-700 border-amber-100'
        }`}
    >
      {label}
    </span>
  );
}

function MatchBar({ score }) {
  const { bar, text } = scoreColor(score);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-bold tabular-nums ${text}`}>
        {score}%
      </span>
    </div>
  );
}

function MatchCard({ match, onContact }) {
  const statusCfg = STATUS[match.status];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-200">

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${match.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {match.partnerInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-tight">
              {match.partnerName}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              {match.bio}
            </p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusCfg.style}`}>
          {statusCfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            They offer
          </p>
          <div className="flex flex-wrap gap-1.5">
            {match.offers.map((s) => (
              <SkillPill key={s} label={s} variant="offer" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            They want
          </p>
          <div className="flex flex-wrap gap-1.5">
            {match.wants.map((s) => (
              <SkillPill key={s} label={s} variant="want" />
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Match strength
        </p>
        <MatchBar score={match.score} />
      </div>

      <button
        onClick={() => onContact(match)}
        disabled={match.status === 'session_booked'}
        className={`w-full text-sm font-semibold py-2 rounded-lg transition-colors
          ${match.status === 'session_booked'
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
      >
        {match.status === 'session_booked' ? 'Session already booked' : 'Request session'}
      </button>

    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
      <span className="text-4xl mb-4">🔍</span>
      <p className="text-base font-semibold text-slate-700 mb-1">
        No matches for "{query}"
      </p>
      <p className="text-sm text-slate-400">
        Try a different skill name or clear the search.
      </p>
    </div>
  );
}

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-fade-in">
      <span>✅</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-white transition-colors">
        ✕
      </button>
    </div>
  );
}

export default function Matches() {
  const [search, setSearch]     = useState('');
  const [toast, setToast]       = useState(null);
  const [matches, setMatches]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await getMatches('u1');
        setMatches(res.data.data);
      } catch (err) {
        console.error('Failed to load matches:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  const filtered = matches.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.partnerName.toLowerCase().includes(q) ||
      m.offers.some((s) => s.toLowerCase().includes(q)) ||
      m.wants.some((s) => s.toLowerCase().includes(q))
    );
  });

  async function handleContact(match) {
    try {
      await requestSessionApi(match.id);
      setMatches((prev) =>
        prev.map((m) =>
          m.id === match.id ? { ...m, status: 'session_booked' } : m
        )
      );
      setToast(`Session request sent to ${match.partnerName}`);
      setTimeout(() => setToast(null), 3500);
    } catch (err) {
      console.error('Failed to request session:', err);
      setToast('Failed to request session');
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Discovery
          </p>
          <h1 className="text-2xl font-bold text-slate-900">Your Matches</h1>
          <p className="text-sm text-slate-500 mt-1">
            {loading ? 'Loading...' : `${matches.length} people whose skills complement yours`}
          </p>
        </div>

        <div className="relative shrink-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading matches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.length === 0
            ? <EmptyState query={search} />
            : filtered.map((m) => (
                <MatchCard key={m.id} match={m} onContact={handleContact} />
              ))
          }
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

    </div>
  );
}
