import { Inject, Injectable, type OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { Environment } from "../config/environment.js";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly pool: Pool | undefined;
  private readonly database: NodePgDatabase | undefined;

  constructor(@Inject(ConfigService) config: ConfigService<Environment, true>) {
    const connectionString = config.get("DATABASE_URL", { infer: true });
    if (connectionString) {
      // Pool creation is lazy: no startup query, DDL, seeds or schema sync.
      this.pool = new Pool({
        connectionString,
        max: 10,
        connectionTimeoutMillis: 5000,
      });
      this.pool.on("error", () => {
        // Never include a connection URL or database error payload in logs.
        console.error("An idle database connection failed.");
      });
      this.database = drizzle(this.pool);
    }
  }

  getClient(): NodePgDatabase {
    if (!this.database) throw new Error("Database access is not configured.");
    return this.database;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool?.end();
  }
}
