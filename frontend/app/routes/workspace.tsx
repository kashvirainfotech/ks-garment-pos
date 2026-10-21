import { Link } from "react-router";

export default function WorkspaceSetup() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">WORKSPACE SETUP</p>
        <h1>The next steps for your store</h1>
        <p>The application foundation is ready for business modules.</p>
      </div>
      <section className="setup-guide">
        <span className="pill">INTERNAL STAFF APPLICATION</span>
        <h2>Build the essentials in order.</h2>
        <p>
          This is the development workspace. Staff sign-in and business
          configuration are still planned; no live store data or transactions
          are available.
        </p>
        <ol>
          <li>
            <h3>Staff access & permissions</h3>
            <p>
              Secure employee sign-in, branch access, roles, and approval
              limits.
            </p>
          </li>
          <li>
            <h3>Company & branch configuration</h3>
            <p>
              Business details, branches, financial years, and voucher series.
            </p>
          </li>
          <li>
            <h3>Catalog & stock</h3>
            <p>
              Garment styles, size/color variants, barcodes, locations, and
              opening balances.
            </p>
          </li>
          <li>
            <h3>Purchasing & counter operations</h3>
            <p>
              Receive merchandise, complete bills, handle exchanges, and
              reconcile shifts.
            </p>
          </li>
        </ol>
        <Link className="text-button" to="/">
          ← Return to overview
        </Link>
      </section>
    </>
  );
}
