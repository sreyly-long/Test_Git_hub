# Code Review Report — Sprint {N}

> **Author**: code-reviewer agent
> **Date**: {YYYY-MM-DD}
> **Scope**: Sprint {N} deliverables (commit {start}..{end})
> **Verdict**: APPROVE / CONDITIONAL APPROVE / REJECT

---

## 1. Scope

- Files changed: {N}
- Lines changed: +{NNN} / -{NNN}
- Target domains: {domain list}
- Key ADRs applied: ADR-{NNN}, ADR-{MMM}

## 2. Assessment Dimensions

| Dimension | Score (0~100) | Comment |
|------|------------|--------|
| Naming | 90 | Clear / consistent |
| Readability (Javadoc) | 95 | English readability standard followed |
| Module cohesion | 88 | Recommend splitting responsibilities in some classes |
| Coupling | 85 | Recommend interface segregation |
| Thread safety | 92 | Concurrency review passed |
| Transaction integrity | 95 | Transaction boundaries clear |
| Exception handling | 88 | Some swallowed exceptions found |
| Testability | 90 | DI appropriate |

**Average: 90.4**

## 3. Findings

### 3.1 BLOCKER (block immediately)
| ID | Location | Description | Recommended Action |
|----|------|------|---------|
| - | - | None | - |

### 3.2 HIGH (fix within the sprint)
| ID | Location | Description | Recommended Action |
|----|------|------|---------|
| HIGH-01 | `src/.../X.java:55` | {e.g., catch(Exception e) swallow} | Branch on explicit exception classes |

### 3.3 MEDIUM (next sprint)
| ID | Location | Description | Recommended Action |
|----|------|------|---------|
| MED-01 | `src/.../Y.java:120` | {ambiguous naming} | Use noun forms + domain terms |

### 3.4 LOW (backlog)
| ID | Location | Description |
|----|------|------|
| LOW-01 | `src/.../Z.java:200` | {recommend improving comments} |

## 4. Mandatory Rule Checks

| Rule | Result |
|----|------|
| 0 missing `// source:` or `// req:` comments | PASS |
| English Javadoc followed | PASS |
| 0 uses of `double`/`float` for money | PASS |
| 0 plaintext PII in logs | PASS |
| 0 hardcoded secrets (gitleaks) | PASS |
| 0 uses of System.out / System.err (ArchUnit) | PASS |
| Conventional Commits followed | PASS |
| 0 directory permission violations | PASS |

## 5. Verification of 7-Dimension Self-Assessment

Comparison of the 7-dimension scores reported by the Leader against this review's independent assessment.

| Dimension | Leader Score | code-reviewer Score | Delta |
|------|-----------|--------------------|------|
| Completeness | 95 | 93 | -2 |
| Traceability | 90 | 92 | +2 |
| Security | 92 | 92 | 0 |
| Performance | 88 | 88 | 0 |
| Readability | 90 | 95 | +5 |
| Standards compliance | 95 | 95 | 0 |
| Test coverage | 85 | 85 | 0 |
| **Total** | **91.2** | **91.7** | +0.5 |

> Delta < 10 points → no suspicion of self-justification / PASS

## 6. Verdict and Recommendations

| Item | Verdict |
|------|------|
| Sprint overall verdict | **APPROVE** |
| Condition for entering next sprint | Fix HIGH-01 |
| Eligible to enter Skill 5 | Y |

---

**Reviewer Signature**
| Date | Agent | Notes |
|------|---------|------|
| {YYYY-MM-DD} | code-reviewer | Auto-generated |
| {YYYY-MM-DD} | (human review) | (optional) |
