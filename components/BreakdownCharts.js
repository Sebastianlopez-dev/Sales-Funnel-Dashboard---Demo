"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
];

function SourceBarChart({ title, sourceData }) {
  const data = {
    labels: sourceData.labels,
    datasets: [
      {
        label: title,
        data: sourceData.counts,
        backgroundColor: sourceData.labels.map(
          (_, i) => COLORS[i % COLORS.length] + "cc"
        ),
        borderColor: sourceData.labels.map(
          (_, i) => COLORS[i % COLORS.length]
        ),
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1e293b",
        bodyColor: "#475569",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.08)" },
        ticks: { color: "#64748b", font: { size: 11 }, stepSize: 1 },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="h-[260px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default function BreakdownCharts({ leadsBySource, winsBySource }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SourceBarChart title="Leads by Source" sourceData={leadsBySource} />
      <SourceBarChart title="Wins by Source" sourceData={winsBySource} />
    </div>
  );
}
