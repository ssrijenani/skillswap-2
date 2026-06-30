import StatusBadge from './StatusBadge';
import Badge from './Badge';

function MatchBar({ score }) {
  const color =
    score >= 90 ? 'bg-blue-600' :
    score >= 75 ? 'bg-emerald-500' :
                  'bg-amber-400';
  const text =
    score >= 90 ? 'text-blue-600' :
    score >= 75 ? 'text-emerald-600' :
                  'text-amber-600';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`text-xs font-bold tabular-nums ${text}`}>{score}%</span>
    </div>
  );
}

export default function MatchCard({ match, onContact }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-card p-5 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${match.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {match.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{match.name}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">{match.bio}</p>
          </div>
        </div>
        <StatusBadge status={match.status} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">They offer</p>
          <div className="flex flex-wrap gap-1.5">
            {match.offers.map((s) => <Badge key={s} label={s} variant="blue" />)}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">They want</p>
          <div className="flex flex-wrap gap-1.5">
            {match.wants.map((s) => <Badge key={s} label={s} variant="amber" />)}
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Match strength</p>
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