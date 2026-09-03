# Test Plan — {Project Name}

> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Preceding**: [REQUIREMENTS-SPEC.md](../requirements/REQUIREMENTS-SPEC.md), [DEV-PLAN.md](DEV-PLAN.md)
> **Status**: DRAFT / REVIEWED / **APPROVED (G2)**

---

## 1. Test Strategy

### 1.1 Test Pyramid

```
        ┌──────────────┐
        │    E2E 5%    │
       ┌┴──────────────┴┐
       │ Integration 25%│
      ┌┴────────────────┴┐
      │     Unit 70%     │
      └──────────────────┘
```

### 1.2 Test Types

| Type | Tools | Responsibility | Frequency |
|------|------|------|------|
| Unit tests | {JUnit 5 / Mockito} | Development agents | Every commit |
| Integration tests | {Testcontainers / @SpringBootTest} | Development + QA | Every PR |
| E2E tests | {Playwright / Cypress / REST-Assured} | QA | Every sprint |
| Component tests (frontend) | {Jest / Vitest / Testing Library} | frontend-developer + QA | Every commit |
| Accessibility tests (frontend) | {axe-core / lighthouse} — WCAG 2.1 AA | frontend-developer → QA verification | Every PR |
| Load tests | {JMeter / k6 / Gatling} | QA | End of sprint |
| Security tests | {OWASP ZAP / gitleaks / Snyk} | security-auditor | Every PR + L2 Hook |
| Parity tests (if applicable) | `scripts/parity-check.sh` | qa-engineer | Every sprint |

## 2. Coverage Targets

| Metric | Target |
|------|------|
| Line coverage | ≥ 80% |
| Branch coverage | ≥ 70% |
| Method coverage | ≥ 85% |
| Core domain classes | ≥ 95% |

> Coverage tools: {JaCoCo / SonarQube}

## 3. 7-Dimension Self-Assessment (sg-gw verification)

| Dimension | Weight | Assessment Criteria |
|------|-------|----------|
| Completeness | 20% | 100% of sprint tasks completed |
| Traceability | 15% | // source: / ADR / agent name |
| Security | 20% | Zero hardcoding / PII masking / hooks pass |
| Performance | 10% | NFR-PERF SLA met |
| Readability | 15% | Javadoc / Mermaid / table alignment |
| Standards compliance | 10% | Zero directory isolation violations / zero missing ADRs |
| Test coverage | 10% | TEST-PLAN criteria met |

- Threshold: **90 / 100**
- If below threshold: remediate the lowest dimension → regenerate → up to 5 times
- Still below after 5 attempts → PM escalation

## 4. Cross-Validation

| Item | Description |
|------|------|
| Timing | End of sprint (Skill 5) |
| Tools | A different LLM vendor (Codex / GPT-5 / Gemini) |
| Deliverable | `reviews/cross-validation-N.md` |
| CVSS rating | CVSS v3.1 |
| Blocking threshold | CVSS ≥ 7.0 (HIGH or above) |

## 5. Security Testing (3-Level Security Hook)

| Level | Tools | Timing |
|------|------|------|
| L1 | gitleaks / trufflehog | git pre-commit |
| L2 | security-auditor + SAST + dependency scan + **SBOM / OSS licenses** | CI / PR |
| L3 | prod-gate checklist | Immediately before production deployment |

### OWASP Top 10 Verification
| ID | Item | Verification Method |
|----|------|---------|
| A01 | Broken Access Control | E2E + static analysis |
| A02 | Cryptographic Failures | Security audit |
| A03 | Injection | SAST + unit tests |
| A04 | Insecure Design | Architecture review + threat model (STRIDE) |
| A05 | Security Misconfiguration | Configuration inspection |
| A06 | Vulnerable Components | Dependency scan + SBOM / OSS licenses |
| A07 | Identification & Auth Failures | E2E tests |
| A08 | Software & Data Integrity Failures | HMAC / signatures |
| A09 | Logging & Monitoring Failures | Audit log inspection |
| A10 | SSRF | Static analysis |

## 6. Load Test Scenarios

| Scenario | Load | Duration | Pass Criteria |
|---------|------|------|---------|
| Transaction creation, normal load | {500 RPS} | 30 min | P95 < 500ms / error rate < 0.1% |
| Transaction creation, peak load | {2,000 RPS} | 10 min | P95 < 1s / error rate < 1% |
| Daily throughput | {10 million transactions / day} | 24 hours | NFR-PERF-02 met |

## 7. Parity Testing (Migration Projects Only)

| Item | Description |
|------|------|
| Definition | Byte-level equivalence of legacy output vs. new output for identical input |
| Tools | `scripts/parity-check.sh`, `cmp`, `diff -u` |
| Responsibility | qa-engineer |
| Number of cases | ≥ 5 per module (Phase 3 DoD) |
| Pass criteria | 100% (or agreed upon with approved masking rules) |

## 8. Test Environments

| Environment | Purpose | Data |
|------|------|--------|
| local | Developer PC | Mocks / fixtures |
| dev | Development server | Anonymized production data |
| staging | QA / integration | Same configuration as production + partial production data |
| prod | Production | Live data |

> **Principle**: Real PII data must never be brought into dev/staging. Use anonymized or synthetic data.

## 9. Defect Management

| Severity | CVSS | Handling |
|------|------|------|
| CRITICAL | ≥ 9.0 | Fix within 4 hours |
| HIGH | 7.0~8.9 | Fix within the current sprint |
| MEDIUM | 4.0~6.9 | By the next sprint |
| LOW | < 4.0 | Backlog |

## 10. Deliverables

| Deliverable | Timing | Format |
|--------|------|------|
| Unit test results | Every CI run | xml + html |
| Integration test report | Every PR | md |
| Sprint QA report | End of sprint | md |
| Load test results | Stabilization sprint | md + png graphs |
| Parity report | Every sprint (if applicable) | md + csv |
| Security audit report | Skill 5 | md + pdf |
| Cross-validation report | Skill 5 | md |

## 11. Additional Tests for Financial Services

| Test | Purpose |
|--------|------|
| Transaction integrity | Prevent message forgery/tampering (HMAC) |
| Idempotency | Zero duplicate processing of identical requests |
| Transaction boundaries | Distributed transactions / compensating transactions |
| Amount precision | BigDecimal rounding verification |
| PII masking | Logs / responses / audit |
| Key rotation | Key expiration / replacement scenarios |
| Audit logs | 7-year retention + integrity |

---

**G2 Approval (Design Gate)**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | PM | | {APPROVED/REJECTED/PENDING} |
| {YYYY-MM-DD} | QA Leader | | {APPROVED/REJECTED/PENDING} |
