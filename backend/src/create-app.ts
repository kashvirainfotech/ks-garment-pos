import "reflect-metadata";
import { randomUUID } from "node:crypto";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import type { FastifyReply, FastifyRequest } from "fastify";
import { AppModule } from "./app.module.js";
import { ApiExceptionFilter } from "./common/api-exception.filter.js";
import type { Environment } from "./config/environment.js";

export async function createApplication(
  options: { quiet?: boolean } = {},
): Promise<NestFastifyApplication> {
  const adapter = new FastifyAdapter({
    bodyLimit: 1_048_576,
    requestIdHeader: false,
    genReqId: () => randomUUID(),
    logger: false,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { logger: options.quiet ? false : ["log", "warn", "error"] },
  );
  const config = app.get(ConfigService<Environment, true>);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ApiExceptionFilter());
  app.enableCors({
    origin: config.get("FRONTEND_ORIGIN", { infer: true }),
    credentials: true,
  });
  await app.register(helmet);
  await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });
  app
    .getHttpAdapter()
    .getInstance()
    .addHook(
      "onRequest",
      async (request: FastifyRequest, reply: FastifyReply) => {
        reply.header("x-request-id", request.id);
      },
    );
  if (config.get("API_DOCS_ENABLED", { infer: true })) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("KS Garment POS API")
        .setDescription(
          "Internal staff API foundation. Business endpoints and authentication are not implemented yet.",
        )
        .setVersion("0.2.0")
        .build(),
    );
    // JSON avoids exposing an unauthenticated interactive documentation UI.
    app
      .getHttpAdapter()
      .getInstance()
      .get("/api/v1/openapi.json", async () => document);
  }
  app.enableShutdownHooks();
  return app;
}
