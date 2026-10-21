# Backend API

NestJS 12 / Fastify 5 / TypeScript API for KS Garment POS. This is an application foundation; authentication and business endpoints are pending.

Run commands from the repository root after installing the pinned dependencies with `npm ci`. Use Node.js 24 LTS (verified with 24.22.0) or supported Node.js 22.22+.

```powershell
# Optional: copy this template to customize your local configuration.
Copy-Item backend/.env.example backend/.env
npm run dev:backend
```

Defaults: `http://127.0.0.1:3000`, frontend origin `http://localhost:5173`. Workspace commands run with `backend/` as their working directory, so the API reads `backend/.env`. Environment files and credentials are ignored by Git.

| Endpoint                   | Behavior                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `GET /api/v1/health`       | Public API liveness only; returns status, service/version and correlation ID                |
| `GET /api/v1/openapi.json` | Real OpenAPI contract, enabled by default in development; disabled by default in production |

Liveness does not imply PostgreSQL connectivity, schema compatibility, staff authentication or business readiness. Only these foundation routes exist. All business authorization must be implemented before adding protected operational endpoints.

```powershell
npm run build --workspace backend
npm run start --workspace backend
npm run typecheck --workspace backend
npm run test --workspace backend
```

Source boundaries: `src/modules/health` demonstrates controller/service/module organization; `src/common` contains API error handling; `src/config` validates configuration; `src/database` provides lazy typed PostgreSQL access. Future features add DTOs, policies and repositories under their modules.

`DATABASE_URL` is optional during scaffolding. Pool creation makes no connection and executes no query; future services explicitly request the client. No tables, schema changes, seeds, migration runner or schema compatibility marker exist yet. Follow the [manual SQL policy](../database/README.md) before database implementation. Tests run without a database and ignore local environment files.

See the [technical manual](../docs/04-technical-manual.md) for architecture/security standards and the [checklist](../docs/03-task-checklist.md) for remaining work.
