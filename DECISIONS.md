# Decisions

## Stack
- Next.js
- Tailwind CSS

## Tradeoffs
- **Next.js & Tailwind**: Chosen for rapid development, built-in routing, and utility-first styling. It aligns with existing patterns and avoids overengineering, ensuring a highly responsive and maintainable codebase.

## Constraints Affecting Implementation
- **No Database**: All state must be managed locally (e.g., in-memory or localStorage) or via static data ingestion. Data persistence across sessions is not expected unless client-based.
- **No Auth**: No user sessions, protected routes, or identity verification needed.
- **No Payments / Background jobs**: Focus remains strictly on the UI and immediate analytics rendering.
