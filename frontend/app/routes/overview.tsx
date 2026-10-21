import { Link } from "react-router";
import { ApiStatus } from "../components/api-status";

const modules = [
  {
    number: "01",
    title: "Sales & POS",
    text: "Barcode billing, returns, exchanges, and cashier shifts.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Catalog & inventory",
    text: "Styles, sizes, colors, locations, and stock movements.",
    icon: "▦",
  },
  {
    number: "03",
    title: "Purchasing",
    text: "Suppliers, purchase orders, and goods receiving.",
    icon: "↙",
  },
  {
    number: "04",
    title: "Reports & controls",
    text: "Sales, collections, stock, and branch permissions.",
    icon: "▤",
  },
];

export default function Overview() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">YOUR STORE, IN FOCUS</p>
        <h1>Operations overview</h1>
        <p>A single workspace for your garment business.</p>
      </div>
      <section className="welcome-card">
        <div>
          <span className="pill">WORKSPACE FOUNDATION</span>
          <h2>
            A good foundation.
            <br />
            Ready for what comes next.
          </h2>
          <p>
            Your internal workspace is set up. Store operations will become
            available as each module is delivered.
          </p>
          <Link className="primary-link" to="/workspace">
            View workspace setup <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="garment-illustration" aria-hidden="true">
          <div className="illustration-ring" />
          <svg viewBox="0 0 200 220" fill="none">
            <path
              d="m60 34 24-12c4 17 28 17 32 0l24 12 39 43-30 27-17-18v108H68V86l-17 18-30-27 39-43Z"
              fill="#eae8d9"
              stroke="#b5bca8"
              strokeWidth="2"
            />
            <path
              d="m84 22 16 31 16-31M100 53v141M68 86V51M132 86V51"
              stroke="#9aa68e"
              strokeWidth="2"
            />
            <path d="M109 75h16v20h-16z" fill="#c7cebb" />
            <path d="M69 178h62" stroke="#b5bca8" strokeWidth="2" />
            {[70, 100, 130, 160].map((y) => (
              <circle key={y} cx="100" cy={y} r="2" fill="#829079" />
            ))}
          </svg>
          <span>MADE FOR GARMENT RETAIL</span>
        </div>
      </section>
      <div className="overview-grid">
        <ApiStatus />
        <section className="setup-card">
          <div className="section-heading">
            <h2>Before your first sale</h2>
            <span className="section-index">02</span>
          </div>
          <p>These capabilities are next in the implementation plan.</p>
          <ol className="setup-list">
            <li>
              <span>1</span>
              <div>
                <strong>Secure staff access</strong>
                <small>Sign-in, roles, and branch permissions</small>
              </div>
              <em>Planned</em>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Configure your business</strong>
                <small>Companies, branches, and financial years</small>
              </div>
              <em>Planned</em>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Bring in your merchandise</strong>
                <small>Variants, barcodes, and opening stock</small>
              </div>
              <em>Planned</em>
            </li>
          </ol>
        </section>
      </div>
      <div className="module-heading">
        <h2>Built around daily store work</h2>
        <span>UPCOMING MODULES</span>
      </div>
      <div className="module-grid">
        {modules.map((module) => (
          <article className="module-card" key={module.number}>
            <div className="module-icon" aria-hidden="true">
              {module.icon}
            </div>
            <h3>{module.title}</h3>
            <p>{module.text}</p>
            <span className="module-status">
              Planned <span>{module.number}</span>
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
