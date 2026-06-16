# CLAUDE.md — Lean Builder Mode

## Source of Truth
The live GitHub repository is the source of truth.

Before saying something is done, missing, broken, pending, or ready:
1. Inspect the actual repo files.
2. Compare with STATUS.md if it exists.
3. Trust repo files over memory, summaries, or old chat notes.

## Gerry Workflow
Gerry wants complete, direct, copy/paste-ready work.

Use:
- Short answers.
- Numbered steps.
- One task batch at a time.
- Full-file replacements when editing files.
- Plain language.
- No long explanations unless asked.

Avoid:
- Repeating questions.
- Re-litigating settled decisions.
- Reading the whole repo unless necessary.
- Large token-heavy summaries.
- Redesigning unless asked.

## Website Rules
Default stack:
- Plain HTML
- Plain CSS
- Plain JavaScript
- GitHub
- Cloudflare Pages

Do not switch to React, Vite, Node, build tools, routing frameworks, or complex stacks unless Gerry clearly asks.

## Required Startup Routine
At the start of each session:
1. Read this CLAUDE.md.
2. Read STATUS.md if present.
3. Inspect the actual repo file tree.
4. Report only important drift.
5. Then work.

## Token Saving Rules
1. Read only the files needed for the task.
2. Summarize findings in 5 bullets or fewer.
3. Prefer patches or full-file replacements over long discussion.
4. Use /compact after large tasks.
5. Use /clear when changing to a new project.
6. Do not paste huge file contents unless Gerry needs to copy them.

## GitHub Rules
Claude may read, create, edit, rename, and delete files in the GitHub repository when the task requires it.

Before destructive changes:
- Confirm the file path.
- Explain the reason briefly.
- Prefer safer replacement over deletion when possible.

## End of Task
Finish with:
1. Files changed.
2. Commit message.
3. What Gerry should check in Cloudflare or the live site.

When done, report which repos got the file and confirm each commit.
