# User manual

**Product:** KS Garment POS | **Version:** 0.1 | **Updated:** 21 October 2026  
**Status:** Planned operating procedures. The application has not been built. All menu names, screens, actions and procedures below are proposed; none is yet marked Implemented or Verified. Actual labels, screenshots, shortcuts and supported devices will be added during development.

This manual is for store owners, administrators, cashiers, inventory/purchase staff and accountants. It explains the intended daily workflow without requiring database or development knowledge. An administrator grants access to the relevant company, branch and actions.

## 1. What will be available, and when

| Stage | Planned workflows |
| --- | --- |
| Foundation | Company/branch/year selection, users/roles, settings and common masters |
| Catalog and purchasing | Garment variants/barcodes, locations, opening stock, receipts and supplier documents |
| Internal store pilot | Billing, tender recording, receipts, returns/exchanges, shifts and core reports |
| Initial commercial release | Multi-branch transfer/count workflows and one online sales channel, with recovery/support controls |
| Growth | Alternate units, batches/serials, special price lists, loyalty/vouchers, supplier payments and customer portal |

Foundation capabilities alone do not mean every planned screen is ready. Optional features remain unavailable until fully delivered and enabled by an authorized administrator.

## 2. Roles and access

| Role | Typical work |
| --- | --- |
| Owner/company administrator | Companies, branches, settings, user access, approvals and reports |
| Store manager | Approvals, refunds/exchanges, stock exceptions and shift review |
| Cashier | Open shift, sell, permitted discounts, eligible returns and close shift |
| Inventory staff | Catalog, receipts, locations, counts, transfers and authorized adjustments |
| Purchase staff | Suppliers, purchase orders, GRNs and supplier invoices/returns |
| Accountant | Registers, tax/payment review, reconciliation and permitted cost reports |
| Auditor/read-only | View/print/export only the records/actions expressly granted |
| Customer user | Only their authorized customer information; portal screens are later delivery |

A user may have several roles in a branch and different roles in another branch. Access to one branch does not grant another. Print, export, authorize, refund, price override and cost/profit viewing are separate permissions. A missing button may reflect access restrictions or a feature that has not been enabled.

## 3. Sign in and select your working context

**State: Planned — phase 1.**

1. Open the deployment address supplied by your administrator. No deployment URL exists yet.
2. Sign in using your assigned username and secure password setup. Complete MFA when required.
3. Select an authorized company and branch. Select or confirm the financial year for your work.
4. Check the company/branch/year displayed before entering documents. Changing context must not carry an unfinished bill into the wrong branch; resolve or hold the bill first.
5. Sign out when leaving the counter. Ask your administrator to revoke lost/compromised sessions.

For a forgotten password, use the delivered reset process or contact the administrator; never share another cashier's credentials. A closed financial year does not accept posting. A backdated document must belong to an authorized open period.

## 4. Administrator setup order

**State: Planned — phases 1–4.** Use the following order for a new store:

1. Create company details and the branches, addresses and applicable registration details.
2. Create/enable the appropriate financial year for each branch and configure its voucher series.
3. Create departments, designations, employee records and user company profiles.
4. Assign branch memberships, roles/action permissions and approval limits.
5. Review effective company/branch settings, including tax basis, stock controls, return policy and receipt format.
6. Create warehouse/location levels, locations and location types, including separate damage/QC areas.
7. Create units, parties, garment masters, variants, barcodes and standard prices.
8. Load reviewed opening stock, set up registers/printers and complete a supervised sale/return/shift test.

Database installation is a separate operator task; store users do not create or synchronize database objects from these screens.

### Create or maintain a user

Choose the company and **Employee** or **Customer**. Select the matching employee/customer from the corresponding dropdown. Enter username, mobile, email and secure password/invitation details as implemented. Grant branch access and one or more roles for each branch.

The chosen identity must match the company and user type. Customer access must stay limited to the customer's own records. Use explicit action restrictions where required; do not grant broad manager rights just to allow one print or refund action. Deactivate departed users and review active sessions while preserving their history.

### Review inherited settings

The planned settings screen shows the saved override, effective value and source. If a branch does not set a value, an allowed company/default value applies. An explicit **Off** is still a value. Remove the override to return to inheritance.

A parent feature gate may prevent a branch/product from enabling a capability. Alternate units, batch and serial controls also stay unavailable until their growth features are delivered. Changing tracking rules for stocked products requires an approved conversion process rather than a casual toggle.

## 5. Create garment styles, variants and prices

**State: Planned — phase 2; special pricing in phase 7.**

1. Create/select brand, category, size group, sizes and colors.
2. Create the garment style with code/name and relevant fabric/fit/season attributes.
3. Select the sellable size/color combinations. For example, 3 colors and 5 sizes create 15 variants.
4. Review each variant's SKU, barcode, primary unit, MRP, selling price and tax classification.
5. Save, print permitted labels and scan a sample from every size/color group to verify the exact item.

Preserve leading zeros in barcodes. A barcode must identify one variant within the company; conflicting supplier barcodes need a reviewed mapping. Labels generated for internal use do not automatically become registered trade identifiers.

Garments tracked in pieces normally use whole quantities. Alternate purchase/sale units will be available in growth: for example, 2 dozen at a factor of 12 receives 24 pieces. Transaction-specific factor changes require authorization and remain visible in history.

Use effective-dated standard prices. Customer/group/region price lists and advanced promotions are later features. Deactivate discontinued items rather than deleting their sales history. Changing today's product description/price must not change an old invoice.

### Import catalog and opening stock

Download the delivered CSV template, fill required fields, upload and review validation/duplicate errors. Correct the source file before committing. Opening stock requires variant, location, quantity and reviewed cost. Post only approved quantities. If an import appears interrupted, check its recorded result before submitting it again.

Do not enter the same opening stock both through an import and a manual opening voucher. Existing balances are corrected with an authorized adjustment, not another unexplained opening entry.

## 6. Warehouses and stock locations

**State: Planned — phase 2.**

Create a warehouse under the correct branch, define its ordered levels, then add locations within that structure. A small shop may use a single Location level; another may use Chamber → Floor → Block → Rack → Bin. Assign stock to active final-level locations.

Set location types correctly. Stock in a damaged/QC area is unavailable for normal sale. A child bin under a non-sellable area cannot make that stock sellable. Moving goods after inspection uses a recorded stock move/reclassification. Location-tree changes with stock need authorized review.

Stock views will distinguish total physical quantity, sellable quantity, reservations and in-transit goods. The quantity available to a customer excludes non-sellable stock and active reservations.

## 7. Purchasing and receiving

**State: Planned — phase 3.**

1. Select a supplier-classified party and create a purchase order if required. Enter exact variants/size-color quantities and expected delivery details.
2. On delivery, count the actual merchandise and create a goods receipt, linking the PO when applicable.
3. Enter accepted, short, excess and damaged quantities with the correct receiving locations. Obtain required approval for exceptions.
4. Review quantities/costs, document date/year and supplier references. **Post** the receipt when correct.
5. Match the supplier invoice to received goods. Review tax/cost differences through the permitted correction workflow.

A PO or draft receipt does not increase stock. Posting the goods receipt does; entering the supplier invoice must not receive the same goods again. For supplier returns, select the original receipt/eligible quantities and correct location, then post the approved return.

Supplier payments/outstanding and additional landed-cost allocation are planned growth work unless the release scope is changed. Purchase registers are included earlier.

## 8. Start a cashier shift

**State: Planned — phase 4.**

Choose the authorized branch/register and open a shift. Count and enter opening cash, confirm the cashier and check that the scanner and printer work. Keep opening cash separate from sales income.

Record approved cash pay-ins/pay-outs with reasons during the shift. Do not alter an old sale to explain a cash discrepancy.

## 9. Create a sale and print a receipt

**State: Planned — phase 4.**

1. Open POS in the correct branch and active shift. Scan a barcode or search by SKU/style/name.
2. Check the displayed size/color, quantity, availability and selling price. Select the exact variant if searching manually.
3. Attach a customer when appropriate, or use the allowed walk-in flow. Enter authorized discounts; request manager approval when a limit is exceeded.
4. Review final items and totals. The system rechecks current stock, prices and tax before completing the sale.
5. Select cash, recorded external UPI/card, or supported integrated payment; use split tender when needed. Enter amount/reference as the delivered payment flow requires.
6. Confirm the original checkout once and wait for its result. After successful posting, print the receipt.

Illustrative split tender: for an already-calculated payable total of INR 1,000, record INR 400 cash and INR 600 UPI. For cash tender above the cash amount due, return the displayed change. This example does not define any tax rate.

Recording a counter UPI/card reference is different from the software verifying a gateway payment. Follow the approved counter verification procedure. An online gateway flow requires provider-confirmed status; a browser success page alone is insufficient.

### Hold and resume a bill

Hold the unfinished bill with its displayed reference, then resume it later in the permitted branch/shift. By the proposed policy a held bill does not reserve merchandise. Review availability and current price again before charging the customer.

### Timeout, payment uncertainty or printer failure

If checkout times out, use the original checkout/bill reference to check its status. Do not start another collection while the first may have succeeded. A **pending** or **reconciliation required** result needs manager review.

If payment was taken but no invoice is visible, retain the original payment reference and escalate for reconciliation. If only printing failed after posting, find and reprint the existing invoice. Reprinting never requires another sale.

## 10. Return, exchange and refund

**State: Planned — phase 4; no-bill returns/store credit in growth.**

### Return an item

1. Find the original invoice and verify customer/branch and return policy.
2. Select the exact original line and quantity. Review prior returns and the remaining eligible quantity.
3. Inspect the item and choose sellable, damaged/QC or other permitted condition/location.
4. Review the original allocated price/discount/tax and eligible refund; obtain required approval.
5. Post the return and follow the permitted refund process. Keep the refund reference/status for follow-up.

Only approved sellable returns become available to sell. Damaged returns remain separate. The system prevents returning more than was sold or refunding more than remains eligible. A posted return and a completed bank/provider refund can have different statuses; check both.

### Exchange a size, color or product

Open the original invoice, choose the returned item/condition and select the replacement variant. Review replacement availability, price and the collection/refund difference. Confirm the linked exchange through one workflow and print the exchange records.

If the replacement is unavailable, select another item or resolve the return according to policy before confirming. Do not manually add stock and create an unrelated bill to imitate an exchange.

No-bill and cross-branch return policies remain business decisions. The initial proposal disables no-bill returns and limits returns to the originating branch until broader rules are accepted and delivered. Store credit/gift voucher refunds become available only when their balance controls are implemented.

## 11. Transfers, stock counts and corrections

**State: Planned — phases 2 and 5.**

For a transfer, select source/destination branches and variants/locations. Review and dispatch actual quantities; these become in-transit and unavailable at the source. At destination, count and receive actual accepted quantities, record shortages/damage and complete partial receipts as needed. Destination stock increases on receipt, not merely when the source creates a transfer draft.

For a physical count, select the approved counting scope and follow its freeze or movement-control procedure. Enter actual quantities, review variance, obtain approval and post the generated adjustment once. A count is not permission to overwrite stock totals.

For damage, loss or correction, use an adjustment with a reason and supporting reference. Posted movement errors require authorized reversal/correction. Store staff should not edit database balances directly.

## 12. Online orders and exceptions

**State: Planned — phase 5, required before commercial release.**

Review the selected channel's order list, variant mapping, payment status and reserved stock. Confirm fulfillment according to the order policy, pick the exact sizes/colors, pack and record dispatch. Partially fulfilled/cancelled orders keep their remaining quantities visible.

Use the provided cancellation/refund workflow so unfulfilled reservations and payments are reconciled. Do not cancel directly in one system and assume the other system has updated. Failed synchronization, expired reservation with late payment, unavailable items or pending refunds appear in the operator exception queue for review.

Resolve mapping/provider issues before replaying the original failed event. A duplicate external notification must not cause another dispatch or payment. External channels can have stock-update delays; use the agreed safety-stock and exception policy.

## 13. Close the shift and review the day

**State: Planned — phase 4.**

1. Resolve or explicitly hand over pending bills, payment exceptions and refunds.
2. Review sales, returns and tender totals by method.
3. Count actual closing cash and compare it with expected cash:

   `opening cash + cash collections − cash refunds + pay-ins − pay-outs`

4. Enter counted cash and a reason for any difference. Obtain supervisor approval where required.
5. Close the shift and retain its summary. A closed shift is locked; later corrections use separate approved records.

Non-cash tender totals may differ from provider settlement timing. Accountants/managers reconcile the provider/terminal settlement rather than treating every timing difference as missing cash.

## 14. Reports, print and export

**State: Planned — core in phases 2–4; advanced analytics in growth.**

Select authorized company/branches, business date/year and relevant product/cashier/location filters. Review daily/net sales, payments/refunds, shift variance, purchases, tax records, variant stock, inventory ledger and valuation. Owners/accountants with cost access can review gross profit and size/color performance.

Net sales exclude tax and account for discounts/returns. Gross profit is net sales less issue cost after applicable return reversals; it is different from the cash collected. Stock availability excludes damaged/QC stock and reservations. Confirm a report's date basis before comparing it to a payment settlement report.

Print/CSV export requires its own permission and uses the same data scope. Treat exported customer and cost data according to company policy. XLSX, stock aging, low-stock/reorder, campaigns and detailed comparative reports follow the relevant growth delivery.

## 15. New financial year and voucher numbering

**State: Planned — phase 1; administrator only.**

Create/enable the next financial year for the selected branches, verify dates and initialize its approved voucher series. Review pending documents and the close/reopen policy before closing the old year. Branches may transition at different authorized times.

Use the numbering setup/reset action only for permitted new-year initialization or a safe approved series advance. Review branch/year/type and enter the reason. Never reuse posted/cancelled numbers or renumber old invoices. Internal database IDs are not reset. Stock remains continuous; do not post the same carried stock again as opening stock.

Cross-year returns retain the original invoice reference but must follow an authorized open-period posting policy.

## 16. Common issues and support information

| Issue | Planned user action |
| --- | --- |
| Cannot see branch/action | Verify active company/branch and ask the administrator to review membership, role and feature availability |
| Barcode not found/wrong item | Check label and exact size/color; use authorized lookup and have catalog staff correct mapping |
| Insufficient stock | Check sellable location stock and reservations; do not bypass with a false receipt/return |
| Financial year closed | Review document date and contact the authorized administrator; do not falsify the date |
| Excess return quantity | Review earlier returns and the original line; escalate a genuine discrepancy |
| Payment pending/unknown | Keep the original checkout/payment reference; manager checks status before collecting again |
| Receipt did not print | Check whether the sale posted, then reprint the original invoice using the agreed device setup |
| Import has errors | Correct the indicated rows and preview again; check prior commit status before retrying |
| Online order not synchronized | Review the exception status/mapping; authorized staff replay the original event after correction |
| Internet unavailable | Online-first release cannot safely post offline; follow the store's approved continuity procedure |

Support contact details will be added when assigned. Supply the date/time, company/branch, document/reference number, screen/action, request/error reference and what you observed. Share only the customer/payment information needed for diagnosis; never send passwords, tokens or full card data.

## 17. Manual verification during development

When a screen is delivered, replace proposed menu names with actual labels, add a sanitized screenshot and identify who may perform the action. Test the happy path and relevant error/recovery steps using the delivered version and supported hardware. Record:

`Section / feature version / Implemented date / Verified date / reviewer / acceptance evidence / known limitations`

Keep unfinished sections marked Planned. Update this manual in the same change as the screen or workflow, including changed permissions, fields, return/payment states, printing and operational limits.
