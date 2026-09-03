# Sprint {N} Log

> **Sprint number**: {N}
> **Period**: {YYYY-MM-DD ~ YYYY-MM-DD}
> **Leader**: {Leader agent name}
> **PM approval date**: {YYYY-MM-DD}
> **Status**: IN_PROGRESS / COMPLETED / ESCALATED

---

## 1. Sprint Goals

Core Epics / goals for this sprint:
- {Epic 1}
- {Epic 2}

Target REQ-IDs:
- FR-XXX-001 ~ FR-XXX-005
- NFR-PERF-01

## 2. Task Breakdown (DAG)

| Task ID | Title | Assigned Agent | Model | Depends On | Status |
|---------|------|--------------|------|------|------|
| T-{N}-01 | {task title} | backend-developer-1 | Sonnet | - | DONE |
| T-{N}-02 | {task title} | backend-developer-2 | Sonnet | T-{N}-01 | DONE |
| T-{N}-03 | {task title} | adapter-builder | Sonnet | - | DONE |
| T-{N}-04 | {task title} | qa-engineer | Haiku | T-{N}-01, 03 | DONE |
| T-{N}-05 | {task title} | code-reviewer | Opus | T-{N}-01~04 | DONE |

## 3. Sprint Results

### 3.1 Completed Items
- [x] T-{N}-01
- [x] T-{N}-02

### 3.2 Carried-Over Items
- [ ] T-{N}-NN ({reason for carry-over})

### 3.3 ADRs Raised
| ADR ID | Title | Reason |
|--------|------|------|
| ADR-{NNN} | {title} | {design change / new decision} |

## 4. 7-Dimension Self-Assessment

| Dimension | Score (0~100) | Weighted Score | Comment |
|------|------------|----------|--------|
| Completeness (20%) | 95 | 19 | Tasks 100% |
| Traceability (15%) | 90 | 13.5 | 0 missing // source comments |
| Security (20%) | 92 | 18.4 | Hook L1/L2 passed |
| Performance (10%) | 88 | 8.8 | NFR-PERF-01 met |
| Readability (15%) | 90 | 13.5 | Javadoc standard followed |
| Standards compliance (10%) | 95 | 9.5 | 0 directory isolation violations |
| Test coverage (10%) | 85 | 8.5 | Line 82% / branch 73% |
| **Overall** | | **91.2** | **PASS (≥ 90)** |

### Retry Count
- Regeneration count for this sprint: {0~5}
- Still below threshold after 5 attempts: N/A

## 5. CI / Test Results

| Item | Result |
|------|------|
| Build | PASS / FAIL |
| Unit tests | {NNN}/{NNN} PASS |
| Integration tests | {NN}/{NN} PASS |
| Parity (if applicable) | {NN}/{NN} PASS |
| Coverage (line) | 82% |
| Coverage (branch) | 73% |

## 6. Alert History

| Time | Event | Channel |
|------|--------|------|
| {YYYY-MM-DD HH:MM} | Sprint started | TEAM_CHANNEL |
| {YYYY-MM-DD HH:MM} | T-{N}-NN 7-dimension score < 90 | LEADER_BROADCAST |
| {YYYY-MM-DD HH:MM} | Sprint ended | TEAM_CHANNEL |

## 7. Risks / Issues

| ID | Description | Impact | Response |
|----|------|------|------|
| ISSUE-001 | {issue summary} | M | {response plan} |

## 8. Next Sprint Plan

- Carried-over tasks: T-{N}-NN
- Priority Epic: {next Epic}
- Additional risk monitoring: {risk ID}

---

**PM Approval**
| Date | Approver | Comment | Status |
|------|--------|------|------|
| {YYYY-MM-DD} | PM | | {APPROVED/REJECTED/PENDING} |
