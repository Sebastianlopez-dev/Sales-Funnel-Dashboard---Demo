# RULES.md

Re-read `RULES.md` before planning and before every new task.

## Plan before building
- Always generate a clear implementation plan first.
- Generate a plan first. Proceed automatically unless the user explicitly stops you.

## One change at a time
- Do not refactor and add features in the same step.
- If code already works, do not rewrite it unless asked.
- Don’t design and architect and code and deploy in one prompt. Take it step by step.

## No assumptions
- If requirements are missing, conflicting, or unclear, stop and ask questions.
- Do not guess intent or invent features.

## Respect scope
- Do not add functionality outside the defined scope.
- Explicitly confirm before introducing new tools, services, or dependencies.

## Tool discipline
- Do not add tools or integrations unless there is a clear blocking reason.
- Prefer the simplest viable approach.

## Stop conditions
Stop and ask before continuing if:
- there are missing inputs (API key, env var, design reference)
- a new dependency is required
- deployment fails
- the plan changed more than once

## Reset rule
- If the implementation plan changes more than once, stop execution.
- Request a reset and re-apply the project scaffold before continuing.

## Execution cadence
- Follow this order strictly: **Plan → Build → Verify → Deploy**
- Pause after each phase for confirmation before proceeding.


