"use client";

export default function KPICards({ metrics }) {
  // Cards ordered by importance: Revenue → Total Leads → Wins → Lead Conv. Rate → Sales Calls → Call Conv. Rate
  const cards = [
    {
      label: "Revenue",
      value: metrics.revenue,
      format: "currency",
      gradient: "from-amber-400 to-orange-500",
      iconId: "revenue",
    },
    {
      label: "Total Leads",
      value: metrics.leads,
      format: "number",
      gradient: "from-pink-500 to-rose-500",
      iconId: "leads",
    },
    {
      label: "Wins",
      value: metrics.wins,
      format: "number",
      gradient: "from-blue-400 to-cyan-400",
      iconId: "wins",
    },
    {
      label: "Lead Conv. Rate",
      value: metrics.leadConversionRate,
      format: "percent",
      gradient: "from-emerald-400 to-green-500",
      iconId: "leadConv",
    },
    {
      label: "Sales Calls",
      value: metrics.calls,
      format: "number",
      gradient: "from-violet-500 to-purple-600",
      iconId: "calls",
    },
    {
      label: "Call Conv. Rate",
      value: metrics.callConversionRate,
      format: "percent",
      gradient: "from-indigo-500 to-blue-600",
      iconId: "callConv",
    },
  ];

  function formatValue(value, format) {
    switch (format) {
      case "currency":
        return "€" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case "percent":
        return (value * 100).toFixed(1) + "%";
      default:
        return value.toLocaleString();
    }
  }

  // Custom SVG graphics for each card (hand-crafted vector icons, not emojis)
  const renderIcon = (iconId) => {
    const iconStyle = "w-11 h-11 shrink-0 drop-shadow-md";
    switch (iconId) {
      case "revenue":
        // Euro sign with upward arrow
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M18 20h10M18 24h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M28 16c-1.5-2-4-3-6.5-3C17.5 13 14 17 14 22s3.5 9 7.5 9c2.5 0 5-1 6.5-3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M34 18l0-6-6 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34 12L28 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "leads":
        // Funnel icon
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M14 14h20l-7 10v8l-6 3V24L14 14z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.15" />
          </svg>
        );
      case "wins":
        // Trophy icon
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M18 13h12v8a6 6 0 01-12 0v-8z" stroke="white" strokeWidth="2.2" fill="white" fillOpacity="0.15" />
            <path d="M18 16h-4a3 3 0 003 6h1M30 16h4a3 3 0 01-3 6h-1" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 27v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 33h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M20 33v2h8v-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "leadConv":
        // Gauge / percentage meter
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M14 30a12 12 0 0120 0" stroke="white" strokeOpacity="0.35" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M14 30a12 12 0 0114-10.4" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="24" cy="28" r="2.5" fill="white" />
            <path d="M24 28l5-9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case "calls":
        // Phone / headset icon
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M16 28v-4a8 8 0 0116 0v4" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="12" y="26" width="5" height="8" rx="2" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15" />
            <rect x="31" y="26" width="5" height="8" rx="2" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.15" />
            <path d="M31 34c0 3-3 4-7 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "callConv":
        // Speedometer / dial icon
        return (
          <svg className={iconStyle} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.18" />
            <path d="M12 32a14 14 0 0124 0" stroke="white" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
            <path d="M12 32a14 14 0 0118.5-12" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="30" r="2" fill="white" />
            <path d="M24 30l8-11" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="14" cy="30" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="18" cy="22" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="24" cy="19" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="30" cy="22" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="34" cy="30" r="1.2" fill="white" fillOpacity="0.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Decorative mini-chart at the bottom of each card
  const renderMiniChart = (index) => {
    // Alternate between bar, area, and line mini-charts
    const type = index % 3;
    if (type === 0) {
      // Mini bar chart
      return (
        <div className="flex items-end gap-[3px] h-8 mt-auto pt-3 opacity-60">
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '100%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '55%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '80%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '40%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '90%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '65%' }} />
          <div className="w-[6px] bg-white rounded-t-sm" style={{ height: '75%' }} />
        </div>
      );
    }
    if (type === 1) {
      // Area wave
      return (
        <svg className="w-full h-10 mt-auto opacity-40" viewBox="0 0 120 30" preserveAspectRatio="none">
          <path d="M0,30 L0,18 Q15,6 30,16 T60,12 T90,20 L120,8 L120,30 Z" fill="white" />
        </svg>
      );
    }
    // Line sparkline
    return (
      <svg className="w-full h-8 mt-auto pt-2 overflow-visible opacity-60" viewBox="0 0 120 24" preserveAspectRatio="none">
        <polyline points="0,20 20,8 40,18 60,4 80,14 100,6 120,10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[160px] flex flex-col`}
        >
          {/* Header row: label + icon */}
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-white/90 tracking-wide leading-tight">
              {card.label}
            </p>
            {renderIcon(card.iconId)}
          </div>

          {/* Value */}
          <p className="text-3xl font-bold tracking-tight mt-3">
            {formatValue(card.value, card.format)}
          </p>

          {/* Decorative mini chart */}
          {renderMiniChart(index)}
        </div>
      ))}
    </div>
  );
}
