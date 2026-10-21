# Database scripts and manual execution policy

**Status:** Policy/design only, 21 October 2026. No executable database scripts or objects exist yet. PostgreSQL is the required database.

The database operator manually reviews and executes every database-object change. The application, ORM, build, CI, tests and deployment must never create/synchronize schema or automatically run migrations. Preparing files does not authorize their execution against any database.

## Planned layout

The subdirectories below will be created when their first real scripts are needed; they are not executable tooling today.

```text
database/
  README.md
  schema/          # ordered DDL, explicit sequences, keys, indexes and policies
  reference-data/  # reviewed voucher/permission/parameter seeds; no secret accounts
  data-fixes/      # separately reviewed backfills and corrections
  verification/   # read-only assertions and reconciliation queries
  recovery/       # reviewed forward fixes or safe reversal scripts, where possible
```

Use a single global order identifier across executable changes, e.g. `0001_create_schema_metadata.sql`, `0002_create_organization.sql`, `0003_seed_voucher_types.sql`. Related verification/recovery files reference the same ID. These filenames are examples; no such scripts currently exist. Do not include an automatic all-scripts runner.

## Required script header

```sql
-- Change ID / title:
-- Requirement / decision references:
-- Author / reviewer / approval reference:
-- Intended database and schema / supported application version:
-- Prerequisite change IDs / expected current schema version:
-- Purpose / affected objects and data / expected row counts:
-- Transaction strategy / locks / estimated runtime / maintenance needs:
-- Backup or recovery prerequisite:
-- Verification file and expected result:
-- Recovery or forward-fix strategy / irreversible effects:
```

Prefer transactional scripts with explicit precondition checks and clear failure when an unexpected schema version is present. Operations that cannot execute inside a transaction, such as certain concurrent index operations, need an explicit separate procedure and partial-failure recovery. Avoid broad `IF NOT EXISTS` clauses that silently hide a mismatched object definition.

## Operator workflow

1. Review SQL, prerequisites, scope constraints, expected effects, permissions, lock impact and recovery strategy. Check D-02/03 before approving root/context-column DDL.
2. Confirm exact target connection/database/schema and current recorded version. Take/verify the required backup and arrange the maintenance window if necessary.
3. Manually apply the specific approved files in global order using the operator's SQL client. Agents do not execute these as part of scaffolding, tests or deployment.
4. Execute linked verification queries and reconcile affected stock/payment/document data. Stop on unexpected results; do not continue blindly.
5. Record change ID, checksum, database/environment, operator, start/end time, result and verification evidence. The future metadata/register table itself follows the required ID/context/audit conventions and is created through the first approved script.
6. Deploy the compatible application version only after the manual database prerequisite is satisfied. The application can read a schema version/capability marker; it cannot repair an incompatible schema automatically.

Keep environment connection strings, credentials, dumps and customer records outside Git. Store sanitized execution references in release evidence; use the secure operator register for sensitive details.

## Schema conventions

- Every application table, including mappings/audit/detail tables, has a descriptive `bigint` primary key, explicit named sequence and `nextval` default. Sequence ownership and runtime `USAGE` grants are included in reviewed SQL. IDs are never reset at year-end.
- Every application table contains the requested company/branch/year and audit columns. Where the primary key is itself `comp_id`, `branch_id` or `fyear_id`, that single column also serves the corresponding scope role; do not create duplicate columns.
- Nullability is based on documented ownership, not arbitrary fake scope IDs. Tenant/global and bootstrap exceptions require explicit checks and policies as described in the technical manual/D-03.
- Money/quantities use exact `numeric`, audit times `timestamptz`, document dates `date`. Financial quantities/tax rounding rules must be agreed before final precision/scale constraints.
- Use scoped foreign keys/unique constraints, correct NULL uniqueness handling and appropriate branch/variant/date indexes. No generic polymorphic source reference may replace required relational integrity for critical posting rows.
- SQL is authoritative; Drizzle mappings describe the manually applied schema. Forbid `drizzle-kit push`, automated `migrate` calls and schema-changing startup hooks. Offline draft generation may be used only to prepare reviewed files.
- Runtime database role is not owner/superuser, has no DDL or BYPASSRLS and has only necessary DML/sequence privileges. Restrict mutation/deletion of posted ledger/audit rows separately.
- Test databases are provisioned by the operator from the same reviewed scripts after execution is authorized. Do not let test frameworks or ORM fixtures recreate objects automatically.

Once a script has been executed in a shared environment, keep it immutable. Correct it using a new ordered script with explicit prerequisites. Destructive rollback is not assumed safe for business documents; prefer forward correction and documented restore when necessary.
