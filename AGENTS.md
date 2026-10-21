# Repository rules for KS Garment POS

These instructions apply to the entire repository. Follow the user's latest explicit instructions when they change this baseline, and record resulting decisions in the documentation. This is the single source for agent rules; keep repository instructions in this file.

## Workflow and scope

1. Read the requirements, plan, checklist and relevant manual before changing a module. Documentation is the current deliverable; do not begin application implementation as part of the initial documentation task.
2. Preserve garment retail scope. Reuse common organization, security, configuration, unit and voucher rules from the manufacturing reference. Do not add BOMs, production, WIP, job-work, payroll or a general ledger without a scope change.
3. Distinguish confirmed user constraints, proposed engineering decisions and unresolved business questions. Do not present a proposed policy or an unbuilt screen as approved or delivered.
4. Progress on reversible work within the authorized task. Ask only when missing information materially affects correctness, scope, compliance or an irreversible action. Never repeatedly request approval already given.
5. Keep changes focused. Preserve user work and secrets. Do not commit, publish, deploy, send communications or run database changes unless that action is authorized.
6. Do not delegate to sub-agents unless the user explicitly requests delegation or adds applicable instructions requiring it.

## Stack and architecture

1. Use Node.js and TypeScript for the backend, React and TypeScript for the web frontend, and PostgreSQL. The recommended baseline is NestJS, Drizzle ORM and React Router framework SPA mode with Vite; record changes in the decision log.
2. Verify current compatible stable versions from official sources at scaffolding and upgrades; use a supported Node.js LTS and supported PostgreSQL release. Pin resolved dependencies and commit the lockfile. Do not use prereleases just to claim the latest version.
3. Start with a modular monolith. Keep routes/controllers thin, validation in DTOs/pipes, authorization in guards/policies, workflows in services, and database access in repositories. Share transaction handles across repositories participating in one workflow.
4. Keep authoritative stock, tax, pricing, permission and payment logic on the backend. Frontend calculations are previews.
5. Document APIs with OpenAPI and version them under `/api/v1`. Make APIs reusable by later mobile clients without implementing native apps now.

## Database: mandatory manual SQL policy

1. Never create, alter, drop, synchronize or migrate database objects automatically on application startup, test startup, build, CI, deployment or ORM initialization. Never run schema push/sync commands. Never configure an ORM migration runner into the application.
2. Put all proposed schema, sequence, index, constraint, function, trigger, policy, reference-data and backfill changes in ordered, reviewable `.sql` files under `database/`. Follow [database/README.md](database/README.md).
3. The database operator manually reviews and executes scripts. Preparing a script does not authorize executing it, even on a development database. Test schema scripts only after explicit database execution authorization; otherwise report validation as static review only.
4. Each script needs prerequisites, purpose, scope, expected effect, locking/transaction considerations, verification queries and a recovery/forward-fix strategy. Never silently rewrite a script already executed in a shared environment.
5. Every application table, including mapping/detail/audit/configuration tables, has a descriptive sequence-generated `bigint` primary key, such as `party_id`. Use an explicit named PostgreSQL sequence and `nextval` default. No UUID primary keys, application-generated IDs or `MAX(id) + 1`.
6. Every application table includes `comp_id`, `branch_id`, `fyear_id`, `created_by`, `created_date`, `updated_by`, `updated_date`. Add `tenant_id` for retailer isolation where applicable. Scope/nullability and bootstrap rules are proposed in the technical manual and must be resolved before final DDL; do not fabricate company, branch or year IDs for unrelated records.
7. Use snake_case SQL names, exact `numeric` for money/quantities and `timestamptz` for audit dates. Serialize bigint identifiers and exact decimals as JSON strings. Keep business dates separate from timestamps.
8. Enforce retailer/company/branch ownership with scoped keys, constraints, API checks and planned row-security policies. Global/tenant-scoped NULL ownership fields are never a wildcard permission grant.
9. Keep primary-key sequences separate from branch/year/voucher numbering. Never reset primary-key sequences on year rollover. Never reuse posted or cancelled voucher numbers.
10. Keep SQL and ORM mappings aligned. No schema generation tool is the source of truth over reviewed SQL. The runtime database role has no schema ownership, DDL or superuser/BYPASSRLS privileges.

## Business integrity

1. Model style/product and sellable size/color variant separately. Track stock and barcodes per variant and location, with optional batch/serial dimensions only when enabled.
2. Use an immutable stock ledger and transactionally maintained balances. Never edit posted ledger movements to fix an error; post controlled reversals/adjustments.
3. Invoice/receipt posting must be atomic with its stock, local payment state, voucher allocation, audit and outbox effects. External payment calls happen outside long database transactions and use explicit reconciliation states.
4. Prevent duplicate posting with scoped idempotency keys, persisted results and database uniqueness. Handle retries and the last-unit concurrency case explicitly.
5. Block negative sellable stock by default. Returns must reference original sale quantities, prevent over-return, preserve original financial snapshots and distinguish sellable from damaged/QC stock.
6. Units use a positive conversion factor to the product's primary stock unit; snapshot transaction factors. Enforce whole-piece quantities for garments unless a product explicitly supports fractional units.
7. Keep vouchers branch- and financial-year-specific. Validate open posting periods; reset only future/new-year numbering safely, with authorization and audit.
8. Configuration is typed, scoped, inherited and enforced in APIs. Missing is distinct from false, zero or an empty value. Child overrides cannot enable a capability disabled by a parent feature gate.
9. Never hardcode GST rates, tax applicability, legal retention periods or unsupported claims of invoice compliance. Record effective dates and validate applicable rules before release.

## Security and privacy

1. Deny access by default. Enforce tenant, company, branch, screen, action and record-level permissions in every API, export, print path and background job.
2. Support employee/customer identity mapping and multiple roles per branch. Privileges from one branch never spill into another; customer principals see only their authorized customer records.
3. Use vetted authentication libraries, strong password hashing, short-lived access credentials, rotating revocable refresh sessions, secure cookies and CSRF protection as specified in the technical manual. Do not store long-lived credentials in browser localStorage.
4. Use HTTPS, strict input validation, parameterized SQL, restricted CORS, rate limiting, secure headers, secret management and safe upload handling.
5. Audit sensitive actions with actor, scope, reason and correlation ID. Redact credentials, tokens and sensitive customer/payment data from logs. Never store payment card PAN/CVV.

## Verification and documentation

1. Add meaningful tests for stock posting, payment states, returns, calculation/rounding, permission boundaries, configuration inheritance and concurrency. Avoid implementation-mirroring tests for trivial documentation changes.
2. Run checks appropriate to the delivered change. Do not claim tests passed when they were not run; distinguish static checks, application tests, database checks and hardware/UAT verification.
3. A feature is complete only with acceptance evidence, relevant tests and corresponding documentation updates. Checked tasks must link evidence; planned work remains unchecked.
4. Update requirements for behavior/scope changes, the plan for sequencing changes, the checklist for status, the technical manual for design/setup/API/database changes, the user manual for screen/workflow changes, and the changelog for material changes.
5. Technical setup commands must be marked planned until runnable. User instructions must be marked planned until validated against a delivered screen. Record actual versions, commands, endpoints, script names and screenshots when implemented.
6. Before release, verify tenant isolation, branch permissions, duplicate prevention, concurrent stock allocation, ledger reconciliation, backup restoration and the agreed scanner/printer/payment matrix.
