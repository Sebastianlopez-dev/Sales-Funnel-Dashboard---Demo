"use client";

export default function Filters({ salesReps, sources, selectedRep, selectedSource, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Rep
        </label>
        <select
          value={selectedRep}
          onChange={(e) => onChange({ salesRep: e.target.value, source: selectedSource })}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all min-w-[140px]"
        >
          <option value="">All Reps</option>
          {salesReps.map((rep) => (
            <option key={rep} value={rep}>{rep}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Source
        </label>
        <select
          value={selectedSource}
          onChange={(e) => onChange({ salesRep: selectedRep, source: e.target.value })}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all min-w-[140px]"
        >
          <option value="">All Sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
