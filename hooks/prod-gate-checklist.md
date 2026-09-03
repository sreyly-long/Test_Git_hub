# Security Hook L3 — Prod Gate Checklist

> **This standard** (HARNESS-PROCESS-STANDARD.md §5.4), stage L3
> **Timing**: Immediately before production deployment
> **Approvers**: PM + Information Security + Operations (3-party approval required)
> **Bypassing is strictly prohibited** — violations are subject to audit

---

## 1. Pre-Approval

| Item | Approver | Date | Signature |
|------|--------|------|------|
| G3 release gate passed (Skill 5) | PM | {YYYY-MM-DD} | |
| Security audit APPROVE | Information Security Officer | | |
| Operations handover complete | Operations Lead | | |
| Client cutover approval (if applicable) | Client PM | | |

## 2. Deliverables / Document Verification

| Item | Check |
|------|------|
| [ ] G3 release report (`reviews/verdict-sprint-N.md`) explicitly states APPROVE |
| [ ] Cross-validation report (`reviews/cross-validation-N.md`) — zero defects with CVSS ≥ 7.0 |
| [ ] Security audit report (`security/audit-N.md`) APPROVE |
| [ ] Parity report (`parity/parity-report-N.md`) passed (migration projects only) |
| [ ] QA report (`qa/test-report-N.md`) PASS |
| [ ] Runbook (`deliverables/06-ops/RUNBOOK.md`) reviewed by operations team |
| [ ] Cutover procedure rehearsed by operations team |
| [ ] Rollback procedure rehearsed at least once |

## 3. Infrastructure / Production Environment

| Item | Check |
|------|------|
| [ ] Production DB backup complete (full backup immediately before deployment) |
| [ ] Production DB schema migration dry-run complete |
| [ ] Monitoring dashboards operational (Grafana / Prometheus) |
| [ ] Alert channels operational (Slack / SMS / PagerDuty) |
| [ ] Load balancer configuration verified (LB / Ingress) |
| [ ] TLS certificate validity > 60 days |
| [ ] DR site synchronization healthy |

## 4. Secrets / Credentials

| Item | Check |
|------|------|
| [ ] Production secrets registered in Vault/KMS |
| [ ] Isolation of dev/staging keys from prod keys verified |
| [ ] External system certificates / API keys registered for production |
| [ ] Key rotation interval configured (default 90 days) |
| [ ] Separate production DB credentials (Vault-issued temporary tokens recommended) |

## 5. Regulatory / Compliance

| Item | Check |
|------|------|
| [ ] Electronic Financial Supervision Regulations compliance complete |
| [ ] AES-256-GCM applied to PII columns in production, verified |
| [ ] Audit log retention policy applied in production (7 years) |
| [ ] ISMS-P certification impact assessment complete (if applicable) |
| [ ] PCI-DSS requirements met (if applicable) |
| [ ] Privacy Impact Assessment (PIA) complete (if applicable) |
| [ ] Prior notification to client / regulatory authority complete (if applicable) |

## 6. Non-Functional Verification

| Item | Check |
|------|------|
| [ ] Load testing complete, meeting NFR-PERF SLA |
| [ ] NFR-AVAIL RTO/RPO verification complete |
| [ ] Message integrity verification (HMAC / signatures) |
| [ ] Idempotency verification (duplicate request scenarios) |
| [ ] External channel failure scenarios verified |

## 7. BCP / Rollback

| Item | Check |
|------|------|
| [ ] Rollback procedure up to date (`deliverables/06-ops/ROLLBACK.md`) |
| [ ] Rollback decision-maker specified (PM or Operations Lead) |
| [ ] Rollback thresholds specified (e.g., error rate > 5% sustained for 5 minutes) |
| [ ] Monitoring staff assigned for 72 hours after cutover |
| [ ] Legacy system retained (6 months for migrations) |
| [ ] Bidirectional DB migration queries retained (`mapping/db/etl/`) |

## 8. Deployment Window

| Item | Check |
|------|------|
| [ ] Deployment date: {YYYY-MM-DD} |
| [ ] Deployment time: {HH:MM} (low-traffic window) |
| [ ] Deployment strategy: blue-green / canary / rolling |
| [ ] Traffic shift stages: {e.g., 0% → 10% → 50% → 100%} |
| [ ] Monitoring duration per stage: {e.g., 5 min / 10 min / 30 min} |
| [ ] Advance user notice complete (maintenance announcement) |

## 9. Staffing (Cutover D-day)

| Role | Name | Contact | On-Duty Window |
|------|------|--------|---------|
| Deployment Lead | {name} | {010-} | T-1h ~ T+4h |
| DBA | {name} | {010-} | T ~ T+2h |
| Operations | {name} | {010-} | T ~ T+24h (shifts) |
| Development (emergency response) | {name} | {010-} | T ~ T+24h (on-call) |
| Security (incidents) | {name} | {010-} | on-call |

## 10. Final Approval

| Approver | Date | Signature / Approval Status |
|--------|------|------------------|
| PM | {YYYY-MM-DD HH:MM} | {APPROVED / REJECTED / PENDING} |
| Information Security Officer | {YYYY-MM-DD HH:MM} | {APPROVED / REJECTED / PENDING} |
| Operations Lead | {YYYY-MM-DD HH:MM} | {APPROVED / REJECTED / PENDING} |
| (Optional) Client PM | {YYYY-MM-DD HH:MM} | {APPROVED} |

---

## L3 PASS Criteria

- All items in §1 ~ §10 above checked
- All 3 approvers APPROVED
- Any violation results in immediate block + PM re-approval

> **Penalty for violations**: Bypassing this checklist or falsifying approvals will be reported to the audit department and is subject to disciplinary action.
