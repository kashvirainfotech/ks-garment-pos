# Project and documentation changelog

Record material scope, design and implementation changes here. This is a project history, separate from the future database script execution register.

## 0.2.0 — 21 October 2026

Created the separate `backend/` API and `frontend/` internal staff projects following the user's implementation request. The frontend excludes e-commerce websites, customer portals and customer sign-in. Earlier online-channel requirements now explicitly describe potential backend integrations and staff operations, not a public frontend.

- Added npm workspaces with independently runnable projects, exact direct dependency pins, root lockfile, supported runtime declarations, environment templates and ignored generated/secret files.
- Backend: NestJS 12 native ESM/Fastify API, versioned health route, real development OpenAPI JSON, validated environment, correlation IDs, safe errors, CORS/Helmet/rate/body limits, graceful shutdown and lazy Drizzle/pg connection provider.
- Frontend: React 19/React Router 8 SPA/Vite staff shell, overview/setup routes, responsive navigation, real API connection status/retry, hydration fallback and route errors. Planned business modules are labeled honestly, without live-data placeholders.
- Preserved manual SQL requirements: no database objects, startup queries, seeds, migrations or schema synchronization. Schema compatibility and business readiness remain future work.
- Updated requirements, plan, checklist, manuals, decisions, agent rules and project READMEs; added a sanitized current-screen screenshot.
- Verified `npm run check`: lint, both project type checks, 5 API integration/configuration tests, 5 frontend API-client tests and both production builds passed on Node 24.22.0. All 3 Chromium browser scenarios passed for navigation/real API connection, outage/retry and mobile layout/404; evidence is recorded in the technical manual/checklist.
- Smoke-tested the built static frontend's hydration, navigation and deep-link reload through the local preview server.

Scope limits: no staff authentication, database schema, retail transactions, online integration, production deployment or hardware acceptance yet. Node 22.14.0 on the host was unchanged; a checksum-verified official Node 24.22.0 runtime under ignored `.tools/` was used for local checks.

## 0.1 — 21 October 2026

**Documentation baseline only.** Application implementation has not started; no SQL has been executed and no tests or hardware workflows have been validated.

- Reviewed the shared garment POS discussion and current reusable manufacturing-software rules.
- Created requirements with provenance, priorities, retail workflows, acceptance cases and open business decisions.
- Created a phase-wise roadmap distinguishing the internal physical-store pilot from the initial commercial release with one online channel.
- Created a task checklist with completed documentation artifacts and pending implementation/release work.
- Created technical and user manuals, explicitly labeled as design/planned procedures.
- Established canonical `AGENTS.md`, requested `agent.md` entry point and manual SQL policy.
- Recorded sequence-generated descriptive bigint IDs, mandatory context/audit columns, branch/year voucher numbering and unresolved nullability/costing/provider policies.
- Proposed NestJS, Drizzle ORM and React Router SPA framework with Vite; exact versions remain unselected until compatible stable releases are checked at scaffolding.

Documentation validation: checked all 11 Markdown files, 33 local links/anchors, 103 unique requirement/acceptance IDs, cross-document requirement references, code-fence balance and UTF-8 text. Checks passed. Application/database/hardware tests are not applicable to this documentation-only baseline.

## Next updates

### 21 October 2026 — Agent rules consolidated

- Kept `AGENTS.md` as the only repository agent instructions file, as requested.
- Removed the redundant `agent.md` entry point and updated the README/checklist references.

## Ongoing updates

For each delivered increment, record the date/version, user-visible change, requirement IDs, database script IDs (if any), verification performed and known limitations. Do not mark roadmap features as delivered based on design work alone.
