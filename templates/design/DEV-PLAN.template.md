# Development Plan — {Project Name}

> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Preceding**: [REQUIREMENTS-SPEC.md](../requirements/REQUIREMENTS-SPEC.md) (G1 approved)
> **Status**: DRAFT / REVIEWED / **APPROVED (G2)**

---

## 1. Project Overview

| Item | Description |
|------|------|
| Project name | {Project name} |
| Duration | {YYYY-MM-DD ~ YYYY-MM-DD} |
| Number of sprints | {N} (Sprint = {1-2} weeks) |
| Team composition | {Build Team / Validation Team / Ops Team} (see §5) |
| Applied standards | harness-standards v1.0 (Team-with-Leader) |

## 2. Technology Stack (Decided in ADR-001)

| Area | Selection | Supporting ADR |
|------|------|---------|
| Language / Runtime | {Java 17} | [ADR-001](adr/ADR-001-tech-stack.md) |
| Framework | {Spring Boot 3.4} | ADR-001 |
| DB | {PostgreSQL 16} | ADR-001 |
| Messaging | {RabbitMQ 3.13} | ADR-001 |
| Build | {Maven 3.9} | ADR-001 |
| CI/CD | {GitHub Actions} | ADR-001 |
| Containers | {Docker / K8s 1.30} | ADR-001 |

See ADR-001 for the detailed comparison (including a comparison of ≥ 2 candidate options).

## 3. Architecture Overview

See [architecture-overview.md](architecture-overview.md).

Core components:
- {e.g., API Gateway}
- {e.g., Transaction processing domain}
- {e.g., Settlement domain}
- {e.g., External adapters (MQ, REST)}

## 4. Schedule (Sprint Plan)

| Sprint | Period | Scope (Epic) | DoD |
|--------|------|------------|-----|
| Sprint 1 | {Wk 1-2} | Skeleton + authentication/authorization | FR-AUTH-001~003 |
| Sprint 2 | {Wk 3-4} | Transaction processing core | FR-TX-001~003 |
| Sprint 3 | {Wk 5-6} | External integrations | FR-EXT-001 |
| Sprint 4 | {Wk 7-8} | Operations / batch | FR-OPS-001 |
| Sprint 5 | {Wk 9-10} | QA + stabilization | 7 dimensions ≥ 90 |
| Sprint 6 | {Wk 11-12} | Cutover preparation | Pass G3 |

## 5. Team Structure (Team-with-Leader)

| Team | Composition | Leader | Write Directories |
|----|------|--------|----------------|
| Build Team | backend-developer × 2, adapter-builder, code-reviewer | code-reviewer | `src/`, `mapping/port-log/`, `reviews/` |
| Validation Team | qa-engineer, security-auditor, code-reviewer | security-auditor | `qa/`, `security/`, `parity/` |
| Ops Team | shell-ops-porter, docs-writer, db-migration-engineer | docs-writer | `target/ops/`, `docs/`, `mapping/db/` |

1 PM (human) — coordinates in parallel across teams only; within each team, the Leader is autonomous.

## 6. LLM Model Assignment

| Agent | Model | Reason |
|---------|------|------|
| architect | Opus / GPT-5 | Reasoning depth required |
| backend-developer | Sonnet / GPT-5 mini | 1:1 implementation / CRUD |
| code-reviewer | Opus | Code pattern recognition |
| security-auditor | Opus | Security reasoning |
| docs-writer | Haiku / GPT-5 nano | Simple transformations |
| **Cross-validation (Skill 5)** | Different vendor | Avoid model bias |

## 7. Staffing Plan

| Role | Headcount | Primary Responsibilities |
|------|------|--------|
| PM | 1 (human) | Approvals / external communication / cross-team coordination |
| Architect | 1 (human) | Design review / ADR approval |
| Developers | {N} (human) | Review agent output / domain knowledge |
| QA | {N} (human) | Review test plans / E2E scenarios |
| Operations | {N} (human) | Cutover / monitoring |
| AI agents | 12-16 (LLM) | Autonomous implementation / self-assessment |

## 8. Risk Management

See [risk-register.md](risk-register.md) (≥ 10 entries).

Top 3 key risks:
1. {Risk summary + impact + response}
2. {Risk summary}
3. {Risk summary}

## 9. Quality Targets

| Metric | Target |
|------|------|
| Unit test coverage (line) | ≥ 80% |
| Unit test coverage (branch) | ≥ 70% |
| 7-dimension self-assessment | ≥ 90 |
| Defects with CVSS ≥ 7.0 | 0 (release gate) |
| Cumulative ADRs | ≥ 10 (design change tracking) |

## 10. Communication / Approvals

| Gate | Timing | Approver | Deliverables |
|--------|------|--------|--------|
| G1 Analysis | Skill 2 complete | PM | REQUIREMENTS-SPEC.md |
| G2 Design | Skill 3 complete | PM + Architect | This document + TEST-PLAN |
| Sprint gate | End of each sprint | PM | SPRINT-N-LOG |
| G3 Release | Skill 5 complete | PM + InfoSec + Operations | All verification reports |

## 11. Backup / Rollback Policy

- Maintain emergency rollback capability for {72 hours} after cutover
- Retain the legacy system / infrastructure for at least {6 months}
- Maintain bidirectional DB migration queries ({migration/etl/})

## 12. Additional Items for Financial Services (if applicable)

| Item | Applicable | Notes |
|------|------|------|
| Compliance with the Regulation on Supervision of Electronic Financial Transactions | Y | Dedicated ADR required |
| ISMS-P certification | Y | Separate certification schedule |
| PII encryption | Y | AES-256-GCM (ADR-005) |
| Key management | Y | HSM or KMS (ADR-007) |
| Audit logs | Y | 7-year retention (ADR-006) |

---

**G2 Approval (Design Gate)**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | PM | | {APPROVED/REJECTED/PENDING} |
| {YYYY-MM-DD} | Architect | | {APPROVED/REJECTED/PENDING} |
