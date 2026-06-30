function Topbar() {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-textMain">SkillSwap</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">Welcome!</span>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      </div>
    </header>
  );
}

export default Topbar;
