import StatusBadge from './StatusBadge';

export default function SessionCard({ session, onCancel, onComplete }) {
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
        <StatusBadge status={session.status} />
      </div>

      <p className="text-sm text-slate-600 leading-snug">{session.topic}</p>

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
        <span className="flex items-center gap-1.5"><span>📅</span>{session.date}</span>
        <span className="flex items-center gap-1.5"><span>🕐</span>{session.time}</span>
      </div>

      {session.status === 'upcoming' && (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onComplete(session.id)} className="flex-1 text-sm font-semibold py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            Mark complete
          </button>
          <button onClick={() => onCancel(session.id)} className="flex-1 text-sm font-semibold py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition-colors">
            Cancel
          </button>
        </div>
      )}
      {session.status === 'in_progress' && (
        <button onClick={() => onComplete(session.id)} className="w-full text-sm font-semibold py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
          Mark complete
        </button>
      )}
      {session.status === 'completed' && (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <span>✅</span><span>Exchange completed</span>
        </div>
      )}
    </div>
  );
}