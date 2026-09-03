---
name: 03-draft-dev-plan
description: Based on the refined requirements, write the development plan, test plan, architecture draft, and ADR-001. Compare 2+ technology stack candidates and record the selection rationale as an ADR.
when_to_use: After Skill 2 is complete (REQUIREMENTS-SPEC.md approval completed). Before entering the design gate.
phase: 2
lead_agent: architect
support_agents:
  - data-model-designer
  - qa-engineer
  - security-auditor
  - trace-mapper
outputs:
  - docs/design/DEV-PLAN.md
  - docs/design/TEST-PLAN.md
  - docs/design/architecture-overview.md
  - docs/design/threat-model.md
  - docs/design/adr/ADR-001-tech-stack.md
  - docs/design/risk-register.md
---

# Skill 03 — Development Plan + Test Plan Writing

> **Purpose**: Decompose requirements into Epics / Sprints / Tasks + decide the technology stack + establish the test strategy.
> **Duration**: 1-3 days
> **Prerequisite**: Skill 2 (REQUIREMENTS-SPEC.md approval)
> **Next**: Skill 4 (implementation)

---

## 0. Responsible Agents

| Role | Agent | Responsibility |
|------|----------|------|
| Lead | `architect` | Compare technology stack candidates, architecture draft, ADR-001, Sprint DAG consolidation |
| Support | `data-model-designer` | Design the domain model / entities / DTOs / legacy type mapping |
| Support | `qa-engineer` | Write the TEST-PLAN, coverage targets, and E2E/Parity/load test strategy |
| Support | `security-auditor` | Review security ADR candidates, key management, PII, and external channel authentication requirements |
| Support | `trace-mapper` | Verify that requirements trace to Sprint tasks / tests / ADRs |

> The Lead agent records design-change decisions as ADRs and integrates Support review results into the DEV-PLAN / TEST-PLAN.

## 1. Procedure

```
[A] Decompose requirements → Epic → Sprint → Task DAG
        │
        ▼
[B] Compare technology stack candidates (≥ 2 options)
        │   - Language / framework / DB / messaging / CI-CD
        │   - Comparison table + selection rationale → auto-generate ADR-001
        ▼
[C] Architecture draft (Mermaid diagrams)
        │   - Components / dependencies / external channels / data flows
        ▼
[C-2] Threat modeling (STRIDE + attack surface) → link mitigations to security ADRs
        ▼
[D] Establish the test strategy
        │   - Unit / integration / E2E / Parity (for migrations)
        │   - Coverage targets / 7-dimension evaluation thresholds
        ▼
[E] Staffing, schedule, and risk (Sprint plan + Risk Register ≥ 10 entries)
        │
        ▼
[F] PM approval → pass the design gate (G2)
```

## 2. Technology Stack Decision — ADR-001

Comparison of ≥ 2 candidate options is mandatory. Evaluate each candidate on the following dimensions.

| Dimension | Weight |
|------|-------|
| Team proficiency | 25% |
| Ecosystem / community | 15% |
| License / cost | 15% |
| Performance (against required NFRs) | 15% |
| Security (vulnerability history) | 15% |
| Operations / monitoring | 15% |

> **Basis**: The 6 dimensions/weights above and the "runner-up gap < 10%" rule are `[basis:sg-gw-retrospective,adjustable]` (HARNESS-PROCESS-STANDARD §4.9). Record the selection result and rationale in ADR-001.
> **Result**: Select the highest-scoring option, but if the **gap to the runner-up is < 10%**, PM approval is mandatory.

## 3. Standard Test Plan Structure

| Item | Default |
|------|-------|
| Unit test coverage | Line ≥ 80% / branch ≥ 70% |
| Integration tests | Specify the mock policy for external dependencies |
| E2E tests | Top 5 core scenarios |
| Security tests | OWASP Top 10 automated validation / secret scanning / SAST |
| 7-dimension self-evaluation threshold | 90 / 100 |
| Parity tests | (Migrations only) byte-level equivalence |
| Load tests | 2x the NFR-PERF SLA load |

> **Basis**: Coverage 80%/70%, E2E TOP 5, and 2x load are `[basis:industry-convention]` (adjustable per project); the 7-dimension threshold of 90 is `[basis:sg-gw-retrospective,adjustable]`; OWASP/SAST/secret scanning are `[basis:external-standard]`. (§4.9)

## 3.5 Threat Modeling (STRIDE / Attack Surface)

Write one **threat model** during the design phase. (Required before G2)

- **Method**: Review all data flows crossing trust boundaries against the **6 STRIDE categories** (Spoofing/Tampering/Repudiation/Info Disclosure/DoS/EoP) + perform **attack surface** analysis.
- **Linkage**: Map each threat's mitigation to security ADRs (ADR-004 through ADR-008) / NFR-SEC — zero orphan threats.
- **Blocking linkage**: Unresolved threats equivalent to CVSS ≥ 7.0 are G2/G3 blocking conditions.
- **Updates**: Update when the architecture, external channels, or PII handling changes (record changes as ADR history).
- **Deliverable**: `docs/design/threat-model.md` (template `templates/design/THREAT-MODEL.template.md`)

## 4. Risk Register

Identification of ≥ 10 entries is mandatory. `[basis:sg-gw-retrospective,adjustable]` (the minimum count is an in-house baseline — §4.9). Each risk uses the following format.

```
ID: RISK-NNN
Title: ...
Area: Technology / Schedule / Staffing / External / Security
Impact: H / M / L
Probability: H / M / L
Response strategy: Avoid / Mitigate / Transfer / Accept
Response plan: ...
Owner: ...
Monitoring checkpoint: ...
```

## 5. Inputs

- `docs/requirements/REQUIREMENTS-SPEC.md` (G1 approval completed)
- `docs/requirements/requirements-matrix.csv`
- PROJECT-PROPOSAL.md from Skill 1 (for constraint reference)

## 6. Output Deliverables

| Deliverable | Path |
|--------|------|
| Development plan | `docs/design/DEV-PLAN.md` |
| Test plan | `docs/design/TEST-PLAN.md` |
| Architecture overview | `docs/design/architecture-overview.md` |
| Threat model (STRIDE) | `docs/design/threat-model.md` |
| ADR-001 (stack decision) | `docs/design/adr/ADR-001-tech-stack.md` |
| Risk register | `docs/design/risk-register.md` |
| Sprint 1 task list | `docs/design/sprint-1-tasks.md` |

Templates: `templates/design/DEV-PLAN.template.md`, `TEST-PLAN.template.md`, `ADR.template.md`, `THREAT-MODEL.template.md`

## 7. Definition of Done (DoD)

- [ ] DEV-PLAN.md / TEST-PLAN.md / architecture-overview.md written
- [ ] ADR-001 written (including comparison of ≥ 2 candidate options)
- [ ] Threat model (STRIDE + attack surface) written — zero orphan threats, mitigations mapped to ADR/NFR-SEC
- [ ] Risk register with ≥ 10 entries
- [ ] Sprint 1 task list finalized (PM + Leader agreement)
- [ ] **G2 design gate passed** (PM + architect approval)

## 8. Additional Mandatory ADRs for the Financial Sector

A separate ADR is mandatory for each of the following areas.

| Area | ADR example |
|------|---------|
| Transaction model | ADR-002-transaction-boundary |
| Persistence strategy | ADR-003-persistence-strategy |
| Message integrity | ADR-004-message-integrity |
| PII encryption | ADR-005-pii-encryption |
| Audit logging | ADR-006-audit-logging |
| Key management | ADR-007-key-management |
| External channel authentication | ADR-008-channel-auth |
| Retry / idempotency | ADR-009-retry-idempotency |

## 9. 1:1 Dialogue Principles

- When comparing candidate options, **listen to the PM's opinion first, then evaluate**
- If the gap to the runner-up is < 10%, **PM approval must be requested**
- If a value other than the 7-dimension evaluation threshold of 90 is desired, negotiate it
- **Question criteria**: Stack tie-breaks (runner-up gap < 10%) and gate approvals are **CQ3 (human authority required)**. (Criteria: HARNESS-PROCESS-STANDARD §4.8)
