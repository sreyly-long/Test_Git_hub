# Security Audit Report — Sprint {N}

> **Author**: security-auditor agent
> **Date**: {YYYY-MM-DD}
> **Scope**: Sprint {N} deliverables + operational infrastructure configuration
> **Verdict**: APPROVE / CONDITIONAL APPROVE / REJECT

---

## 1. Audit Scope

- Source code: `src/`
- Dependencies: `pom.xml` / `build.gradle` / `package.json`
- Configuration: `application*.yml`, `.env` templates, infrastructure IaC
- Security Hooks: L1 (pre-commit) / L2 (CI) / L3 (prod-gate)
- External channels: MQ / TCP / REST / SFTP

## 2. OWASP Top 10 (2021) Checks

| ID | Item | Result | Notes |
|----|------|------|------|
| A01 | Broken Access Control | PASS | Permission matrix + E2E verification |
| A02 | Cryptographic Failures | PASS | AES-256-GCM applied |
| A03 | Injection | PASS | JPA + PreparedStatement |
| A04 | Insecure Design | PASS | Architecture review completed |
| A05 | Security Misconfiguration | PASS | Configuration review completed |
| A06 | Vulnerable Components | PASS | OWASP DC passed |
| A07 | Identification & Auth Failures | PASS | MFA + session verification |
| A08 | Software & Data Integrity Failures | PASS | HMAC + dependency integrity |
| A09 | Logging & Monitoring Failures | PASS | Audit log integrity |
| A10 | SSRF | PASS | Allowlist verification |

## 3. Secrets / Credentials Checks

| Item | Verification | Result |
|------|------|------|
| Hardcoded secrets | gitleaks scan | 0 found |
| Environment variable externalization | `application.yml` review | PASS |
| Vault / KMS usage | Key management ADR verified | ADR-007 compliant |
| Key rotation interval | Operations policy | 90 days |

## 4. PII / Sensitive Data Handling

| Item | Result | Evidence |
|------|------|------|
| PII column identification | Complete | `mapping/model/pii-columns.md` |
| AES-256-GCM applied | PASS | All PII columns |
| Log masking | PASS | Regex verification passed |
| Screen masking | PASS | UI code verified |
| Response masking | PASS | API responses verified |
| Disposal procedure | PASS | Automatic disposal when retention period expires |

### PII Column Catalog (example)

| Column | Table | Classification | Encryption | Retention |
|------|--------|------|--------|------|
| customer_name | customers | PII | AES-256-GCM | 5 years |
| resident_no | customers | Sensitive | AES-256-GCM + KMS | 5 years |
| account_no | accounts | Sensitive | AES-256-GCM | 7 years |
| card_no | cards | PCI | AES-256-GCM + Tokenization | 7 years |

## 5. External Channel Authentication

| Channel | Authentication Method | Verification |
|------|---------|------|
| MQ (RabbitMQ) | TLS + SASL/PLAIN | PASS |
| External TCP | mTLS | PASS |
| External REST | OAuth2 Client Credentials + TLS | PASS |
| SFTP | SSH key + host key verification | PASS |
| DB | TLS + Vault credentials | PASS |

## 6. Audit Log

| Item | Verification |
|------|------|
| All key events recorded | PASS (`@Audited` applied) |
| 7-year retention | PASS (Glacier archival policy) |
| Log integrity (hash chain) | PASS |
| Access control | PASS (auditors only) |
| Time synchronization (NTP) | PASS |

## 7. 3-Level Security Hook Integration

| Level | Tool | Passed |
|------|------|---------|
| L1 (pre-commit) | gitleaks | PASS |
| L1 (pre-commit) | semgrep (optional) | PASS |
| L2 (CI) | OWASP Dependency Check | PASS |
| L2 (CI) | SAST (CodeQL / SpotBugs) | PASS |
| L2 (CI) | security-auditor agent | PASS |
| L3 (prod-gate) | Checklist with human approval | PENDING |

## 8. Regulatory / Compliance Checks

| Regulation | Applies | Result |
|------|------|------|
| Electronic Financial Supervisory Regulations | Y | PASS (access control / encryption / retention) |
| Personal Information Protection Act | Y | PASS (collection·storage·disposal) |
| Credit Information Act | Y/N | {result} |
| ISMS-P | Y/N | {result} |
| PCI-DSS | Y/N | {result} |
| Financial Security Institute guidelines | Y | PASS |

## 9. Findings

### CRITICAL
| ID | Location | Description | Recommended Action |
|----|------|------|---------|
| - | - | None | - |

### HIGH
| ID | Location | Description | Recommended Action |
|----|------|------|---------|
| - | - | None | - |

### MEDIUM / LOW
| ID | Location | Description | Severity |
|----|------|------|------|
| - | - | - | - |

## 10. Verdict

| Item | Result |
|------|------|
| Defects with CVSS ≥ 9.0 | 0 |
| Defects with CVSS ≥ 7.0 | 0 |
| Regulatory violations | 0 |
| **Overall verdict** | **APPROVE** |

## 11. Follow-Up Recommendations

- [ ] Quarterly external penetration testing
- [ ] Monthly dependency vulnerability scan + patching
- [ ] Automate key rotation (90 days)
- [ ] Verify audit log backups (quarterly)

---

**security-auditor Signature**
| Date | Agent / Human | Notes |
|------|-----------------|------|
| {YYYY-MM-DD} | security-auditor | Automated audit |
| {YYYY-MM-DD} | Information Security Officer | (optional) human review |
