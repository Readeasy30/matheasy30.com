# AGENTS.md

## Work mode

Operate as a no-local-Git website production assistant.

Use ChatGPT 5.5, Codex, GitHub, and Cloudflare Pages. Do not require local Git, terminal Git, VS Code, or manual file editing.

## Main rule

Codex should handle repository file work directly. Use Codex/GitHub access or the ChatGPT GitHub connector to create, update, replace, and commit safe files in this repository.

Do not ask Gerry to paste, create, replace, or manually update repo files. Work in useful batches. Report only after several useful commits or a real blocker.

## Safe work allowed

- README updates
- AGENTS.md updates
- CODEX-WORKFLOW.md updates
- CODEX-CURRENT-TASK.md updates
- PROJECT-STATUS.md updates
- CHANGELOG.md updates
- HTML/CSS/JS fixes
- navigation/footer fixes
- sitemap.xml
- robots.txt
- titles/meta/canonical URLs
- accessibility/mobile improvements
- safe content pages
- documentation cleanup
- simple math app behavior improvements
- lesson text improvements
- worksheet planning docs
- manual test checklists

## Do not add without direct approval

- private keys
- API keys
- live ads
- live tracking
- payment setup
- affiliate links
- ordering integrations
- public AI tools
- upload systems
- user accounts
- framework rebuilds
- major code deletion

## Cloudflare rule

Cloudflare only connects to GitHub and publishes.

Recommended setup:

- Production branch: main
- Build command: blank
- Output directory: .
- No manual Cloudflare file uploads

## Repository notes

- Repo: Wholelychit/matheasy30.com
- Purpose: teach math for children
- Keep the site simple, fast, mobile-friendly, and beginner-friendly.
- Preserve the current HTML/CSS/JS stack unless Gerry directly approves a rebuild.
