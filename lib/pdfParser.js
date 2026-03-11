/**
 * Parse a PDF file's text content into tabular data using pdfjs-dist.
 * This is a client-side-only module.
 */

let pdfjsLib = null;

async function getPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  pdfjsLib = await import("pdfjs-dist");
  // Use the bundled worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  return pdfjsLib;
}

/**
 * Extract text from a PDF ArrayBuffer and attempt to structure it as a table.
 * Returns { headers: string[], rows: string[][] }
 */
export async function extractPDFData(arrayBuffer) {
  const pdfjs = await getPdfJs();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  const allLines = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    // Group text items by approximate Y position
    const lineMap = {};
    for (const item of textContent.items) {
      if (!item.str || !item.str.trim()) continue;
      const y = Math.round(item.transform[5]);
      if (!lineMap[y]) lineMap[y] = [];
      lineMap[y].push({ x: item.transform[4], text: item.str.trim() });
    }

    // Sort by Y descending (PDF coords go bottom-up), then X ascending
    const sortedYs = Object.keys(lineMap)
      .map(Number)
      .sort((a, b) => b - a);

    for (const y of sortedYs) {
      const items = lineMap[y].sort((a, b) => a.x - b.x);
      const lineText = items.map((i) => i.text);
      if (lineText.length > 0) {
        allLines.push(lineText);
      }
    }
  }

  if (allLines.length === 0) {
    return { headers: ["Content"], rows: [["No extractable text found"]] };
  }

  // Heuristic: Use the line with the most cells as the header
  let headerIndex = 0;
  let maxCells = 0;
  for (let i = 0; i < Math.min(allLines.length, 5); i++) {
    if (allLines[i].length > maxCells) {
      maxCells = allLines[i].length;
      headerIndex = i;
    }
  }

  const headers = allLines[headerIndex];
  const rows = [];

  for (let i = headerIndex + 1; i < allLines.length; i++) {
    const line = allLines[i];
    // Pad or trim to match header count
    const row = [];
    for (let j = 0; j < headers.length; j++) {
      row.push(line[j] || "");
    }
    rows.push(row);
  }

  return { headers, rows: rows.length > 0 ? rows : [headers.map(() => "—")] };
}
