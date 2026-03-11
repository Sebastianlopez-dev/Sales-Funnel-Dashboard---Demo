"use client";

import { useState, useEffect, useMemo } from "react";
import KPICards from "@/components/KPICards";
import DateRangePicker from "@/components/DateRangePicker";
import Filters from "@/components/Filters";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import BreakdownCharts from "@/components/BreakdownCharts";
import SalesRepTable from "@/components/SalesRepTable";
import {
  fetchCSV,
  parseCSV,
  filterData,
  computeMetrics,
  groupByTime,
  groupBySource,
  groupBySalesRep,
  getUniqueValues,
  getDateRange,
} from "@/lib/csv";

export default function DashboardPage() {
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [salesRep, setSalesRep] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    fetchCSV()
      .then((text) => {
        const rows = parseCSV(text);
        setAllRows(rows);
        setDateRange(getDateRange(rows));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredRows = useMemo(
    () =>
      filterData(allRows, {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        salesRep,
        source,
      }),
    [allRows, dateRange, salesRep, source]
  );

  const metrics = useMemo(() => computeMetrics(filteredRows), [filteredRows]);
  const timeData = useMemo(() => groupByTime(filteredRows), [filteredRows]);
  const leadsBySource = useMemo(
    () => groupBySource(filteredRows, "New Lead"),
    [filteredRows]
  );
  const winsBySource = useMemo(
    () => groupBySource(filteredRows, "Contract Won"),
    [filteredRows]
  );
  const repData = useMemo(
    () => groupBySalesRep(filteredRows),
    [filteredRows]
  );

  const salesReps = useMemo(
    () => getUniqueValues(allRows, "salesRep"),
    [allRows]
  );
  const sources = useMemo(
    () => getUniqueValues(allRows, "source"),
    [allRows]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 text-sm">Loading dashboard data…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-400 font-medium mb-2">Failed to load data</p>
          <p className="text-red-300/70 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white shadow-sm border border-slate-200 rounded-2xl p-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Sales Funnel Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            {filteredRows.length} events in selected range
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={setDateRange}
          />
          <Filters
            salesReps={salesReps}
            sources={sources}
            selectedRep={salesRep}
            selectedSource={source}
            onChange={({ salesRep: r, source: s }) => {
              setSalesRep(r);
              setSource(s);
            }}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards metrics={metrics} />

      {/* Time Series Chart */}
      <TimeSeriesChart timeData={timeData} />

      {/* Breakdown Charts */}
      <BreakdownCharts
        leadsBySource={leadsBySource}
        winsBySource={winsBySource}
      />

      {/* Sales Rep Performance */}
      <SalesRepTable repData={repData} />
    </div>
  );
}
