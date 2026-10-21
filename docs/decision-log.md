# Decisions, assumptions and open questions

**Version:** 0.1 | **Updated:** 21 October 2026  
**Decision owner:** Product owner with engineering/DBA input. No business review approval has been recorded.

## Confirmed constraints

| ID | Constraint | Source |
| --- | --- | --- |
| C-01 | Documentation first: requirements, phases, checklist, technical manual, user manual and agent rules; maintain during development | Current request |
| C-02 | Web first; backend Node.js, frontend React/TypeScript, database PostgreSQL | Current request and common rules |
| C-03 | Database objects are not automatically created/synchronized; scripts are manually reviewed and executed | Current request/common rules; overrides earlier migration suggestions |
| C-04 | All application tables have descriptive sequence-generated IDs and the specified context/audit columns | Current common rules; overrides earlier UUID suggestion |
| C-05 | Multiple companies/branches, branch financial years, employee/customer identity, branch roles/actions and inherited configuration | Current common rules adopted for retail |
| C-06 | Product primary unit, optional alternate units/batches/serials, dynamic warehouse levels, party master, price lists and branch/year vouchers belong in the product requirements | Current common rules |
| C-07 | Product is for garment retailers, commercially reusable, physical and online sales, one initial store with multi-branch support | User's tailored prompt inside the shared conversation |

These constraints do not need repeated confirmation. Open entries below concern implementation details, business policies or prioritization, not permission to replace the confirmed stack or SQL policy.

## Proposed decisions and unresolved details

All entries start **Proposed** or **Open**. Proposed means a usable design recommendation exists; it does not mean the owner accepted it. Resolve before the stated dependency, and record the selected option, reasoning, owner, date and affected documents. Documentation can proceed while entries are open.

| ID / status | Topic and working proposal | Resolve before / proposed owner |
| --- | --- | --- |
| D-01 / Proposed | NestJS modular monolith + Drizzle ORM/node-postgres; React Router framework SPA mode + Vite/React/TypeScript. Use compatible stable releases and supported Node LTS/PostgreSQL; pin exact versions at scaffolding. Keep SQL authoritative. | Phase 1 scaffolding / ENG |
| D-02 / Proposed | Retailer `tenant_id` is distinct from company `comp_id`: one retailer may own multiple companies. Tenant-scoped user identity plus company employee/customer profiles. Initially shared schema with scoped keys and row security; deployment packaging remains open. | Foundation schema / PO, ENG |
| D-03 / Proposed | All tables contain required context/audit columns; branch/year fields are NULL where the record has no such ownership. Tenant/global tables may have NULL company fields. Company/branch/year root IDs serve as their corresponding scope columns. Creation audit is normally required; bootstrap and immutable-table rules are explicit. No fabricated zero IDs. | Any final DDL / PO, DBA |
| D-04 / Proposed | Moving weighted-average cost per company/variant stock pool, with original-cost sales-return reversal and cost-preserving internal transfers. Receiving invoice cost variances need controlled adjustments. Cross-company transfers are separate buy/sell documents, not direct stock moves. | Inventory/cost schema / PO, accountant, ENG |
| D-05 / Proposed | Exact decimal math; monetary storage scale 6, quantity/factor scale 6 subject to domain validation; INR settlement normally 2 decimals. Define half-up/other rounding, line versus invoice rounding and discount/return allocation using approved examples. Branch/year/type/series numbering uses transactional locked counters. | Posting/calculation design / PO, accountant, ENG |
| D-06 / Open | Which first online channel/platform? Existing store integration is the working preference; no custom storefront or marketplace is selected. Need sandbox, fulfillment states, return flow, stock-lag/safety-stock policy and catalog mapping. | Phase 5 integration design; identify during phase 0 / PO |
| D-07 / Open | Select online payment provider and decide whether counter UPI/card is recorded external tender or API-integrated. Need settlement/refund/webhook behavior, partial-payment policy and paid-but-unposted recovery. | POS payment design; online flow before phase 5 / PO, ENG |
| D-08 / Open | Return window, no-bill returns, cross-branch returns, refund methods, discount limits, approval thresholds, manager re-authentication and fractional-item rules. Default proposals: no-bill off, negative stock off, same-branch returns initially. | Phase 4; stock defaults before phase 2 / PO |
| D-09 / Open | Pilot jurisdiction, GST registrations, tax classifications/effective rates, invoice particulars, rounding sign-off and whether e-invoicing/e-way-bill obligations apply. No rate, threshold or legal retention duration is assumed approved. | Tax/invoice implementation and affected retailer go-live / PO, accountant |
| D-10 / Open | Barcode formats and existing GTINs, scanner models, thermal width/driver, A4 requirement, cash drawer, browsers and receipt layout. Browser print is the initial proposal; direct silent printing needs a selected bridge/device. | Phase 4 hardware acceptance / PO, ENG |
| D-11 / Open | Hosting region/model, managed or self-hosted DB, retailer deployment isolation, retention/privacy, backup/PITR, RPO/RTO, availability, initial catalog/traffic and support ownership. Proposed targets are in NFR-01–08. | Infrastructure design in phase 1; finalized before pilot / PO, OPS |
| D-12 / Proposed | Price priority: customer → customer group → region → branch standard → company standard. Explicit precedence/rank/effective dates resolve overlaps. Confirm currency/tax basis and promotions before implementation. | Phase 7 pricing / PO |
| D-13 / Proposed | Foundation gates/configuration and base units in P0; alternate units/batches/serials and specialized price lists in growth. These remain required product backlog, disabled until complete. Internal pilot precedes online; commercial P0 includes one online channel. | Phase 0 scope review / PO |
| D-14 / Proposed | User overrides use explicit deny precedence; branch grants combine only in active branch. Settings resolve allowed user+branch override → branch → company → tenant default → definition default. No standalone global user override that leaks branches. | Authorization/configuration design / PO, ENG |
| D-15 / Open | Need credit sales, supplier/customer outstanding subledgers or accounting integration at launch? Proposed initial release is fully settled POS plus invoice registers; supplier payments and accounting export are growth. | Phase 0 scope review / PO, accountant |
| D-16 / Proposed | Initial UI English, INR, Indian date display, timezone Asia/Kolkata; business dates stored separately, audit timestamps UTC. Confirm additional languages/currencies and multijurisdiction needs. | UI and posting design / PO |

## Reference conflict resolution

| Earlier/shared suggestion | Current treatment |
| --- | --- |
| UUID entity IDs | Superseded by sequence-generated descriptive bigint IDs |
| Automatic/versioned migrations | Versioned SQL remains useful, but execution is manual and outside application/deployment automation |
| Separate supplier/customer tables | Adopt common party + classifications; employee details extend employee-classified parties |
| `tenant_id` as the only organization context | Keep commercial retailer isolation plus required company/branch/year fields; D-02/03 resolve exact ownership |
| One store and multi-branch business | One initial physical store; multi-branch model from foundation, transfer workflows before commercial release |
| Mixed essential/growth priorities across assistant suggestions | Current phase/priority matrix is a proposal for review; user intent for physical and online sales is preserved |
| Manufacturing/process/warehouse examples | Keep reusable units/configuration/location concepts; exclude production-specific modules |

## Decision record template

```text
Decision ID:
Previous status:
Selected option and reason:
Alternatives considered:
Owner / reviewer / decision date:
Requirement and phase impact:
Schema, API, operations and documentation impact:
Evidence or approved examples:
```

Do not infer approval from silence or from a document being created. Once an owner supplies a decision, update the affected requirements, checklist, manuals and changelog together.
