/**
 * Sample data preloaded in the PDF extractor to give a "complete" feel on first load.
 * Simulates extracted invoice data from a PDF.
 */
export const sampleData = {
  fileName: "sample_invoices_q1_2026.pdf",
  headers: ["Invoice #", "Customer", "Date", "Amount", "Status", "Category"],
  rows: [
    ["INV-001", "Acme Corp", "2026-01-05", "$4,250.00", "Paid", "Consulting"],
    ["INV-002", "TechVentures Inc", "2026-01-08", "$12,800.00", "Paid", "Development"],
    ["INV-003", "GreenLeaf LLC", "2026-01-12", "$1,750.00", "Pending", "Design"],
    ["INV-004", "NorthStar Solutions", "2026-01-15", "$8,400.00", "Paid", "Consulting"],
    ["INV-005", "Digital Dynamics", "2026-01-18", "$3,200.00", "Overdue", "Support"],
    ["INV-006", "Acme Corp", "2026-01-22", "$6,100.00", "Paid", "Development"],
    ["INV-007", "Summit Partners", "2026-01-25", "$15,500.00", "Pending", "Consulting"],
    ["INV-008", "TechVentures Inc", "2026-01-28", "$2,900.00", "Paid", "Design"],
    ["INV-009", "BlueWave Media", "2026-02-01", "$7,650.00", "Paid", "Marketing"],
    ["INV-010", "GreenLeaf LLC", "2026-02-04", "$4,300.00", "Overdue", "Support"],
    ["INV-011", "NorthStar Solutions", "2026-02-07", "$11,200.00", "Paid", "Development"],
    ["INV-012", "Digital Dynamics", "2026-02-10", "$3,750.00", "Pending", "Design"],
    ["INV-013", "Acme Corp", "2026-02-14", "$9,800.00", "Paid", "Consulting"],
    ["INV-014", "Summit Partners", "2026-02-17", "$5,400.00", "Paid", "Marketing"],
    ["INV-015", "BlueWave Media", "2026-02-20", "$2,100.00", "Overdue", "Support"],
    ["INV-016", "TechVentures Inc", "2026-02-23", "$18,300.00", "Paid", "Development"],
    ["INV-017", "GreenLeaf LLC", "2026-02-26", "$6,750.00", "Pending", "Consulting"],
    ["INV-018", "NorthStar Solutions", "2026-03-01", "$4,100.00", "Paid", "Design"],
    ["INV-019", "Digital Dynamics", "2026-03-04", "$14,600.00", "Paid", "Development"],
    ["INV-020", "Summit Partners", "2026-03-07", "$8,900.00", "Pending", "Consulting"],
  ],
};

/**
 * Compute summary stats from table data.
 */
export function computeSummary(headers, rows) {
  return {
    totalRows: rows.length,
    totalColumns: headers.length,
    columns: headers.map((h) => ({ name: h, type: "string" })),
  };
}
