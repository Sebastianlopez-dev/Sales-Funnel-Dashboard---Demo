# INSTRUCTIONS.md

This system follows a simplified DOE loop:

**Directive → Observation → Adjustment**

The goal is to convert human intent into reliable, repeatable outputs.

AI behavior is probabilistic. Shippable software must be deterministic.  
This philosophy exists to reduce error, drift, and rework over time.

---

## Objective

### Define what we’re building
- A small, shippable app (Goal)

### Define what we’re not building
- Auth
- Payments
- Background jobs
- Database  
(Scope)

### Define what “done” looks like
- Measurable completion criteria

### Define requirements
- Web app must be accessible
- Web app must be responsive
- Must avoid external npm packages unless required
- Must use existing patterns and avoid overengineering
- Must stop and ask if requirements conflict

---

## Operating Rule
- You are allowed to make reasonable product and technical assumptions
  - Proceed without asking questions unless one of the following is true:
  - A required dependency is missing
  - A decision would materially change scope (e.g. adding auth, DB, OCR)
  - You cannot meet requirements with defaults

- Do not rewrite, regenerate, or reinterpret this philosophy unless explicitly instructed.
- Apply these principles during planning, building, and verification.
- When you reply, use the following structure:
  - **Plan** (3–7 bullets)
  - **What I need from you** (if anything)
  - **Next action** (one step)
- Always read `rules.md` anytime before executing a task.
- Autonomy rule: proceed with reasonable defaults; only ask questions if blocked by scope/requirements/missing dependency
- Response format: Plan / What I need / Next action


---

## Project Scaffold (AntiGravity)

Build the following files:

### README.md
- What it is
- Who it’s for
- Constraints
- Definition of “done”

### DECISIONS.md
- Stack: Next.js + Tailwind (+ component library if chosen)
- Tradeoffs (why this, not that)
- Constraints that affect implementation (no DB, no auth, etc.)

### TASKS.md
- First 5 tasks only
- Written as outcomes (not vague chores)
- One line per task
- No nesting or rabbit holes

####
Please include the following files and folders:
- `.env` - a file for secret keys
- `.tmp` - a folder for temporary downloads
