# Process Stabilization Rule

Last updated: 2026-06-04

## Core rule

Every process must end with stabilization before the next process begins.

A process includes any bug fix, feature update, content update, deployment repair, routing change, file cleanup, documentation update, or repository workflow change.

## Required closeout steps

After each process:

1. Confirm the intended working path is still clear.
2. Confirm changed files are committed to the repository, not only applied through a temporary deployment.
3. Remove, rename, or document conflicting old files.
4. Confirm the change did not recreate a known broken path or duplicate file.
5. Check the relevant `QA-CHECKLIST.md` or `RELEASE-CHECKLIST.md`.
6. Update `PROJECT-STATUS.md`, `CHANGELOG.md`, or another control file when the change is meaningful.
7. Record what should not be repeated if the process fixed a breakage.
8. Do not start the next feature or process until the current production path is stable.

## If something breaks

Stop new work.

Restore the last known working production path first. Then document the cause, the fix, and the guardrail that prevents the same issue from returning.

## Relationship to lock

Lock means stabilize, protect, document, and verify.

A locked process is not finished until the stabilization steps above are complete.
