# QA Checklist

Last updated: 2026-06-04

Use this checklist before calling MathEasy30 stable.

## Required live checks

Open each URL in a browser:

1. `https://matheasy30.com/`
2. `https://matheasy30.com/app`
3. `https://matheasy30.com/app.html`
4. `https://matheasy30.com/printable-math-worksheets.html`
5. `https://matheasy30.com/fractions-practice-worksheet.html`
6. `https://matheasy30.com/sitemap.xml`
7. `https://matheasy30.com/robots.txt`

## Pass conditions

- Homepage opens without a 404 or redirect loop.
- `/app` redirects once to `/app.html`.
- `/app.html` opens the working app.
- App does not stay stuck on `Loading question...`.
- Jump to Day control appears.
- Math Check button appears.
- Check Answer, Hint, Clear, and Next buttons appear.
- Worksheet hub opens.
- Fractions worksheet opens.
- Sitemap opens.
- Robots file opens.

## App routing rules

- `app/index.html` must not exist.
- `_redirects` must include `/app /app.html 301`.
- `_redirects` must include `/app/ /app.html 301`.
- `app.html` must not load experimental helper scripts unless browser-tested after deployment.

## Browser refresh

If a page was recently fixed, test with:

- `Ctrl + F5` on Windows
- A private/incognito browser window
- Site cookies cleared only if redirect errors continue

## Record results

After testing, update `PROJECT-STATUS.md` or `CHANGELOG.md` with the date tested, pages tested, pass/fail result, and remaining issues.
