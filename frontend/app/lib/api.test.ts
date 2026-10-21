import { afterEach, describe, expect, it, vi } from "vitest";
import { getApiHealth } from "./api";

afterEach(() => vi.unstubAllGlobals());

describe("API health client", () => {
  it("uses the same-origin API path and returns the validated service result", async () => {
    const mock = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({
            data: {
              status: "ok",
              service: "ks-garment-pos-api",
              version: "0.2.0",
            },
          }),
        ),
      );
    vi.stubGlobal("fetch", mock);
    const controller = new AbortController();
    expect(await getApiHealth(controller.signal)).toEqual({
      status: "ok",
      service: "ks-garment-pos-api",
      version: "0.2.0",
    });
    expect(mock).toHaveBeenCalledWith(
      "/api/v1/health",
      expect.objectContaining({ signal: controller.signal }),
    );
  });

  it("rejects a failed HTTP response instead of showing a connected state", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 503 })),
    );
    await expect(getApiHealth()).rejects.toThrow("unavailable");
  });

  it.each([
    {},
    { data: { status: "ok" } },
    { data: { status: "failed", service: "api", version: "1" } },
  ])("rejects an invalid health payload: %j", async (body) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify(body))),
    );
    await expect(getApiHealth()).rejects.toThrow("unexpected response");
  });
});
