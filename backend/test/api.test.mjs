import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { validateEnvironment } from "../dist/config/environment.js";

process.env.NODE_ENV = "test";
process.env.API_DOCS_ENABLED = "true";
delete process.env.DATABASE_URL;
const { createApplication } = await import("../dist/create-app.js");

let app;
before(async () => {
  app = await createApplication({ quiet: true });
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
});
after(async () => {
  await app?.close();
});

test("API boots without a database and returns liveness with a server request ID", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/health",
    headers: { "x-request-id": "client-controlled" },
  });
  assert.equal(response.statusCode, 200);
  const body = response.json();
  assert.equal(body.data.status, "ok");
  assert.equal(body.data.service, "ks-garment-pos-api");
  assert.match(body.meta.requestId, /^[a-f0-9-]{36}$/);
  assert.equal(body.meta.requestId, response.headers["x-request-id"]);
  assert.notEqual(body.meta.requestId, "client-controlled");
  assert.equal(response.headers["x-content-type-options"], "nosniff");
});

test("unknown routes produce safe, correlated API errors", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/customers",
  });
  assert.equal(response.statusCode, 404);
  assert.equal(response.json().error.code, "NOT_FOUND");
  assert.equal(
    response.json().meta.requestId,
    response.headers["x-request-id"],
  );
  assert.equal("stack" in response.json(), false);
});

test("CORS permits only the configured frontend origin", async () => {
  const allowed = await app.inject({
    method: "GET",
    url: "/api/v1/health",
    headers: { origin: "http://localhost:5173" },
  });
  assert.equal(
    allowed.headers["access-control-allow-origin"],
    "http://localhost:5173",
  );
  const other = await app.inject({
    method: "GET",
    url: "/api/v1/health",
    headers: { origin: "https://untrusted.example" },
  });
  assert.notEqual(
    other.headers["access-control-allow-origin"],
    "https://untrusted.example",
  );
});

test("OpenAPI documents the real health endpoint and no business endpoints", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/openapi.json",
  });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(Object.keys(response.json().paths), ["/api/v1/health"]);
});

test("invalid configuration fails without echoing a database credential", () => {
  assert.throws(() => validateEnvironment({ PORT: "no" }), /PORT/);
  assert.throws(
    () => validateEnvironment({ FRONTEND_ORIGIN: "*" }),
    /FRONTEND_ORIGIN/,
  );
  assert.throws(
    () => validateEnvironment({ API_DOCS_ENABLED: "yes" }),
    /API_DOCS_ENABLED/,
  );
  assert.throws(
    () => validateEnvironment({ DATABASE_URL: "secret-do-not-print" }),
    /^Error: DATABASE_URL must be a PostgreSQL connection URL\.$/,
  );
  assert.equal(
    validateEnvironment({ NODE_ENV: "production" }).API_DOCS_ENABLED,
    false,
  );
});
