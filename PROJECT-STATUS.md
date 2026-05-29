# MathEasy30 Project Status

Date: 2026-05-28

## Current status

MathEasy30 is in a safe production build stage.

The repo uses a simple static website stack: HTML, CSS, JavaScript, GitHub Pages, and Cloudflare.

MathEasy30 is a free, calm, no-shame math practice site for adults, students, ESL learners, special education learners, older learners, parents, tutors, and anyone who wants simple practice toward about an 8th-grade level.

## Codex-first workflow

Codex is now the primary workflow for routine MathEasy30 repo editing.

The ChatGPT GitHub connector should be used only for small reads, checks, reviews, or emergency single-file edits when Codex is unavailable.

Current workflow file:

- `CODEX-WORKFLOW.md`
- `CODEX-UNIVERSAL-REPO-AUDIT.txt`

## Shared Education Growth Alignment

MathEasy30 is now connected to the shared Wholelychit education growth system with ReadEasy30.

Shared planning belongs in `Wholelychit/marketing-system`.

Current shared planning files:

- `EDUCATION-GROWTH-PLAN.md`
- `CAMPAIGNS/README.md`
- `CAMPAIGNS/readeasy30-matheasy30-confidence-campaign.md`
- `READEASY30-MATHEASY30-LAUNCH-PLAN.md`

Website code stays in this repo.

Repo-specific planning files now include:

- `READEASY30-MATHEASY30-BUILD-BRIEF.md`
- `MATHEASY30-LEVEL-MAP.md`

## Locked mission

ReadEasy30 and MathEasy30 are free, calm, beginner-friendly practice websites that help adults, students, ESL learners, and learners who need extra support build skills toward about an 8th-grade level.

MathEasy30 should not feel babyish. It should feel simple, respectful, and useful for adults and children.

## What is working

- Homepage with clear value message
- Math lesson app page
- 30-day starter lesson logic in `app.js`
- Progress behavior using browser storage
- About page
- Parent guide
- Addition practice content page
- Word problem practice content page
- Math facts practice content page
- Pricing page
- Contact page
- Privacy page
- Terms page
- Robots file
- Sitemap file

## Recent improvements

- Added a new math facts practice content page.
- Added and expanded `word-problem-practice.html` with calm step-by-step word problem guidance.
- Linked the math facts content page from homepage, app page, support pages, footer, and sitemap.
- Added canonical URLs to public pages touched in this pass.
- Improved homepage title and meta description.
- Updated README and file map.
- Added this status file and a locked checkpoint file.
- Updated README to point to the shared education growth plan in `marketing-system`.
- Recorded MathEasy30 as part of the ReadEasy30 + MathEasy30 campaign system.
- Added `CODEX-WORKFLOW.md` for Codex-first repo editing.
- Added `READEASY30-MATHEASY30-BUILD-BRIEF.md` to lock the shared no-shame education mission.
- Added `MATHEASY30-LEVEL-MAP.md` to define Level A through Level H toward about an 8th-grade level.

## Production rules still active

- Keep current stack.
- Do not add private keys.
- Do not add payment setup yet.
- Do not add live ads yet.
- Do not add tracking yet.
- Do not add accounts yet.
- Do not add public AI yet.
- Do not delete major working code.
- Commit useful safe changes directly.

## What remains blocked or deferred

- Live ads are deferred until the site has more useful content and a trust-safe ad plan.
- Payment setup is deferred until products and pricing are reviewed.
- Analytics/tracking is deferred until privacy text and tool choice are ready.
- Larger app feature changes should be reviewed carefully so the lesson flow stays stable.
- Public AI is deferred until it clearly improves learning, safety, trust, or revenue.
- The ChatGPT GitHub connector blocked the sitemap update for adding `word-problem-practice.html`; Codex/local repo should add that sitemap entry next.

## Next safe queue

1. Add `word-problem-practice.html` to `sitemap.xml` through Codex/local repo because the connector blocked that specific write.
2. Link `word-problem-practice.html` from the homepage and relevant support/footer navigation.
3. Add skip link/accessibility improvement to all pages.
4. Review `app.js` for safe lesson wording and answer handling.
5. Add printable worksheet planning page without payments or downloads requiring accounts.
6. Add simple FAQ content to support SEO and parent trust.
7. Keep MathEasy30 aligned with the shared education growth plan in `marketing-system`.
