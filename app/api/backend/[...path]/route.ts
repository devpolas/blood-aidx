import { NextRequest } from "next/server";

const API_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const REQUEST_HEADERS_TO_REMOVE = [
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "accept-encoding",
];

const RESPONSE_HEADERS_TO_REMOVE = [
  "connection",
  "content-encoding",
  "content-length",
  "transfer-encoding",
  "set-cookie",
];

async function handler(
  request: NextRequest,
  context: RouteContext,
): Promise<Response> {
  if (!API_URL) {
    return Response.json(
      {
        success: false,
        message: "API URL is not configured",
      },
      { status: 500 },
    );
  }

  try {
    const { path } = await context.params;

    const pathname = path.map(encodeURIComponent).join("/");
    const url = `${API_URL}/${pathname}${request.nextUrl.search}`;

    // Forward incoming headers while removing transport-specific headers.
    const requestHeaders = new Headers(request.headers);

    for (const header of REQUEST_HEADERS_TO_REMOVE) {
      requestHeaders.delete(header);
    }

    // Forward the request body for methods that support one.
    const body =
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer();

    const upstream = await fetch(url, {
      method: request.method,
      headers: requestHeaders,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    // Prepare response headers.
    // Fetch may automatically decompress the upstream response body.
    const responseHeaders = new Headers(upstream.headers);

    for (const header of RESPONSE_HEADERS_TO_REMOVE) {
      responseHeaders.delete(header);
    }

    // Preserve backend cookies on the frontend domain.
    const cookies = upstream.headers.getSetCookie();

    for (const cookie of cookies) {
      responseHeaders.append(
        "Set-Cookie",
        cookie.replace(/;\s*domain=[^;]*/gi, ""),
      );
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[Backend Proxy Error]", error);

    return Response.json(
      {
        success: false,
        message: "Backend API unavailable",
      },
      { status: 502 },
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
