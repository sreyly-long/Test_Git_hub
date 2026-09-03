# Business Requirements — {Project Name}

> **Version**: 1.0
> **Date**: {YYYY-MM-DD}
> **Preceding Document**: [PROJECT-PROPOSAL.md](PROJECT-PROPOSAL.md)
> **Status**: DRAFT / REVIEWED / APPROVED

---

## 1. Overview

This document captures the requirements from a business perspective. Technical elaboration is performed in [REQUIREMENTS-SPEC.md](../requirements/REQUIREMENTS-SPEC.md).

## 2. Business Areas / Domain Definition

| Area | Description | Owning Department |
|------|------|----------|
| {e.g., Remittance processing} | {Business overview} | {Department name} |
| {e.g., Settlement} | {Business overview} | {Department name} |

## 3. Business Rules

| BR-ID | Rule | Basis / Source | Priority |
|-------|------|------------|---------|
| BR-001 | {e.g., Reject transactions with an amount of 0 or less} | {Business manual §3.1} | Must |
| BR-002 | {e.g., Approver sign-off required when limit is exceeded} | {Internal policy §5} | Must |
| BR-003 | {e.g., Start settlement after nightly batch completes} | {Operations procedure manual} | Should |

## 4. Data Lifecycle

| Data | Creation | Modification | Deletion / Destruction | Retention Period |
|--------|------|------|------------|----------|
| {Transaction data} | {When} | {Conditions} | {Destruction procedure} | {7 years} |
| {Customer information} | {When} | {Conditions} | {Destruction procedure} | {5 years after account closure} |

## 5. Permissions / Roles

| Role | Permissions | Scope |
|------|------|------|
| {General user} | {View} | {Own transactions} |
| {Administrator} | {View / create / modify} | {All} |
| {Auditor} | {View / audit logs} | {All (read-only)} |

## 6. External Interfaces (Business Perspective)

| External Party | Business Function | Frequency | SLA |
|------|------|------|-----|
| {e.g., Payment gateway} | {Payment processing} | {Real-time} | {99.9%} |
| {e.g., Credit bureau} | {Credit inquiry} | {Daily batch} | {Next day 09:00} |

## 7. Compliance / Regulations

| Regulation | Applicable | Requirements |
|------|------|---------|
| {Regulation on Supervision of Electronic Financial Transactions} | Y/N | {e.g., Access control / encryption} |
| {Personal Information Protection Act} | Y/N | {PII column encryption / destruction} |
| {Credit Information Act} | Y/N | {Credit information protection} |
| {ISMS-P} | Y/N | {Management system conformance} |
| {PCI-DSS} | Y/N | {Card data protection} |

## 8. Operations Policy

### 8.1 Availability
- Service hours: {e.g., 24/7 / weekdays 06:00-22:00}
- Scheduled maintenance window: {e.g., 1st Saturday of each month 02:00-04:00}

### 8.2 Backup / Recovery
- Backup frequency: {Daily / hourly}
- RTO (Recovery Time Objective): {e.g., 1 hour}
- RPO (Recovery Point Objective): {e.g., 5 minutes}

### 8.3 Monitoring
- Monitoring targets: {List of metrics}
- Alert channels: {Slack / SMS / Email}

---

**Approval History**
| Date | Approver | Comments | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | {Name} | | {APPROVED/REJECTED/PENDING} |
