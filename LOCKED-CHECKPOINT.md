# MathEasy30 Locked Checkpoint

Date locked: 2026-06-06

Repository: `Wholelychit/matheasy30.com`
Branch: `main`

## Locked Day One state

MathEasy30 is locked as a simple, mobile-first, static math-practice website.

Use only:

- HTML
- CSS
- JavaScript
- GitHub
- Cloudflare
- browser `localStorage` for simple device progress

Do not convert this project to React, Vite, Next.js, TypeScript, a build system, or a server app.

## Locked public funnel

The homepage must guide visitors in this order:

1. Start Math Practice
2. Print Worksheets
3. Word Problems
4. Parent / Tutor Guide
5. Reading + Math Plan

Do not bring back a giant top navigation menu.

Do not bring back confusing pricing language.

## Locked core files

- `index.html` — clean SEO homepage funnel
- `app.html` — clean math app page
- `app.js` — math app logic and progress behavior
- `parent-guide.html` — mobile-friendly parent/tutor guide
- `printable-math-worksheets.html` — worksheet hub
- `word-problem-practice.html` — word problem practice page
- `math-facts-practice.html` — math facts practice page
- `free-reading-and-math-practice.html` — shared reading + math plan
- `pricing.html` — legacy URL replaced as Free Access page
- `sitemap.xml` — crawl priority map
- `robots.txt` — crawler instructions
- `README.md` — production standard
- `AGENTS.md` — direct working rules
- `AGENT-INSTRUCTIONS.md` — full AI working rules
- `PROJECT-STATUS.md` — current state and QA queue

## Locked free access rule

MathEasy30 is currently free.

`pricing.html` is only a legacy Free Access page so old links do not break.

Do not add `pricing.html` back to the sitemap unless Gerry changes the product direction.

Do not add paid/pricing language to the main funnel.

## Locked app standard

The app should stay calm, simple, and phone-friendly.

Current public app flow:

- daily math practice
- math check / starting help
- hints
- answer input
- check answer
- clear
- next question
- confidence message
- parent/helper tip
- worksheet links
- full path links

## Locked SEO standard

Every important public page should have:

- one clear title
- useful meta description
- canonical URL
- mobile viewport
- one clear H1
- readable language
- strong internal links
- visible parent/tutor path
- no fake urgency
- no confusing paid/pricing language
- no cluttered top navigation

## Locked mobile/tutor standard

The Parent / Tutor Guide path must be easy to tap on a phone.

Important pages should link to:

```text
parent-guide.html
```

Use the label:

```text
Parent / Tutor Guide
```

## Bubbles rule

Bubbles stays calm and controlled.

Bubbles should encourage learners to slow down, use hints, make math visible with drawings or objects, try one small step, and keep practicing without shame.

Do not turn Bubbles into an open-ended chatbot until safety and content controls are ready.

## Write-path lock

Do not use ChatGPT GitHub connector writes unless Gerry explicitly authorizes one specific write action in the current chat.

Preferred edit paths:

1. Codex with a working non-connector write path
2. GitHub website editor
3. github.dev
4. GitHub Desktop
5. local Git after it is correctly installed

Read-only connector checks are allowed.

## Safety lock

Do not add without direct approval:

- live ads
- tracking scripts
- payments
- affiliate links
- accounts
- uploads
- private keys
- scraping
- social automation
- public AI tools
- framework migrations

## QA required after this checkpoint

Manual/live QA is required on phone and desktop:

1. Homepage loads.
2. Homepage funnel buttons work.
3. `app.html` opens.
4. Math question appears.
5. Hint button works.
6. Read Problem works where supported.
7. Worksheets open.
8. Word Problems opens.
9. Parent / Tutor Guide opens.
10. Reading + Math Plan opens.
11. Sitemap opens at `/sitemap.xml`.

## Working rule

Replace broken files cleanly. Do not stack tiny repairs on broken repairs.

For public pages, prefer complete-file replacement when the page is stale, cluttered, or inconsistent.
