const STATUS_MAP = {
  new:            { label: 'New',            style: 'bg-blue-50 text-blue-700 border-blue-100'        },
  contacted:      { label: 'Contacted',      style: 'bg-amber-50 text-amber-700 border-amber-100'     },
  session_booked: { label: 'Session Booked', style: 'bg-green-50 text-green-700 border-green-100'     },
  upcoming:       { label: 'Upcoming',       style: 'bg-blue-50 text-blue-700 border-blue-100'        },
  in_progress:    { label: 'In Progress',    style: 'bg-emerald-50 text-emerald-700 border-emerald-100'},
  completed:      { label: 'Completed',      style: 'bg-slate-100 text-slate-500 border-slate-200'    },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] ?? { label: status, style: 'bg-slate-100 text-slate-500 border-slate-200' };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.style}`}>
      {cfg.label}
    </span>
  );
}