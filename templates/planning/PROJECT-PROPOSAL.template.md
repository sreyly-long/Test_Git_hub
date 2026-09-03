# Project Proposal — {Project Name}

> **Version**: {1.0}
> **Date**: {YYYY-MM-DD}
> **Author**: {PM name}
> **Approver**: {Approver name / title}
> **Status**: DRAFT / REVIEWED / APPROVED

---

## 1. One-Line Project Definition

> {Express the essence of the project in a single sentence}

## 2. Business Background / Problem

### 2.1 Why Now
{Market environment / competition / regulation / internal demand}

### 2.2 Problem to Solve
{What problem exists today, and what loss occurs if it is not solved}

### 2.3 Core Value Proposition
{The core value users/the organization gain — 1 to 3 lines}

## 3. Users / Personas

| User | Persona | Primary Usage Scenario |
|--------|---------|----------------|
| Primary | {e.g., Closing accountant - age 35 - 5 years of accounting experience} | {Scenario summary} |
| Secondary | {e.g., Audit officer} | {Scenario summary} |
| Operations | {e.g., System administrator} | {Scenario summary} |

## 4. Core Scenarios (MVP Scope)

| # | Scenario | User | Outcome |
|---|---------|--------|------|
| 1 | {Scenario summary} | {Primary} | {Expected outcome} |
| 2 | {Scenario summary} | {Primary} | {Expected outcome} |
| 3 | {Scenario summary} | {Secondary} | {Expected outcome} |

## 5. Screens / Menu Structure

### 5.1 Menu Tree (if applicable)

```
{Project Name}
├─ Dashboard
├─ Transaction Inquiry
│  ├─ Daily
│  └─ Monthly
├─ Master Data Management
└─ Operations Management
```

### 5.2 Screen Mockups / Wireframes
{Attach images or reference an appendix}

## 6. External System Integrations

| # | System | Protocol | Direction | Notes |
|---|--------|---------|------|------|
| 1 | {e.g., Payment gateway KFTC} | REST + OAuth2 | Outbound | 2M transactions/day |
| 2 | {e.g., Internal ERP} | DB Link | Inbound | Nightly batch |
| 3 | {e.g., BNPP head office} | IBM MQ / TCP | Bidirectional | Real-time |

## 7. Non-Functional Requirements (NFR Baseline)

| Area | Requirement | Unit of Measure |
|------|---------|----------|
| Performance | {e.g., Transaction response P95 < 500ms} | ms |
| Availability | {99.9% SLA} | uptime % |
| Security | {Compliance with the Regulation on Supervision of Electronic Financial Transactions} | Regulation |
| Scalability | {Process 10M transactions/day} | TPS |
| Operations | {Retain audit logs for 7 years} | Retention period |

## 8. Constraints

| Category | Description |
|------|------|
| Schedule | {e.g., Cutover required by 2026-12} |
| Budget | {Amount or range} |
| Staffing | {Team composition / outsourcing feasibility} |
| Technology | {e.g., Java 17 mandatory / Spring Boot 3.x} |
| Operations | {e.g., Keep rollback possible for 72 hours after cutover} |

## 9. Success Metrics (KPI)

| KPI | Target | Measurement Method |
|-----|------|---------|
| {e.g., Faster transaction processing} | {30% improvement} | {Compare average response times} |
| {e.g., Reduced operating costs} | {50% annual reduction} | {Sum of monthly operating costs} |

## 10. Pre-Identified Risks / Assumptions

### Assumptions
- {e.g., 100% of legacy C system source code can be handed over}
- {e.g., Operations team available 24/7}

### Risks (details refined in risk-register.md of Skill 3)
| ID | Risk | Impact | Probability |
|----|------|------|------|
| RISK-001 | {Summary} | H/M/L | H/M/L |

## 11. Technology Stack Preferences (Reference only — finalized in ADR-001)

| Area | Preference |
|------|------|
| Language / Runtime | {e.g., Java 17} |
| Framework | {e.g., Spring Boot 3.4} |
| DB | {e.g., PostgreSQL 16} |
| Messaging | {e.g., RabbitMQ / IBM MQ} |
| CI/CD | {e.g., GitHub Actions / Jenkins} |

## 12. Approvals / Governance

### Approval Gate Mapping

| Gate | Timing | Approver |
|--------|------|--------|
| G1 Analysis | Skill 2 complete | PM |
| G2 Design | Skill 3 complete | PM + Architect |
| G3 Release | Skill 5 complete | PM + InfoSec + Operations |

### Regular Reporting
| Frequency | Audience | Format |
|------|------|------|
| Weekly | PM | md |
| Biweekly | Executives | pptx (summary) |
| Monthly | Client | pptx + pdf |

---

## Appendix A. Glossary

| Term | Definition |
|------|------|
| {Term} | {Definition} |

## Appendix B. References / Materials

- {Legacy system manuals / business documents, etc.}

---

**Approval History**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | {Name} | {Comments} | {APPROVED/REJECTED/PENDING} |
