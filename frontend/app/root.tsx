import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import type { ReactNode } from "react";
import "./styles.css";

export const meta = () => [
  { title: "KS Garment POS | Internal workspace" },
  {
    name: "description",
    content: "The internal workspace for garment store operations.",
  },
  { name: "robots", content: "noindex, nofollow" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="error-page" role="status">
      <p className="eyebrow">KS GARMENT POS</p>
      <p>Loading your staff workspace…</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside className="sidebar" aria-label="Workspace navigation">
        <NavLink className="brand" to="/" aria-label="KS Garment POS home">
          <span className="brand-mark">ks</span>
          <span>
            Garment POS<small>BY KASHVIRA INFOTECH</small>
          </span>
        </NavLink>
        <div className="workspace-label">STORE OPERATIONS</div>
        <nav>
          <NavLink to="/" end>
            <span aria-hidden="true">◫</span> Overview
          </NavLink>
          <NavLink to="/workspace">
            <span aria-hidden="true">☷</span> Workspace setup
          </NavLink>
        </nav>
        <div className="sidebar-note">
          <span className="tiny-dot" /> Internal staff workspace
          <p>
            Built around your stores,
            <br />
            your stock, and your team.
          </p>
        </div>
        <div className="sidebar-footer">
          KS GARMENT POS <span>v0.2</span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span className="breadcrumb">
            Workspace <span>/</span> Store operations
          </span>
          <span className="environment-tag">Development</span>
        </header>
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="page-footer">
          <span>Kashvira Infotech</span>
          <span>Internal business application</span>
        </footer>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="error-page">
      <p className="eyebrow">KS GARMENT POS</p>
      <h1>{notFound ? "Page not found" : "This page could not load"}</h1>
      <p>
        {notFound
          ? "Check the address or return to your workspace."
          : "Please refresh the page and try again."}
      </p>
      <a href="/">Return to overview →</a>
    </main>
  );
}
