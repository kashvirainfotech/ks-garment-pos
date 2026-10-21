# Phase-wise delivery plan

**Version:** 0.1 | **Updated:** 21 October 2026 | **Status:** Proposed  
References: [requirements](01-requirements.md), [task checklist](03-task-checklist.md), [decisions](decision-log.md).

## Planning assumptions

Documentation comes first. This change delivers the document baseline only. Implementation phases below are pending and do not authorize database execution or deployment.

Estimates assume two full-stack developers, one QA engineer available through the project, part-time product-owner input, and access to a pilot retailer, test hardware and one online/payment sandbox. The provisional total for phases 0–6 is **13–21 elapsed weeks**, including documentation/review. These are planning ranges, not dates or delivery commitments. Re-estimate after phase 0 and provider selection; delays in business decisions, data quality or external access are additional dependencies.

Priority and phase mean different things: P0 requirements span phases 1–6. Phase 4 is an **internal physical-store pilot**. Phase 6 is the **initial commercial web release**, including one online sales channel.

| Phase | Indicative duration | Depends on | Outcome |
| --- | --- | --- | --- |
| 0 — Requirements and design | 1–2 weeks | Source material and product owner | Reviewed scope, decisions and acceptance baseline |
| 1 — Platform foundation | 2–3 weeks | 0; scope/security/schema decisions | Scoped access and manually provisioned application skeleton |
| 2 — Catalog and inventory | 2–3 weeks | 1; costing and location policies | Accurate variant-level stock engine |
| 3 — Purchasing | 1–2 weeks | 2 | Auditable merchandise receiving and supplier documents |
| 4 — POS and returns pilot | 3–4 weeks | 3; tax/rounding/payment/hardware decisions | One store can sell, exchange and close shifts |
| 5 — Multi-branch and online | 2–4 weeks | 4; selected online channel | Transfers, counts, shared online reservations and fulfillment |
| 6 — Hardening and commercial release | 2–3 weeks | 5 | Accepted, recoverable, documented first commercial version |
| 7 — Retail growth | Re-estimate after 6 | Stable release; selected growth scope | Price lists, optional tracking and customer engagement |
| 8 — Advanced channels and platforms | Separately estimated | Approved business cases | Offline/mobile/marketplace/forecasting capabilities |

Security, audit, regression checks, manual SQL preparation and documentation are continuous work in every phase. Recovery design begins in phase 1; it is tested before pilot use and again against the final release configuration.

## Phase 0 — Documentation and decisions

Deliver the five requested documents, agent rules, SQL policy, source/decision record and change history. Review retail workflows with the product owner. Resolve the tenant/company relationship, required-column nullability, costing, numbering/rounding and release boundary before affected DDL or service implementation.

Exit: documentation reviewed with decisions/approver/date recorded; unresolved provider/hardware choices have owners and required-by phases. Current status is **draft prepared**, not approved. Checklist group T0 tracks this work.

## Phase 1 — Platform foundation

Requirements: ORG-01–04, IAM-01–06, CFG-01–03, VCH-01–03, DATA-01–04, SEC-01–04, OPS-01 foundation.

Build the TypeScript workspace, React shell, NestJS modules, runtime configuration validation, API conventions, CI quality checks and structured diagnostics. Verify and pin compatible stable releases. Prepare manual SQL for organization, branch years, users/identity links, roles/actions, settings, audit, voucher counters and schema-version metadata. Operator provisions the schema manually.

Implement tenant/company/branch context, employee/customer company profiles, branch roles and action authorization. Define dynamic parameter metadata/inheritance, explicit negative-stock defaults and gates for optional features that remain unavailable until implemented. Add secure session lifecycle and privileged MFA.

Exit: unauthorized scope/action requests fail; customer and employee principals differ correctly; branch role changes take effect; settings inheritance and new-year counters work. Application starts with no DDL privileges and reports an incompatible schema without changing it. AC-08/09/10/15 and relevant security tests pass.

## Phase 2 — Catalog, locations and inventory

Requirements: PTY-01, LOC-01–03, CAT-01–04, UOM-01, INV-01–04/07; INV-05/06 posting primitives; RPT-01 stock views.

Implement parties and catalog masters, style/variant matrix, barcode lookup/label templates, primary units and CSV validation. Implement configurable warehouse location hierarchy and effective damage/QC availability rules. Establish immutable movement posting, balances, moving-cost policy after approval, opening stock, adjustment approvals and transaction/idempotency boundaries. Design future tracking dimensions without enabling unfinished alternate-unit/batch/serial functions.

Exit: catalog imports give row-level errors; 15-variant example scans correctly; received/opening/adjustment balances reconcile; last-unit allocation cannot oversell; stock in non-sellable locations stays unavailable. AC-01/07, stock portions of AC-03/11 and primary-unit validation pass. Optional-feature switches cannot enable missing behavior.

## Phase 3 — Purchasing and supply

Requirements: PUR-01–03, INV-02/07, purchasing portions of RPT-01 and TAX-01/02.

Build purchase orders, partial GRNs with size/color entry, acceptance/damage handling, supplier invoices, supplier returns and purchase registers. Define provisional receipt cost and controlled invoice-cost corrections. Keep supplier payment/outstanding subledger work in phase 7 unless promoted by scope review.

Exit: draft PO creates no stock; receipt posts once; purchase invoice never duplicates a receipt; over-receipt/over-return controls and price/cost/tax snapshots work. AC-02 and purchase/valuation portions of AC-11 pass.

## Phase 4 — POS, payment, return and shift pilot

Requirements: PRC-01, POS-01–03, PAY-01–03, RET-01–03, TAX-01–03, CRM-01, RPT-01/02/04; operating controls from OPS-01.

Build keyboard-oriented barcode billing, hold/resume, backend totals, approved discounts, recorded cash/UPI/card/split tenders and provider-safe payment states. Add invoice/receipt templates, original-sale returns, atomic exchange, refund reconciliation and shift cash control. Complete core sales/margin/tax reports.

Pilot with one store using reviewed opening stock, trained users, validated tax/return/rounding rules and agreed scanner/printer combinations. Conduct a backup restore before relying on the pilot for business records. Online customer trading is not enabled until phase 5 acceptance.

Exit: AC-04/05/06/12/14 and POS portions of AC-11/16 pass; no unresolved issue can duplicate payments, corrupt stock or bypass permissions. Pilot owner signs off scenario evidence. User manual sections for delivered screens are verified with actual menu names and screenshots.

## Phase 5 — Multi-branch operation and online sales

Requirements: INV-05/06, ONL-01–03, PAY-02 integration/reconciliation, consolidated portions of RPT-01/02, OPS-01 onboarding.

Complete dispatch/in-transit/partial receipt transfers, physical counts and branch consolidation. Integrate one selected channel using stable order/event mapping, signed webhooks, outbox retries, reservations, pick/pack/dispatch, cancellation and exception handling. Use documented safety stock where external-channel synchronization cannot guarantee real-time consistency. Add operator reconciliation for paid-but-unposted, expired reservations, failed refunds and external stock mismatches.

Exit: POS and online contend for the last unit safely; duplicate events do not duplicate business effects; late payments and cancelled/partially fulfilled orders reconcile. AC-03/11/13 and branch/isolation regression cases pass using provider sandbox and replay fixtures. A custom storefront is not implicitly included.

## Phase 6 — Hardening and first commercial release

Requirements: all P0 requirements and NFR-01–08.

Complete multi-retailer isolation testing, permission review, meaningful calculation and concurrent-posting tests, performance evaluation, migration rehearsal by the operator, restore drill, observability and incident/reconciliation runbooks. Validate data import/onboarding for a second retailer and at least a second branch fixture. Finish current technical/user manuals, release notes, privacy/retention policy, tax applicability and hardware compatibility evidence.

Release gate:

- Every P0 requirement has acceptance evidence or a product-owner-approved scope change reflected in all documents.
- AC-01–16 pass in their applicable environments; defects affecting data integrity, security or payment correctness are resolved.
- Ledger/balances, net sales, returns, payment/shift totals and valuation reconcile on the pilot dataset.
- Operator-reviewed scripts and their execution/verification history exist; no application/deployment schema automation exists.
- Recovery targets have measured evidence, or revised targets are explicitly agreed before promising service levels.
- One physical store and the selected online channel operate together; documented external synchronization limitations are accepted.
- Product owner records go-live acceptance. Deployment remains a separate authorized action.

## Phase 7 — Retail growth

Requirements: UOM-02, TRK-01/02, PRC-02/03, PUR-04, RET-04, INV-08, CRM-02/03, ONL-04 and RPT-03.

Prioritize effective-dated customer/group/region price lists; advanced campaigns; loyalty/gift/store-credit ledgers; aging/replenishment; supplier payments and accounting exports; customer portal; optional alternate units/batches/serials. Each optional feature requires complete API/stock/report coverage and data-conversion planning before its gate can be enabled. AC-17/18 gate units/tracking.

Do not promise all growth features in one release. Re-estimate each selected increment and update the checklist and manuals as it is delivered.

## Phase 8 — Advanced capabilities

Separately scope native mobile apps, offline POS synchronization/conflict policy, additional marketplaces, forecasting, advanced customer campaigns and automated commercial subscriptions. Require measured demand and a design for operational failure cases. Manufacturing remains outside this roadmap.

## Change and documentation cadence

At each feature change, update the relevant requirement/decision, task evidence and technical/user procedures. At each phase exit, reconcile priorities, dependencies, open defects and manual verification status. Change estimates when provider complexity or staffing differs; never leave an outdated plan marked current.
