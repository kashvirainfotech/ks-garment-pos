# Task checklist

**Version:** 0.2 | **Updated:** 21 October 2026

**Status:** Backend/frontend scaffold delivered; business features, database execution and release remain pending. Frontend scope is internal staff only (UI-01).

Checked means the stated artifact/action is complete with evidence. It does not mean approved or production-ready. Owners below are proposed responsibilities, not staffing assignments: PO = product owner; ENG = engineering; DBA = database operator; QA = quality assurance; OPS = operations.

## T0 — Documentation and review

- [x] T0.01 Read current instructions and the shared POS conversation. Evidence: source/precedence record in [requirements §1](01-requirements.md#1-basis-precedence-and-terminology).
- [x] T0.02 Create requirements with scope, priorities, stable IDs and acceptance cases. Evidence: [requirements](01-requirements.md).
- [x] T0.03 Create delivery phases/dependencies/release gates. Evidence: [plan](02-phase-wise-plan.md).
- [x] T0.04 Create task tracking with requirement mappings. Evidence: this document.
- [x] T0.05 Create the technical design/operations baseline. Evidence: [technical manual](04-technical-manual.md).
- [x] T0.06 Create planned role-based operating instructions. Evidence: [user manual](05-user-manual.md).
- [x] T0.07 Create one canonical agent rules file. Evidence: [AGENTS.md](../AGENTS.md).
- [x] T0.08 Record assumptions, open decisions and documentation change history. Evidence: [decisions](decision-log.md), [changelog](CHANGELOG.md).
- [x] T0.09 Establish manual SQL policy. Evidence: [database policy](../database/README.md).
- [ ] T0.10 PO: review/accept requirements and release boundaries; record date/approver. No acceptance recorded yet.
- [ ] T0.11 PO/ENG/DBA: resolve D-01–D-05 and the scope policy before final foundation DDL; assign owners to remaining decisions.
- [ ] T0.12 PO: confirm staffing, sample catalog/invoices/returns, source data and pilot-store access; re-estimate plan.

## T1 — Foundation

Requirements: ORG-01–04, IAM-01–06, CFG-01–03, VCH-01–03, DATA-01–04, SEC-01–04.

- [x] T1.01 ENG: verify compatible current stable stack versions, pin dependencies/lockfile and document exact setup commands. Evidence: [D-01/D-18](decision-log.md), root/project manifests and `package-lock.json`; Node 24.22.0 verification, 21 October 2026.
- [x] T1.02 ENG: scaffold separate `backend/` and `frontend/` projects, strict TypeScript, lint/type/build checks and meaningful test setup. Evidence: [backend setup](../backend/README.md), [frontend setup](../frontend/README.md); `npm run check` passed (5 API tests + 5 API-client tests, type checks, lint and both builds), 21 October 2026. Staff authentication and business modules remain pending.

  Browser evidence: `npm run test:e2e` passed all 3 Chromium scenarios (real API/navigation/reload, outage/retry and narrow-layout/404); screenshot and detailed scope limits are in the manuals.
- [ ] T1.03 ENG/DBA: produce reviewed foundation SQL with named sequences, mandatory columns, keys, indexes, roles, policies and schema metadata.
- [ ] T1.04 DBA: manually provision an authorized development/test database; record script checksums, execution and verification. Agent must not self-execute.
- [ ] T1.05 ENG: implement schema compatibility read check with no startup DDL; runtime credentials have no DDL/BYPASSRLS.
- [ ] T1.06 ENG: organization, branch-year administration, employee/department/designation and company identity profiles.
- [ ] T1.07 ENG: authentication, password setup/reset, secure sessions, refresh rotation/revocation and privileged MFA.
- [ ] T1.08 ENG: multi-role branch membership, action permissions, user overrides, customer own-record policies and platform separation.
- [ ] T1.09 ENG: dynamic typed settings, effective value/source, allowed-scope fallback and unavailable-feature gates.
- [ ] T1.10 ENG: voucher type registry, concurrent allocation, series reset guard and branch-year rollover without PK reset.
- [ ] T1.11 ENG: audit, correlation IDs, secure errors, validation, headers, rate limits and health diagnostics.

  Scaffold progress: health, validated environment, request IDs, safe errors, body limits, CORS, Helmet and rate limiting are implemented. Business audit, authenticated diagnostics and full policy validation remain pending; this parent task is intentionally unchecked.
- [ ] T1.12 QA: AC-08/09/10/15, principal/permission lifecycle and scope tests; attach test run evidence.
- [ ] T1.13 ENG/QA: update actual architecture/setup/API/manual sections and phase-exit record.

## T2 — Catalog and inventory

Requirements: PTY-01, LOC-01–03, CAT-01–04, UOM-01, INV-01–04/07.

- [ ] T2.01 ENG: party roles/contacts, brand/category, size group/size/color, style/variant matrix and immutable historical references.
- [ ] T2.02 ENG: company-unique SKU/barcode mapping, barcode labels and scanner lookup with leading-zero handling.
- [ ] T2.03 ENG: primary-unit quantities and whole-piece rules; keep unfinished alternate-unit/batch/serial settings disabled.
- [ ] T2.04 ENG: warehouse hierarchy/level definitions, cycle checks, active leaf locations and inherited damage/QC semantics.
- [ ] T2.05 ENG: stock ledger/balance/cost structure, posting transaction, concurrency locks and idempotency records.
- [ ] T2.06 ENG: opening stock, authorized adjustments/reversals and ledger reconciliation views.
- [ ] T2.07 ENG: agreed valuation policy, receipt/return costs and auditable cost adjustments.
- [ ] T2.08 ENG: CSV templates, preview/errors, duplicate prevention and auditable import commits.
- [ ] T2.09 QA: AC-01/07, last-unit primitives, history preservation, import retry and ledger/balance tests.
- [ ] T2.10 DBA/ENG/QA: manually provision reviewed SQL; verify mappings and update manuals/evidence.

## T3 — Purchasing

Requirements: PUR-01–03, INV-02/07, purchase reports/tax records.

- [ ] T3.01 ENG: purchase order/variant matrix and remaining-order quantities; PO never posts stock.
- [ ] T3.02 ENG: partial GRN, over-receipt controls, accepted/damaged destinations and one-time posting.
- [ ] T3.03 ENG: supplier invoice/GRN matching, duplicate reference policy and cost/tax snapshots without duplicate receipt.
- [ ] T3.04 ENG: supplier returns with original receipt/quantity/cost checks and purchase register.
- [ ] T3.05 QA: AC-02 and purchase portions of AC-11; concurrent partial receipt/return and cost-correction cases.
- [ ] T3.06 DBA/ENG/QA: reviewed SQL execution, API documentation and verified purchasing procedures.

## T4 — POS and returns pilot

Requirements: PRC-01, POS-01–03, PAY-01–03, RET-01–03, TAX-01–03, CRM-01, RPT-01/02/04.

- [ ] T4.01 PO: resolve return/discount/tax/rounding policies and counter payment/receipt hardware choices.
- [ ] T4.02 ENG: keyboard barcode billing, exact variant search, customer selection and hold/resume.
- [ ] T4.03 ENG: server-side price/discount/tax calculation, approval bounds and snapshot preservation.
- [ ] T4.04 ENG: stable checkout key, atomic invoice/stock/local-payment posting and committed-status lookup.
- [ ] T4.05 ENG: recorded cash/UPI/card/split payments; pending/failure/reconciliation states and safe retry behavior.
- [ ] T4.06 ENG: receipt/thermal/A4 templates, authorized reprints and print-failure recovery.
- [ ] T4.07 ENG: original-sale partial/full returns, original amount allocation and concurrent over-return protection.
- [ ] T4.08 ENG: linked atomic exchange and asynchronous refund tracking with no partial local commit.
- [ ] T4.09 ENG: register shifts, opening/closing, cash movements, variance approval and lock controls.
- [ ] T4.10 ENG: daily sales, collections, tax, stock, gross-profit and size/color views; scoped CSV/print actions.
- [ ] T4.11 QA/PO: AC-04/05/06/12/14, payment/stock/report reconciliation and agreed hardware acceptance.
- [ ] T4.12 OPS/DBA: pilot backup/restore drill and recovery instructions before real business reliance.
- [ ] T4.13 PO/QA: supervised one-store pilot, training, screen-verified user manual and recorded acceptance.

## T5 — Multi-branch and online

Requirements: INV-05/06, ONL-01–03, PAY-02, consolidated reporting and onboarding.

- [ ] T5.01 ENG: transfer dispatch/in-transit/partial receipts, discrepancy reasons and both-endpoint access checks.
- [ ] T5.02 ENG: stock-count snapshot/freeze policy, movement reconciliation and approved variance posting.
- [ ] T5.03 PO/ENG: select one online provider and payment flow; document credentials, SKU mapping and sandbox fixtures.
- [ ] T5.04 ENG: signed webhook inbox, scoped external-ID uniqueness, durable outbox/retry and failed-event visibility.
- [ ] T5.05 ENG: reservation/expiry/release/fulfillment with the same last-unit locks as POS.
- [ ] T5.06 ENG: pick/pack/dispatch, partial cancellation/return, late payment and failed-refund reconciliation.
- [ ] T5.07 ENG/OPS: channel stock synchronization, lag/safety-stock policy and mismatch handling.
- [ ] T5.08 ENG: permission-controlled branch consolidation and operator reconciliation screens.
- [ ] T5.09 QA: AC-03/11/13, duplicate/out-of-order event replays and branch isolation regression.
- [ ] T5.10 ENG/QA: update actual integration/transfer/count procedures, SQL history and acceptance evidence.

## T6 — Commercial release readiness

Requirements: all P0 and NFR-01–08.

- [ ] T6.01 QA: trace every P0 requirement to passing evidence; record approved scope changes explicitly.
- [ ] T6.02 QA: complete AC-01–16; no unresolved data integrity/security/payment blocker.
- [ ] T6.03 QA/ENG: tenant/company/branch/customer isolation across direct IDs, lists, reports, print, exports, files and workers.
- [ ] T6.04 QA: realistic search/posting load, contention and retry testing; record dataset/hardware/results against targets.
- [ ] T6.05 DBA/OPS: backup/PITR configuration, timed restore drill (AC-16), ledger/payment reconciliation and recovery metrics.
- [ ] T6.06 DBA: rehearse ordered SQL manually; verify checksum history, runtime permissions and application compatibility.
- [ ] T6.07 OPS: monitoring/alerts, incident/runbook ownership, secrets, TLS, retention and reconciliation operations.
- [ ] T6.08 PO/QA: validate current retailer tax/invoice requirements and agreed hardware/browser matrix.
- [ ] T6.09 OPS/PO: onboard a second retailer and use second-branch fixtures to prove reusable isolation/configuration.
- [ ] T6.10 ENG/QA: manuals reflect delivered versions, menus, screenshots, commands, endpoints and limitations.
- [ ] T6.11 PO: record commercial acceptance and separate deployment authorization; publish release notes when authorized.

## T7 — Growth backlog

- [ ] T7.01 PRC-02/03: customer/group/region price lists, precedence, campaigns and promotion stacking.
- [ ] T7.02 UOM-02: alternate units/factor overrides; AC-17 and transaction/report/return coverage.
- [ ] T7.03 TRK-01/02: batch/serial tracking and safe enablement; AC-18 and complete movement/return coverage.
- [ ] T7.04 INV-08/RPT-03: defined aging/slow-moving/sell-through metrics, alerts and reorder suggestions.
- [ ] T7.05 PUR-04: supplier payments/outstanding, allocations, landed-cost policy and reconciliation.
- [ ] T7.06 RET-04/CRM-02: controlled no-bill returns, store credit, gift vouchers and loyalty ledgers.
- [ ] T7.07 CRM-03/ONL-04: consent-aware digital notifications and staff-facing shipping for external orders; no customer portal in this frontend.
- [ ] T7.08 RPT-03/04: agreed accounting exports and XLSX formats with access/privacy controls.
- [ ] T7.09 PO/ENG/QA: prioritize/re-estimate each increment; update requirements, SQL, tests and manuals before enabling it.

## T8 — Advanced backlog

- [ ] T8.01 Separately scope additional backend marketplace integrations; any customer storefront/portal requires its own authorized project.
- [ ] T8.02 Separately design offline reconciliation, numbering, payment and conflict behavior.
- [ ] T8.03 Separately scope native mobile apps and hardware/device security.
- [ ] T8.04 Separately scope demand forecasting and campaign automation.
- [ ] T8.05 OPS-02: decide subscription/onboarding automation and outage/grace-period policies.

## Evidence and ongoing maintenance

For implementation tasks, append evidence in this format when checking an item:

`Completed YYYY-MM-DD — change/PR: …; acceptance: AC-…; checks/environment: …; SQL execution record: … or N/A; docs: …; reviewer: …`

Maintain a section-level state in both manuals: **Planned → Implemented → Verified**, with version/date/evidence. Reopen tasks when regressions or changed requirements invalidate earlier results. Do not turn a parent milestone green while any required child work or acceptance remains pending.
