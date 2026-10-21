import { useEffect, useState } from "react";
import { getApiHealth, type ApiHealth } from "../lib/api";

type Status =
  | { state: "checking" }
  | { state: "connected"; health: ApiHealth }
  | { state: "unavailable" };

export function ApiStatus() {
  const [status, setStatus] = useState<Status>({ state: "checking" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let active = true;
    void getApiHealth(controller.signal)
      .then((health) => {
        if (active) setStatus({ state: "connected", health });
      })
      .catch(() => {
        if (active) setStatus({ state: "unavailable" });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  return (
    <section className="connection-card" aria-labelledby="connection-title">
      <div className="section-heading">
        <h2 id="connection-title">Workspace connection</h2>
        <span className="section-index">01</span>
      </div>
      <div className="connection-state" role="status" aria-live="polite">
        <span className={`status-indicator ${status.state}`} />
        <span>
          {status.state === "connected"
            ? "API connected"
            : status.state === "checking"
              ? "Checking connection…"
              : "API unavailable"}
        </span>
      </div>
      <p>
        {status.state === "connected"
          ? "Your web workspace can reach the API."
          : status.state === "checking"
            ? "Connecting to your local API service."
            : "Start the backend API, then check the connection again."}
      </p>
      <div className="connection-detail">
        <span>API version</span>
        <strong>
          {status.state === "connected" ? status.health.version : "—"}
        </strong>
      </div>
      <button
        className="text-button"
        disabled={status.state === "checking"}
        onClick={() => {
          setStatus({ state: "checking" });
          setAttempt((value) => value + 1);
        }}
      >
        Check connection <span aria-hidden="true">↻</span>
      </button>
    </section>
  );
}
