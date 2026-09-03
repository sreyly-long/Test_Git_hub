# Use Case UC-{NNN}: {Scenario Title}

> **REQ-ID**: UC-{NNN}
> **Version**: 1.0
> **Preceding Document**: [REQUIREMENTS-SPEC.md](../REQUIREMENTS-SPEC.md)

---

## 1. Scenario Overview

| Item | Description |
|------|------|
| **Primary User** | {e.g., General user} |
| **Preconditions** | {e.g., Logged in} |
| **Trigger** | {Starting condition} |
| **Outcome (Success)** | {Expected result} |
| **Outcome (Failure)** | {Exception result} |
| **Related FR** | FR-XXX, FR-YYY |
| **Related BR** | BR-001 |

## 2. Main Flow

| Step | Actor | Action | System Response |
|------|------|------|------------|
| 1 | User | {e.g., button click} | {Screen transition} |
| 2 | User | {Input} | {Validation} |
| 3 | System | {Query / processing} | {Display results} |
| 4 | User | {Confirmation} | {Next step} |

## 3. Alternative Flow

### 3.1 A-1: {Alternative condition}
- Branches at Step N
- Action: {Alternative action}
- Outcome: {Alternative result}

## 4. Exception Flow

### 4.1 E-1: {Exception condition}
- Occurs at Step N
- Action: {Error handling}
- Outcome: {Recovery or termination}

### 4.2 E-2: External System Failure
- When it occurs: External API call
- Action: Retry 3 times → on failure, enqueue → alert operations
- Outcome: Notify the user of a processing delay

## 5. Non-Functional Requirements Mapping

| NFR-ID | Application |
|--------|------|
| NFR-PERF-01 | Step 3 response P95 < 500ms |
| NFR-SEC-AUTH | Session validation on entry at Step 1 |
| NFR-SEC-PII | PII displayed masked on input at Step 2 |

## 6. Screen Mockup (if applicable)

```
{ASCII wireframe or attached image}
```

## 7. Test Scenarios

| Test ID | Case | Input | Expected Result |
|-----------|--------|------|---------|
| TC-{NNN}-01 | Happy path | {Valid input} | {Normal result} |
| TC-{NNN}-02 | Missing input | {Empty value} | {Validation error} |
| TC-{NNN}-03 | External failure | {Mocked failure} | {Enqueued + alert} |
