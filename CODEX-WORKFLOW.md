# CODEX-WORKFLOW.md

Last updated: 2026-06-06

Repository: `Wholelychit/matheasy30.com`

## Purpose

Codex and AI helpers should protect the clean Day One MathEasy30 state.

MathEasy30 must stay simple, stable, mobile-first, beginner-friendly, and easy to maintain.

## Current stack

Use only:

- HTML
- CSS
- JavaScript
- GitHub
- Cloudflare
- browser `localStorage` for simple device progress

Do not convert this project to React, Vite, Next.js, TypeScript, a build system, or a server app.

## Current locked public funnel

The homepage should guide visitors in this order:

1. Start Math Practice
2. Print Worksheets
3. Word Problems
4. Parent / Tutor Guide
5. Reading + Math Plan

Do not bring back a giant top navigation menu.

Do not bring back confusing pricing language.

## Current free access lock

MathEasy30 is currently free.

`pricing.html` is only a legacy Free Access page so old links do not break.

Do not add `pricing.html` back to the sitemap unless Gerry changes the product direction.

Do not add paid/pricing language to the main funnel.

## Write-path rule

Use safe repository edits only when a reliable write path is available.

Do not use ChatGPT GitHub connector writes unless Gerry explicitly authorizes one specific write action in the current chat.

Preferred write paths:

1. Codex with a working non-connector write path
2. GitHub website editor
3. github.dev
4. GitHub Desktop
5. local Git after it is correctly installed

Read-only connector checks are allowed.

## Required read order

Before editing, read these files when they exist:

1. `README.md`
2. `AGENTS.md`
3. `AGENT-INSTRUCTIONS.md`
4. `PROJECT-STATUS.md`
5. `LOCKED-CHECKPOINT.md`
6. `CODEX-WORKFLOW.md`
7. current file being changed
8. relevant sitemap/robots files

## Safe work allowed

- full-file public page replacements when stale or cluttered
- mobile layout improvements
- accessibility improvements
- SEO metadata improvements
- sitemap and robots checks
- worksheet/support page improvements
- parent/tutor guide improvements
- safe app bug fixes after live QA confirms the bug
- README/status/checkpoint updates
- QA checklist updates

## Do not change without direct approval

- framework conversion
- React, Vite, Next.js, TypeScript, or build-tool migration
- live ads
- live tracking scripts
- payment setup
- affiliate links
- accounts or logins
- private keys or API tokens
- public AI tools
- uploads
- scraping
- social automation
- removing the parent/tutor path
- reintroducing stale pricing as a main visitor path

## Replacement rule

If a public file is stale, cluttered, or inconsistent, replace the whole file cleanly.

Do not stack tiny repairs on top of broken repairs.

Do not create duplicate parallel systems.

Do not make hidden production changes without updating the relevant status/checkpoint docs.

## Product rules

Keep Bubbles calm, helpful, and controlled.

Bubbles should encourage the learner to slow down, use hints, make math visible with drawings or objects, try one small step, and keep practicing without shame.

Bubbles should not become an open-ended chatbot until safety and content controls are ready.

## Cloudflare Pages

Cloudflare only connects to GitHub and publishes.

Recommended setup:

- Production branch: `main`
- Build command: blank
- Output directory: `.`
- No manual Cloudflare file uploads

## Current safe queue

1. Run live phone and desktop QA.
2. Fix only verified live-page issues.
3. Keep the five-step homepage funnel.
4. Keep free-access wording consistent.
5. Improve worksheet/support pages only after the app passes QA.
6. Keep MathEasy30 aligned with ReadEasy30 through `Wholelychit/marketing-system` planning only.

## Reporting rule

After useful commits, report changed files and commit SHAs.

If blocked, clearly state the blocker and stop changing files.
