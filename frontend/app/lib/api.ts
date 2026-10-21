export type ApiHealth = { status: "ok"; service: string; version: string };

export async function getApiHealth(signal?: AbortSignal): Promise<ApiHealth> {
  const response = await fetch("/api/v1/health", {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("The API is unavailable.");
  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null || !("data" in body))
    throw new Error("The API returned an unexpected response.");
  const data = body.data;
  if (
    typeof data !== "object" ||
    data === null ||
    !("status" in data) ||
    data.status !== "ok" ||
    !("service" in data) ||
    typeof data.service !== "string" ||
    !("version" in data) ||
    typeof data.version !== "string"
  ) {
    throw new Error("The API returned an unexpected response.");
  }
  return { status: data.status, service: data.service, version: data.version };
}
