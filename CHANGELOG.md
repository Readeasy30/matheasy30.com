# CHANGELOG.md

## 2026-06-06 — Day One clean rebuild

### Replaced

- Replaced `index.html` with a cleaner SEO homepage funnel.
- Replaced `app.html` with a clean public math app page and removed old public emergency wording.
- Replaced `parent-guide.html` with a phone-friendly Parent / Tutor Guide.
- Replaced `pricing.html` with a Free Access page for legacy links.
- Replaced `sitemap.xml` with a cleaner crawl priority map.
- Replaced `README.md` with the Day One production standard.
- Replaced `AGENTS.md` with clean working rules.
- Replaced `AGENT-INSTRUCTIONS.md` with clean AI-agent rules.
- Replaced `PROJECT-STATUS.md` with the current Day One state.
- Replaced `LOCKED-CHECKPOINT.md` with the current Day One lock.
- Replaced `CODEX-WORKFLOW.md` with the current non-connector write-path rules.

### Current public funnel

The homepage should guide visitors in this order:

1. Start Math Practice
2. Print Worksheets
3. Word Problems
4. Parent / Tutor Guide
5. Reading + Math Plan

### Current public message

```text
MathEasy30 is 100% free calm math practice.
```

### Free access rule

`pricing.html` is now a legacy Free Access page so old links do not break.

Do not add `pricing.html` back to the sitemap unless Gerry changes the product direction.

Do not bring confusing pricing language back into the main visitor path.

### Current safety lock

No live ads, tracking scripts, payment setup, affiliate links, accounts, uploads, scraping, public AI tools, credentials, private keys, or framework migration were added.

### Current write-path lock

Do not use ChatGPT GitHub connector writes unless Gerry explicitly authorizes one specific write action in the current chat.

Preferred edit paths:

1. Codex with a working non-connector write path
2. GitHub website editor
3. github.dev
4. GitHub Desktop
5. local Git after it is correctly installed

Read-only connector checks are allowed.

### QA still required

Manual/live phone and desktop QA is still required:

- homepage opens
- app opens
- math question appears
- hint button works
- read problem works where supported
- worksheets open
- word problems open
- Parent / Tutor Guide opens
- Reading + Math Plan opens
- sitemap opens

## 2026-06-04 — Prior production fixes

### Added

- Added `fractions-practice-worksheet.html` as a free printable fractions practice page.
- Added root `_redirects` rules so `/app` and `/app/` redirect permanently to `/app.html`.

### Changed

- Updated `printable-math-worksheets.html` to link the fractions worksheet.
- Updated `sitemap.xml` to include `https://matheasy30.com/fractions-practice-worksheet.html`.

### Removed

- Removed conflicting `app/index.html`, which had caused Cloudflare to serve a different app version at `/app`.
- Removed the temporary `math-answer-helper.js` script load from production `app.html`.

### Notes

- No framework conversion, live ads, tracking, payments, affiliate links, accounts, API keys, upload systems, public AI tools, or major unsafe deletion were added.

## 2026-05-29 — Workflow setup

### Added

- Added `CODEX-CURRENT-TASK.md` to define the safe work queue.

### Changed

- Added repo-local workflow files and safe next queue.

### Notes

- Cloudflare remains publisher only and should publish from GitHub.
