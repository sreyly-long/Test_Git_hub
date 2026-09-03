---
name: 07-validate-standard
description: Read-only validation of standards compliance for the standard harness or a project that applies it. Checks skills/agents/templates/security hooks/gates/Team-with-Leader/deliverable evidence with PASS-WARN-FAIL.
when_to_use: Immediately after a harness change, immediately after new-project setup, just before the G1/G2/G3 gates, before a release, or when the PM requests a standards-compliance audit.
phase: 0,1,2,3,4
lead_agent: code-reviewer
support_agents:
  - security-auditor
  - trace-mapper
  - docs-writer
outputs:
  - reviews/standard-validation-{YYYYMMDD}.md
---

# Skill 07 — Standards Compliance Validation (Validate Standard)

> **Purpose**: Verify that the standard harness itself, or a project applying the harness, satisfies the required structure and guardrails.
> **Nature**: An audit skill that runs repeatedly, not a linear development phase.
> **Principle**: Do not use the seed.yaml / bootstrap-based initial generation flow. Judge based on Skill-based deliverables and the actual file state.

---

## 1. Determine the Execution Mode

First determine the mode from the current directory using the following criteria.

| Mode | Detection criteria | Purpose |
|------|----------|------|
| Package mode | `.claude/skills/`, `templates/`, `hooks/`, `scripts/`, `HARNESS-PROCESS-STANDARD.md` exist | Validate the standard harness package itself |
| Project mode | `docs/`, `src/`, or project deliverables exist + some harness assets applied | Validate the state of an actual project application |

If the determination is ambiguous, show both Package mode and Project mode candidates and record in the report which criteria the validation used.

## 2. Validation Scope

### 2.1 Package Inventory

- 8 skills exist: `01-plan-project` ~ `06-finalize-deliverables`, `07-validate-standard`, `08-harness`
- Every skill (01~07, 08-harness) has `lead_agent` and `support_agents` frontmatter matching actual agent files
- The Skill catalog tables in README / PACKAGE-INDEX / PROCESS match each SKILL frontmatter's lead/support
- 13 standard agents exist, each including frontmatter
- Currently shipped assets (templates / example CSVs / active agent docs) match the current standard agent names (`backend-developer`, `frontend-developer`, `qa-engineer`), and no deprecated aliases (`java-porter`, `parity-tester`) remain
- 21 deliverable templates exist
- 3-level security hooks exist: L1 pre-commit, L2 CI, L3 prod gate
- Auxiliary files referenced by hooks / scripts / CI (`hooks/gitleaks.toml`, etc.) actually exist in the package
- Operational scripts exist: `parity-check.sh`, `generate-codecs.sh`
- Skill counts in README / PACKAGE-INDEX / WORKFLOW / PROCESS documents match the actual file tree

### 2.2 Workflow and Gates

- Are the entry conditions, output deliverables, and DoD for Skills 1–6 documented
- The quick-start commands in README / PACKAGE-INDEX / PROCESS / WORKFLOW consistently follow the order: `docs/` creation, then hook installation after `git init`
- Do the G1 analysis, G2 design, and G3 release gates exist
- Are the approver and required deliverables clear for each gate
- Is `07-validate-standard` documented as a validation skill runnable right after setup and just before each gate
- Are the human-question generation criteria (CQ1~CQ3, §4.8) defined, and are the fixed question sets (01: 12 questions, 06: 7 questions) tagged against those criteria

### 2.3 Team-with-Leader Structure

- The `_team-leader` agent owns DAG analysis, dispatch, conflict arbitration, 7-dimension evaluation, and PM reporting
- Each agent's frontmatter has `write_dirs`
- If multiple agents write to the same directory, mark it WARN. However, intentional shared-deliverable directories may be excepted with documented rationale
- TEAM_CHANNEL / DIRECT / LEADER_BROADCAST or equivalent communication/reporting rules exist

### 2.4 Guardrails and Security Hooks

- Does the L1 hook run gitleaks and require an approval-evidence file when bypassed
- Does L2 CI perform gitleaks, dependency scanning, and SAST
- Does the L2 AI audit step not silently pass as a `TODO`
- Does the L3 prod gate require PM + information security + operations approval
- Are defects with CVSS >= 7.0 explicitly stated as a release-blocking condition
- REJECT criteria exist for secrets, plaintext PII logging, weak encryption, authentication bypass, SQL Injection, etc.

### 2.5 Traceability and Deliverables

- Requirements have a REQ-ID scheme
- A `// source:` or `// req:` traceability rule exists
- An ADR-writing obligation and an ADR template exist
- A trace matrix or equivalent requirements-to-code mapping deliverable exists
- Sprint log, review report, security audit, cross-validation, and runbook deliverables exist

### 2.6 Quality and Evaluation

- The 7-dimension evaluation criteria and thresholds are stated
- A remediation loop for scores below 90 exists, with PM escalation after at most 5 rounds
- The 7-dimension weights, the 90-point threshold, and the 5-round limit inherit the §4.6/§4.9 baseline (`[basis:sg-gw-retrospective,adjustable]`), and any per-project adjustment leaves its rationale in an ADR/retrospective
- Skill 5 mitigates self-justification via independent re-evaluation or cross-validation
- Test coverage / static analysis / dependency scanning / parity validation conditions are defined to suit the nature of the project

### 2.7 Drift and Stale Assets

- WARN if stale file counts, skill counts, or paths remaining in documents differ from actual files
- WARN if legacy generation approaches such as `seed.yaml`, bootstrap assumptions, or v2-team usage scripts are mixed into the current Skill-based flow
- FAIL if Skill owner assignments are missing or reference agents that do not exist
- WARN if derived documents such as generated HTML are absent, older than the Markdown source, or inconsistent in content
- However, historical documents such as `reviews/`, `docs/plans/`, `docs/specs/` may describe past states, so a historical mention alone is not treated as FAIL

## 3. Verdict Criteria

### 3.0 Objectivity Tiers of Verdict Evidence

Compliance-verdict evidence consists of 3 tiers of differing objectivity; **blocking decisions (FAIL, CVSS≥7.0) use only tier 1 and 2 evidence**.

| Tier | Evidence | Objectivity | Examples |
|------|------|--------|----|
| 1. Machine verification | File existence, grep, CI tool metrics, gate evidence | **Objective** (reproducible) | Skill/agent/template counts, zero gitleaks findings, ArchUnit/coverage, approver+date |
| 2. External independent verification | Cross-validation by another vendor's LLM + the **official CVSS v3.1 formula** | Semi-objective (scale is a recognized standard) | Cross-validation defect scores |
| 3. AI self-evaluation | 7-dimension scores, etc. | Subjective (§4.9 `[sg-gw retrospective, adjustable]`) | Readability/completeness scoring — **a reference metric, not a standalone blocking basis**. Mitigations: Skill 5 independent re-evaluation (difference>10→PM) and human gates |

| Level | Meaning | Handling |
|------|------|------|
| PASS | Required conditions satisfied | May proceed to the next phase |
| WARN | Operable, but standard drift or manual confirmation needed | Remediation recommended before the gate |
| FAIL | Required guardrail or deliverable missing | Entry to the corresponding gate blocked |

Immediate FAIL conditions:
- A required G1/G2/G3 gate is missing
- Any of L1/L2/L3 security hooks required for the project is missing
- The L2 AI audit is marked successful while still in TODO state
- An unresolved defect with CVSS >= 7.0 exists
- Secret-scan bypass is permitted without approval evidence
- No approval policy for destructive operations such as production/DB/deletion/force-push

## 4. Output Report Format

Write in the form `reviews/standard-validation-{YYYYMMDD}.md`.

```markdown
# Standard Validation Report — {YYYY-MM-DD}

## Summary
| Item | Value |
|------|----|
| Mode | Package / Project |
| Total score | __ / 100 |
| Verdict | PASS / WARN / FAIL |
| Blocking issues | N |
| Warning issues | N |

## Score
| Dimension | Score | Evidence |
|------|------|------|
| Completeness | __ / 20 | |
| Traceability | __ / 15 | |
| Security | __ / 20 | |
| Performance/automation | __ / 10 | |
| Readability/documentation | __ / 15 | |
| Standards compliance | __ / 10 | |
| Testing/validation | __ / 10 | |

## Findings
| Level | ID | Location | Description | Recommended action |
|------|----|------|------|-----------|
| FAIL/WARN | VS-001 | path:line | Description | Action |

## Gate Decision
- G1 entry possible: YES/NO/N-A
- G2 entry possible: YES/NO/N-A
- G3 entry possible: YES/NO/N-A

## Notes
- The seed.yaml / bootstrap approach is excluded from the current standard harness's required flow.
- Record any false positives as exceptions, with supporting rationale.
```

## 5. Execution Principles

- Do not auto-modify code or documents. Separate fixes into distinct work.
- Record finding locations as file path and line number wherever possible.
- In Package mode, examine the self-consistency of the standard package.
- In Project mode, examine the project deliverables and the likelihood of passing the gates.
- If a validation criterion does not fit the nature of the project, downgrade it from FAIL to WARN and leave it as a PM-judgment item.

## 6. Definition of Done (DoD)

- [ ] `reviews/standard-validation-{YYYYMMDD}.md` report written (including Summary / Score / Findings / Gate Decision)
- [ ] Every Finding includes level (FAIL/WARN/NOTE), location (file:line), and recommended action
- [ ] Zero FAILs confirmed, or the gate-blocking reason stated per FAIL
- [ ] WARNs classified as pre-gate remediation recommendations; false positives recorded as exceptions with rationale
- [ ] Verdict (PASS/WARN/FAIL) and gate-entry eligibility (G1/G2/G3 or N/A) stated
- [ ] (Items requiring fixes are separated into distinct remediation work, not this skill — §5 principle)
