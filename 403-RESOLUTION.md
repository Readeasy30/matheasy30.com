# GitHub 403 Resolution — Working Procedure

The problem was GitHub App repository access/permissions, not the repository itself.

## Fix
1. Open ChatGPT → Settings → Apps / Connectors → GitHub.
2. Open the GitHub/OpenAI app configuration.
3. Find **Repository access**.
4. Make sure the exact repository being worked on is included.
5. Check Repository permissions. Set:
   - **Contents** → **Read and write**
6. Save the GitHub App configuration.
7. Return to ChatGPT and retry the GitHub write/commit operation.

## Verify the Repair
A successful GitHub write should return HTTP 200, not HTTP 403.
- GitHub read ✅
- GitHub write ✅
- Create/update files ✅
- Commit ✅
- Push ✅
- Read resulting commit ✅

> **Important:** Do not rebuild the repository or change the project to solve a 403.

*Historical note: Confirmed while repairing the Readeasy30 OmniRoute/TopShelfWebsites multi-agent development environment in August 2026.*
