# 🎯 Sales Funnel Dashboard & File Extractor

A fast, responsive, and lightweight web application built with **Next.js** and **Tailwind CSS**. Designed for performance and simplicity, this project provides a clear interface for sales analytics and data extraction without the need for complex backend infrastructure.

## ✨ Features

### 1. Sales Funnel Dashboard (`/`)
An interactive dashboard that visualizes sales metrics by fetching and parsing data directly from the client.
- **KPI Cards**: Instantly view critical metrics like Leads, Calls, Wins, Revenue, and Conversion Rates.
- **Dynamic Filtering**: Filter data by Sales Representative or Lead Source, with all charts and metrics updating reactively in real-time.
- **Date Range Picker**: Automatically calibrates to available data periods.
- **Visualizations**: 
  - Time series line charts for New Leads, Sales Calls, and Contract Wins.
  - Bar charts for Lead Breakdown and Win Breakdown by Source.
- **Performance Table**: Sortable data table displaying individual metrics per sales rep.

### 2. File Extractor (`/extractor`)
A dedicated tool for client-side data extraction across various document formats.
- **Multi-Tab Interface**: Switch seamlessly between PDF, CSV, Photos, and Video extracts. 
- **Three-Panel Layout**: Intuitive design equipped with an upload zone, center preview table, and right-panel summary/export options.
- **Client-Side Parsing**: Securely parses PDF and CSV data completely within the user's browser via libraries like `pdfjs-dist` and `papaparse`, ensuring complete data privacy.
- **Easy Export**: One-click CSV export functionality for all extracted data.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Parsing & Utilities**: `papaparse` (CSV processing), `pdfjs-dist` (PDF text extraction)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sebastianlopez-dev/Sales-Funnel-Dashboard---Demo.git
   ```

2. Navigate into the project directory:
   ```bash
   cd "Sales-Funnel-Dashboard---Demo"
   ```

3. Install all dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the main dashboard. 
Navigate to `http://localhost:3000/extractor` to utilize the File Extractor tool.

## 📁 Project Structure

| File Location | Purpose |
|--------------|---------|
| `app/page.js` | Main Sales Funnel Dashboard interface with reactive state management. |
| `app/extractor/page.js` | File Extractor interface utilizing a 3-panel layout design. |
| `lib/csv.js` | Utility script for fetching, parsing, metrics calculation, and grouping CSV data. |
| `lib/pdfParser.js` | Utility script executing client-side PDF text extraction securely. |

## 🏗️ Architecture & Philosophy

This application was strictly engineered to be fully functional, responsive, and robust while adhering to architectural constraints:
- **No Dependencies on Cloud Backends**: Built entirely absent of complex authentication layers, persistent user databases, or long-running background jobs.
- **Privacy First Approach**: Everything is processed locally in the client browser, mitigating data transit risks for sensitive user uploads.
- **Responsive Layout Architecture**: Designed to adapt elegantly across mobile, tablet, and high-definition desktop viewports.

---
> *Built with ❤️ by [Sebastianlopez-dev](https://github.com/Sebastianlopez-dev)*
