# Frontend — internal staff web app

React 19 / React Router 8 framework SPA / Vite / TypeScript application for the business's internal staff. Node.js runs development/build tooling; the production output is a static browser application calling the separate backend API.

This project contains no e-commerce website, customer portal, public catalog, customer checkout or customer sign-in. Authentication and operational business screens have not been implemented; the current pages are a development foundation with no store data.

After `npm ci` at the repository root, use Node.js 24 LTS (verified with 24.22.0) or supported Node.js 22.22+:

```powershell
npm run dev:frontend
```

Frontend: `http://127.0.0.1:5173`. Run `npm run dev:backend` in another terminal, or start both with root `npm run dev`. The development server proxies `/api` to `http://127.0.0.1:3000`. To change that target, copy `frontend/.env.example` to `frontend/.env` and adjust `API_PROXY_TARGET`; restart the dev server.

| Route         | Current behavior                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `/`           | Internal workspace overview; live API connection status and retry; honest planned module indicators |
| `/workspace`  | Setup sequence and implementation status                                                            |
| Unknown route | Safe page-not-found view                                                                            |

```powershell
npm run typecheck --workspace frontend
npm run test --workspace frontend
npm run build --workspace frontend
npm run preview --workspace frontend
```

Build output: `frontend/build/client/`. Production hosting needs SPA route fallback plus `/api` reverse proxy to the backend, with API routes excluded from HTML fallback. The local `preview` command previews static output on port 4173; its API proxy is not a production deployment configuration.

Never put database URLs, signing keys or other backend secrets in frontend files/environment variables. There is no browser database client, embedded credential, fake login or fabricated live retail data. Staff identity, company/branch context and permissions are next foundation work; customers remain business records rather than users of this frontend.

See the [user manual](../docs/05-user-manual.md) and [technical manual](../docs/04-technical-manual.md) for delivered versus planned behavior.
