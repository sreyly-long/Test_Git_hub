# Parity Report — Sprint {N} (migration projects only)

> **Author**: qa-engineer
> **Date**: {YYYY-MM-DD}
> **Target module**: {module name}
> **Verdict**: PASS / PARTIAL / FAIL

---

## 1. Overview

Verify equivalence by **byte-level comparison** of the output of the legacy system (e.g., C / COBOL / prior version) against the output of the new Java/Python/Go implementation for identical inputs.

| Item | Description |
|------|------|
| Legacy system | {e.g., C iBLS} |
| New system | {e.g., Java Spring Boot 3.4} |
| Comparison tools | `cmp`, `diff -u`, `xxd`, `hexdump -C` |
| Number of test cases | {NN} |
| Pass criteria | 100% byte-equal (or approved masking rules) |

## 2. Test Case List

| Case ID | Scenario | Input fixture | Legacy Output | New Output | Result |
|---------|---------|--------------|-----------|---------|------|
| TC-{N}-001 | {normal transaction} | `fixtures/case-001.bin` | `expected/case-001.bin` | `actual/case-001.bin` | PASS |
| TC-{N}-002 | {boundary values} | `fixtures/case-002.bin` | `expected/case-002.bin` | `actual/case-002.bin` | PASS |
| TC-{N}-003 | {exceptional transaction} | `fixtures/case-003.bin` | `expected/case-003.bin` | `actual/case-003.bin` | DIFF (accepted) |
| TC-{N}-004 | {bulk input} | `fixtures/case-004.bin` | `expected/case-004.bin` | `actual/case-004.bin` | PASS |
| TC-{N}-005 | {boundary time} | `fixtures/case-005.bin` | `expected/case-005.bin` | `actual/case-005.bin` | PASS |

## 3. Analysis of Differences Found

### TC-{N}-003: DIFF (accepted)
- Difference location: offsets 200~204 (date/time field)
- Reason: the new system uses explicit KST, legacy uses UTC. **Masking rule approved (ADR-NNN)**
- Handling: registered in `parity-mask-rules.yaml` → differences at this location are ignored

### Masking Rule Example
```yaml
rules:
  - case: TC-*
    offset: 200-204
    reason: KST↔UTC conversion (ADR-NNN)
    approved_by: PM
    approved_date: 2026-05-29
```

## 4. Statistics

| Metric | Value |
|------|----|
| Total cases | {NN} |
| Byte-identical | {NN} ({%}) |
| Identical after masking | {N} |
| Unresolved differences | 0 |
| Parity pass rate | 100% |

## 5. Performance Comparison (informational)

| Case | Legacy Response | New Response | Delta |
|--------|------------|---------|------|
| TC-001 | {120 ms} | {95 ms} | -21% |
| TC-002 | {300 ms} | {250 ms} | -17% |

## 6. Environments

| Item | Legacy | New |
|------|--------|------|
| OS | {AIX 7.1} | {Linux RHEL 9} |
| Runtime | {C / Pro*C} | {Java 17 / Spring Boot 3.4} |
| DB | {Oracle 11g} | {PostgreSQL 16} |
| Charset | {EUC-KR} | {UTF-8 + EUC-KR conversion} |

## 7. Limitations and Assumptions

- Time-dependent fields (current time / sequences) are masked
- Floating-point differences are replaced by verifying BigDecimal conversion results
- Where responses depend on external systems, identical mocks are used

## 8. Follow-Up Recommendations

- [ ] Add fixtures from production daily batch data
- [ ] Re-review masking rules quarterly
- [ ] Add parity under load (10,000 concurrent inputs)

---

**qa-engineer Signature**
| Date | Agent | Notes |
|------|---------|------|
| {YYYY-MM-DD} | qa-engineer | Automated run |
