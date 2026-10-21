import { ConfigService } from "@nestjs/config";
import { createApplication } from "./create-app.js";
import type { Environment } from "./config/environment.js";

async function bootstrap(): Promise<void> {
  const app = await createApplication();
  const config = app.get(ConfigService<Environment, true>);
  await app.listen(
    config.get("PORT", { infer: true }),
    config.get("HOST", { infer: true }),
  );
}

void bootstrap().catch(() => {
  console.error(
    "API startup failed. Check the environment configuration and port availability.",
  );
  process.exitCode = 1;
});
