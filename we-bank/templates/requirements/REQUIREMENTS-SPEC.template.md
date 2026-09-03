# Requirements Specification — {Project Name}

> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Preceding**: [PROJECT-PROPOSAL.md](../planning/PROJECT-PROPOSAL.md), [BUSINESS-REQUIREMENTS.md](../planning/BUSINESS-REQUIREMENTS.md)
> **Traceability Matrix**: [requirements-matrix.csv](requirements-matrix.csv)
> **Question Log**: [questions-log.md](questions-log.md)
> **Status**: DRAFT / REVIEWED / **APPROVED (G1)**

---

## 1. Overview

This document is the requirements specification that elaborates the project proposal / business requirements from Skill 1 into three categories: Functional / Non-Functional / Constraint.

### 1.1 Classification Scheme

| Category | Prefix | Description |
|------|-------|------|
| Functional Requirement | `FR-` | What must the system do |
| Non-Functional Requirement | `NFR-<area>-` | What quality attributes must it have |
| Constraint | `CONST-<area>-` | Absolutely non-negotiable constraints |
| Use Case | `UC-` | Scenario-level usage flows |

### 1.2 Priority (MoSCoW)

| Level | Meaning |
|------|------|
| Must | Required for this release |
| Should | Recommended for this release |
| Could | This release if possible, otherwise the next |
| Won't | Excluded from this release (deferred or permanently) |

---

## 2. Functional Requirements

### 2.1 User Authentication / Authorization
| REQ-ID | Requirement | Priority | Verification Method |
|--------|---------|---------|----------|
| FR-AUTH-001 | Users can log in with email + password | Must | E2E test |
| FR-AUTH-002 | Administrators can enforce MFA login | Must | E2E test |
| FR-AUTH-003 | Sessions expire automatically after 30 minutes of inactivity | Must | Unit test |

### 2.2 Transaction Processing
| REQ-ID | Requirement | Priority | Verification Method |
|--------|---------|---------|----------|
| FR-TX-001 | {Transaction creation requirement} | Must | Integration test |
| FR-TX-002 | {Transaction inquiry requirement} | Must | E2E test |
| FR-TX-003 | {Transaction cancellation requirement — see BR-001} | Must | Integration test |

### 2.3 External Integrations
| REQ-ID | Requirement | Priority | Verification Method |
|--------|---------|---------|----------|
| FR-EXT-001 | {External integration requirement} | Must | Integration test |

### 2.4 Operations / Administration
| REQ-ID | Requirement | Priority | Verification Method |
|--------|---------|---------|----------|
| FR-OPS-001 | {Operations requirement} | Should | Operational test |

---

## 3. Non-Functional Requirements

### 3.1 NFR-PERF (Performance)
| REQ-ID | Requirement | Measurement |
|--------|---------|------|
| NFR-PERF-01 | Transaction creation response P95 < 500ms | Load test |
| NFR-PERF-02 | Daily throughput of 10 million transactions | Load test |
| NFR-PERF-03 | Handle 500 concurrent users | Load test |

### 3.2 NFR-SEC (Security)
| REQ-ID | Requirement | Verification |
|--------|---------|------|
| NFR-SEC-AUTH | OAuth2 + JWT (RS256) | Security audit |
| NFR-SEC-PII | PII columns encrypted with AES-256-GCM | Security audit / DB inspection |
| NFR-SEC-TX | HMAC integrity for transaction messages | Unit test |
| NFR-SEC-LOG | No plaintext secrets / PII in logs | Static analysis |

### 3.3 NFR-AVAIL (Availability)
| REQ-ID | Requirement | Measurement |
|--------|---------|------|
| NFR-AVAIL-01 | 99.9% SLA (monthly downtime ≤ 43 minutes) | Monitoring |
| NFR-AVAIL-02 | RTO ≤ 1 hour | DR drill |
| NFR-AVAIL-03 | RPO ≤ 5 minutes | Backup policy |

### 3.4 NFR-SCALE (Scalability)
| REQ-ID | Requirement | Verification |
|--------|---------|------|
| NFR-SCALE-01 | Horizontally scalable (stateless) | Architecture review |
| NFR-SCALE-02 | Key design that supports DB sharding | Architecture review |

### 3.5 NFR-OPS (Operations)
| REQ-ID | Requirement | Verification |
|--------|---------|------|
| NFR-OPS-AUDIT | Audit logs retained 7 years + integrity | Operational audit |
| NFR-OPS-BACKUP | Daily full backup + hourly incremental | Backup inspection |

---

## 4. Constraints

| REQ-ID | Constraint | Basis |
|--------|------|------|
| CONST-TECH-01 | Java 17 / Spring Boot 3.4 mandatory | ADR-001 |
| CONST-LEGAL-01 | AES-256-GCM when storing resident registration numbers | Personal Information Protection Act |
| CONST-LEGAL-02 | Audit logs retained for 7 years | Regulation on Supervision of Electronic Financial Transactions |
| CONST-OPS-01 | Keep rollback possible for 72 hours after cutover | Operations policy |
| CONST-OPS-02 | Production deployments only after 22:00 on weekdays | Operations policy |

---

## 5. Use Cases (Summary)

| UC-ID | Scenario | Primary User | Related FR |
|-------|---------|-----------|---------|
| UC-001 | Login → create transaction → approval → complete | General user | FR-AUTH-001, FR-TX-001 |
| UC-002 | Transaction inquiry → cancel → refund | General user | FR-TX-002, FR-TX-003 |
| UC-003 | Daily batch settlement | System | FR-OPS-001 |

See `use-cases/UC-NNN.md` for detailed scenarios.

---

## 6. AMBIGUOUS / Pending Items

| ID | Item | Candidate Options | PM Response | Status |
|----|------|--------|---------|------|
| AMB-001 | {e.g., Definition of "fast"} | A: P95<500ms / B: P95<1s | A selected | RESOLVED |
| AMB-002 | {Pending item} | A / B | Awaiting response | PENDING |

---

## 7. Change History

| Date | Version | Changes | Author |
|------|------|----------|--------|
| {YYYY-MM-DD} | 1.0 | Initial draft | {Name} |

---

**G1 Approval (Analysis Gate)**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | PM | | {APPROVED/REJECTED/PENDING} |
