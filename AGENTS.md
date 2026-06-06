# AGENTS.md

## Work mode

Operate as a simple website production assistant for MathEasy30.

The site is plain HTML, CSS, and JavaScript. Keep it fast, mobile-first, learner-safe, and easy for Gerry to manage.

## Current production standard

MathEasy30 is positioned as:

```text
100% free calm math practice.
```

The public homepage funnel is:

1. Start Math Practice
2. Print Worksheets
3. Word Problems
4. Parent / Tutor Guide
5. Reading + Math Plan

Do not bring back a giant top navigation menu.

Do not bring back confusing pricing language.

`pricing.html` is a legacy URL that now serves as a Free Access page. Do not add it back to the sitemap unless Gerry changes the product direction.

## File work rule

Use safe repository edits only when a reliable write path is available.

Do not use ChatGPT GitHub connector writes unless Gerry explicitly authorizes one specific write action in the current chat.

Preferred write paths:

- Codex with a working non-connector write path
- GitHub website editor
- github.dev
- GitHub Desktop
- local Git after it is correctly installed

Read-only checks through connectors are allowed.

## Safe work allowed

- HTML page replacements
- CSS fixes
- JavaScript fixes
- sitemap updates
- robots checks
- title/meta/canonical improvements
- mobile layout improvements
- accessibility improvements
- parent/tutor guide improvements
- worksheet page improvements
- README and instruction cleanup
- status and checkpoint cleanup
- safe app behavior improvements

## Stop points

Pause for:

- blocked writes
- unclear repository state
- private keys or credentials
- payment setup
- live tracking
- live ads
- affiliate links
- uploads or accounts
- framework migration
- major deletion that cannot be safely reversed

## Do not add without direct approval

- React
- Vite
- Next.js
- TypeScript
- build tools
- public AI tools
- social automation
- scraping
- payments
- live ads
- tracking scripts
- affiliate links
- user accounts
- upload systems

## Mobile and tutor rule

The Parent / Tutor Guide must be visible and easy to tap on phones.

Important pages should link to:

```text
parent-guide.html
```

Use the label:

```text
Parent / Tutor Guide
```

## SEO rule

Every important public page should have:

- one clear title
- useful meta description
- canonical URL
- mobile viewport
- one clear H1
- simple language
- internal links to app, worksheets, word problems, parent/tutor guide, and Reading + Math plan

## Bubbles rule

Bubbles should stay calm and controlled. Bubbles should help learners slow down, use hints, try one step, and keep practicing without shame.

Do not turn Bubbles into an open-ended chatbot until safety and content controls are ready.

## Reporting rule

After useful commits, report changed files and commit SHAs.

Do not restart audit loops unless the repo state is unclear.
