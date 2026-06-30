const VARIANTS = {
  blue:   'bg-blue-50 text-blue-700 border-blue-100',
  amber:  'bg-amber-50 text-amber-700 border-amber-100',
  green:  'bg-green-50 text-green-700 border-green-100',
  violet: 'bg-violet-50 text-violet-700 border-violet-100',
  slate:  'bg-slate-100 text-slate-500 border-slate-200',
  red:    'bg-red-50 text-red-700 border-red-100',
};

export default function Badge({ label, variant = 'blue' }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${VARIANTS[variant]}`}
    >
      {label}
    </span>
  );
}