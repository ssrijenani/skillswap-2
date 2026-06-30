const VARIANTS = {
  primary:  'bg-blue-600 hover:bg-blue-700 text-white',
  secondary:'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
  danger:   'bg-red-600 hover:bg-red-700 text-white',
  ghost:    'bg-transparent hover:bg-slate-100 text-slate-600',
};

const SIZES = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
  lg: 'text-sm px-6 py-3 rounded-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
    >
      {children}
    </button>
  );
}