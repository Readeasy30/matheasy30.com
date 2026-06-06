# MathEasy30 Project Status

Last updated: 2026-06-06

Repository: `Wholelychit/matheasy30.com`

## Current status

MathEasy30 is in the Day One clean production state.

The public-facing site has been cleaned around one simple visitor path:

1. Start Math Practice
2. Print Worksheets
3. Word Problems
4. Parent / Tutor Guide
5. Reading + Math Plan

The site remains plain HTML, CSS, and JavaScript. No framework migration was made.

## Current product message

MathEasy30 is 100% free calm math practice.

The site should feel respectful for learners, adult learners, ESL learners, parents, tutors, homeschool helpers, and community programs.

Public copy should stay simple:

```text
Start small. Try one step. Practice a little each day.
```

## Current core files

- `index.html` — replaced with clean SEO homepage funnel
- `app.html` — replaced with clean math app page
- `app.js` — math app logic and progress behavior
- `parent-guide.html` — replaced with mobile-friendly parent/tutor guide
- `printable-math-worksheets.html` — worksheet hub
- `word-problem-practice.html` — word problem practice page
- `math-facts-practice.html` — math facts practice page
- `free-reading-and-math-practice.html` — shared reading + math plan
- `pricing.html` — legacy URL replaced as Free Access page
- `sitemap.xml` — replaced with clean crawl priority map
- `robots.txt` — clean and points to sitemap
- `README.md` — replaced with Day One production standard
- `AGENTS.md` — replaced with clean write-path and SEO rules
- `AGENT-INSTRUCTIONS.md` — replaced with clean Day One agent rules

## Free access status

MathEasy30 is currently free.

Do not add confusing pricing language to homepage, top navigation, footer, sitemap, or parent/tutor path.

`pricing.html` remains only as a legacy Free Access page so old links do not break.

`pricing.html` is not in the sitemap.

## SEO status

Current SEO cleanup completed:

- homepage replaced with cleaner funnel
- app page replaced with clean launch version
- parent/tutor guide replaced with mobile-friendly helper content
- sitemap replaced with priority structure
- robots file verified clean
- pricing page replaced as Free Access
- README replaced with clean SEO and product standards
- AGENTS and AGENT-INSTRUCTIONS replaced to prevent connector-write confusion

Primary crawl/visitor pages:

- `/`
- `/app.html`
- `/parent-guide.html`
- `/printable-math-worksheets.html`
- `/word-problem-practice.html`
- `/free-reading-and-math-practice.html`
- `/math-facts-practice.html`
- `/addition-practice.html`
- `/fractions-practice-worksheet.html`

## Mobile and tutor status

Parent/tutor access is intentionally visible on the homepage, app page, and footer.

Important tutor path:

```text
parent-guide.html
```

Use the label:

```text
Parent / Tutor Guide
```

The parent/tutor guide was replaced as a phone-friendly helper page with simple steps, tutor phrases, worksheet guidance, and clear action buttons.

## App status

The math app page has been cleaned from the old public emergency wording.

The app keeps the core learner flow:

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

## Marketing connection

MathEasy30 is paired with ReadEasy30.

Shared marketing and campaign planning belongs in:

```text
Wholelychit/marketing-system
```

Website code stays in this repo.

## Safety lock

Do not add without direct approval:

- live ads
- tracking scripts
- payment setup
- affiliate links
- accounts
- uploads
- private keys
- scraping
- social automation
- public AI tools
- framework migrations

## Write-path lock

Do not use ChatGPT GitHub connector writes unless Gerry explicitly authorizes one specific write action in the current chat.

Preferred edit paths:

1. Codex with a working non-connector write path
2. GitHub website editor
3. github.dev
4. GitHub Desktop
5. local Git after it is correctly installed

Read-only connector checks are allowed.

## Current blockers

Manual/live QA is still required because static repo reads cannot fully prove browser behavior.

Needed phone/desktop tests:

1. Homepage loads and buttons are easy to tap.
2. `app.html` opens.
3. Math question appears.
4. Hint button works.
5. Read Problem works where supported.
6. Worksheets open.
7. Word Problems opens.
8. Parent / Tutor Guide opens.
9. Reading + Math Plan opens.
10. Sitemap opens at `/sitemap.xml`.

## Next safe queue

1. Run live phone QA on the homepage, app, parent/tutor guide, worksheet hub, word problems page, and sitemap.
2. Fix only verified live-page issues.
3. Improve worksheet pages and support pages only after the app passes QA.
4. Keep the five-step homepage funnel.
5. Keep Bubbles calm and controlled.
6. Keep `pricing.html` as Free Access only unless product direction changes.
7. Do not reopen marketing-system cleanup unless a new real blocker appears.

## Working rule

Replace broken or stale public files cleanly. Do not stack tiny repairs on broken repairs.

For public pages, prefer complete-file replacement with a clear commit message when the page is stale, cluttered, or inconsistent.
