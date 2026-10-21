# Project and documentation changelog

Record material scope, design and implementation changes here. This is a project history, separate from the future database script execution register.

## 0.1 — 21 October 2026

**Documentation baseline only.** Application implementation has not started; no SQL has been executed and no tests or hardware workflows have been validated.

- Reviewed the shared garment POS discussion and current reusable manufacturing-software rules.
- Created requirements with provenance, priorities, retail workflows, acceptance cases and open business decisions.
- Created a phase-wise roadmap distinguishing the internal physical-store pilot from the initial commercial release with one online channel.
- Created a task checklist with completed documentation artifacts and pending implementation/release work.
- Created technical and user manuals, explicitly labeled as design/planned procedures.
- Established canonical `AGENTS.md`, requested `agent.md` entry point and manual SQL policy.
- Recorded sequence-generated descriptive bigint IDs, mandatory context/audit columns, branch/year voucher numbering and unresolved nullability/costing/provider policies.
- Proposed NestJS, Drizzle ORM and React Router SPA framework with Vite; exact versions remain unselected until compatible stable releases are checked at scaffolding.

Documentation validation: checked all 11 Markdown files, 33 local links/anchors, 103 unique requirement/acceptance IDs, cross-document requirement references, code-fence balance and UTF-8 text. Checks passed. Application/database/hardware tests are not applicable to this documentation-only baseline.

## Next updates

### 21 October 2026 — Agent rules consolidated

- Kept `AGENTS.md` as the only repository agent instructions file, as requested.
- Removed the redundant `agent.md` entry point and updated the README/checklist references.

## Ongoing updates

For each delivered increment, record the date/version, user-visible change, requirement IDs, database script IDs (if any), verification performed and known limitations. Do not mark roadmap features as delivered based on design work alone.
