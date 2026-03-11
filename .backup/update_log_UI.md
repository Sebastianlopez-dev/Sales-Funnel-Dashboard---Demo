# UI and Feature Update Log

## Layout & Aesthetics
- Updated overall page background to white (`bg-white` and `text-slate-800`), removing the `dark` mode class on `html`.
- Maintained the top Navigation Bar with its original background.
- Changed the "A" text logo to the "🎯" target emoji in the Navigation Bar.

## Sales Dashboard
- Replaced the emojis on the KPI cards with native CSS-animated SVG charts.
- Restructured the KPI grid into 4 columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) adjusting the layout to an executive style matching the provided reference image (Title, big value, gradient, inline graph).
- Migrated all child dashboard components (`Filters`, `DateRangePicker`, `TimeSeriesChart`, `BreakdownCharts`, and `SalesRepTable`) from dark mode Tailwind utility classes to light mode aesthetics (`bg-white`, `border-slate-200`, `text-slate-700`).

## File Extractor implementation
- Renamed the header link and tool from "PDF Extractor" to "File Extractor".
- Removed the "Photos" and "Video" tab extraction stubs.
- Repurposed the interface to have "PDF to CSV" and "CSV to PDF" tabs.
- Added native CSV parsing code which allows uploading a `.csv` file, previewing it in the table, and exporting that table directly to a printable PDF format utilizing the browser's native `window.print()` functionality augmented with CSS print classes.

## Full White Mode Migration (2026-03-11)
- **`globals.css`**: Changed CSS root variables from dark (`--background: #020617`, `--foreground: #e2e8f0`) to light (`--background: #ffffff`, `--foreground: #1e293b`). Updated scrollbar thumb colors from dark slate (`#334155` / `#475569`) to light slate (`#cbd5e1` / `#94a3b8`). Adjusted text selection highlight for white-on-violet readability.
- **`NavBar.js`**: Replaced dark nav background (`bg-slate-900/80`, `border-slate-700/50`) with light (`bg-white/90`, `border-slate-200`). Updated text colors from light-on-dark (`text-slate-200`, `text-slate-400`) to dark-on-light (`text-slate-700`, `text-slate-500`). Active link now uses `text-violet-600` with `bg-violet-500/15` instead of `text-violet-300`.
- **`TimeSeriesChart.js`**: Updated Chart.js tooltip from dark (`backgroundColor: #1e293b`, `titleColor: #e2e8f0`) to light (`backgroundColor: #ffffff`, `titleColor: #1e293b`, `borderColor: #e2e8f0`). Legend label color changed from `#94a3b8` to `#64748b`.
- **`BreakdownCharts.js`**: Same tooltip color migration as `TimeSeriesChart.js` — dark backgrounds replaced with white, border/text colors adjusted for light theme.

## KPI Cards Redesign (2026-03-11)
- **Order of Importance**: Reordered the 6 KPI cards logically: Revenue → Total Leads → Wins → Lead Conv. Rate → Sales Calls → Call Conv. Rate.
- **Custom Graphics**: Added bespoke SVG vector icons for each metric (Euro sign, funnel, trophy, gauge, headset, speedometer) to replace previous emojis/text icons.
- **Responsive Layout**: Updated the grid layout to a 3-column, 2-row layout on desktop (`md:grid-cols-3`), and a 2-column layout on mobile screens.
- **Aesthetics**: Polished the internal card spacing with consistent `p-6` padding, perfectly aligned with the main page container's aesthetic margins.
