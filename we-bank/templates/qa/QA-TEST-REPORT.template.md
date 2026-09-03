# QA Test Report — Sprint {N}

> **Author**: qa-engineer agent
> **Date**: {YYYY-MM-DD}
> **Scope**: Sprint {N} deliverables
> **Verdict**: PASS / CONDITIONAL / FAIL

---

## 1. Summary

| Item | Value |
|------|----|
| Unit tests | {NNN}/{NNN} PASS |
| Integration tests | {NN}/{NN} PASS |
| E2E tests | {NN}/{NN} PASS |
| Load tests | PASS / FAIL |
| Security tests | PASS (see separate audit-N.md) |
| Parity tests (if applicable) | PASS (see separate parity-report-N.md) |
| **Overall verdict** | **PASS** |

## 2. Coverage

| Metric | Result | Target | Pass/Fail |
|------|------|------|---------|
| Line coverage | 82% | ≥ 80% | PASS |
| Branch coverage | 73% | ≥ 70% | PASS |
| Method coverage | 88% | ≥ 85% | PASS |
| Core domain classes | 96% | ≥ 95% | PASS |

## 3. Unit Test Results

| Module | Cases | PASS | FAIL | Notes |
|------|----------|------|------|------|
| Authentication / authorization | 45 | 45 | 0 | |
| Transaction processing | 120 | 120 | 0 | |
| External integrations | 30 | 30 | 0 | |
| **Total** | **195** | **195** | **0** | |

## 4. Integration Test Results

| Scenario | Result | P95 Response | Notes |
|---------|------|---------|------|
| Normal transaction registration | PASS | 320 ms | |
| Over-limit transaction | PASS | 280 ms | BR-002 |
| Retry on external API failure | PASS | 800 ms | 3 retries + queued |
| DB transaction rollback | PASS | 350 ms | |

## 5. E2E Test Results

| UC-ID | Scenario | Result |
|-------|---------|------|
| UC-001 | Login → register transaction → approval | PASS |
| UC-002 | Query transaction → cancel → refund | PASS |
| UC-003 | Daily batch settlement | PASS |

## 6. Load Tests

| Scenario | Load | Result | P95 | Error Rate |
|---------|------|------|-----|--------|
| Normal load | 500 RPS / 30 min | PASS | 420 ms | 0.05% |
| Peak load | 2,000 RPS / 10 min | PASS | 920 ms | 0.8% |
| Daily throughput | 24h × 10M transactions | PASS | - | 0.1% |

### NFR-PERF Mapping

| NFR | Target | Result | Pass |
|-----|------|------|------|
| NFR-PERF-01 | P95 < 500ms | 420ms | PASS |
| NFR-PERF-02 | 10M/day | PASS | PASS |
| NFR-PERF-03 | 500 concurrent users | PASS | PASS |

## 7. Regression Tests

| Item | Result |
|------|------|
| Features from previous sprints | All passed |
| Newly added cases | {N} |
| Regression defects found | 0 |

## 8. Defect Statistics

| Severity | Found | Fixed | Remaining |
|------|------|------|------|
| CRITICAL | 0 | 0 | 0 |
| HIGH | 0 | 0 | 0 |
| MEDIUM | 2 | 2 | 0 |
| LOW | 5 | 3 | 2 (backlog) |

## 9. Environments

| Environment | Purpose | Data |
|------|------|--------|
| dev | Unit/integration | Mocks + fixtures |
| staging | E2E / load | Anonymized data |
| prod-like | Load | Synthetic data |

## 10. Follow-Up Actions

- [ ] Register 2 LOW defects in the backlog
- [ ] Re-run load tests quarterly
- [ ] Accumulate regression cases (currently {NN} → next sprint {NN})

---

**qa-engineer Signature**
| Date | Agent | Notes |
|------|---------|------|
| {YYYY-MM-DD} | qa-engineer | Automated run |
