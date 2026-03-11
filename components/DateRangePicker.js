"use client";

export default function DateRangePicker({ startDate, endDate, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          From
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange({ startDate: e.target.value, endDate })}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          To
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange({ startDate, endDate: e.target.value })}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  );
}
