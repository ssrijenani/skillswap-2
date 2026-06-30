import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/matches',   label: 'Matches',   icon: '⚡' },
  { path: '/sessions',  label: 'Sessions',  icon: '📅' },
];

const activeClass =
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ' +
  'bg-blue-50 text-blue-700 border-l-4 border-blue-600 no-underline transition-all';

const inactiveClass =
  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ' +
  'text-slate-600 hover:bg-slate-200 hover:text-slate-900 no-underline transition-all border-l-4 border-transparent';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-slate-100 border-r border-slate-200 flex flex-col z-20">

      <div className="p-5 border-b border-slate-200">
        <a href="/" className="flex items-center gap-2 no-underline group">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            SkillSwap
          </span>
        </a>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-3">
          Menu
        </p>

        <ul className="space-y-1 list-none p-0 m-0">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
            J
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 truncate">
              Jenani
            </span>
            <span className="text-xs text-slate-400 truncate">
              MVP Member
            </span>
          </div>

          <button
            className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
            title="Settings (coming soon)"
          >
            ⚙️
          </button>
        </div>
      </div>

    </aside>
  );
}
