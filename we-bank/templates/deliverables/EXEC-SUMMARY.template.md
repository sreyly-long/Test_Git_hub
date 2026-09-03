# {project name} — Executive Summary

> **Audience**: Executives / client
> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Presenter**: {name}
> **Recommended presentation time**: 10 minutes (12 main slides + 5 appendix)

---

## 1. One-Line Summary

> {one-line project definition + key achievements}

## 2. Key Metrics (at a glance)

| Metric | Value |
|------|----|
| Duration | {YYYY-MM ~ YYYY-MM} ({N} sprints) |
| Domains covered | {N} |
| External channels | {N} |
| Sub-agents | {N} |
| ADRs (decision records) | {N} |
| Tests | {N,NNN}+ |
| Defects blocked by Codex (CVSS) | {highest score = 9.X} CRITICAL |

## 3. What Was Built (3 lines)

1. **Architecture**: {N} sub-agent types assigned per phase + 1:1 directory permission isolation + 3 phase-gate control points
2. **Quality·security**: Claude → Codex → Claude cross-validation + 3-level security Hooks + 7-dimension self-assessment + AES-256-GCM
3. **Verification scale**: {N} domains / {N,NNN}+ tests / parity (byte equivalence) + ArchUnit enforcement

## 4. Sample Blocked Defects (CVSS v3.1)

| ID | Defect | CVSS | Blocked At |
|----|------|------|---------|
| K-01 | (masked) | {9.8} CRITICAL | Skill 5 / L2 |
| K-02 | (masked) | {8.4} HIGH | Skill 5 / L2 |
| K-03 | (masked) | {7.4} HIGH | Skill 5 / L2 |
| K-04 | (masked) | {6.5} MEDIUM | Skill 5 / L2 |

→ Codex independently reviewed Claude's first-pass deliverables and **blocked 1 CRITICAL + 2 HIGH defects in advance**.

## 5. 7-Dimension Self-Assessment

| Dimension | Weight | Sprint Average |
|------|-------|------------|
| Completeness | 20% | {93} |
| Traceability | 15% | {91} |
| Security | 20% | {92} |
| Performance | 10% | {89} |
| Readability | 15% | {92} |
| Standards compliance | 10% | {95} |
| Test coverage | 10% | {88} |
| **Overall** | | **{91.5}** (exceeds target of 90) |

## 6. Expected Benefits

| Metric | Before | After | Savings |
|------|------|------|------|
| {e.g., transaction processing speed} | 800ms | 420ms | -48% |
| {e.g., operating cost} | {X00M KRW/month} | {Y00M KRW/month} | -{Z}% |
| {e.g., development headcount} | {N people} | {M people} | -{Z}% |
| {e.g., defect discovery point} | UAT | Development | 5x earlier |

## 7. Expansion Plan

- {YYYY quarter}: {next target domain}
- {YYYY quarter}: {adoption by other departments}
- {YYYY-Q4}: adoption as the company-wide standard

## 8. Conclusion

> {1-2 line conclusion — a message that prompts an executive decision}

---

## Appendix

- Appendix 1: System architecture diagram
- Appendix 2: Scope of application by domain
- Appendix 3: Risks / residual issues
- Appendix 4: ROI estimate
- Appendix 5: Follow-up roadmap (12 months)

---

**Approval**
| Date | Approver | Comment | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | PM | | {APPROVED} |
| {YYYY-MM-DD} | Client | | {APPROVED} |
