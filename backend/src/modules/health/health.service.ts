import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: "ok" as const,
      service: "ks-garment-pos-api",
      version: "0.2.0",
    };
  }
}
