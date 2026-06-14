# MathEasy30 — Project Context for Claude

## Project Overview
- **Site:** MathEasy30.com — a math education app for students
- **Tech Stack:** Vanilla HTML, CSS, JavaScript (no build step) hosted on Cloudflare Pages
- **Deployment:** Cloudflare Pages, connected to this GitHub repo (main branch auto-deploys)
- **Domain:** matheasy30.com (Cloudflare managed)
- **Cloudflare Worker:** `matheasy30` worker deployed for backend logic

## Project Structure
- `index.html` — homepage
- `app.html` + `app.js` — main math app
- `app-240.html` + `app-240.js` — 240-day curriculum variant
- `404.html` — custom error page
- `level-a-lessons.js` through `level-h-lessons.js` — math lesson content by level
- `student-profiles.js` — student data management
- `curriculum-240.js` — 240-day curriculum logic
- `bubbles-math.js`, `bubbles-question-buttons.js` — Bubbles AI assistant UI
- `math-voice.js`, `math-voice-picker.js` — voice input/output for math problems
- `math-answer-helper.js` — answer validation helpers
- `images/` — image assets
- `css/` — stylesheets
- `_headers` — Cloudflare Pages security and cache headers
- `_redirects` — Cloudflare Pages URL redirects (`/app` → `app.html`)
- `sitemap.xml`, `robots.txt` — SEO files
- `DEPLOY-TRIGGER.txt` — bump this file to force a Cloudflare Pages redeploy

## Commands
- No build step — deploy by pushing to main
- To force redeploy: update `DEPLOY-TRIGGER.txt` with a timestamp

## Git Workflow
- `main` branch auto-deploys to Cloudflare Pages
- Feature branches: `feature/branch-name`
- Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`

## Important Rules
- No frameworks — pure HTML/CSS/JS only
- No npm packages at runtime
- Keep lesson files modular per level (level-a through level-h)
- Voice features (`math-voice.js`) require HTTPS — always test on the live domain
- Test on mobile before deploying any math input changes
