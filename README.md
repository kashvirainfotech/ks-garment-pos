# KS Garment POS

Web POS and inventory software for garment retailers, developed by Kashvira Infotech using Node.js, React with TypeScript, and PostgreSQL.

**Current stage: application foundation, v0.2.0 — 21 October 2026.** Separate backend and frontend projects now exist. Staff authentication, business modules, database schema and deployment remain pending.

## Projects and quick start

- [backend/](backend/README.md): NestJS/Fastify API with TypeScript, PostgreSQL/Drizzle connection foundation, health endpoint and OpenAPI JSON.
- [frontend/](frontend/README.md): React/TypeScript internal staff workspace using React Router SPA mode and Vite. No e-commerce website or customer portal is included.

Use **Node.js 24 LTS** (verified with 24.22.0; `.nvmrc`/`.node-version` included) or supported Node.js 22.22+. Node.js 22.14.0 is too old for the selected router. Both projects use npm workspaces and one root lockfile.

```powershell
npm ci
npm run dev
```

Frontend: `http://127.0.0.1:5173` · API health: `http://127.0.0.1:3000/api/v1/health` · OpenAPI: `http://127.0.0.1:3000/api/v1/openapi.json`.

The frontend development server proxies `/api` to the API. Both start without PostgreSQL; no database query or schema change runs on startup. Optional local configuration templates are in each project's `.env.example`.

Run projects separately with `npm run dev:backend` / `npm run dev:frontend`. Verify with `npm run check`; run browser checks with `npx playwright install chromium` then `npm run test:e2e`. Production builds are `backend/dist/` and `frontend/build/client/`; serve the frontend with SPA fallback and proxy `/api` to the API.

The delivered pages are a development shell with a real API connection check and planned-module indicators. No login, store data or transactions are available yet; this is not an operational release.

## Documents

| Document | Purpose | Current status |
| --- | --- | --- |
| [Requirements](docs/01-requirements.md) | Scope, business rules, priorities, acceptance criteria | Draft for review |
| [Phase-wise plan](docs/02-phase-wise-plan.md) | Dependencies, milestones, release gates | Proposed |
| [Task checklist](docs/03-task-checklist.md) | Work tracking and completion evidence | Application foundation started |
| [Technical manual](docs/04-technical-manual.md) | Architecture, database standards, API/security and operations | Runnable setup plus planned business architecture |
| [User manual](docs/05-user-manual.md) | Role-based operating procedures | Planned workflows; verify against delivered screens |
| [Decision log](docs/decision-log.md) | Confirmed constraints, assumptions and unresolved decisions | Living record |
| [Changelog](docs/CHANGELOG.md) | Documentation and implementation changes | Living record |
| [Database script policy](database/README.md) | Human-reviewed, manually executed SQL workflow | Policy only; no SQL scripts yet |
| [Agent rules](AGENTS.md) | Rules for all future development work | Active repository instructions |

Start with the requirements and decision log. The technical and user manuals describe the intended system until their sections are explicitly marked **Implemented** and **Verified**.

## Planning baseline

- Commercial product for independent retailers; one store in the initial pilot, with multiple companies and branches supported by design.
- The frontend serves internal business staff only. Earlier online-channel plans refer to potential backend integrations and staff order management, never a storefront or customer portal in this project.
- Garment styles have sellable size/color variants with individual SKUs and barcodes.
- Database IDs come from named PostgreSQL sequences. SQL scripts are reviewed and executed manually by the database operator; application startup and deployment never create or synchronize schema.
- Implemented foundation: NestJS modular API, Drizzle ORM, React Router framework SPA with React/TypeScript and Vite; exact versions are pinned in the manifests and lockfile.
- Native mobile apps, manufacturing, full accounting, advanced marketplaces and offline synchronization are later scope.

## Source and maintenance

The [shared POS conversation](https://chatgpt.com/share/6ad8514b-d310-83e8-a148-dfe6821df778) was read together with the current request. Current explicit instructions take precedence over earlier suggestions, including sequence IDs instead of UUID primary keys and manual SQL instead of automatic migrations.

Every feature change must update the applicable requirements, checklist, technical manual, user manual and changelog in the same change. Keep proposed behavior separate from delivered behavior. No documentation draft constitutes business approval or a claim of regulatory compliance.
