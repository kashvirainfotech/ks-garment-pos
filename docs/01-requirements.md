# Software requirements specification

**Product:** KS Garment POS | **Version:** 0.2 | **Updated:** 21 October 2026

**Status:** Draft business requirements; backend/frontend foundation implemented. Authentication and business workflows remain planned.

**Owner:** Kashvira Infotech / product owner. Stable requirement IDs below link to the plan and checklist.

## 1. Basis, precedence and terminology

Sources:

- **S1 — current request:** documentation first; Node.js, React/TypeScript and PostgreSQL; adopt relevant common rules from the supplied manufacturing requirements.
- **S2 — supplied common rules:** companies, branches, financial years, identity/permissions, inherited parameters, units, optional tracking, parties, prices, dynamic locations, voucher types/numbers and manual SQL.
- **S3 — [shared garment POS conversation](https://chatgpt.com/share/6ad8514b-d310-83e8-a148-dfe6821df778):** garment variants, commercial reuse, physical and online sales, one initial store, stock integrity, purchasing, returns and reporting.
- **S4 — current implementation instruction:** create separate backend API and frontend web projects; the frontend is for internal business users only, excluding e-commerce websites and customer portals.
- **E — engineering proposal:** a recommendation in this document, subject to review rather than an approved business fact.

S4 defines the current application boundary. S1/S2 override conflicting S3 recommendations: use sequence-generated IDs rather than UUID primary keys; use reviewed, manually executed SQL rather than automated schema migration. Manufacturing workflows do not transfer into retail scope automatically.

| Term | Meaning |
| --- | --- |
| Retailer / tenant | Independent customer business subscribing to or installing the product; commercial isolation boundary |
| Company | Legal/business entity within a retailer; identified by `comp_id` |
| Branch | Store or operating branch within a company |
| Financial year | Dated posting period enabled and closed independently for a branch |
| Product / style | Garment design shared by several sellable variants |
| Variant | Exact size/color combination with its own SKU, barcode and stock |
| Primary/base unit | Unit in which inventory quantity is maintained |
| Voucher | Numbered business transaction header, such as invoice or goods receipt |
| Posted | Committed business document whose stock/financial effects require reversal to correct |

**Priority:** P0 = initial commercial release; P1 = next growth release; P2 = later/optional scope. P0 is delivered over several implementation phases, not a single sprint. An internal POS pilot is narrower than a commercial release.

## 2. Product objectives and boundaries

Provide a configurable web POS and back office that lets garment retailers receive merchandise, identify the exact size/color sold, bill quickly, exchange items safely, reconcile payments, and see reliable stock across physical and online channels.

The initial pilot operates one store. The model supports multiple companies and branches from the foundation. The frontend is an internal staff application only: no public e-commerce website, customer portal or customer login is included. Earlier online-sales requirements describe future external-channel backend integrations and staff-facing order operations; they do not authorize a public website. No online integration is implemented by this scaffold; provider choice remains open.

India, INR, `Asia/Kolkata` display time and GST-oriented configuration are the initial planning assumptions from S3. Tax rates, registration treatment and current statutory obligations must be confirmed for the pilot retailer. No tax-rate or legal-threshold assumptions are frozen by this draft.

### Release scope

| Release | Included | Explicitly deferred |
| --- | --- | --- |
| Internal store pilot | Organization/access/configuration, catalog, base-unit stock, purchasing, POS, returns, shifts, core reports, basic dynamic locations, manual SQL controls | Online trading until its own acceptance gate; native mobile apps |
| Initial commercial web release | Pilot scope hardened; branch transfers, stock counts, one online channel, reconciliation, onboarding, recovery and operating manuals | Advanced marketplace breadth, full accounting, offline synchronization |
| Growth | Scoped price lists, promotions/loyalty, optional alternate units/batch/serials, aging/replenishment, accounting export | Manufacturing, production and customer portals |
| Advanced | Additional marketplaces, forecasting, native mobile, safe offline POS, subscription automation as separately planned | Unapproved integrations and guarantees |

Out of scope: public e-commerce/storefront/customer portal, customer-facing login, BOMs, production routing, WIP, job-work, manufacturing costing, attendance/payroll and a full double-entry accounting system. Department/designation/employee masters are identity administration, not an HR/payroll commitment.

| ID | Priority / source | Current frontend boundary |
| --- | --- | --- |
| UI-01 | P0 / S4 | `frontend/` is exclusively for authorized internal business staff. It contains no customer-facing catalog, cart, checkout, portal or sign-in. Customers remain parties in staff workflows. `backend/` is the separate Node.js API. |

## 3. Functional requirements

### Organization, period and identity

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| ORG-01 | P0 / S2,S3 | A retailer can maintain multiple companies and branches. A branch belongs to exactly one company. Unauthorized retailer/company/branch IDs are rejected, including in search, exports and background jobs. |
| ORG-02 | P0 / S2 | Maintain branch-enabled financial years with start/end dates and open/closed status. Prevent overlapping years for a branch. Document date selects a valid branch year; a closed year rejects posting and backdated edits. |
| ORG-03 | P0 / S2 | Create the next year for selected branches, initialize new voucher counters and carry continuous stock/party references forward without duplicating opening stock. Other branches may remain in their prior open year. |
| ORG-04 | P0 / S2 | Department, designation and employee masters support active/inactive status and safe historical references. Deactivation does not erase documents or audit actors. |
| IAM-01 | P0 / S2,S4 | Staff user creation includes company context, employee identity, mobile, email, username and secure password setup. Retain employee/customer profile distinction in the future API identity model, but do not offer customer login/access in this internal frontend. Exactly one matching active identity link is required per company profile. |
| IAM-02 | P0 / S2 | Assign branch access and multiple roles per branch. A user may be cashier in branch A and inventory manager in branch B without permissions crossing branches. |
| IAM-03 | P0 / S2,S3 | Configure screen/action permissions, including view, create, edit draft, post, print, export, authorize, cancel/reverse, refund, price override and stock adjustment. APIs enforce the same controls independently of button visibility. |
| IAM-04 | P0 / S2,E | Explicit user-level denies override role grants; optional individual allows stay within branch access and approval limits. Proposed resolution: active branch role grants plus allows minus denies, with customer own-record restrictions always applied. |
| IAM-05 | P0 / S3,E | Support secure login, logout, credential reset, session revocation and privileged-account MFA. Inactive users/removed access lose permissions promptly. Customer principals cannot reach staff administration, stock costing or unrelated customers. |
| IAM-06 | P0 / S3,S4,E | Separate platform operations from retailer ownership. Tenant provisioning is audited; platform support has no blanket retail-data access. Customer principal mappings never grant access to this internal frontend; any future customer application is separately scoped. |

### Configuration, units and common masters

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| CFG-01 | P0 / S2 | Parameter definitions specify code, data type, default, allowed scope levels, validation, dependency and sensitive-change permission. The settings UI renders supported definitions dynamically. |
| CFG-02 | P0 / S2 | Resolve an allowed user/branch override through branch, company and default levels; show the effective value and its source. An absent branch value inherits company; explicit false or zero remains an override. Tenant default is an additional proposed level. |
| CFG-03 | P0 / S2 | Feature gates control whether a product may enable alternate units, batches, serials or barcode behavior. Disabled/unimplemented features cannot be enabled by direct API requests. Tracking changes with stock/history require a controlled conversion plan. |
| UOM-01 | P0 / S2 | Every stock product has one primary unit. Garment pieces normally require integral quantities. Purchases, sales and ledger records preserve units and primary quantities. |
| UOM-02 | P1 / S2 | When alternate units are enabled, attach multiple product-specific units with positive factors. Base quantity = transaction quantity × factor. Authorized transaction factor changes are snapshotted and audited without rewriting history. Example: 2 dozen × 12 = 24 pieces. |
| TRK-01 | P1 / S2 | Optional batch tracking records batch on receipt, issue, transfer and return, with batch-level balances. Mandatory only for a product enabled under an active parent capability. |
| TRK-02 | P1 / S2 | Optional serial tracking prevents duplicate serial receipt and invalid sale/return states. Serial-controlled stock transacts one integral base unit per serial and keeps its complete movement history. |
| PTY-01 | P0 / S2 | Common party master with customer, supplier and employee classifications; one party may hold multiple classifications. Maintain contacts, addresses, registration details and history. Referencing a party in the wrong company or role is rejected. |
| LOC-01 | P0 / S2 | Warehouses belong to branches. Define ordered location levels per warehouse, from one level to arbitrary supported depth, e.g. Location or Chamber → Floor → Block → Rack → Bin. Reject cycles, invalid level ordering and foreign-branch parents. |
| LOC-02 | P0 / S2 | Location-type master includes sellable, damage and QC semantics. Effective non-sellable ancestor classification cannot be overridden by a sellable child. Receipts/returns/stock queries respect the effective disposition. Reparenting/classification changes with stock require review. |
| LOC-03 | P0 / E | Stock is assigned to active leaf locations; non-leaf reports aggregate descendants. Deactivate rather than delete referenced locations. Block hierarchy changes that strand balances or alter stock availability silently. |

### Garment catalog and pricing

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| CAT-01 | P0 / S3 | Maintain style, name, brand, category, subcategory, size group, size, color and optional fabric/fit/pattern/gender/season/collection attributes. Generate only selected combinations; one style with 3 colors × 5 sizes yields 15 distinct variants. |
| CAT-02 | P0 / S3 | Variant SKU and barcode resolve to exactly one sellable variant within a company. Supplier barcodes can be mapped without ambiguity; barcode reprints are controlled. Preserve leading zeros. Do not claim internal barcodes are registered GTINs. |
| CAT-03 | P0 / S3 | Maintain variant MRP, selling price, purchase cost and tax classification. Deactivate products while preserving history. Master changes do not modify snapshots on posted documents. |
| CAT-04 | P0 / S3,E | CSV catalog/opening-stock import supports template, preview, row errors, duplicate detection and auditable commit. Re-import must not duplicate stock. XLSX support may follow in P1. |
| PRC-01 | P0 / S3 | Support standard effective-dated selling prices, variant overrides, percentage/fixed line and bill discounts, discount caps and manager approval. Backend recalculates totals and rejects unauthorized overrides. |
| PRC-02 | P1 / S2 | Support customer/customer-group/region price lists plus branch applicability. Define deterministic precedence and effective dates; ambiguous overlapping rules are rejected or explicitly ranked. |
| PRC-03 | P1 / S3 | Campaigns, coupons, category/brand promotions, bundle/quantity offers and clearance prices require explicit stacking/exclusion rules and auditable discount allocation. |

### Inventory and procurement

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| INV-01 | P0 / S3 | Maintain immutable stock movements and balances per retailer/company/branch/variant/leaf location/disposition, plus tracking dimensions when enabled. Every movement references a source document, line, actor, unit factor and reason. |
| INV-02 | P0 / S3 | Opening stock, receipt, sale, customer return, supplier return, adjustment, transfer and count correction use the same posting engine. Drafts/orders alone do not change stock. Duplicate posting cannot duplicate a movement. |
| INV-03 | P0 / S3,E | Block negative sellable available stock by default. Stock checks and deductions/reservations are atomic; two buyers of the last unit cannot both succeed. Overrides, if later allowed, require a separate permission/policy. |
| INV-04 | P0 / S3,E | Define on-hand across all physical dispositions; available-to-sell = sellable on-hand − active reservations against sellable stock. Damaged/QC stock and transfer in-transit are excluded. Never subtract the same unavailable quantity twice. |
| INV-05 | P0 / S3 | Provide branch transfers with draft → dispatched/in-transit → partially/fully received states, discrepancy reasons and traceable paired movements. Dispatch reduces source availability; receipt adds only actual accepted destination quantities. |
| INV-06 | P0 / S3,E | Physical counts compare counted quantities against a controlled snapshot. Record intervening movements or freeze the counted scope. Approved variances post adjustments once; totals reconcile to ledger. |
| INV-07 | P0 / S3,E | Inventory valuation uses one agreed company costing policy. Moving weighted average is the proposal; returns reverse original sale cost, and transfers preserve carrying value. Cost corrections use explicit adjustments, not hidden history edits. |
| INV-08 | P1 / S3 | Report low-stock by variant, stock aging, slow-moving items and reorder suggestions using documented definitions and a defined receipt-layer/aging policy. |
| PUR-01 | P0 / S3 | Purchase order supports supplier, expected delivery, variant matrix and remaining quantities; a PO creates no stock. Receipt accepts partial deliveries and records shortages/excess/damage with approval controls. |
| PUR-02 | P0 / S3 | Posting a goods receipt increases stock exactly once. Supplier invoice references received quantities and tax/cost data without increasing the same stock again. Duplicate supplier invoice checks use company/supplier/reference/year policy. |
| PUR-03 | P0 / S3 | Supplier returns reference received quantities, remove the correct location stock and preserve cost/tax adjustments. Returned quantities cannot exceed eligible receipt quantities. |
| PUR-04 | P1 / S3 | Supplier payments/outstanding, allocation, additional/landed cost and reconciliation are operational subledgers, separate from a full general ledger. |

### POS, payments, returns and tax

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| POS-01 | P0 / S3 | Keyboard-oriented POS scans barcode or searches style/SKU/name, selects exact variant, shows availability/price, adds quantities, selects optional customer and previews authorized discounts/tax. Scanning never silently selects the wrong size/color. |
| POS-02 | P0 / S3 | Hold/resume bills, remove draft lines and prevent stale-price/stock assumptions at checkout. Held bills do not reserve stock by default; availability and prices are revalidated on resume/payment. |
| POS-03 | P0 / S3 | Post an invoice with immutable item/price/discount/tax/unit/cost snapshots, branch/year/register/cashier/channel and unique voucher number. Repeated checkout requests return the same result; printer failure does not repost a sale. |
| PAY-01 | P0 / S3 | Record cash, UPI, card and split tenders; validate paid amount, change, references and refund state. Initial counter UPI/card can be recorded external-terminal tenders; this is distinct from gateway-confirmed payments. |
| PAY-02 | P0 / S3,E | Provider payments have pending/confirmed/failed/expired/reconciliation states. Verify signed server notifications or provider status; browser redirect or an entered reference alone is not payment confirmation. Recover paid-but-unposted cases safely. |
| PAY-03 | P0 / S3 | Register shifts record opening cash, cash sales/refunds, pay-in/out with reasons, expected cash, counted cash and variance approval. Closed shifts are locked; adjustments are separate authorized records. |
| RET-01 | P0 / S3 | Full/partial invoice-linked returns enforce return eligibility, remaining returnable quantity, original discount/tax allocation and condition. Multiple concurrent returns cannot exceed the sold quantity. |
| RET-02 | P0 / S3 | Exchange creates linked return and replacement sale; restore only acceptable stock, issue the replacement variant and collect/refund the difference. Failed replacement stock validation cannot leave half an exchange committed. |
| RET-03 | P0 / S3 | Refund cannot exceed eligible captured/recorded net payment less prior refunds. Support partial/pending/failed refund reconciliation. Damaged returns enter non-sellable disposition. |
| RET-04 | P1 / S3 | Authorized no-bill returns, store credit and gift vouchers follow explicit fraud/eligibility policies and separate balance ledgers. No-bill returns are disabled by default. |
| TAX-01 | P0 / S3 | Effective-dated tax classifications/HSN and inclusive/exclusive prices; determine applicable tax components from registration, supply and party context. Store calculation inputs and final results. Rates and thresholds are configuration, not constants. |
| TAX-02 | P0 / S3 | Invoice, credit/debit note and applicable non-tax invoice formats contain validated business particulars, registration and controlled numbering. Current tax applicability, export formats and any e-invoice/e-way-bill need are resolved before the affected retailer goes live. |
| TAX-03 | P0 / E | Use exact decimal calculations and an agreed rounding/discount-allocation policy. Partial returns allocate original amounts without cumulative over-refund. Correct posted invoices through controlled credit/reversal documents. |
| VCH-01 | P0 / S2 | Voucher types have stable integer business codes, separate from sequence-generated row IDs. Preserve reference examples: PO 1, GRN 2, purchase invoice 3, sales order 4, branch transfer 11. Additional codes are registered before use. |
| VCH-02 | P0 / S2 | Every voucher header has varchar `voucher_no` and company/branch/year/type/series scope. Uniqueness is database-enforced; previews do not reserve final numbers. Allocate during posting under concurrency control. |
| VCH-03 | P0 / S2,E | Authorized reset/setup screen initializes a new branch/year series or advances an existing counter safely. It must reject collisions and number reuse, retain cancelled numbers and audit actor/reason/before/after. Never reset table primary-key sequences. |

### Online channels, customer features and reporting

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| ONL-01 | P0 / S3 | One selected online channel imports/creates orders with scoped external order/event uniqueness, correct variant mappings and explicit payment/order/fulfillment states. A channel retry creates no duplicate order. |
| ONL-02 | P0 / S3 | Reserve, expire, release and fulfill stock through the same concurrency controls as POS. Late successful payment after reservation expiry triggers reallocation or reconciliation/refund, never unbacked fulfillment. |
| ONL-03 | P0 / S3 | Pick/pack/dispatch, partial fulfillment, cancellation and return reconcile quantities, payment and reservation state. Integrations use durable retries, failed-event visibility and an operator reconciliation screen. |
| ONL-04 | P1 / S3,S4 | Add staff-facing shipping/tracking for external-channel orders; additional backend marketplace integrations are separately prioritized. No customer self-service view or storefront belongs to this frontend. Third-party channel stock delays need defined safety stock and oversell exception handling. |
| CRM-01 | P0 / S3 | Customer contacts, addresses, groups, purchase/return history and marketing consent. Anonymous/walk-in sales are allowed where business/tax policy permits. Avoid mandatory personal data when not needed. |
| CRM-02 | P1 / S3 | Loyalty earning/redemption/expiry and gift/store-credit issue/redemption use immutable balance transactions; returns reverse eligible rewards and cannot double-credit. |
| CRM-03 | P1 / S3 | Consent-aware email/WhatsApp invoices/notifications through a selected provider. No provider integration is assumed implemented. |
| RPT-01 | P0 / S3 | Daily sales, payment collections/refunds, shift variance, purchases, sales/tax registers, variant/location stock, stock ledger and valuation; filter by permitted company/branch/year/date/product/cashier. |
| RPT-02 | P0 / S3 | Core gross-profit and size/color sales views share posted transaction/cost definitions. Protect cost/margin visibility separately from cashier sales access. Returns and cancelled documents are handled consistently. |
| RPT-03 | P1 / S3 | Aging, low-stock, sell-through, return analysis, promotions and branch comparison; accounting CSV/XLSX exports follow agreed external formats. |
| RPT-04 | P0 / S3,E | Permission-controlled print/CSV export applies the same scope as on-screen results, protects against spreadsheet formula injection and records sensitive exports. XLSX follows when selected. |
| OPS-01 | P0 / S3 | Audited retailer onboarding, import, backups, tested restoration, monitoring, support diagnostics and deployment runbooks. Operational onboarding may be manual initially. |
| OPS-02 | P2 / S3,E | Subscription billing, automated entitlement enforcement and self-service onboarding require a separate product policy. Subscription outages must not silently corrupt in-progress transactions. |

## 4. Cross-cutting data and security requirements

| ID | Priority / source | Requirement and acceptance condition |
| --- | --- | --- |
| DATA-01 | P0 / S1,S2 | Every application table has a descriptive bigint primary key from a named PostgreSQL sequence, including junctions and detail tables. Primary keys are independent of voucher numbers. |
| DATA-02 | P0 / S2 | Every application table contains `comp_id`, `branch_id`, `fyear_id`, `created_by`, `created_date`, `updated_by`, `updated_date`. Scope/nullability is explicitly defined before DDL; common masters are not duplicated every year merely to populate year context. |
| DATA-03 | P0 / S1,S2 | All database-object/reference-data changes are ordered SQL files for manual review/execution. Startup, ORM, tests and deployment do not automatically create or synchronize database objects. |
| DATA-04 | P0 / S3,E | Tenant/company/branch-scoped foreign keys and uniqueness protect ownership. Exact money/quantity decimals, UTC audit timestamps, branch-local business dates and immutable snapshots protect historical accuracy. |
| SEC-01 | P0 / S2,S3 | Deny-by-default access across API, UI, print, export, file storage and workers; parameterized queries, input validation, rate limits, HTTPS, secure headers and secret handling. No cross-retailer access through identifier tampering. |
| SEC-02 | P0 / S3,E | Hash passwords with a vetted strong algorithm; use expiring, revocable sessions and secure browser credential handling. Require MFA for privileged production users. No passwords/tokens/PAN/CVV in logs or persistence beyond approved authentication data. |
| SEC-03 | P0 / S3 | Append-only sensitive-action audit includes actor, branch/company, action, object, timestamp, reason, correlation ID and redacted before/after details. Operational logs do not replace business audit. |
| SEC-04 | P0 / S3,E | Document data retention, consent, export, deletion/anonymization and backup handling before production. Financial/audit retention and personal-data removal are reconciled against applicable obligations, not hardcoded assumptions. |

## 5. Workflows and invariants

### Receive and invoice merchandise

Supplier/PO → physical count by size/color → classify accepted/damaged goods → post receipt → immutable movements/balances → match supplier invoice. Only receipt posting changes quantities. Invoice matching does not receive the goods a second time; cost changes follow the selected valuation policy.

### Complete a sale

Open shift → scan/select exact variants → select customer if needed → backend prices/tax/permission checks → record or confirm tender → post invoice and stock once → print. External provider confirmation may precede posting; pending exceptions stay visible for reconciliation. After a timeout, retrieve the original checkout status before attempting a new payment.

### Return or exchange

Find original sale → validate policy and remaining quantity → inspect condition → calculate original refundable allocation → validate replacement availability if exchange → post linked stock/documents → collect/refund difference → print. Financial refund completion may be asynchronous; stock/document status and refund status remain distinct.

### Transfer and count

Transfer dispatch moves source stock into in-transit; destination receipt accepts actual quantities, recording shortage/damage without silently creating stock. A count freezes or reconciles intervening movements before an approved variance posts once.

### Online sale

Verify incoming event → deduplicate → map variants → atomically reserve → confirm payment/order policy → pick/dispatch and convert reservation to issue → synchronize. Cancellation and expiry release only unfulfilled quantities. Channel/payment retries use stable keys and an operator-visible exception queue.

### Close shift and year

Shift: expected cash = opening cash + cash collected − cash refunds + pay-ins − pay-outs. Count actual cash, record variance, approve and lock.

Year: create next year for selected branches, configure unused series, verify pending documents and reporting cutoffs, close old period when authorized. Physical stock remains continuous across years; opening carry-forward must not duplicate inventory.

## 6. Report definitions

| Metric | Definition |
| --- | --- |
| Net sales | Posted sale value excluding tax, after discounts, less posted return value excluding tax; cancellations/reversals follow their posting dates/policy |
| COGS | Posted issue cost less original-cost reversals for returned items; cost adjustment treatment must be consistent |
| Gross profit | Net sales − COGS; operational gross profit is not audited net income |
| Gross margin % | Gross profit / net sales × 100; display N/A when denominator is zero |
| Available stock | Sellable physical on-hand less active reservations on that same sellable stock |
| Closing stock | Opening + receipts + returns in − issues − supplier returns ± transfers/adjustments, within the selected scope |
| Net tender collections | Recorded/confirmed collections less completed refunds, reported by method and settlement state |
| Aging / sell-through | P1; define receipt layers and the available-for-sale denominator before publishing these metrics |

## 7. Non-functional targets

Targets below are engineering proposals, not service guarantees. Confirm pilot hardware, catalog size and load before fixing budgets.

| ID | Area | Proposed measurable target / verification |
| --- | --- | --- |
| NFR-01 | Search | Variant/barcode search p95 ≤300 ms server time on a 50,000-variant tenant catalog, with 20 concurrent users per active branch and a documented overall tenant/load model |
| NFR-02 | Checkout | Posting p95 ≤1 second server time at 5 checkouts/second across the test deployment, excluding provider/network/printing time; include stock contention tests |
| NFR-03 | Availability | Initial 99.5% monthly target, maintenance treatment and measurement agreed before commercial release |
| NFR-04 | Recovery | Proposed RPO ≤15 minutes and RTO ≤4 hours; hosting/backup design and timed restoration must demonstrate these before commitment |
| NFR-05 | Usability | Keyboard-first desktop POS; responsive administration; accessible labels, focus and error messages; validate target browser/scanner/thermal/A4 printer combinations |
| NFR-06 | Reliability | No duplicate stock/financial effects under retries; atomic last-unit allocation; ledger/balance reconciliation; observable integration lag/failures |
| NFR-07 | Maintainability | Strict TypeScript, versioned API contracts, meaningful automated tests, pinned versions, reviewed SQL and documentation updated alongside features |
| NFR-08 | Localization | Configurable timezone/currency display, exact decimal calculations and branch-local posting dates; initial English UI, INR and Indian date display proposed |

## 8. Release acceptance examples

| ID | Scenario and required result | Requirements |
| --- | --- | --- |
| AC-01 | Generate 15 variants from 3 colors × 5 sizes; each barcode resolves correctly and cannot duplicate within company | CAT-01, CAT-02 |
| AC-02 | Post a receipt twice and retry after timeout; only one quantity increase and one committed result exist | PUR-02, INV-02 |
| AC-03 | POS and online checkout race for the same final unit; only one allocation succeeds | INV-03, ONL-02 |
| AC-04 | Repeat a checkout with the same key and payload; same invoice is returned. Same key/different payload is rejected | POS-03, PAY-02 |
| AC-05 | Return 1 of 2 sold units, then retry/concurrently return the remainder; cumulative returns never exceed 2 | RET-01, RET-03 |
| AC-06 | Exchange M for L; M restores only if sellable, L issues once, original amounts and tender difference reconcile | RET-02, TAX-03 |
| AC-07 | Damaged return cannot appear as available stock; a child location cannot escape a damage/QC ancestor classification | LOC-02, INV-04 |
| AC-08 | User with cashier role in A and inventory role in B cannot apply B's rights in A or access a different retailer; test direct IDs/export/print | IAM-02, IAM-03, SEC-01 |
| AC-09 | Missing branch setting inherits company; explicit false remains false; API rejects product serial tracking when its gate is off | CFG-02, CFG-03 |
| AC-10 | Start next branch year; new voucher series works, old numbers/IDs stay intact, closed-year posting is rejected | ORG-02, ORG-03, VCH-03 |
| AC-11 | Receipt + sale + return + transfer + adjustment reconcile ledger, balances, valuation and reports | INV-01, INV-05, INV-07, RPT-01 |
| AC-12 | Printer fails after posting; reprint the original invoice without another stock issue or collection | POS-03, PAY-01 |
| AC-13 | Repeated online webhook, reservation expiry and late payment each reach a consistent order/payment/stock or reconciliation state | ONL-01, ONL-02, PAY-02 |
| AC-14 | Discount/tax/rounding fixtures include inclusive/exclusive prices, mixed classifications, zero totals and partial returns; business reviewer approves outcomes | TAX-01, TAX-03 |
| AC-15 | App starts against an operator-prepared schema without DDL privileges; schema mismatch fails readably without changing objects | DATA-03, SEC-01 |
| AC-16 | Restore an authorized backup in an isolated environment and reconcile committed transactions within agreed recovery targets | OPS-01, NFR-04 |
| AC-17 | Enable alternate units in the growth release: 2 dozen receives 24 pieces; an old transaction retains its original factor after master changes | UOM-02 |
| AC-18 | Scan serial/batch-controlled growth items; missing/duplicate/foreign tracking references are rejected and returns match original tracking | TRK-01, TRK-02 |

AC-01 through AC-16 apply by initial commercial release; each phase selects relevant cases. AC-17/18 gate their optional growth features.

## 9. Open decisions and change control

See the [decision log](decision-log.md). Resolve business-impacting decisions before the affected implementation starts: retailer/company isolation, scope-column nullability, costing/rounding, online/payment providers, return rules, tax registration and target hardware/hosting.

Requirement changes retain their IDs and record source, priority, affected phase and acceptance changes. Approval date/approver remain **not recorded** until the product owner confirms them. Requirements, plan, checklist and manuals must stay consistent; a checked task is not a substitute for business acceptance.
