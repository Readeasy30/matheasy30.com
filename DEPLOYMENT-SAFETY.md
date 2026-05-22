# Deployment Safety Rules

## Primary Rule

The live site must remain usable after every deployment.

## Safe Update Strategy

Preferred updates:

- add pages
- add documentation
- add lessons
- improve navigation
- improve styling carefully

Avoid risky large rewrites during launch phase.

## Before Large Changes

Check:

- homepage
- /app route
- app buttons
- progress system
- mobile view

## Architecture Lock

Use:

- static HTML
- CSS
- vanilla JavaScript
- Cloudflare Pages
- GitHub auto deploy

Do NOT add:

- React
- Vite
- unnecessary frameworks
- unnecessary dependencies

## Routing Rules

Keep support for:

- /app
- /app.html

## Stability Goal

Continuous improvement without breaking the live product.
