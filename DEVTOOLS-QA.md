# MathEasy30 DevTools QA

Last updated: 2026-06-05

Use the shared Chrome DevTools workflow in:

`Wholelychit/marketing-system/chrome-devtools-agent/CHROME-DEVTOOLS-QA-WORKFLOW.md`

## Repo rule

Keep MathEasy30 as plain HTML/CSS/JS.

Do not add React, Vite, Next.js, TypeScript, build tools, tracking scripts, live ads, payment tools, public AI chat tools, accounts, uploads, API keys, or private credentials.

## Current homepage refresh

The homepage file was replaced as a complete file on 2026-06-05.

Expected homepage message:

```text
100% Free Math Practice • 30 Minutes a Day
```

Expected main headline:

```text
Free Math Practice That Slows Down and Builds Confidence
```

Expected primary button:

```text
Start Free Math Practice
```

Commit recorded in marketing system:

```text
e020e4268b3e31e7e18242d877e35e49429a45cc
```

## Required live checks

| Page | URL | Required checks | Status |
|---|---|---|---|
| Homepage | `https://matheasy30.com/` | new hero text, start buttons, nav, footer, campaign links, Bubbles section, mobile layout | Needs browser check |
| Lesson app | `https://matheasy30.com/app.html` | answer controls, check answers, clear/reset, prev/next, lesson navigation | Untested |
| Campaign page | `https://matheasy30.com/free-reading-and-math-practice.html` | ReadEasy30/MathEasy30 links, CTA clarity, mobile layout | Untested |
| Math worksheets | `https://matheasy30.com/printable-math-worksheets.html` | printable links, readability, mobile spacing | Untested |

## Chrome homepage verification steps

1. Open `https://matheasy30.com/` in Chrome.
2. Press `Ctrl + F5` to hard refresh.
3. Confirm the hero eyebrow says `100% Free Math Practice • 30 Minutes a Day`.
4. Confirm the headline says `Free Math Practice That Slows Down and Builds Confidence`.
5. Confirm the primary button says `Start Free Math Practice`.
6. Click `Start Free Math Practice` and confirm it opens `/app.html`.
7. Go back home.
8. Click `Reading + Math Plan` and confirm it opens `/free-reading-and-math-practice.html`.
9. Click `Print Worksheets` and confirm it opens `/printable-math-worksheets.html`.
10. Click `See 240-Day Path` and confirm it opens `/240-day-math-path.html`.
11. Click `Meet Bubbles` and confirm it jumps to the Bubbles section.
12. Click `Sister Site: ReadEasy30` and confirm it opens `https://readeasy30.com/`.
13. Resize browser to phone width or use DevTools mobile view.
14. Confirm buttons wrap cleanly and text is readable.

## Button checklist

| Button / control | Expected result | Status |
|---|---|---|
| Start Free Math Practice | Opens lesson app | Needs browser check |
| Reading + Math Plan | Opens campaign page | Needs browser check |
| Print Worksheets | Opens worksheet hub | Needs browser check |
| See 240-Day Path | Opens math path page | Needs browser check |
| Meet Bubbles | Jumps to Bubbles section | Needs browser check |
| Sister Site: ReadEasy30 | Opens ReadEasy30 safely | Needs browser check |
| Check Answers | Shows learner feedback clearly | Untested |
| Clear Answers | Clears answer inputs | Untested |
| Previous Lesson | Goes back one lesson safely | Untested |
| Next Lesson | Goes forward one lesson safely | Untested |
| Reset Progress | Resets local progress only after clear action | Untested |
| Lesson selector | Jumps to selected lesson and stays synced | Untested |
| Back to Home | Returns to homepage | Untested |

## DevTools findings table

| Date | Page | Issue | Severity | Fix file | Status |
|---|---|---|---|---|---|
| 2026-06-04 | Shared workflow added | Chrome DevTools QA file added | Low | `DEVTOOLS-QA.md` | Ready |
| 2026-06-05 | Homepage | Complete-file homepage refresh committed | Low | `index.html` | Browser check needed |
| 2026-06-05 | Homepage live fetch | ChatGPT environment could not confirm live deployment | Medium | Browser/Cloudflare check | Manual check needed |

## Marketing link checks

| Link | Expected destination | Status |
|---|---|---|
| Main homepage CTA | `/app.html` | Needs browser check |
| Campaign page link | `/free-reading-and-math-practice.html` | Needs browser check |
| Worksheet page link | `/printable-math-worksheets.html` | Needs browser check |
| Math path link | `/240-day-math-path.html` | Needs browser check |
| Bubbles section link | `#bubbles-math` | Needs browser check |
| ReadEasy30 sister link | `https://readeasy30.com/` | Needs browser check |

## Pass / fail rule

Homepage passes only when:

- the new hero text appears on the live site,
- the main buttons open the correct pages,
- the Bubbles section is reachable,
- the homepage is readable on mobile width,
- no console error blocks normal page use.

## Next safe action

Run a Chrome DevTools QA pass and update this file with real findings before changing app logic.
