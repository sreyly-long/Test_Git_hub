---
name: 08-harness
description: Standard-harness validation remediation assistant. ① Remediation guide (primary use) — takes 07 validation results, then scores, builds a prioritized remediation action plan, applies it interactively, and re-validates. ② Progress guidance (secondary) — checks step 01~06 entry conditions and gates from the state file and advises the next action.
when_to_use: When you want remediation guidance right after 07 standard validation (primary use), or when you want guidance on what to do next in an in-progress project.
phase: 0,1,2,3,4
lead_agent: team-leader
support_agents:
  - code-reviewer
  - docs-writer
outputs:
  - docs/.harness-state.yaml (new-project mode)
  - reviews/standard-validation-{YYYYMMDD}.md (audit mode, via /07)
---

# Harness Assistant — Validation Remediation Guide (follow-up to 07)

> **Position**: The final auxiliary skill in the development flow. Order: **01~06 development → 07 standard validation → 08 remediation guide**.
> **Purpose**: Take the 07 validation results and **guide remediation items by priority** (primary), and advise the next action for an in-progress project (secondary).
> **Principle**: **Reuse existing assets (01~07 skills, agents, templates) without modification**. This skill handles dispatching + state management only.
> **Design doc**: `docs/specs/2026-06-12-harness-assistant-design.md`

---

## 0. Responsible Agents

| Role | Agent | Responsibility |
|------|----------|------|
| Lead | `team-leader` | Mode branching, state-file management, entry verdicts, consolidated action-plan reporting |
| Support | `code-reviewer` | In audit mode, review /07 results and check the quality of applied remediations |
| Support | `docs-writer` | Document the action plan and progress guidance, tidy state-file records |

> The Lead agent consolidates the results of both modes into a single report. Gate approval is human-only (§4.8 CQ3).

---

## 1. Mode Selection

If no argument is given, ask the user once (CQ1 — required input for flow branching):

> ① **Standards-compliance audit** — score the current directory's standards compliance and guide remediation
> ② **New project progression** — step-by-step guidance through 01~06 (with state tracking)

Argument support: `/08-harness audit` → ①, `/08-harness new` → ②.
If the mode determination is ambiguous, reuse the Package/Project detection rules from 07 §1.

---

## 2. [A] Audit Mode

```
[A-1] Run /07-validate-standard (read-only — preserves the 07 principle)
   ▼
[A-2] Parse the latest reviews/standard-validation-*.md
   │    On parse failure → present the raw report + degrade to manual guidance (do not block progress)
   ▼
[A-3] Generate the remediation action plan — table format below
   ▼
[A-4] Apply items interactively (one at a time: apply/skip/backlog — CQ3)
   │    Modify only approved items, present a change summary per item
   │    ⚠ Never modify the /07 skill itself (read-only principle)
   ▼
[A-5] Re-run /07 → report a before/after score comparison
   ▼
[A-6] (If a state file exists) update last_audit
```

### Action Plan Table Format

| Priority | ID | Severity | What | Where (file:line) | Why (rationale/regulation) | Recommended action | Effort |
|------|----|--------|------|----------------|---------------|-----------|--------|

### Prioritization Rules

1. **FAIL (gate-blocking) → WARN (pre-gate recommendation) → LOW (backlog)**
2. Within the same level: **security > traceability > documentation**

---

## 3. [B] New Project Mode

```
[B-1] Read docs/.harness-state.yaml
   │    If absent → walk through the Setup §0 checks (package copy, git init, L1 hook), then
   │             propose creating it from templates/implementation/HARNESS-STATE.template.yaml
   ▼
[B-2] Cross-check the state file against actual deliverables (files are the source of truth)
   │    On mismatch → propose corrections based on the actual files (modify after user confirmation)
   ▼
[B-3] Decide the next action using the entry-verdict table (§3.1)
   │    Satisfied → "Next: /0X entry possible — proceed?"
   │    Gate not approved → "Blocked: awaiting GX approval" + explain how to record it (never force ahead)
   ▼
[B-4] On user approval, enter the corresponding /0X skill (existing skill as-is)
   ▼
[B-5] On step completion, update the state file (steps.0X = done, outputs_verified, at)
```

### 3.1 Entry Verdict Table

| Next step | Required conditions (deliverables + gates) |
|-----------|------------------------------|
| 01 | (None — completing Setup §0 recommended) |
| 02 | `docs/planning/PROJECT-PROPOSAL.md` exists |
| 03 | `docs/requirements/REQUIREMENTS-SPEC.md` + **G1 approved** |
| 04 | `docs/design/DEV-PLAN.md`, `TEST-PLAN.md`, `adr/ADR-001-tech-stack.md`, `threat-model.md` + **G2 approved** |
| 05 | Sprint completed (`docs/sprints/SPRINT-N-LOG.md` exists) |
| 06 | **G3 approved** |

### 3.2 Gate Rules (mandatory)

- Gate `approved` + `approver` are **recorded directly by a human** — this skill only explains how to record them. The AI must never approve on its own (§4.8 CQ3, no gate bypass).
- Immediately before entering G1/G2/G3, automatically recommend running `/07` (consistent with 07's when_to_use).

---

## 4. Error and Edge-Case Handling

| Situation | Handling |
|------|------|
| State file missing | Propose creating it per [B-1] |
| State file corrupted/inconsistent | Propose reconstruction based on actual deliverables (after user confirmation) |
| /07 report parse failure | Present the raw report + degrade to manual guidance |
| `harness_version` ≠ package version | Recommend running audit mode (drift) |
| Package/Project mode ambiguous | Reuse the 07 §1 detection rules, record the reasoning in the report |

## 5. Definition of Done (DoD)

- [ ] (Audit) Action plan presented + approved items applied + before/after score report
- [ ] (Audit) /07 skill and report originals unmodified (applying changes is a separate write step)
- [ ] (New) Exactly one next action clearly presented (entry possible / blocking reason + how to resolve)
- [ ] (New) Gate approvals not recorded by the AI — guidance only
- [ ] State-file updates verified consistent with actual deliverables

## 6. Question Criteria

User questions in this skill follow the §4.8 criteria: mode selection and step-entry approval = **CQ1**; whether to apply remediations and gate progression = **CQ3**. Do not generate questions with no defect signal.
