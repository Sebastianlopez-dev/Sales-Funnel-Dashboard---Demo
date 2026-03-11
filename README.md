# Analytics App

## What it is
A small, shippable web application for analytics purposes.

## Who it’s for
Users who need to track and analyze specific metrics within defined constraints.

## Constraints
- No Auth
- No Payments
- No Background jobs
- No Database
- Must be accessible and responsive
- Avoid external npm packages unless strictly required

## Definition of “done”
- The web app is fully accessible and responsive.
- The app runs locally without errors.


What Was Built
A two-feature analytics web app using Next.js + Tailwind CSS:

1. Sales Funnel Dashboard (/)
Fetches live CSV from Google Sheets and parses it client-side
6 KPI cards: Leads (55), Calls (16), Wins (26), Revenue ($69,074.93), Lead Conv. Rate (47.3%), Call Conv. Rate (162.5%)
Date range picker auto-defaults to the data's min/max (Jan 1–31, 2026)
Filters: Sales Rep dropdown, Source dropdown — all metrics and charts react
Time series chart: Line chart of New Leads, Sales Calls, Contract Wins over time
Breakdown charts: Bar charts for Leads by Source and Wins by Source
Sales Rep Performance table: Sortable by any column, shows per-rep metrics
2. PDF Data Extractor (/extractor)
4 tabs: PDF (active), Photos, Video, CSV — non-PDF tabs show "Coming Soon"
3-panel layout: Upload (left), Table preview (center), Summary + Export (right)
Preloaded with 20 rows of sample invoice data on first load
PDF upload triggers client-side parsing via pdfjs-dist
CSV export button downloads extracted data
Key Files
File	Purpose
csv.js
CSV fetch, parse, filter, metrics, grouping
page.js
Dashboard page with state management
extractor/page.js
PDF Extractor 3-panel page
pdfParser.js
Client-side PDF text extraction
Bug Fixed During Verification
The initial date filter used "last 30 days" as default, which didn't overlap with the CSV data (Jan 2026). Also, some CSV dates had malformed formats (e.g. 2026-001-201).

Fix: Replaced new Date(str) with regex-based extraction (/(\d{4})-(\d{1,3})-(\d{1,3})/) and added 
getDateRange()
 to auto-compute min/max from the actual data.

Browser Verification
All verified via browser testing at http://localhost:3000:

Test	Result
Dashboard loads with real data	✅ 168 events, non-zero KPIs
Date range defaults to data range	✅ Jan 1–31, 2026
Charts render with data	✅ Line chart + 2 bar charts
Sales Rep table shows 3 reps	✅ Jane Doe, John Smith, Bob Richards
PDF Extractor loads with sample data	✅ 20 rows × 6 columns
Non-PDF tabs show "Coming Soon"	✅
Recordings
Dashboard verification
Review
![alt text](https://127.0.0.1:49428/static/artifacts/66c9e7fc-5eaa-4fa9-9703-ae434686789d/dashboard_fix_verify_1773245718715.webp?csrf%3D7a9d5da1-ddc2-4f7a-96c2-b42cf6b73d35)
Dashboard verification

Final app walkthrough
Review
![alt text](https://127.0.0.1:49428/static/artifacts/66c9e7fc-5eaa-4fa9-9703-ae434686789d/final_screenshots_1773245814462.webp?csrf%3D7a9d5da1-ddc2-4f7a-96c2-b42cf6b73d35)
Final app walkthrough
# Sales-Funnel-Dashboard---Demo
