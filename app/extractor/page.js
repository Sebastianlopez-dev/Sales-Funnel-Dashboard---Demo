"use client";

import { useState, useCallback } from "react";
import { sampleData, computeSummary } from "@/lib/sampleData";
import { extractPDFData } from "@/lib/pdfParser";

const TABS = [
  { id: "pdf", label: "PDF to CSV", icon: "📄" },
  { id: "csv", label: "CSV to PDF", icon: "📊" },
];

export default function ExtractorPage() {
  const [activeTab, setActiveTab] = useState("pdf");
  const [fileName, setFileName] = useState(sampleData.fileName);
  const [headers, setHeaders] = useState(sampleData.headers);
  const [rows, setRows] = useState(sampleData.rows);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("sample");

  const summary = computeSummary(headers, rows);

  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setFileName(file.name);
    setUploadStatus("processing");

    try {
      if (activeTab === "pdf" && file.name.endsWith(".pdf")) {
        const buffer = await file.arrayBuffer();
        const result = await extractPDFData(buffer);
        setHeaders(result.headers);
        setRows(result.rows);
        setUploadStatus("complete");
      } else if (activeTab === "csv" && file.name.endsWith(".csv")) {
        const text = await file.text();
        const lines = text.split("\\n").filter(Boolean);
        const parsedHeaders = lines[0].split(",").map((h) => h.replace(/["']/g, "").trim());
        const parsedRows = lines.slice(1).map((l) => l.split(",").map((c) => c.replace(/["']/g, "").trim()));
        setHeaders(parsedHeaders);
        setRows(parsedRows);
        setUploadStatus("complete");
      } else {
        throw new Error("Invalid file format for selected tab.");
      }
    } catch (err) {
      console.error("Parse error:", err);
      setUploadStatus("error");
      setHeaders(["Error"]);
      setRows([["Failed to parse file: " + err.message]]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const handleExportCSV = useCallback(() => {
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.replace(".pdf", "") + "_extracted.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [headers, rows, fileName]);

  const handleExportPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      <div className="print:hidden">
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Left Panel: Upload */}
        <div className="col-span-12 lg:col-span-3 print:hidden">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              Upload {activeTab === "pdf" ? "PDF" : "CSV"}
            </h3>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                📁
              </div>
              <span className="text-sm text-slate-500 group-hover:text-violet-600 transition-colors">
                Drop {activeTab === "pdf" ? "PDF" : "CSV"} or click to browse
              </span>
              <input
                type="file"
                accept={activeTab === "pdf" ? ".pdf" : ".csv"}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-sm">
                  {activeTab === "pdf" ? "📄" : "📊"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {fileName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {uploadStatus === "sample" && "Sample data loaded"}
                    {uploadStatus === "processing" && "Processing…"}
                    {uploadStatus === "complete" && "Extraction complete"}
                    {uploadStatus === "error" && "Error occurred"}
                  </p>
                </div>
                <div>
                  {uploadStatus === "complete" && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 block" />
                  )}
                  {uploadStatus === "sample" && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 block" />
                  )}
                  {uploadStatus === "error" && (
                    <span className="w-2 h-2 rounded-full bg-red-400 block" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Table Preview */}
        <div className="col-span-12 lg:col-span-6 print:col-span-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm print:shadow-none print:border-none print:p-0">
            <div className="flex items-center justify-between mb-4 print:hidden">
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                Extracted Data
              </h3>
              <span className="text-xs text-slate-500">
                {rows.length} rows × {headers.length} cols
              </span>
            </div>
            
            <div className="hidden print:block mb-4 text-center text-xl font-bold text-slate-900 border-b pb-4">
              File Extraction Report: {fileName}
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="overflow-auto max-h-[500px] rounded-xl border border-slate-200 print:overflow-visible print:max-h-none print:border-none">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 z-10 print:static">
                    <tr className="bg-slate-50 border-b border-slate-200 print:bg-transparent print:border-b-2 print:border-slate-800">
                      {headers.map((h, i) => (
                        <th
                          key={i}
                          className="px-3 py-2.5 text-left font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap print:text-black print:text-sm"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={`border-b border-slate-100 transition-colors ${
                          ri % 2 === 0 ? "bg-slate-50/50" : ""
                        } print:border-slate-300 print:bg-transparent`}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-2 text-slate-700 whitespace-nowrap print:text-black print:text-sm"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Summary & Export */}
        <div className="col-span-12 lg:col-span-3 print:hidden">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Total Rows</span>
                <span className="text-sm font-semibold text-slate-700">
                  {summary.totalRows}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Columns</span>
                <span className="text-sm font-semibold text-slate-700">
                  {summary.totalColumns}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-2">Column Names</p>
                <div className="flex flex-wrap gap-1.5">
                  {summary.columns.map((col) => (
                    <span
                      key={col.name}
                      className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-md text-[10px] font-medium"
                    >
                      {col.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {activeTab === "pdf" ? (
              <button
                onClick={handleExportCSV}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>⬇️</span>
                Export CSV
              </button>
            ) : (
              <button
                onClick={handleExportPDF}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>🖨️</span>
                Export PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-white text-violet-700 shadow-sm border border-slate-200/50"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
