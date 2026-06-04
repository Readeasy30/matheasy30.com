# MathEasy30 Stability Lock

Last updated: 2026-06-04

## Purpose

This file protects MathEasy30 from repeated production breakage.

MathEasy30 is a plain static site. Keep it simple, stable, and deployable from GitHub `main` to Cloudflare Pages.

## Locked production paths

The working app page is:

- `app.html`

The app shortcut paths must redirect to the working app page:

- `/app` -> `/app.html`
- `/app/` -> `/app.html`

## Required routing rule

Root `_redirects` must contain exactly these app redirect rules:

```txt
/app /app.html 301
/app/ /app.html 301
```

## Forbidden file

Do not recreate this file:

- `app/index.html`

Reason: this file previously conflicted with the working `app.html` page and caused Cloudflare to serve a broken app version at `/app`.

## App script rule

Do not add app helper scripts to `app.html` unless they are browser-tested after deployment.

The app page should stay stable before extra features are added.

Current safe baseline:

- `app.html`
- `app.js`
- existing support pages and worksheets

## Framework lock

Do not convert this repo to:

- React
- Vite
- Next.js
- TypeScript
- Tailwind
- Any build system

Cloudflare should publish the repo root as a static site.

## Do not add without approval

- API keys
- private keys
- tracking scripts
- live ads
- payment systems
- affiliate links
- user accounts
- upload systems
- public AI tools

## Required manual checks after deploy

Open these in a browser after important changes:

1. `https://matheasy30.com/`
2. `https://matheasy30.com/app`
3. `https://matheasy30.com/app.html`
4. `https://matheasy30.com/printable-math-worksheets.html`
5. `https://matheasy30.com/fractions-practice-worksheet.html`

Pass condition:

- `/app` redirects once to `/app.html`.
- `/app.html` opens the working app.
- No redirect loop.
- No `Loading question...` stuck state.
- Homepage and worksheet pages still open.

## Agent rule

If a future assistant, Codex task, or automation wants to change app routing, it must read this file first and preserve the locked rules above.
