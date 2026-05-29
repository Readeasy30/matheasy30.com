# CODEX-WORKFLOW.md

Last updated: 2026-05-29

## Purpose

Codex is the main workflow for routine MathEasy30 repository editing.

MathEasy30 must stay simple, stable, mobile-first, beginner-friendly, and easy to maintain.

## Current stack

MathEasy30 uses:

- HTML
- CSS
- JavaScript
- GitHub Pages / GitHub repository publishing
- Cloudflare Pages when connected
- browser `localStorage` for simple progress tracking when present

Do not convert this project to React, Vite, Next.js, TypeScript, or any build tool unless Gerry clearly requests a full rebuild later.

## Operating workflow

Use ChatGPT 5.5 and Codex as the production workflow.

No local Git. No terminal Git. No VS Code requirement. No manual file creation, replacement, or paste updates.

Workflow:

1. ChatGPT 5.5 manages the plan.
2. Codex performs repository work.
3. GitHub stores files and commits.
4. Cloudflare Pages publishes from GitHub when connected.

## Main rule

Codex should handle repository file work directly.

Do not ask Gerry to paste, create, replace, or manually update repo files.

Work in useful batches. Report only after several commits or a real blocker.

## Use Codex for

- multi-file updates
- repo audits
- HTML/CSS/JS fixes
- README/status/workflow files
- sitemap.xml and robots.txt
- SEO metadata
- navigation/footer cleanup
- safe content pages
- project queue continuation

## Use ChatGPT GitHub connector for

- small direct file updates
- repo checks
- status verification
- emergency fixes
- when Codex is awkward or blocked

Internal write-action labels like `create_file` or `update_file` mean the AI is requesting permission to create or update a file. They are not instructions for Gerry to manually create files.

## Required read order

Before editing, read these files when they exist:

1. `README.md`
2. `AGENTS.md`
3. `CODEX-WORKFLOW.md`
4. `CODEX-CURRENT-TASK.md`
5. `PROJECT-STATUS.md`
6. `CHANGELOG.md`
7. `AGENT-INSTRUCTIONS.md`
8. `LOCKED-CHECKPOINT.md`
9. `FILE-MANAGEMENT.md`

## Safe work allowed

Codex may directly handle:

- README updates
- AGENTS.md updates
- CODEX-WORKFLOW.md updates
- CODEX-CURRENT-TASK.md updates
- PROJECT-STATUS.md updates
- CHANGELOG.md updates
- Markdown documentation updates
- homepage copy improvements
- support page improvements
- footer and navigation fixes
- SEO metadata checks
- sitemap and robots.txt updates
- accessibility notes and test checklists
- simple CSS improvements
- small JavaScript repairs that preserve current behavior
- math lesson wording improvements that keep the same app structure
- printable worksheet planning pages that do not require payments or accounts
- safe content pages

## Do not change without direct approval

Do not do these without direct approval:

- framework conversion
- React, Vite, Next.js, TypeScript, or build-tool migration
- major deletion of working app code
- payment setup
- live ads
- live tracking scripts
- accounts or logins
- private keys or API tokens
- affiliate links
- public AI tools
- upload systems
- ordering integrations
- replacing the lesson engine
- breaking current localStorage progress behavior

## MathEasy30 product rules

Keep lessons calm, short, clear, and confidence-building.

Use simple steps. Avoid shame language. Help learners practice one skill at a time.

## Cloudflare Pages

Cloudflare only connects to GitHub and publishes.

Recommended setup:

- Production branch: main
- Build command: blank
- Output directory: .
- No manual Cloudflare file uploads

## Current safe queue

1. Keep MathEasy30 aligned with the shared education growth plan in `Wholelychit/marketing-system`.
2. Add one more SEO content page, such as `addition-practice.html` or `word-problem-practice.html`.
3. Add skip link/accessibility improvement to all pages.
4. Review `app.js` for safe lesson wording and answer handling.
5. Add printable worksheet planning page without payments or downloads requiring accounts.
6. Add simple FAQ content to support SEO and parent trust.

## If blocked

Record the blocker in `PROJECT-STATUS.md` if possible.

Move to the next safe task or next repository. Do not ask Gerry to do manual file work.

## Reporting rule

Commit useful safe changes. Report after several useful commits or when a real blocker appears.
