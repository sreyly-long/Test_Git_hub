---
name: 06-finalize-deliverables
description: Finalize the deliverable list and formats via a 1:1 conversation before writing. Automatically assemble deliverables for the analysis/design/implementation/validation phases in each format (md/pdf/pptx/hwp/docx/png).
when_to_use: After Skill 5 approval is complete (G3 passed). Final deliverable authoring phase.
phase: 4
lead_agent: docs-writer
support_agents:
  - architect
  - qa-engineer
  - security-auditor
  - trace-mapper
outputs:
  - deliverables/
  - deliverables/INDEX.md
---

# Skill 06 — Finalize Deliverables

> **Purpose**: At project close, automatically produce the deliverables each audience needs — people, systems, executives, and the operations team — in the appropriate format for each.
> **Duration**: 1–3 days
> **Prerequisite**: Skill 5 (G3 release gate passed)
> **Next**: Project closure / handover to operations

---

## 0. Responsible Agents

| Role | Agent | Responsibility |
|------|----------|------|
| Lead | `docs-writer` | Finalize the per-audience deliverable list, assemble documents, convert formats, write the INDEX |
| Support | `architect` | Review architecture overview, ADR summaries, and technical decision explanations |
| Support | `qa-engineer` | Confirm final versions of QA / parity / test reports |
| Support | `security-auditor` | Confirm security audit / regulatory compliance / prod-gate evidence |
| Support | `trace-mapper` | Final check of requirements-code-test-deliverable traceability |

> The Lead agent confirms deliverable audiences and formats with the PM, and finalizes deliverables/INDEX.md after Support reviews are complete.

## 1. Procedure

```
[A] Finalize the deliverable list via 1:1 conversation
    │   - The human specifies the deliverables
    │   - The AI suggests missing items (based on the §4 standard list)
    │   - Specify a format per deliverable (md / pdf / pptx / hwp / docx / png / xlsx)
    │
    ▼
[B] Automatically assemble deliverables by phase
    │   - Analysis: Skill 1, 2 deliverables
    │   - Design: Skill 3 deliverables
    │   - Implementation: Skill 4 deliverables
    │   - Validation: Skill 5 deliverables
    │
    ▼
[C] Format conversion
    │   - md → pdf : weasyprint / pandoc
    │   - md → pptx : python-pptx
    │   - md → docx : pandoc
    │   - md → hwp : pandoc + hwp conversion tool (Hancom converter)
    │   - Images : Pillow (screenshots and diagrams)
    │
    ▼
[D] Readability review
    │   - Attach a glossary
    │   - Separate by audience (executives / engineers / operations team)
    │
    ▼
[E] Write INDEX.md → PM final confirmation → distribute
```

## 2. Standard Deliverable List (checklist)

| Category | Deliverable | Default format | Audience |
|------|--------|----------|------|
| **Planning** | Project proposal | md + pdf | PM / client |
| **Planning** | Business requirements | md | PM |
| **Analysis** | Requirements specification | md + pdf | All staff |
| **Analysis** | Use case specifications | md | Dev / QA |
| **Analysis** | Requirements traceability matrix | csv + md | Audit |
| **Design** | Development plan | md + pdf | PM / Leader |
| **Design** | Test plan | md + pdf | QA |
| **Design** | ADR collection | md | Architects |
| **Design** | Architecture overview | md + png (Mermaid) | Executives / new staff |
| **Design** | Risk register | md | PM |
| **Implementation** | Source tree (zip or git tag) | source | Operations |
| **Implementation** | C↔Java or requirements↔code traceability matrix | csv + md | Audit |
| **Implementation** | API specification (OpenAPI) | yaml + md | Integration teams |
| **Implementation** | Consolidated sprint logs | md | PM |
| **Validation** | QA test report | md + pdf | PM |
| **Validation** | Code review report | md | Dev |
| **Validation** | Security audit report | md + pdf | Information security |
| **Validation** | Cross-validation report (CVSS) | md | Executives / information security |
| **Validation** | Parity report (if applicable) | md + csv | QA / audit |
| **Operations** | Runbook | md | Operations team |
| **Operations** | Cutover / rollback procedures | md | Operations team |
| **Operations** | Monitoring dashboard specification | md + png | Operations team |
| **Operations** | Incident postmortem (if any occurred) | md | Operations / information security |
| **Implementation** | Consolidated sprint retrospectives | md | PM / Leader |
| **Executive reporting** | Executive report (summary) | pptx + pdf | Executives |
| **Executive reporting** | Executive report (detailed) | pptx + pdf | Executives / information security |

## 3. Format Conversion Tools

| Conversion | Tool | Notes |
|------|------|------|
| md → pdf | weasyprint, pandoc + wkhtmltopdf | Embed a CJK font (e.g. Malgun Gothic) only if the document contains Korean text |
| md → pptx | Marp (`marp deck.md -o deck.pptx`) or python-pptx | Slide separator `---` / state the splitting rules explicitly |
| md → docx | pandoc | Word-compatible |
| md → hwp | pandoc → docx → Hancom Office conversion | Direct hwp conversion is limited |
| png generation | Pillow, mermaid-cli, plantuml | Diagrams + compositing |
| xlsx | openpyxl | csv → xlsx conversion |

## 4. Standard 1:1 Conversation Questions

| # | Question | Input |
|---|------|------|
| 1 | Who are the final audiences of this project's deliverables? | Client / executives / operations team / audit / external |
| 2 | Which format best suits each audience? | md / pdf / pptx / hwp / docx |
| 3 | Is an executive report needed? | Y/N → if Y, presentation time / length |
| 4 | Are operations handover materials needed? | Y/N → if Y, runbook + cutover procedures |
| 5 | Are audit / regulatory compliance materials needed? | Y/N → if Y, traceability matrix + security audit |
| 6 | Are any deliverables missing from this standard list? | Free-form user input |
| 7 | What is the deliverable retention period? | Permanent / 7 years / 3 years / 1 year |

> **Question criteria**: All 7 questions above are **CQ1 (required inputs for deliverable assembly)**. Criteria definition: HARNESS-PROCESS-STANDARD §4.8.

## 5. INDEX.md Format

```markdown
# Deliverables INDEX

| Category | Deliverable | File | Format | Audience | Date | Approver | Status |
|------|--------|------|------|------|--------|--------|------|
| Planning | Project proposal | deliverables/01-planning/PROJECT-PROPOSAL.pdf | PDF | Client | 2026-01-15 | PM | APPROVED |
| ... |
```

## 6. Inputs

- All deliverables from Skills 1–5 (accumulated over the full cycle)
- PM available for a 1:1 conversation

## 7. Outputs

- All final versions placed together under the `deliverables/` directory
- `deliverables/INDEX.md` — deliverables catalog
- `deliverables/01-planning/`, `02-analysis/`, `03-design/`, `04-implementation/`, `05-validation/`, `06-ops/`, `07-executive/` (folders per category)

## 8. Definition of Done (DoD)

- [ ] INDEX.md matches the actual files 1:1
- [ ] Deliverable list and formats finalized via a 1:1 conversation with the PM
- [ ] All deliverables given final PM confirmation (signature/seal or digital approval)
- [ ] Executive report rehearsed by the human presenter (if applicable)
- [ ] Operations handover materials reviewed by the operations team (if applicable)

## 9. Readability Standards

| Item | Rule |
|------|----|
| Glossary | Collect all abbreviations and technical terms in `glossary.md` |
| For executives | Slides ≤ 12 + appendix / one-line summaries / plain English `[basis:industry-convention,adjustable]` |
| For engineers | Code examples + Mermaid + ADR links |
| For the operations team | Step-by-step commands + troubleshooting + contact list |
| For audit | Traceability matrix + approval history + retention periods |

## 10. Additional Deliverables for the Financial Sector

| Deliverable | Format | Audience |
|--------|------|------|
| Compliance matrix for the Regulation on Supervision of Electronic Financial Transactions | md + xlsx | FSS / information security |
| ISMS-P certification materials | md | Certification assessors |
| PII handling procedures | md + pdf | Personal Information Protection Commission |
| Key management procedures | md | Information security |
| Audit log retention and access procedures | md | Audit |
| BCP / rollback scenarios | md | Operations / executives |
