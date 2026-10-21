import { PassThrough, Readable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, type EntryContext } from "react-router";

// React Router uses this to generate the SPA shell during development/build.
// Production serves static assets; there is no public storefront or SSR server.
export default function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext,
): Promise<Response> | Response {
  headers.set("Content-Type", "text/html");
  if (request.method === "HEAD") return new Response(null, { status, headers });
  return new Promise<Response>((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={context} url={request.url} />,
      {
        onAllReady() {
          clearTimeout(timeout);
          const body = new PassThrough();
          resolve(
            new Response(Readable.toWeb(body) as ReadableStream<Uint8Array>, {
              status,
              headers,
            }),
          );
          pipe(body);
        },
        onShellError(error: unknown) {
          clearTimeout(timeout);
          reject(error);
        },
        onError() {
          status = 500;
        },
      },
    );
    const timeout = setTimeout(abort, 10000);
  });
}
