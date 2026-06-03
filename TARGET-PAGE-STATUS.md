# MathEasy30 Target Page Status

Use this file to track which public target pages and curriculum build pages are complete.

## Completed target pages

| Page | File | Status |
|---|---|---|
| Home page | `index.html` | Complete with public 240-day links |
| Current math app | `app.html` | Complete and working with full live 240-day integration and Bubbles preset question buttons |
| 240-day math path | `240-day-math-path.html` | Complete |
| Days 1-240 public curriculum | `days-1-240-curriculum.html` | Complete |
| Internal 240-day lesson test page | `lesson-test-240.html` | Complete, noindex |
| 240-day preview app | `app-240.html` | Complete, noindex |
| Addition practice | `addition-practice.html` | Complete |
| Math facts practice | `math-facts-practice.html` | Complete |
| Printable math worksheets | `printable-math-worksheets.html` | Complete |
| Calm math practice | `calm-math-practice.html` | Complete |
| Word problem practice | `word-problem-practice.html` | Complete |
| Parent guide | `parent-guide.html` | Complete |
| Reading practice too | `reading-practice-too.html` | Complete |
| FAQ | `faq.html` | Complete |
| Pricing | `pricing.html` | Complete |
| About | `about.html` | Complete |
| Contact | `contact.html` | Complete |
| Privacy | `privacy.html` | Complete |
| Terms | `terms.html` | Complete |
| Sitemap | `sitemap.xml` | Complete and includes 240-day pages |
| Robots | `robots.txt` | Verified complete |

## Completed source/data files

| File | Status |
|---|---|
| `DAYS-1-240-CURRICULUM.md` | Complete |
| `DAYS-31-240-CURRICULUM.md` | Complete |
| `curriculum-240.js` | Complete |
| `level-b-lessons.js` | Complete: Days 31-60 |
| `level-c-lessons.js` | Complete: Days 61-90 |
| `level-d-lessons.js` | Complete: Days 91-120 |
| `level-e-lessons.js` | Complete: Days 121-150 |
| `level-f-lessons.js` | Complete: Days 151-180 |
| `level-g-lessons.js` | Complete: Days 181-210 |
| `level-h-lessons.js` | Complete: Days 211-240 |
| `lesson-loader-240.js` | Complete: combines staged Levels B-H |
| `lesson-test-240.js` | Complete: verifies staged lesson loader |
| `app-240.js` | Complete: preview app script |
| `math-live-240-integration.js` | Complete: expands live app to Days 1-240 |
| `bubbles-question-buttons.js` | Complete: local preset question buttons and voice readback |
| `math-240-path-helper.js` | Complete |
| `math-next-path.js` | Complete |
| `math-live-240-bridge.js` | Complete: safe live-app bridge layer |
| `math-voice-picker.js` | Complete |
| `240-DAY-UPDATE-BUNDLE.md` | Complete |

## Still needed

| Target | Status | Notes |
|---|---|---|
| Sister voice clip support | Pending | Add later if permission and audio files are provided |

## Current build rule

The working app engine is preserved. The live app now loads staged Level B-H data through a safe integration layer instead of deleting the original 30-day code.

## Current 240-day lesson status

- Days 31-240 interactive lesson data is complete and live-integrated.
- Levels B-H are loaded into the live app through `math-live-240-integration.js`.
- `app.html` now presents the path as a full 240-day math app.
- `lesson-test-240.html` and `app-240.html` remain available as noindex testing/preview pages.
- The public homepage links to the 240-day path and Days 1-240 curriculum.
- The current live app engine has full 240-day integration and local Bubbles preset question buttons.
