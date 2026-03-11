const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT07gAnYFxjaKZ6slcCb0vop1nlpK4VQeNAesRhlDmxDFOsXvXLFtFjx-Si7UkQqYyJQkfTlQN_gWat/pub?output=csv";

/**
 * Fetch raw CSV text from Google Sheets.
 */
export async function fetchCSV() {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  return res.text();
}

/**
 * Parse CSV text into an array of row objects.
 * Only extracts the 5 required columns:
 *   Date (A), Event (B), Sales Rep (C), Source (G), Total Value (L)
 */
export function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return [];

  // Column indices (0-based): A=0, B=1, C=2, G=6, L=11
  const COL_DATE = 0;
  const COL_EVENT = 1;
  const COL_SALES_REP = 2;
  const COL_SOURCE = 6;
  const COL_TOTAL_VALUE = 11;

  const VALID_EVENTS = new Set([
    "New Lead",
    "Sales Call",
    "Contract Won",
    "Contract Lost",
  ]);

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const event = (cols[COL_EVENT] || "").trim();
    if (!VALID_EVENTS.has(event)) continue;

    const dateStr = (cols[COL_DATE] || "").trim();
    const date = parseDate(dateStr);
    if (!date) continue;

    const valueStr = (cols[COL_TOTAL_VALUE] || "").trim();
    const totalValue = valueStr ? parseFloat(valueStr) : 0;

    rows.push({
      date,
      dateStr: formatDate(date),
      event,
      salesRep: (cols[COL_SALES_REP] || "").trim(),
      source: (cols[COL_SOURCE] || "").trim() || "Unknown",
      totalValue: isNaN(totalValue) ? 0 : totalValue,
    });
  }

  return rows;
}

/**
 * Split a CSV line respecting quoted fields.
 */
function splitCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

/**
 * Parse date string like "2026-01-28 8:01 AM" into a Date object.
 * Handles malformed dates in the CSV (e.g. "2026-001-201") by
 * extracting the first YYYY-MM-DD-like pattern.
 * Returns null for invalid dates.
 */
function parseDate(str) {
  if (!str) return null;
  // Try to extract a date pattern YYYY-MM-DD from the start
  const match = str.match(/(\d{4})-(\d{1,3})-(\d{1,3})/);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  let month = parseInt(match[2], 10);
  let day = parseInt(match[3], 10);

  // Sanity check: month 1-12, day 1-31
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const d = new Date(year, month - 1, day);
  if (isNaN(d.getTime())) return null;
  return d;
}

/**
 * Format a Date into YYYY-MM-DD string.
 */
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

/**
 * Filter rows by date range, sales rep, and source.
 */
export function filterData(rows, { startDate, endDate, salesRep, source }) {
  return rows.filter((row) => {
    if (startDate && row.date < new Date(startDate + "T00:00:00")) return false;
    if (endDate && row.date > new Date(endDate + "T23:59:59")) return false;
    if (salesRep && row.salesRep !== salesRep) return false;
    if (source && row.source !== source) return false;
    return true;
  });
}

/**
 * Compute all 6 KPI metrics from filtered rows.
 */
export function computeMetrics(rows) {
  let leads = 0,
    calls = 0,
    wins = 0,
    losses = 0,
    revenue = 0;

  for (const row of rows) {
    switch (row.event) {
      case "New Lead":
        leads++;
        break;
      case "Sales Call":
        calls++;
        break;
      case "Contract Won":
        wins++;
        revenue += row.totalValue;
        break;
      case "Contract Lost":
        losses++;
        break;
    }
  }

  return {
    leads,
    calls,
    wins,
    losses,
    revenue,
    leadConversionRate: leads > 0 ? wins / leads : 0,
    callConversionRate: calls > 0 ? wins / calls : 0,
  };
}

/**
 * Group event counts by date for time series charts.
 * Returns { labels: string[], datasets: { newLeads, salesCalls, contractWins } }
 */
export function groupByTime(rows) {
  const dateMap = {};

  for (const row of rows) {
    const key = row.dateStr;
    if (!dateMap[key]) {
      dateMap[key] = { newLeads: 0, salesCalls: 0, contractWins: 0 };
    }
    if (row.event === "New Lead") dateMap[key].newLeads++;
    else if (row.event === "Sales Call") dateMap[key].salesCalls++;
    else if (row.event === "Contract Won") dateMap[key].contractWins++;
  }

  const sortedDates = Object.keys(dateMap).sort();
  return {
    labels: sortedDates,
    newLeads: sortedDates.map((d) => dateMap[d].newLeads),
    salesCalls: sortedDates.map((d) => dateMap[d].salesCalls),
    contractWins: sortedDates.map((d) => dateMap[d].contractWins),
  };
}

/**
 * Group events by Source. Returns { labels: string[], counts: number[] }
 */
export function groupBySource(rows, eventType) {
  const sourceMap = {};
  for (const row of rows) {
    if (row.event !== eventType) continue;
    sourceMap[row.source] = (sourceMap[row.source] || 0) + 1;
  }

  const sorted = Object.entries(sourceMap).sort((a, b) => b[1] - a[1]);
  return {
    labels: sorted.map(([k]) => k),
    counts: sorted.map(([, v]) => v),
  };
}

/**
 * Compute metrics per Sales Rep for the performance table.
 */
export function groupBySalesRep(rows) {
  const repMap = {};

  for (const row of rows) {
    if (!repMap[row.salesRep]) {
      repMap[row.salesRep] = {
        name: row.salesRep,
        leads: 0,
        calls: 0,
        wins: 0,
        losses: 0,
        revenue: 0,
      };
    }
    const rep = repMap[row.salesRep];
    switch (row.event) {
      case "New Lead":
        rep.leads++;
        break;
      case "Sales Call":
        rep.calls++;
        break;
      case "Contract Won":
        rep.wins++;
        rep.revenue += row.totalValue;
        break;
      case "Contract Lost":
        rep.losses++;
        break;
    }
  }

  return Object.values(repMap).map((rep) => ({
    ...rep,
    leadConversionRate: rep.leads > 0 ? rep.wins / rep.leads : 0,
    callConversionRate: rep.calls > 0 ? rep.wins / rep.calls : 0,
  }));
}

/**
 * Extract unique values from rows for filter dropdowns.
 */
export function getUniqueValues(rows, field) {
  const set = new Set();
  for (const row of rows) {
    if (row[field]) set.add(row[field]);
  }
  return Array.from(set).sort();
}

/**
 * Get the min and max date from all rows (for default date range).
 * Returns { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
 */
export function getDateRange(rows) {
  if (rows.length === 0) {
    const now = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return {
      startDate: formatDate(start),
      endDate: formatDate(now),
    };
  }
  let min = rows[0].date;
  let max = rows[0].date;
  for (const row of rows) {
    if (row.date < min) min = row.date;
    if (row.date > max) max = row.date;
  }
  return {
    startDate: formatDate(min),
    endDate: formatDate(max),
  };
}
