import { Controller, Get, Inject, Req } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { FastifyRequest } from "fastify";
import { HealthService } from "./health.service.js";

@ApiTags("Health")
@Controller("health")
export class HealthController {
  constructor(@Inject(HealthService) private readonly health: HealthService) {}

  @Get()
  @ApiOperation({
    summary:
      "API liveness only; does not verify database, authentication or business readiness",
  })
  @ApiOkResponse({
    schema: {
      type: "object",
      required: ["data", "meta"],
      properties: {
        data: {
          type: "object",
          required: ["status", "service", "version"],
          properties: {
            status: { type: "string", enum: ["ok"] },
            service: { type: "string" },
            version: { type: "string" },
          },
        },
        meta: {
          type: "object",
          required: ["requestId"],
          properties: { requestId: { type: "string" } },
        },
      },
    },
  })
  getStatus(@Req() request: FastifyRequest) {
    return { data: this.health.getStatus(), meta: { requestId: request.id } };
  }
}
