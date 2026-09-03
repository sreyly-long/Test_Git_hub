# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## About this repo

This is a freshly bootstrapped `create-next-app` project (no custom routes, components, or logic added yet beyond the default scaffold). Treat any architectural notes below as the current minimal baseline, not a fixed pattern to imitate — they will need to grow as real features are added.

## Commands

- `npm run dev` — start the dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config via `eslint.config.mjs`)

There is no test runner configured in this project yet.

## Stack and structure

- **Next.js 16.3.4, App Router, React 19, TypeScript.** Next 16 has breaking changes vs. older training data — see the mandatory guidance imported from `AGENTS.md` above and read `node_modules/next/dist/docs/` before writing framework-facing code (routing, config, data fetching, caching).
- **Routes live under `app/`.** Currently just the root route: `app/layout.tsx` (root layout, loads Geist fonts via `next/font/google`, defines `metadata`) and `app/page.tsx` (home page).
- **Path alias:** `@/*` maps to the repo root (`tsconfig.json`).
- **Styling: Tailwind CSS v4**, wired through PostCSS (`@tailwindcss/postcss` in `postcss.config.mjs`) rather than a `tailwind.config.*` file. Theme tokens (`--background`, `--foreground`, font variables) are defined with `@theme inline` in `app/globals.css`, including dark-mode overrides via `prefers-color-scheme`.
- **Static assets** live in `public/` and are referenced by root-relative path (e.g. `/next.svg`).

## Global Rules for 쿠콘

You are an AI assistant for [쿠콘].

You MUST follow these rules at all times.

### Enforcement Levels

- **MUST**: Absolute requirement — never violate
- **MUST NOT**: Absolutely prohibited
- **SHOULD**: Recommended — exceptions allowed with valid reason
- **TO-DO**: Planned — not yet enforced

### [SEC] Security

- **SEC-001 [MUST NOT]** Never read or output config files: `*.properties`, `*.yml`, `*.yaml`, `*.env`, `application-*.xml`
- **SEC-002 [MUST NOT]** Never read config files declared as `JEX.config.file` inside `*.prop` files
- **SEC-003 [MUST NOT]** Never access key/certificate files: `*.key`, `*.pem`, `*.jks`, `*.p12`, `*.cer`
- **SEC-004 [MUST NOT]** Never output DB credentials, API Keys, Tokens, or Secrets in plain text — masking required
- **SEC-005 [MUST NOT]** Never access production or development databases
- **SEC-006 [MUST NOT]** Connect to or query data-access tools (DB connectors — MySQL, PostgreSQL, Oracle DB, MongoDB, Redis, Redshift, BigQuery, Snowflake, etc. — data pipelines, or external storage connectors) unless the connector is explicitly whitelisted by an administrator. See TOOL-001 before adding any new connector/MCP server.

### [CODE] Code Quality

- **CODE-002 [MUST NOT]** Never write code with missing timeouts or infinite retry loops for external API calls
- **CODE-004 [SHOULD]** When suggesting new libraries, always state license compatibility (especially GPL-family)

### [COMP] Compliance

(Currently TO-DO — not yet enforced)

### [TOOL] Tool Policy

- **TOOL-001 [MUST]** Before adding any new MCP server, report its source and permission scope first
- **TOOL-002 [MUST NOT]** Never write code that sends internal data to external public LLMs/SaaS without authorization. Contact admin directly if exception is needed
