# Incident Postmortem — INC-{YYYYMMDD-NN}

> **When to write**: after an operational incident, security incident, deployment rollback, or data incident (recommended within 5 business days of resolution)
> **Linked to**: `05-quality-review` (recurring defects) / `06` Runbook / security incidents reported to Information Security
> **Principle**: **Blameless** analysis. Not "who", but "what made it possible".

---

## 1. Summary

| Item | Value |
|------|----|
| Incident ID | INC-{YYYYMMDD-NN} |
| Severity | SEV1 / SEV2 / SEV3 |
| Occurred ~ Detected ~ Resolved | {time} ~ {time} ~ {time} (total {minutes}) |
| Impact | {users/transactions/data scope, whether subject to regulatory reporting} |
| Author / Approval | {name} / PM · Information Security (for security incidents) |

## 2. Timeline

| Time | Event | Source (logs/alerts) |
|------|--------|-----------------|
| | {incident occurred} | |
| | {detected} | |
| | {response started} | |
| | {resolved} | |

## 3. Impact

- Users/transactions: {…}
- Data: {PII/financial impact, integrity impact}
- Regulatory: {reporting obligations under the Electronic Financial Supervisory Regulations / Personal Information Protection Act}

## 4. Root Cause (5 Whys)

1. Why? → …
2. Why? → …
3. Why? → …
4. Why? → …
5. Why? → **{root cause}**

> Contributing factors: {code defect / configuration / deployment procedure / monitoring gap / missing guardrails …}

## 5. Detection & Response Assessment

| Question | Answer |
|------|----|
| Could it have been detected sooner? | |
| Why did the guardrails (gates/Hooks/7-dimension/cross-validation) fail to prevent it? | |
| Did rollback/recovery work as planned? | |

## 6. Recurrence Prevention Actions

| ID | Action | Type (code/rule/monitoring/training) | Owner | Due | Link (ADR/skill/rule) |
|----|------|------------------------------|------|------|--------------------|
| PM-{ID}-01 | {e.g., add check X to L1/L2, rule Y to 04} | | | | |

## 7. Definition of Done (DoD)

- [ ] Timeline + impact + root cause (5 Whys) documented
- [ ] Explicit analysis of "why the guardrails failed to prevent it"
- [ ] Prevention actions have owner and due date; standard/skill changes linked to history
- [ ] Regulated incidents reported to Information Security/PM
