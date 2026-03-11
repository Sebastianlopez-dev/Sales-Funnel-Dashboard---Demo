"use client";

import { useState } from "react";

export default function SalesRepTable({ repData }) {
  const [sortField, setSortField] = useState("revenue");
  const [sortDir, setSortDir] = useState("desc");

  const columns = [
    { key: "name", label: "Sales Rep", align: "left" },
    { key: "leads", label: "Leads", align: "right" },
    { key: "calls", label: "Calls", align: "right" },
    { key: "wins", label: "Wins", align: "right" },
    { key: "losses", label: "Losses", align: "right" },
    { key: "revenue", label: "Revenue", align: "right", format: "currency" },
    { key: "leadConversionRate", label: "Lead Conv.", align: "right", format: "percent" },
    { key: "callConversionRate", label: "Call Conv.", align: "right", format: "percent" },
  ];

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  const sorted = [...repData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === "string") {
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return sortDir === "asc" ? aVal - bVal : bVal - aVal;
  });

  function formatValue(value, format) {
    if (format === "currency") {
      return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (format === "percent") {
      return (value * 100).toFixed(1) + "%";
    }
    return value;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Sales Rep Performance
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 font-medium text-slate-500 uppercase tracking-wider text-xs cursor-pointer hover:text-violet-600 transition-colors select-none ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortField === col.key && (
                      <span className="text-violet-600">
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((rep, i) => (
              <tr
                key={rep.name}
                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  i % 2 === 0 ? "bg-slate-50/50" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${
                      col.align === "right" ? "text-right" : "text-left"
                    } ${col.key === "name" ? "font-medium text-slate-800" : "text-slate-600"}`}
                  >
                    {formatValue(rep[col.key], col.format)}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
