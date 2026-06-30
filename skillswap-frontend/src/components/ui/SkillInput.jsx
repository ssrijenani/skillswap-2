import { useState } from 'react';

export default function SkillInput({ label, skills, onChange }) {
  const [input, setInput] = useState('');

  function handleKeyDown(e) {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      const newSkill = input.trim();
      if (!skills.includes(newSkill)) {
        onChange([...skills, newSkill]);
      }
      setInput('');
    }
  }

  function removeSkill(skill) {
    onChange(skills.filter((s) => s !== skill));
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-400 hover:text-blue-700 transition-colors leading-none"
                aria-label={`Remove ${skill}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter…"
        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}