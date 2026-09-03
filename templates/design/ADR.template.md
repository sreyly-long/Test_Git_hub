# ADR-{NNN}: {Decision Title}

> **Status**: PROPOSED / ACCEPTED / SUPERSEDED / DEPRECATED
> **Date**: {YYYY-MM-DD}
> **Author**: {Agent name or human}
> **Approver**: {Approver / title}
> **Related ADR**: ADR-MMM (if any)

---

## 1. Context

Why is this decision needed? What problem or situation arose?

- Background summary:
- Related requirements: REQ-XXX, REQ-YYY
- Related risks: RISK-NNN
- Decision pressure (time / cost / regulation):

## 2. Decision

What was chosen? Concisely, in one paragraph.

> {Summary of the decision}

### Key Choices
- {Choice 1}
- {Choice 2}
- {Choice 3}

## 3. Considered Alternatives

| # | Alternative | Pros | Cons | Adopted |
|---|------|------|------|---------|
| A | {Alternative A} | {Pros} | {Cons} | Adopted |
| B | {Alternative B} | {Pros} | {Cons} | Not adopted |
| C | {Alternative C} | {Pros} | {Cons} | Not adopted |

### Scoring (Optional)

| Dimension | Weight | A | B | C |
|------|-----|---|---|---|
| Team proficiency | 25% | 8 | 6 | 4 |
| Ecosystem | 15% | 9 | 8 | 7 |
| Licensing / cost | 15% | 9 | 9 | 10 |
| Performance | 15% | 7 | 8 | 9 |
| Security | 15% | 9 | 7 | 6 |
| Operations / monitoring | 15% | 8 | 8 | 6 |
| **Weighted total** | | **8.30** | 7.55 | 6.55 |

> Adopt the highest-scoring option. If the gap to the runner-up is < 10%, PM approval is mandatory.

## 4. Consequences

### 4.1 Positive Impacts
- {Positive 1}
- {Positive 2}

### 4.2 Negative Impacts / Costs to Accept
- {Negative 1}
- {Negative 2}

### 4.3 Follow-up Work
- [ ] {Follow-up task 1}
- [ ] {Follow-up task 2}

## 5. Verification / Monitoring

| Item | Measurement Method | Frequency | Threshold |
|------|---------|------|--------|
| {e.g., Response time} | {Load test} | {End of sprint} | {P95 < 500ms} |

## 6. References

- Related code: `src/...`
- Related requirements: REQ-XXX
- Related ADR: ADR-MMM
- External materials: {URL / paper / book}

---

## Change History

| Date | Version | Changes | Author |
|------|------|------|--------|
| {YYYY-MM-DD} | 1.0 | Initial draft | {Author} |
| {YYYY-MM-DD} | 1.1 | {Change description} | {Author} |

---

**Approval**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | {Approver} | | {APPROVED/REJECTED/PENDING} |
