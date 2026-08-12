# GitHub 403 Resolution — Working Procedure

The problem was GitHub App repository access/permissions, not the repository itself.

## Fix
1. Open ChatGPT -> Settings -> Apps / Connectors -> GitHub.
2. Open the GitHub/OpenAI app configuration.
3. Find Repository access. Make sure the target repository is included.
4. Set Repository permissions: Contents -> Read and write.
5. Save the configuration and retry the write operation.

## Verification
- GitHub read: YES
- GitHub write: YES
- Commit & Push: YES

> Important: Do not rebuild the repository or change the project to solve a 403.