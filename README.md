# KS Garment POS

Web POS and inventory software for garment retailers, developed by Kashvira Infotech using Node.js, React with TypeScript, and PostgreSQL.

**Current stage: documentation only.** No application, database objects, deployment, or runnable commands have been implemented. Document baseline: **0.1, 21 October 2026**.

## Documents

| Document | Purpose | Current status |
| --- | --- | --- |
| [Requirements](docs/01-requirements.md) | Scope, business rules, priorities, acceptance criteria | Draft for review |
| [Phase-wise plan](docs/02-phase-wise-plan.md) | Dependencies, milestones, release gates | Proposed |
| [Task checklist](docs/03-task-checklist.md) | Work tracking and completion evidence | Documentation started; implementation pending |
| [Technical manual](docs/04-technical-manual.md) | Architecture, database standards, API/security and operations | Design baseline; update during implementation |
| [User manual](docs/05-user-manual.md) | Role-based operating procedures | Planned workflows; verify against delivered screens |
| [Decision log](docs/decision-log.md) | Confirmed constraints, assumptions and unresolved decisions | Living record |
| [Changelog](docs/CHANGELOG.md) | Documentation and implementation changes | Living record |
| [Database script policy](database/README.md) | Human-reviewed, manually executed SQL workflow | Policy only; no SQL scripts yet |
| [Agent rules](AGENTS.md) | Rules for all future development work | Active repository instructions |

Start with the requirements and decision log. The technical and user manuals describe the intended system until their sections are explicitly marked **Implemented** and **Verified**.

## Planning baseline

- Commercial product for independent retailers; one store in the initial pilot, with multiple companies and branches supported by design.
- Physical POS and online sales share one variant-level inventory engine. The internal POS pilot precedes the first commercial release, which includes one online channel.
- Garment styles have sellable size/color variants with individual SKUs and barcodes.
- Database IDs come from named PostgreSQL sequences. SQL scripts are reviewed and executed manually by the database operator; application startup and deployment never create or synchronize schema.
- Recommended implementation: NestJS modular API, Drizzle ORM, React Router framework in SPA mode with React/TypeScript and Vite. Exact compatible stable versions will be verified and pinned when scaffolding begins.
- Native mobile apps, manufacturing, full accounting, advanced marketplaces and offline synchronization are later scope.

## Source and maintenance

The [shared POS conversation](https://chatgpt.com/share/6ad8514b-d310-83e8-a148-dfe6821df778) was read together with the current request. Current explicit instructions take precedence over earlier suggestions, including sequence IDs instead of UUID primary keys and manual SQL instead of automatic migrations.

Every feature change must update the applicable requirements, checklist, technical manual, user manual and changelog in the same change. Keep proposed behavior separate from delivered behavior. No documentation draft constitutes business approval or a claim of regulatory compliance.
