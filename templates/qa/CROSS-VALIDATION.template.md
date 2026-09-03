# Cross-Validation Report — Sprint {N}

> **Reviewing LLM**: {Codex / GPT-5 / Gemini} (primary review)
> **Original authoring LLM**: {Claude Opus 4.7} (primary author)
> **Date**: {YYYY-MM-DD}
> **Scope**: Sprint {N} deliverables
> **Verdict**: APPROVE / CONDITIONAL / REJECT

---

## 1. Overview

This report summarizes the results of an independent review by a separate LLM ({Codex}) of the Sprint {N} deliverables produced by the primary LLM (Claude), with defects found scored using CVSS v3.1.

## 2. CVSS v3.1 Criteria

| Severity | Score | Handling |
|------|------|------|
| CRITICAL | ≥ 9.0 | Block immediately + fix within 4 hours |
| HIGH | 7.0~8.9 | Block + fix within this sprint |
| MEDIUM | 4.0~6.9 | Fix by next sprint |
| LOW | 0.1~3.9 | Backlog |

## 3. Defects Found

| ID | Location | Defect Summary | CVSS | Vector (AV/AC/PR/UI/S/C/I/A) | Recommended Action | Claude Review Comment |
|----|------|----------|------|---------------------------|---------|----------------|
| K-01 | `src/.../X.java:42` | (e.g., secret not read from environment variable) | **9.8** | AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | Apply environment variables + Vault | Agree → add ADR-NNN |
| K-02 | `src/.../Y.java:88` | (e.g., possible SQL injection) | **8.4** | AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N | Switch to PreparedStatement | Agree → fix |
| K-03 | `src/.../Z.java:120` | (e.g., plaintext PII in logs) | **7.4** | AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N | Apply masking | Agree → fix |
| K-04 | `src/.../W.java:200` | (e.g., session fixation) | **6.5** | AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N | Regenerate session after login | Agree → fix |

### Statistics by Severity

| Severity | Count |
|------|------|
| CRITICAL | 1 |
| HIGH | 2 |
| MEDIUM | 1 |
| LOW | 0 |
| **Total** | **4** |

## 4. Claude's Rebuttals / Supplementary Comments

| Defect ID | Claude's Comment | Final Agreement |
|--------|-----------|---------|
| K-01 | Agree — missing environment variable usage | Proceed with fix |
| K-02 | Partially agree — JPA is used so no direct SQL, but static analysis recommended | Adopt static analysis |
| K-03 | Agree — masking missing | Proceed with fix |
| K-04 | Agree — session regeneration after login missing | Proceed with fix |

## 5. False Positive Analysis

| Defect ID | False Positive? | Rationale |
|--------|--------------------|-----|
| K-01 | N | Actual secret exposure in code confirmed |
| K-02 | N | One instance of direct SQL outside JPA found |
| K-03 | N | Log pattern verification confirmed missing masking |
| K-04 | N | Session handling code confirmed not applied |

## 6. Blocking Decision

- 1 CRITICAL / 2 HIGH found → **returned to Skill 4 (REJECT)**
- Re-validation schedule after fixes: {YYYY-MM-DD}

## 7. Limitations of This Validation

- LLM assessment is based on static code + context; runtime dynamic validation requires separate tooling (DAST)
- CVSS scores are LLM estimates and may differ from a security specialist's review
- To avoid model bias, a quarterly third-pass review by another LLM (e.g., Gemini) is recommended

## 8. Follow-Up Actions

- [ ] Re-validate after CRITICAL/HIGH fixes are complete (within 3 days)
- [ ] Register false positive rules in the static analysis tool
- [ ] Reflect newly discovered patterns in this standard's mandatory rules

---

**Signatures**
| Date | LLM | Notes |
|------|-----|------|
| {YYYY-MM-DD} | {Codex} | Primary independent review |
| {YYYY-MM-DD} | {Claude} | Review response |
| {YYYY-MM-DD} | PM | Final confirmation |
