import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '🎯',
    title: 'Set Your Skills',
    description:
      'Tell us what you know and what you want to learn. No money involved — just knowledge.',
  },
  {
    icon: '⚡',
    title: 'Get Matched',
    description:
      'Our algorithm finds people whose skills complement yours perfectly.',
  },
  {
    icon: '📅',
    title: 'Book a Session',
    description:
      'Schedule a live exchange at a time that works for both of you.',
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100 flex flex-col gap-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-bold text-slate-900">SkillSwap</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Enter App →
        </button>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Free peer-to-peer skill exchange
        </span>

        <h1 className="text-5xl font-bold text-slate-900 leading-tight max-w-2xl mb-5">
          Trade Skills,{' '}
          <span className="text-blue-600">Not Money</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-10">
          SkillSwap connects you with people who know what you want to learn —
          and want to learn what you know. Real sessions, real people.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors shadow-sm"
          >
            Start Swapping
          </button>
          <button
            onClick={() => navigate('/matches')}
            className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-6 py-3 rounded-lg border border-slate-200 transition-colors"
          >
            Browse Matches
          </button>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 px-8 py-16">
        <div className="max-w-3xl mx-auto">

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-2">
            How it works
          </p>
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Three steps to your first exchange
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        SkillSwap MVP v1.0 — Built with React + Tailwind
      </footer>

    </div>
  );
}
