# Standard Harness Process for IT Development Projects (Harness Process Standard)

> **Version**: 1.5
> **Date written**: 2026-05-29
> **Last updated**: 2026-06-15
> **Basis**: One-month field validation on the Société Générale Gateway (sg-gw) C → Java/Spring Boot 3 migration + the attached standard harness composition proposal
> **Scope**: New or renewal IT development projects (backend, full-stack, migration, data)
> **Collaboration model**: Team-with-Leader (defined in §4 of this document)

---

## 0. Position of This Document

This document is the master definition of the **standard development harness process**. It organizes the assets field-validated over one month on the sg-gw project into 8 standard skills (6 execution skills + 1 validation skill + 1 validation remediation guide) and a 5-step usage flow.

| sg-gw validated asset | Where it is reflected in this standard |
|----------------|--------------------|
| 16 sub-agents (Phase 1~4 + always-on) | §4 Agent team composition |
| 38 ADRs (architecture decision records) | §5 Mandatory code-generation items / §6 SG Gateway case study |
| 3 phase gates (1→2 / 2→3 / release) | §3 Skill specifications / §4.5 Human approval gates |
| 1:1 directory permission isolation | §4.4 Work conflict prevention |
| Claude → Codex → Claude cross-validation (CVSS 9.8 blocked pre-release) | §3 Skill 5 / §6 |
| 7-dimension self-evaluation (90 points / max 5 iterations) | §3 Skill 4 / §4.6 |
| 3-level security hooks (L1 pre-commit / L2 CI / L3 prod-gate) | §5.4 |
| Parity testing (byte-level C↔Java equivalence) + ArchUnit | §5.5 |
| English Javadoc readability standard | §5.6 |

---

## 1. User Application Flow — 5 Steps

The standard 5 steps for applying this standard harness to a new development project.

```
[1] Download the harness project (PC)
        │
        │  Git clone or zip download
        ▼
[2] Copy into the development project directory
        │
        │  Copy .claude/ / templates/ / hooks/ / scripts/ etc. in one pass
        ▼
[3] Run an AI tool in the development project
        │
        │  Claude Code · Codex · Cursor, etc.
        ▼
[4] Analysis & design phase — run skills ① ② ③ in sequence
        │
        │  ① Write the project proposal
        │  ② Write the requirements specification (1:1 dialogue)
        │  ③ Write the development plan + test plan
        ▼
[5] Implementation, QA & deliverables phase — run skills ④ ⑤ ⑥ in sequence
        │
        │  ④ Project implementation (autonomous agent team + self-evaluation loop)
        │  ⑤ Quality / code review (QA team + Codex cross-validation)
        │  ⑥ Produce final deliverables (md / ppt / pdf / hwp / word / image)
        ▼
[Project complete] Final PM approval → release
```

### 1.1 Time Required per Step (estimated from sg-gw)

| Step | Duration (small) | Duration (medium/large) | Notes |
|------|--------------|------------------|------|
| ①+②+③ (analysis & design) | 1~2 days | 3~5 days | Depends on number of 1:1 dialogue rounds |
| ④ (implementation) | 2~4 weeks | 1~3 months | Per sprint |
| ⑤ (QA / review) | 3~5 days | 1~2 weeks | Includes cross-validation rounds |
| ⑥ (deliverables) | 0.5~1 day | 1~3 days | Proportional to format variety and volume |

---

## 2. Harness Project Package Structure

The standard directory structure of the package the user downloads in step `[1]`.

```
harness-standards/                          # Root of this package
├── HARNESS-PROCESS-STANDARD.md             # This document (master definition)
├── PACKAGE-INDEX.md                        # Full asset catalog
├── README.md                               # Entry point + application guide
├── .claude/                                # AI tool assets (copied on download)
│   ├── skills/                             # 8 standard skills (6 execution + 1 validation + 1 assistant)
│   │   ├── 01-plan-project/
│   │   │   └── SKILL.md
│   │   ├── 02-define-requirements/
│   │   │   └── SKILL.md
│   │   ├── 03-draft-dev-plan/
│   │   │   └── SKILL.md
│   │   ├── 04-implement/
│   │   │   └── SKILL.md
│   │   ├── 05-quality-review/
│   │   │   └── SKILL.md
│   │   ├── 06-finalize-deliverables/
│   │   │   └── SKILL.md
│   │   ├── 07-validate-standard/
│   │   │   └── SKILL.md
│   │   └── 08-harness/
│   │       └── SKILL.md
│   └── agents/                             # Team agent definitions (13 types)
│       ├── _team-leader.md
│       ├── legacy-analyst.md
│       ├── doc-spec-parser.md
│       ├── data-model-designer.md
│       ├── architect.md
│       ├── backend-developer.md
│       ├── frontend-developer.md           # Web publishing / UI / accessibility
│       ├── adapter-builder.md
│       ├── code-reviewer.md
│       ├── qa-engineer.md
│       ├── security-auditor.md
│       ├── docs-writer.md
│       └── trace-mapper.md
├── templates/                              # Deliverable templates
│   ├── planning/
│   │   ├── PROJECT-PROPOSAL.template.md    # Project proposal template
│   │   └── BUSINESS-REQUIREMENTS.template.md
│   ├── requirements/
│   │   ├── REQUIREMENTS-SPEC.template.md   # Requirements specification
│   │   └── USE-CASE.template.md
│   ├── design/
│   │   ├── DEV-PLAN.template.md            # Development plan
│   │   ├── TEST-PLAN.template.md           # Test plan
│   │   └── ADR.template.md                 # ADR form
│   ├── implementation/
│   │   ├── SPRINT-LOG.template.md
│   │   └── TRACE-CSV.template.csv          # C↔Java or requirements↔code mapping
│   ├── qa/
│   │   ├── REVIEW-REPORT.template.md
│   │   ├── CROSS-VALIDATION.template.md    # Codex cross-validation report
│   │   └── SECURITY-AUDIT.template.md
│   └── deliverables/
│       ├── EXEC-SUMMARY.template.md
│       ├── RUNBOOK.template.md
│       └── ARCHITECTURE-OVERVIEW.template.md
├── hooks/                                  # 3-level security hooks + common rules
│   ├── pre-commit-gitleaks.sh              # L1
│   ├── gitleaks.toml                       # L1/L2 base ruleset
│   ├── ci-security-auditor.yml             # L2 (GitHub Actions / GitLab CI)
│   └── prod-gate-checklist.md              # L3
└── scripts/                                # Operational helper scripts
    ├── parity-check.sh                     # C↔Java or v1↔v2 equivalence verification
    └── generate-codecs.sh                  # Schema-based code generation (optional)
```

### 2.1 Download → Copy Command Example

```bash
# [1] Download (if using Git)
git clone -b harness-standards --single-branch https://github.com/Socheat-Hun/jexmcp3.0.git harness-standards

# [2] Copy into the new development project
HARNESS=./harness-standards   # Clone location (any path)
PROJ=~/workspaces/project/my-new-project
mkdir -p $PROJ/docs
cp -r $HARNESS/.claude $PROJ/
cp $HARNESS/HARNESS-PROCESS-STANDARD.md $PROJ/docs/
cp -r $HARNESS/templates $PROJ/
cp -r $HARNESS/hooks $PROJ/
cp -r $HARNESS/scripts $PROJ/

# [3] Initialize git + install the L1 hook
cd $PROJ
git init -b main
cp hooks/pre-commit-gitleaks.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# [4] Run the AI tool (from the development project directory)
# Start from /08-harness if needed
# Choose one of Claude Code · Codex · Cursor
```

---

## 3. Specifications of the 8 Standard Skills (6 execution + 1 validation + 1 assistant)

Each skill follows the `.claude/skills/<id>/SKILL.md` format (Claude Code Skill spec). The same SKILL.md can also be injected as a system prompt into other AI tools such as Codex and Cursor.

When each Skill runs, a `lead_agent` acts as the single owner while `support_agents` provide domain-specific review. The Lead is responsible for dialogue with the PM, integrating deliverables, and judging gate readiness. Supports leave evidence and review results within their own write scope and report to the Lead.

### 3.0 Standard Skill Owner Assignment

| Skill | Lead Agent | Support Agents |
|-------|------------|----------------|
| `01-plan-project` | `docs-writer` | `doc-spec-parser`, `security-auditor`, `trace-mapper` |
| `02-define-requirements` | `trace-mapper` | `doc-spec-parser`, `docs-writer`, `security-auditor` |
| `03-draft-dev-plan` | `architect` | `data-model-designer`, `qa-engineer`, `security-auditor`, `trace-mapper` |
| `04-implement` | `team-leader` | `backend-developer`, `frontend-developer`, `adapter-builder`, `qa-engineer`, `code-reviewer`, `security-auditor`, `trace-mapper` |
| `05-quality-review` | `security-auditor` | `code-reviewer`, `qa-engineer`, `trace-mapper` |
| `06-finalize-deliverables` | `docs-writer` | `architect`, `qa-engineer`, `security-auditor`, `trace-mapper` |
| `07-validate-standard` | `code-reviewer` | `security-auditor`, `trace-mapper`, `docs-writer` |
| `08-harness` | `team-leader` | `code-reviewer`, `docs-writer` |

If the project has a role not covered by the standard agents, a dedicated agent may be added to the project-local `.claude/agents/` after PM approval. However, `write_dirs`, `phase`, `recommended_llm`, and the assigned Skill must be declared in the frontmatter, and if its write scope overlaps with an existing agent, `07-validate-standard` records it as WARN or higher.

### 3.1 Skill 1 — Write the Project Proposal

**Skill ID**: `01-plan-project`
**Activation condition (when_to_use)**: At the start of a new project, when no planner is available or the proposal needs remediation
**Duration**: 2~6 hours (depends on number of 1:1 dialogue rounds)

**Inputs**
- (Optional) Existing proposal / screen mockups / business requirement text
- (Optional) Client and stakeholder interview notes

**1:1 Dialogue Flow (standard 12 questions when no planner is available)**

| # | Question | Decision item |
|---|------|-----------|
| 1 | One-line project definition | Vision / mission |
| 2 | Business problem (why now?) | Core value proposition |
| 3 | Primary users / personas | Primary / secondary users |
| 4 | Core scenarios (TOP 3 use cases) | MVP scope |
| 5 | Screen / menu structure (attach if available) | UI categories |
| 6 | External integrations (list if any) | Early identification of interface specs |
| 7 | Non-functional requirements (performance, security, regulation) | NFR baseline |
| 8 | Schedule / budget / staffing constraints | Basis for scope adjustment |
| 9 | Success metrics (KPIs) | Measurement method |
| 10 | Risks / assumptions | Pre-identified risk list |
| 11 | Technology stack preferences | Input for subsequent ADRs |
| 12 | Approval / governance structure | Mapping to human approval gates |

> **Principle**: Do not throw all 12 questions at once — **ask one question at a time in a 1:1 exchange, capture the answer, then move to the next question**. The AI may dynamically adapt or skip subsequent questions based on the answers.

**Output deliverables**
- `docs/planning/PROJECT-PROPOSAL.md` — Proposal body based on the 12-question answers
- `docs/planning/BUSINESS-REQUIREMENTS.md` — Business requirements (handwritten or auto-generated by this skill)
- `docs/planning/stakeholder-map.md` — Stakeholder map (optional)

**Definition of Done (DoD)**
- [ ] All 12 questions answered or explicitly marked `[DEFERRED]`
- [ ] First-pass review by the PM (human)
- [ ] Ready to enter Skill 2

---

### 3.2 Skill 2 — AI Requirements Specification (refined via 1:1 dialogue)

**Skill ID**: `02-define-requirements`
**Activation condition**: Skill 1 complete (PROJECT-PROPOSAL.md exists)
**Duration**: 4~12 hours

**Procedure**
1. **Analysis** — Auto-parse Skill 1 deliverables → identify specification gaps and contradictions
2. **1:1 dialogue** — Query the PM/planner sequentially on identified gaps
3. **Refinement** — Organize into 3 categories: Functional / Non-Functional / Constraint
4. **Traceability mapping** — Assign REQ-IDs (e.g., `FR-001`, `NFR-AUTH-01`)

**Output deliverables**
- `docs/requirements/REQUIREMENTS-SPEC.md` — Requirements specification body
- `docs/requirements/use-cases/*.md` — Use case specifications (per scenario)
- `docs/requirements/requirements-matrix.csv` — REQ-ID × source × priority × traceability matrix
- `docs/requirements/questions-log.md` — `[UNKNOWN]` / `[AMBIGUOUS]` items + PM response history

**Refinement enforcement rules**
- Ambiguous requirements must be marked `[AMBIGUOUS]` + ≥ 2 candidate options + a PM response request
- Unmeasurable NFRs (e.g., "fast") are converted into SLA figures (e.g., P95 response < 500 ms)
- Every requirement must map to at least 1 use case (no orphans)

**Definition of Done (DoD)**
- [ ] REQ-ID assignment complete / 0 orphans
- [ ] All `[AMBIGUOUS]` items answered by the PM or explicitly deferred
- [ ] PM approval: **Analysis gate passed**

---

### 3.3 Skill 3 — Write the Development Plan + Test Plan

**Skill ID**: `03-draft-dev-plan`
**Activation condition**: Skill 2 complete (REQUIREMENTS-SPEC.md approved)
**Duration**: 1~3 days

**Procedure**
1. **Requirements decomposition** → Epic / Sprint / Task tree
2. **Technology stack decision** → ≥ 2 candidates + selection rationale → auto-generate **ADR-001**
3. **Architecture draft** → Component diagram + candidate DB schema
4. **Test strategy** → Unit / integration / E2E / parity (for migrations) plan
5. **Staffing / schedule / risk** → Sprint plan + risk register

**Output deliverables**
- `docs/design/DEV-PLAN.md` — Development plan (stack / schedule / staffing / risks)
- `docs/design/TEST-PLAN.md` — Test plan (strategy / coverage targets / tools)
- `docs/design/architecture-overview.md` — Architecture draft (including Mermaid diagrams)
- `docs/design/adr/ADR-001-tech-stack.md` — First ADR (starting point for the ADR accumulation)
- `docs/design/risk-register.md` — Risk register with ≥ 10 entries

**Standard structure of the test plan**
- Unit tests: coverage targets (e.g., line ≥ 80%, branch ≥ 70%)
- Integration tests: mock policy for external dependencies (DB / MQ / API)
- 7-dimension self-evaluation threshold (default 90 points)
- Parity tests (migration projects only): byte-level equivalence
- Security tests: OWASP / static analysis / secret scanning

**Definition of Done (DoD)**
- [ ] DEV-PLAN.md / TEST-PLAN.md approved by the PM
- [ ] ADR ≥ 1 registered (stack decision)
- [ ] Sprint 1 task list finalized (agreed by PM and Leader)
- [ ] PM approval: **Design gate passed**

---

### 3.4 Skill 4 — Project Implementation (autonomous agent team + self-evaluation loop)

**Skill ID**: `04-implement`
**Activation condition**: Skill 3 complete (DEV-PLAN.md / TEST-PLAN.md approved)
**Duration**: Repeated per sprint (1 sprint = 1~2 weeks recommended)

**Procedure**

```
Sprint start
  │
  ▼
[A] Skeleton generation (once only)
  │   - Directory tree / build scripts / CI pipeline
  │   - 1:1 directory permission mapping (an independent write directory per agent)
  │
  ▼
[B] Task dispatch (performed by the Team Leader agent)
  │   - DAG analysis → identify parallelizable tasks
  │   - Select the appropriate LLM model (see §4.3)
  │   - Assign conflict-free directories
  │
  ▼
[C] Autonomous agent implementation
  │   - Implementation + unit tests + // source: comments + ADR (on changes)
  │   - Report results to TEAM_CHANNEL
  │
  ▼
[D] Automated testing by the QA agent
  │   - Run unit/integration tests per the test plan
  │   - Feed results back → agent self-correction loop
  │
  ▼
[E] 7-dimension self-evaluation (performed by the Leader)
  │   - Completeness 20 / Traceability 15 / Security 20 / Performance 10 / Readability 15 / Standards compliance 10 / Test coverage 10
  │   - Below 90 points → focused remediation of the lowest dimension → regenerate (max 5 times)
  │   - Still below after 5 attempts → PM Escalation
  │
  ▼
[F] Sprint end
      - Leader delivers a consolidated report → PM approval → next sprint or enter Skill 5
```

**Mandatory enforced items** (see §5 Mandatory code-generation items)

| Item | Content | Verification tool |
|------|------|---------|
| `// source:` comments | State the legacy origin when migrating | code-reviewer manual + grep |
| ADR authoring | Mandatory on design changes | code-reviewer review |
| English Javadoc | Standard for classes/methods | code-reviewer |
| BigDecimal for monetary amounts | `double`/`float` prohibited | ArchUnit / Checkstyle |
| PII masking | No plaintext logging of real data | security-auditor |
| Zero hardcoded secrets | Externalize API keys / passwords from code | L1 Hook (gitleaks) |
| Conventional Commits | `feat:`/`fix:`/`docs:` + team ID scope | commit hook |

**Output deliverables**
- `src/` — Implementation code
- `tests/` — Test code (unit / integration / E2E)
- `docs/design/adr/ADR-NNN-*.md` — ADRs produced during the sprint
- `docs/sprints/SPRINT-N-LOG.md` — Sprint log (written by the Leader)
- `mapping/trace/c2j.csv` or `requirements-trace.csv` — Updated traceability matrix

**Definition of Done (DoD)**
- [ ] Sprint tasks 100% complete or explicitly carried over
- [ ] 7-dimension self-evaluation ≥ 90 points
- [ ] CI build + tests PASS
- [ ] code-reviewer verdict: APPROVE
- [ ] security-auditor verdict: approved or conditionally approved
- [ ] PM approval: **Sprint gate passed**

---

### 3.5 Skill 5 — Quality / Code Review (QA team + cross-validation)

**Skill ID**: `05-quality-review`
**Activation condition**: Sprint completion in Skill 4, or just before release
**Duration**: 3~10 days

**Procedure**

```
[A] QA agent team quality testing
    │   - Regression testing / load testing / security testing
    │   - Parity testing (migration projects)
    │
[B] Static review by the code-reviewer agent
    │   - Naming / thread safety / transaction integrity / Javadoc compliance
    │
[C] Security audit by the security-auditor agent
    │   - OWASP / PII / secrets / audit logs / regulations (e.g., Electronic Financial Supervision Regulation)
    │
[D] Cross-Validation — the key differentiator
    │   - Code written by Claude is independently reviewed by Codex (or another LLM)
    │   - Discovered defects are scored with CVSS v3.1
    │   - CVSS ≥ 7.0 (HIGH/CRITICAL) → immediate block
    │   - sg-gw validation: 4 defects from CVSS 9.8 (K-01) to 6.5 (K-04) blocked pre-release
    │
[E] Integration of the 3-level security hooks
    │   - L1 git pre-commit (gitleaks etc.) — developer PC stage
    │   - L2 CI security-auditor — PR / push stage
    │   - L3 prod-gate — approval just before production deployment
    │
[F] Write the consolidated report → PM approval
```

**Output deliverables**
- `reviews/code-review-sprint-N.md` — Code review report
- `reviews/cross-validation-N.md` — Codex ↔ Claude cross-validation report (including CVSS scores)
- `security/audit-N.md` — Security audit report
- `qa/test-report-N.md` — QA test results
- `parity/parity-report-N.md` — Parity test results (where applicable)

**Verdict levels**
- **APPROVE**: All gates passed
- **CONDITIONAL APPROVE**: Defects below HIGH + agreed remediation plan
- **REJECT**: CRITICAL or HIGH defects present → return to Skill 4

**Definition of Done (DoD)**
- [ ] 0 defects with CVSS ≥ 7.0, or risk-acceptance approval completed
- [ ] 7-dimension self-evaluation ≥ 90 points (final evaluation)
- [ ] PM approval: **Release gate passed**

---

### 3.6 Skill 6 — Produce Final Deliverables

**Skill ID**: `06-finalize-deliverables`
**Activation condition**: Skill 5 approval complete
**Duration**: 1~3 days

**Procedure**
1. **Finalize the deliverables list via 1:1 dialogue**
   - The human specifies the deliverables → the AI suggests missing items
   - Specify the **format** per deliverable (md / pdf / pptx / hwp / docx / png / xlsx)
2. **Automatically assemble deliverables by phase**
   - Analysis: proposal / requirements specification / risk register
   - Design: development plan / test plan / ADR list / architecture diagrams
   - Implementation: source tree / traceability matrix / consolidated sprint logs
   - Verification: QA report / code review / security audit / cross-validation / parity
3. **Format conversion**
   - md → pdf : `weasyprint` or `pandoc`
   - md → pptx : `python-pptx`
   - md → docx/hwp : `pandoc` (hwp requires a separate Hangul conversion tool)
   - Image composition : `Pillow` (screenshots, diagrams)
4. **Readability review**
   - Attach a glossary so humans can understand it easily
   - Split by audience (executive vs. technical) when needed

**Standard deliverables list (checklist)**

| Category | Deliverable | Default format | Audience |
|------|--------|----------|------|
| **Planning** | Project proposal | md + pdf | PM / client |
| **Planning** | Business requirements | md | PM |
| **Analysis** | Requirements specification | md + pdf | All staff |
| **Analysis** | Use case specifications | md | Dev / QA |
| **Design** | Development plan | md + pdf | PM / Leader |
| **Design** | Test plan | md + pdf | QA |
| **Design** | ADR collection | md | Architects |
| **Design** | Architecture overview | md + png (Mermaid) | Executives / new staff |
| **Implementation** | Traceability matrix | csv + md | Audit |
| **Implementation** | API specification | md (OpenAPI) | Integration teams |
| **Verification** | QA report | md + pdf | PM |
| **Verification** | Code review report | md | Dev |
| **Verification** | Security audit report | md + pdf | Information security |
| **Verification** | Cross-validation (CVSS) | md | Executives / information security |
| **Operations** | Runbook | md | Operations team |
| **Operations** | Cutover / rollback procedure | md | Operations team |
| **Executive reporting** | Executive report (summary + details) | pptx + pdf | Executives |

**Output deliverables**
- All final versions placed together in the `deliverables/` directory
- `deliverables/INDEX.md` — Deliverables catalog (name / format / audience / date written / approver)

**Definition of Done (DoD)**
- [ ] INDEX.md matches the actual files 1:1
- [ ] Deliverables list and formats finalized via 1:1 dialogue with the PM
- [ ] Executive presentation rehearsed by a human presenter (where applicable)

---

### 3.7 Skill 7 — Standard Compliance Validation

**Skill ID**: `07-validate-standard`

**Activation condition**: Immediately after harness changes, immediately after new project setup, just before the G1/G2/G3 gates, or on PM audit request

**Nature**: A repeatable validation skill, not a linear development phase

**Procedure**
1. **Mode detection** — Identify whether this is the standard package root or an actual project root
2. **Inventory validation** — Confirm the presence of 8 skills / 13 agents / 21 templates / 3 hooks / 2 scripts
3. **Gate validation** — Check G1 / G2 / G3 approvers, required deliverables, and DoD
4. **Guardrail validation** — Check L1 bypass approval evidence, L2 AI audit TODO pass status, and the L3 prod gate
5. **Team-with-Leader validation** — Check Leader responsibilities, write_dirs, conflict prevention, and communication log rules
6. **Traceability validation** — Check REQ-IDs, `// source:` / `// req:`, ADRs, and the trace matrix
7. **Report writing** — Record PASS / WARN / FAIL and gate readiness

**Output deliverables**
- `reviews/standard-validation-{YYYYMMDD}.md` — Standard compliance validation report

**Definition of Done (DoD)**
- [ ] 0 FAIL items or explicit PM risk acceptance
- [ ] Owner / deadline / follow-up actions recorded for WARN items
- [ ] Gate readiness explicitly stated
- [ ] No legacy seed.yaml / bootstrap-based flows remaining as mandatory requirements

> The initial skeleton generation approach based on `seed.yaml.example` is excluded from the mandatory standard flow after the transition to skills. It is kept only as legacy reference material where needed.

---

### 3.8 Skill 8 — Harness Assistant (validation remediation guide)

**Skill ID**: `08-harness`
**Activation condition (when_to_use)**: Primarily, when guidance on remediation items is needed right after the 07 standard validation; secondarily, when a project in progress needs guidance on its next action.
**Modes**: ① Audit — run `/07` → score → prioritized remediation guidance → interactive application → re-validation. ② New project — cross-check the `docs/.harness-state.yaml` state file against actual deliverables, inspect the 01~06 entry conditions and gates (G1~G3), and advise exactly one next action.
**Principles**: Reuse existing skills without modification (thin dispatcher). Gate approval records are human-only (§4.8 CQ3). Files are the truth; state is a hint.
**Output**: `docs/.harness-state.yaml` (new-project mode) / `reviews/standard-validation-{YYYYMMDD}.md` (audit mode, via /07)
**Details**: `.claude/skills/08-harness/SKILL.md` · design document `docs/specs/2026-06-12-harness-assistant-design.md`

---

## 4. Standard Agent Team Composition (Team-with-Leader model)

This standard adopts the **Team-with-Leader** collaboration model. Its core principles are defined self-containedly in this section.

### 4.0 Core Proposition of the Collaboration Model

> "Increase productivity through autonomous team collaboration, while guaranteeing traceability and accountability through the Leader as a single point of contact."

- Group agents into **teams (2~5 members)** and allow **autonomous intra-team** communication
- Appoint **1 Leader per team** → single reporting channel to the PM
- 1 PM (human) — manages only cross-team parallelism; intra-team coordination is delegated to Leaders
- 3 communication modes: **TEAM_CHANNEL** (shared log) / **DIRECT** (peer-to-peer) / **LEADER_BROADCAST** (Leader → all team members)

### 4.1 Team Composition Principles

- **Team size**: 2~5 agents (6 or more splits into a sub-team)
- **1 Leader per team**: single reporting channel for team results (consolidated report to the PM)
- **1 PM**: human. Manages only cross-team parallelism; intra-team coordination is delegated to the Leader

### 4.2 Standard Team Lineup (example — model applied on sg-gw)

| Team | Member agents | Leader | Primary responsibility |
|----|--------------|--------|-------------|
| **Analysis Team** | legacy-analyst, doc-spec-parser, protocol-decoder, data-model-designer | data-model-designer | Legacy analysis / document parsing / domain model |
| **Design Team** | architect, data-model-designer, db-migration-engineer | architect | Architecture / ADR / DB |
| **Build Team** | backend-developer, frontend-developer, adapter-builder, code-reviewer | code-reviewer | Implementation (backend & frontend) + immediate review |
| **Validation Team** | qa-engineer, security-auditor, code-reviewer | security-auditor | QA / security / cross-validation |
| **Ops Team** | shell-ops-porter, docs-writer, db-migration-engineer | docs-writer | Operational assets / documentation |

### 4.3 LLM Model Tiers — Model Selection by Task Type

| Task type | Recommended model | Rationale |
|----------|----------|------|
| Architecture design / ADR / security audit | **Advanced model** (Opus / GPT-5 / Gemini Ultra) | Reasoning depth is essential |
| Static analysis / call graphs / pattern identification | **Advanced model** | Broad context processing |
| 1:1 porting / simple CRUD / boilerplate | **Standard model** (Sonnet / GPT-5 mini / Gemini Pro) | Cost efficiency |
| Document cleanup / deliverable assembly / format conversion | **Lightweight model** (Haiku / GPT-5 nano) | Simple conversion work |
| **Cross-Validation** | **Different vendor** (written by Claude → reviewed by Codex) | Avoid model bias |

**Principle**: Declare a `model:` meta field or `recommended_llm:` in the agent definition. The PM may change it after evaluating the cost/quality trade-off.

### 4.4 Work Conflict Prevention — 1:1 Directory Permission Isolation

Each agent may modify **only its own single write directory**. Everything else is read-only.

| Agent | Write-permission directory (example) |
|---------|---------------------------|
| legacy-analyst | `mapping/analysis/` |
| doc-spec-parser | `doc/parsed/` |
| architect | `mapping/architecture/`, `docs/design/adr/` |
| backend-developer | `src/`, `mapping/port-log/` |
| frontend-developer | `src/main/frontend/`, `web/` |
| code-reviewer | `reviews/` |
| security-auditor | `security/` |
| qa-engineer | `qa/`, `parity/` |
| docs-writer | `docs/`, `deliverables/` |
| trace-mapper | `mapping/trace/` |

**Supplementary conflict-prevention rules**
- No simultaneous edits of the same file (the Leader applies file-level locks at task dispatch)
- **Nested ownership allowed (deliberate)**: the parent directories `docs/` (docs-writer) and `src/main/` (backend-developer) own general deliverables, while specialized subdirectories (`docs/design/` = architect, `docs/requirements/` = trace-mapper, `docs/sprints/` = team-leader, `src/main/.../adapter|codec/` = adapter-builder) are owned by their respective specialist agents. It is not a conflict unless two agents write to the same **file**.
- Git commits are recommended on **per-agent branches** (or worktrees)
- Conventional Commits + team ID scope (`feat(build-team): ...`)

### 4.5 The 3 Human Approval Gates (mandatory)

This standard **mandates** 3 human approval gates. Even under autonomous AI progression, the following points cannot be entered without human approval.

| # | Gate | Target deliverables | Approver |
|---|--------|------------|--------|
| **G1** | Analysis gate (Skill 2 → 3) | REQUIREMENTS-SPEC.md | PM |
| **G2** | Design gate (Skill 3 → 4) | DEV-PLAN.md / TEST-PLAN.md / ADR-001 | PM + architect |
| **G3** | Release gate (Skill 5 → 6) | All verification reports | PM + information security + operations |

Sprint-level approvals (inside Skill 4) may be handled autonomously by the Leader, but **the 3 gates above must never bypass human approval**.

### 4.6 7-Dimension Self-Evaluation (validated on sg-gw)

The Leader agent self-scores deliverables on the following 7 dimensions at the end of every sprint.

> **Basis**: The weights, the 90-point threshold, and the 5-iteration limit below are `[basis:sg-gw-retrospective,adjustable]` — an in-house proposal with no external validation (§4.9). They may be adjusted per project; record adjustments in an ADR or retrospective.

| Dimension | Weight | Evaluation criteria |
|------|-------|----------|
| **Completeness** | 20% | All fields of the requirements/seed reflected |
| **Traceability** | 15% | `// source:` comments · ADR links · agent name annotation |
| **Security** | 20% | 0 hardcoded secrets · PII masking · 3-level security hooks |
| **Performance** | 10% | Parallel DAG · bottleneck identification · SLA targets reflected |
| **Readability** | 15% | Javadoc standard · Mermaid · table alignment |
| **Standards compliance** | 10% | 0 directory isolation violations · ADR ≥ 10 |
| **Test coverage** | 10% | Number of test cases · DoD criteria |

**Loop rules**
- Threshold: **90 points / 100**
- If below: **focused remediation of the lowest dimension → regenerate**
- Maximum: **5 iterations**
- Still below after 5 → **PM Escalation** (human intervention)

> Effect: Only work that self-passes at 90+ points enters the PM review stage → minimizes developer intervention.

### 4.7 Agent Activity Alert Items

**Automatic alerts** are sent to the PM/Leader at the following moments.

| Moment | Alert channel |
|------|----------|
| Sprint start / end | TEAM_CHANNEL |
| Task completion | TEAM_CHANNEL |
| 7-dimension evaluation < 90 | LEADER_BROADCAST |
| Still below after 5 retries | PM Escalation (external channel — Slack / Email) |
| Security Hook L2 block | PM + security-auditor |
| CRITICAL ADR written | PM + architect |
| Destructive operation attempted (DB DROP / production deploy, etc.) | PM (human approval required) |
| Sprint-end consolidated report | PM + client (where applicable) |

### 4.8 Human-Query Criteria

Every question the AI poses to a human (PM/approver) is generated **only when it meets at least one of the following three criteria**. If none apply, do not ask (**no unnecessary queries**).

| Code | Criterion | Description | Primary application |
|------|------|------|---------|
| **CQ1** | Required input for downstream deliverables | The answer fills a **required input** of a downstream skill/deliverable | 01's 12 questions, 06's 7 questions (fixed checklists) |
| **CQ2** | Resolving ambiguity/contradiction | Only when there is a **defect signal** — unmeasurable, orphan, conflict, etc. | 02 `[AMBIGUOUS]`, conflicting requirements |
| **CQ3** | Human authority required | Points where **AI must not decide alone** | Gates G1~G3, stack tie-break (difference < 10%), destructive operations, risk acceptance |

**Dialogue style (common)**: ① one question at a time, in sequence ② closed-ended first (yes/no) → open-ended after (how/why) ③ if ambiguous, present ≥ 2 candidates ④ never force an immediate answer (mark `[DEFERRED]` when delayed) ⑤ when a domain trigger (e.g., finance keywords) appears, automatically add the corresponding check questions.

**Limitations of the fixed question sets and add/remove rules**: The fixed questions of 01/06 are curated from the sg-gw retrospective (not derived from external requirements-engineering standards; validation sample of 1). When applying to a new domain, **add or remove questions using the CQ1~CQ3 criteria above**, and record the change history in an ADR or sprint retrospective.

### 4.9 Basis Tag Legend

Prescriptive values in this standard (thresholds, weights, minimums, lists) are annotated with the following basis tags.

| Tag | Meaning |
|------|------|
| `[basis:external-standard]` | Directly grounded in an industry standard/specification (CVSS v3.1 · OWASP · MoSCoW · ISO 25010, etc.) |
| `[basis:industry-convention]` | Widely used defaults (e.g., line coverage 80% / branch 70%) — adjustable per project |
| `[basis:sg-gw-retrospective,adjustable]` | An **in-house proposal with no external validation (validation sample of 1)**. Adjustable per project; **record adjustments in an ADR/retrospective** |

> Classifications and procedures without a tag derive their basis from **internal tracing** to deliverables/decisions (e.g., 01's 'decision items', 02's source and verification method).

---

## 5. Mandatory Code-Generation Items

Items that are **strictly enforced during code generation** in Skill 4 (implementation).

### 5.1 Traceability

- Migration projects: `// source: <original path>:<line>` comments are mandatory
- Greenfield projects: `// req: <REQ-ID>` comments are recommended
- Every deliverable carries the `Generated by: <agent> (Team: <team>) → Reviewed by: <leader>` metadata

### 5.2 Mandatory ADRs

ADRs **must be written** at the following moments.

| Moment | ADR type |
|------|---------|
| Technology stack selection | ADR-001-tech-stack |
| Framework adoption | ADR-NNN-framework |
| Core DB schema decision | ADR-NNN-schema |
| Transaction model | ADR-NNN-transaction |
| External channel integration (MQ / REST / SFTP) | ADR-NNN-channel |
| Security decision (encryption / authentication) | ADR-NNN-security |
| Performance/scalability decision | ADR-NNN-performance |
| Change to an existing decision | ADR-NNN-revision-of-MMM |

**Standard ADR form** (`templates/design/ADR.template.md`)

```
# ADR-NNN: Title
## Status: PROPOSED / ACCEPTED / SUPERSEDED
## Context: Why was a decision needed
## Decision: What was decided
## Alternatives: Other options considered
## Consequences: Positive / negative impacts
## References: Related ADRs / code / requirements
```

### 5.3 Readability Standard — English

(See sg-gw §7.9)

- **Classes / public methods**: English Javadoc required
- **Inline comments**: WHY-centric, written in English
- **Algorithm steps**: numbered with `<ol>` or `// 1) ... // 2) ...`
- **Legacy function references**: state `// source:`

### 5.4 3-Level Security Hooks

| Level | Moment | Role |
|------|------|------|
| **L1** | git pre-commit | gitleaks / trufflehog secret scan (developer PC) |
| **L2** | CI / PR | security-auditor agent runs automatically (blocks the PR) |
| **L3** | Just before production deployment | prod-gate checklist + human approval |

### 5.5 Automated Verification Tools

| Tool | Purpose | Applied at |
|------|------|----------|
| **ArchUnit** (Java) | Static rules such as package isolation / `System.out` prohibition | CI build |
| **Checkstyle / SpotBugs** | Code style / bug patterns | CI build |
| **gitleaks** | Secret scanning | L1 Hook |
| **OWASP Dependency Check** | Dependency vulnerabilities | CI |
| **SBOM generation** (CycloneDX / Syft) | Component manifest · supply-chain transparency | CI |
| **OSS license scanning** (ScanCode / license-checker) | License compliance (block prohibited licenses) | CI |
| **Dependency pinning · lockfile verification** | Supply-chain integrity (version pinning · tamper detection) | CI |
| **Parity Tester** (migration) | Byte-level input/output equivalence | Skill 5 |
| **JaCoCo** (Java) | Coverage measurement | CI |

### 5.6 Additional Rules for Financial / Regulated Industries

- Monetary amounts / interest rates / exchange rates: **`BigDecimal` + explicit `RoundingMode`** (double prohibited)
- Real data (accounts, customer names, resident registration numbers, card numbers): **no plaintext logging** (masking required)
- PII columns: standard encryption such as **AES-256-GCM**
- Modifications that change production behavior: **mandatory ADR or port-log record**

### 5.7 Language-Equivalent Rule Mapping (organization's standard languages)

The code rules of this standard are written in Java terms but follow a **language-neutral principle**. For each of the organization's standard languages (Java · Python · JS/TS (React·Node) · C/C++ (legacy maintenance)), apply the equivalent tools/rules in the table below. When adopting a new language, add a row to this table and record it in an ADR.

| Rule (intent) | Java (baseline) | Python | JS/TS (React·Node) | C/C++ (legacy) |
|-----------|-------------|--------|---------------------|----------------|
| Doc comments (English) | Javadoc | docstring (Google/PEP257) | JSDoc / TSDoc | Doxygen |
| Trace comments | `// source:` `// req:` | `# source:` `# req:` | `// source:` `// req:` | `// source:` `// req:` |
| Monetary precision (binary floating point prohibited) | `BigDecimal`+`RoundingMode` | `decimal.Decimal` | `decimal.js`/`big.js` (frontend is display-only — no recalculation) | Fixed-point/integer arithmetic |
| Architecture isolation verification | ArchUnit | import-linter | dependency-cruiser / eslint-boundaries | include-what-you-use + review |
| Static analysis | Checkstyle/SpotBugs | ruff/mypy | eslint/tsc --strict | clang-tidy |
| SAST (CI) | CodeQL(java) | CodeQL(python) | CodeQL(javascript) | CodeQL(cpp) |
| Coverage | JaCoCo | coverage.py | istanbul/c8 (Vitest/Jest) | gcov/llvm-cov |
| Dependency pinning (supply chain) | Maven/Gradle lock | poetry.lock / uv.lock | package-lock / pnpm-lock | vendoring + version pinning |
| Build | Maven/Gradle | poetry/uv | npm/pnpm | CMake/Make |

> Application principles: ① **numeric criteria such as coverage 80/70 are identical regardless of language** ② register every language in use in the CodeQL `matrix.language` of CI L2 ③ frontend (React) additionally applies the frontend-developer enforced rules (WCAG · server trust boundary · no secrets in bundles). `[basis:industry-convention]` — tool choices are adjustable per project (record in an ADR).

### 5.8 AI Tool Neutrality (not tied to Claude)

This standard is not tied to any specific AI vendor. **Claude Code is merely the reference implementation.**

- **Skills**: SKILL.md is a markdown procedure document — inject it as a system prompt/rules file into Codex CLI · Cursor · Gemini CLI etc. and use it identically (§3 introduction, WORKFLOW-GUIDE Appendix A)
- **Agents**: `recommended_llm` denotes a tier (advanced/standard/lightweight) — Opus↔GPT-5↔Gemini Ultra etc. are interchangeable within a tier (§4.3 table)
- **Cross-validation**: using **another vendor is in fact mandatory** (Skill 5 — avoiding model bias)
- **Gates, hooks, deliverables**: independent of the AI tool (git, CI, and document based)

However, when using an external LLM, Skill 5's **outbound data controls (S1)** — scrubbing secrets/PII, restricting to organization-approved models/regions — apply equally.

---

## 6. SG Gateway Field Validation (application evidence)

### 6.1 Application Scale (1 month, 29 sprints)

| Item | Figure |
|------|------|
| Domains covered | 7 (HOFI · LCS · GIRO · ARS · Firm · RET · OpenBanking) |
| External channels | 5 (RabbitMQ / TCP 4B prefix / TCP fixed-width / REST+OAuth2 / SFTP) |
| Sub-agents | 16 |
| ADRs | 38 |
| Tests | 1,300+ |
| Flyway migrations | V1 ~ V205 |
| Deliverables | md 100+ / pptx 5+ / pdf 8+ |

### 6.2 Cross-Validation Blocking Cases (CVSS v3.1)

| ID | Defect | CVSS | Blocking stage |
|----|------|------|----------|
| K-01 | (masked) secret exposure | 9.8 CRITICAL | Skill 5 / L2 |
| K-02 | (masked) authentication bypass | 8.4 HIGH | Skill 5 / L2 |
| K-03 | (masked) PII plaintext logging | 7.4 HIGH | Skill 5 / L2 |
| K-04 | (masked) session fixation | 6.5 MED | Skill 5 / L2 |

→ Codex independently reviewed Claude's first-pass output and **blocked 1 CRITICAL / 2 HIGH defects pre-release**.

### 6.3 Validated Patterns

- **3 phase gates** (analysis / design / release) → 0 missed human approvals
- **7-dimension self-evaluation** → average of 92.4 points after 5 iterations (exceeding the 90 target)
- **1:1 directory isolation** → 0 file conflicts between agents
- **38 ADRs** → 100% traceability of design changes

---

## 7. Risks in Adoption and Countermeasures

| Risk | Level | Countermeasure |
|------|------|------|
| Unqualified Leader appointment → degraded team output quality | High | Enforce the Leader qualification items of the 04-review-checklist |
| Agent self-rationalization in the 7-dimension evaluation (score inflation) | Medium | Independent scoring via cross-validation (Skill 5 / a different LLM) |
| LLM model cost explosion (overuse of advanced models) | Medium | Follow the §4.3 model tier table / monitor costs |
| Directory isolation violations → concurrent conflicts | Medium | 1:1 permissions / Git worktrees / file locks |
| Bypassing the human approval gates | High | L3 hook + mandatory ADRs + approval logs |
| This standard's own lack of case history (greenfield adoption) | Medium | Establish a 1-sprint baseline in Day-0 single-control mode → compare against 1 sprint under this standard → full transition (PoC recommended) |
| Security hooks not installed → secret leakage | High | Mandatory L1 hook installation before entering Skill 4 |

---

## 8. Mandatory Adoption Checklist

The final checklist the PM verifies when applying this standard to a new project.

### Before starting (prior to entering Skill 1)
- [ ] This standard package downloaded + copied into the development project directory
- [ ] AI tool (Claude/Codex/Cursor) confirmed working
- [ ] Git repository initialized + L1 hook installed
- [ ] PM / Leader / approver roster finalized

### Skills 1~3 (analysis & design)
- [ ] PROJECT-PROPOSAL.md written (12 questions answered)
- [ ] REQUIREMENTS-SPEC.md written + `[AMBIGUOUS]` items resolved
- [ ] DEV-PLAN.md / TEST-PLAN.md / ADR-001 written
- [ ] **G1 (analysis) + G2 (design) gates passed**

### Skill 4 (implementation)
- [ ] 1:1 directory permission mapping complete
- [ ] LLM model assigned per agent
- [ ] 7-dimension self-evaluation threshold = 90 configured
- [ ] Per-sprint approval logs maintained

### Skill 5 (verification)
- [ ] Cross-validation run at least once (different LLM vendor)
- [ ] 0 defects with CVSS ≥ 7.0, or risk-acceptance approval
- [ ] **G3 (release) gate passed**

### Skill 6 (deliverables)
- [ ] Deliverables list and formats finalized via 1:1 dialogue
- [ ] deliverables/INDEX.md complete
- [ ] Executive presentation rehearsed (where applicable)

### Skill 7 (standard validation)
- [ ] `07-validate-standard` run right after setup or just before a gate
- [ ] 0 FAIL items or PM risk acceptance recorded
- [ ] Owner / deadline / follow-up actions recorded for WARN items

---

## 9. Change / Extension Policy for This Standard

- This standard is changed only after **standards committee review**.
- When applying to a new domain (e.g., data analytics / mobile / embedded), **inherit** this standard and write a domain-specific annex.
- The change history of this standard accumulates in the Changelog at the bottom of this document.

---

## 10. Reference Documents

- Package catalog: [PACKAGE-INDEX.md](PACKAGE-INDEX.md)
- 8 standard skills: `.claude/skills/` (01~06 execution, 07 validation, 08-harness remediation guide)
- 13 agent definitions: `.claude/agents/*.md`
- 21 deliverable templates: `templates/`
- 3-level security hooks: `hooks/`
- Operational helper scripts: `scripts/`
- sg-gw application PPT (executive report): `societe_generale_gw/docs/submission/ai-harness-sg-gw-exec.pptx`
- sg-gw application PPT (details): `societe_generale_gw/docs/submission/ai-harness-sg-gw-application.pptx`

---

## Changelog

| Version | Date | Content |
|------|------|------|
| 1.5 | 2026-06-15 | Renamed `00-harness` → `08-harness`. Redefined its role from "unified entry point" to "post-07-validation remediation guide (final stage of the development flow)" — establishing the order 01~06 development → 07 validation → 08 remediation |
| 1.4 | 2026-06-12 | Added the frontend-developer agent (web publishing · UI · WCAG — 13 agents). Language-equivalent rule mapping §5.7 (Java·Python·JS/TS·C/C++). AI tool neutrality §5.8. Documented the 3-layer objectivity of compliance verdicts (07 §3.0) |
| 1.3 | 2026-06-12 | Added the 08-harness validation remediation guide skill (audit guidance · new-project step guidance — 8 skills). Added the HARNESS-STATE state file template (21 templates). Introduced the skill numbering convention (initially 00-) |
| 1.2 | 2026-06-10 | Added Human-Query Criteria §4.8 (CQ1~CQ3) and the Basis Tag Legend §4.9. Introduced threat modeling (STRIDE) in Skill 03. Strengthened supply-chain security (SBOM · OSS licenses · dependency pinning) in §5.5, L2, and Skill 05. Added sprint retrospective and incident postmortem templates (templates 17→20). Reflected external egress controls, trust-boundary rules, and basis tagging of prescriptive values |
| 1.1 | 2026-06-10 | Added the `07-validate-standard` validation skill, removed seed.yaml/bootstrap from the mandatory flow, strengthened L1/L2 guardrails |
| 1.0 | 2026-05-29 | Initial draft — standard harness process organized from the 1-month sg-gw field validation |

---

**Written by**: PM Claude (Opus 4.7) — 2026-05-29
**Updated by**: Codex — 2026-06-10 (v1.1) / Claude Opus 4.8 — 2026-06-10 (v1.2)
**Basis**: 29-sprint field validation on the sg-gw project (AS-D1 ~ AS-D14)
**Next step (proposed)**: Apply `07-validate-standard` once to a real new project to calibrate the WARN/FAIL criteria, and promote it to a CI auto-validation script if warranted.
