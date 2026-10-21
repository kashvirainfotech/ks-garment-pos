export type Environment = {
  NODE_ENV: "development" | "test" | "production";
  HOST: string;
  PORT: number;
  FRONTEND_ORIGIN: string;
  API_DOCS_ENABLED: boolean;
  DATABASE_URL?: string;
};

export function validateEnvironment(
  input: Record<string, unknown>,
): Environment {
  const nodeEnv = input.NODE_ENV ?? "development";
  if (
    nodeEnv !== "development" &&
    nodeEnv !== "test" &&
    nodeEnv !== "production"
  ) {
    throw new Error("NODE_ENV must be development, test, or production.");
  }
  const port = Number(input.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }
  const origin = String(input.FRONTEND_ORIGIN ?? "http://localhost:5173");
  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    throw new Error("FRONTEND_ORIGIN must be an HTTP(S) origin.");
  }
  if (
    !["http:", "https:"].includes(parsedOrigin.protocol) ||
    parsedOrigin.origin !== origin
  ) {
    throw new Error(
      "FRONTEND_ORIGIN must be one HTTP(S) origin without a path or trailing slash.",
    );
  }
  const rawDocs =
    input.API_DOCS_ENABLED ?? (nodeEnv === "production" ? "false" : "true");
  if (rawDocs !== "true" && rawDocs !== "false") {
    throw new Error("API_DOCS_ENABLED must be true or false.");
  }
  const databaseUrl = input.DATABASE_URL
    ? String(input.DATABASE_URL)
    : undefined;
  if (databaseUrl) {
    try {
      const parsed = new URL(databaseUrl);
      if (!["postgres:", "postgresql:"].includes(parsed.protocol))
        throw new Error();
    } catch {
      throw new Error("DATABASE_URL must be a PostgreSQL connection URL.");
    }
  }
  return {
    NODE_ENV: nodeEnv,
    PORT: port,
    HOST: String(input.HOST ?? "127.0.0.1"),
    FRONTEND_ORIGIN: origin,
    API_DOCS_ENABLED: rawDocs === "true",
    ...(databaseUrl ? { DATABASE_URL: databaseUrl } : {}),
  };
}
