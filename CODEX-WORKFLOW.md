# Codex Workflow

Last updated: 2026-05-28

## Purpose

Codex is the main workflow for routine MathEasy30 repository editing.

MathEasy30 must stay simple, stable, mobile-first, and easy to maintain.

## Current Stack

MathEasy30 uses:

- HTML
- CSS
- JavaScript
- GitHub Pages
- Cloudflare
- browser `localStorage` for simple progress tracking

Do not convert this project to React, Vite, Next.js, TypeScript, or any build tool unless Gerry clearly requests a full rebuild later.

## Why Codex Is Primary

Codex should handle routine repo work directly because it can read the repo, make safe file edits, and commit useful changes without making Gerry manually paste, create, replace, or update files.

The ChatGPT GitHub connector may show internal write-action labels like `create_file` or `update_file`. Those labels can be confusing. Use that connector mainly for small reads, checks, reviews, or emergency single-file edits when Codex is unavailable.

## Required Read Order

Before editing, read these files when they exist:

1. `README.md`
2. `AGENTS.md`
3. `AGENT-INSTRUCTIONS.md`
4. `LOCKED-CHECKPOINT.md`
5. `FILE-MANAGEMENT.md`
6. `PROJECT-STATUS.md`
7. `CODEX-WORKFLOW.md`

## Safe Work Allowed

Codex may directly handle:

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
- checkpoint and project-status updates
- printable worksheet planning pages that do not require payments or accounts

## Do Not Change Without Direct Approval

Do not do these without direct approval:

- framework conversion
- React, Vite, Next.js, TypeScript, or build-tool migration
- major deletion of working app code
- payment setup
- live ads
- live tracking scripts
- accounts or logins
- private keys or API tokens
- replacing the lesson engine
- breaking current localStorage progress behavior

## MathEasy30 Product Rules

Keep lessons calm, short, clear, and confidence-building.

Use simple steps. Avoid shame language. Help learners practice one skill at a time.

## Current Safe Queue

1. Keep MathEasy30 aligned with the shared education growth plan in `Wholelychit/marketing-system`.
2. Add one more SEO content page, such as `addition-practice.html` or `word-problem-practice.html`.
3. Add skip link/accessibility improvement to all pages.
4. Review `app.js` for safe lesson wording and answer handling.
5. Add printable worksheet planning page without payments or downloads requiring accounts.
6. Add simple FAQ content to support SEO and parent trust.

## Reporting Rule

Commit useful safe changes. Report after several useful commits or when a real blocker appears.

Record blockers in `PROJECT-STATUS.md` instead of stopping early.
