# CHANGELOG.md

## 2026-06-04

### Added

- Added `fractions-practice-worksheet.html` as a free printable fractions practice page.
- Added calm worksheet sections for equal parts, halves, fourths, simple fraction choices, explanation practice, and helper answer key.
- Added root `_redirects` rules so `/app` and `/app/` redirect permanently to `/app.html`.

### Changed

- Updated `printable-math-worksheets.html` to link the new fractions worksheet from the hero, worksheet library, fractions starter section, helpful pages, and footer.
- Updated `sitemap.xml` to include `https://matheasy30.com/fractions-practice-worksheet.html`.
- Emergency-stabilized `app.html` so the working app page stays separate from the old `/app/` path.

### Removed

- Removed conflicting `app/index.html`, which had caused Cloudflare to serve a broken app version at `/app` and could reintroduce the redirect/app conflict on future GitHub deployments.
- Removed the temporary `math-answer-helper.js` script load from `app.html` after it was suspected of contributing to app instability. The helper file may remain unused, but it is not loaded by the production app page.

### Notes

- Continued from the locked production checkpoint.
- Made the Cloudflare direct-upload app fix permanent in GitHub `main`.
- No framework conversion, live ads, tracking, payments, affiliate links, accounts, API keys, upload systems, public AI tools, or major code deletion were added.

## 2026-05-29

### Added

- Added `CODEX-CURRENT-TASK.md` to define the current safe work queue.

### Changed

- Standardized `AGENTS.md` with the no-local-Git workflow.
- Standardized `CODEX-WORKFLOW.md` with the ChatGPT 5.5 + Codex + GitHub + Cloudflare production workflow.
- Updated `PROJECT-STATUS.md` to include the current repo-local workflow files and safe next queue.

### Notes

- Cloudflare remains publisher only and should publish from GitHub.
- No private keys, API keys, live ads, live tracking, payment setup, affiliate links, accounts, upload systems, public AI tools, framework rebuilds, or major code deletion were added.
