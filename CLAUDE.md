# CLAUDE.md

GitHub is the source of truth for this project.

## Start every session

1. Read CLAUDE.md.
2. Read STATUS.md if present.
3. Inspect the real repository file tree.
4. Trust the live repo over memory, chat notes, or old summaries.
5. Report any mismatch before editing.

## Work rules

- Gerry names the task; Claude works from the repo.
- Make the best reasonable assumption and continue.
- Avoid repeated questions.
- Keep replies short and useful.
- Prefer full-file replacements for larger changes.
- Do not redesign unless Gerry asks.
- Use plain HTML, CSS, and JavaScript unless Gerry clearly approves something else.
- For MathEasy30, avoid React, Vite, Node build systems, npm build tools, and complicated routing unless Gerry clearly approves.

## Website rules

- Use simple language.
- Aim for grade 7 to 9 reading level.
- Build mobile-first pages.
- Keep pages fast.
- Use clear buttons.
- Include basic SEO.
- Avoid fake claims.
- Check for broken links.

## Commit report

After changes, report:

1. Repo worked on
2. Files changed
3. Commit made
4. What to check next
5. Any blocker

---

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
