# Release Checklist

Last updated: 2026-06-04

Use this before pushing or accepting a production change for MathEasy30.

## Before changing files

- Read `STABILITY-DIRECTIVE.md`.
- Read `STABILITY-LOCK.md`.
- Read `PROJECT-STATUS.md`.
- Confirm the task fixes a real problem or advances the current safe queue.
- Confirm the work does not recreate a previously removed broken file.

## Protected files and rules

- Do not recreate `app/index.html`.
- Keep `app.html` as the working app page.
- Keep `app.js` as the main app logic.
- Keep `_redirects` with:
  - `/app /app.html 301`
  - `/app/ /app.html 301`
- Do not add app helper scripts to `app.html` without direct approval and browser testing.

## Before commit

- Confirm `app.html` exists.
- Confirm `app.js` exists.
- Confirm `_redirects` exists.
- Confirm `app/index.html` does not exist.
- Confirm changed links point to real files.
- Confirm no framework migration was added.
- Confirm no live ads, tracking, payments, accounts, uploads, affiliate links, or public AI were added without approval.

## After Cloudflare deploy

Test:

1. `https://matheasy30.com/`
2. `https://matheasy30.com/app`
3. `https://matheasy30.com/app.html`
4. `https://matheasy30.com/printable-math-worksheets.html`
5. `https://matheasy30.com/fractions-practice-worksheet.html`

## Release pass condition

The release is acceptable only when:

- App route does not loop.
- `/app` reaches `/app.html`.
- `/app.html` loads the app.
- Core public pages open.
- The fix is recorded in `CHANGELOG.md` or `PROJECT-STATUS.md`.

## If something breaks

Stop new feature work.

Restore the last working production path first, then document the cause and the permanent fix.
