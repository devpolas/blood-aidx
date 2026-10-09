import { NextRequest } from "next/server";

const API_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (!API_URL) {
    return Response.json(
      { success: false, message: "API URL is not configured" },
      { status: 500 },
    );
  }

  const { path } = await context.params;
  const url = `${API_URL}/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  try {
    const upstream = await fetch(url, {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.delete("set-cookie");

    const response = new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });

    for (const cookie of upstream.headers.getSetCookie()) {
      // Make backend cookies available to the frontend's own domain.
      response.headers.append(
        "Set-Cookie",
        cookie.replace(/;\s*domain=[^;]*/gi, ""),
      );
    }

    return response;
  } catch {
    return Response.json(
      { success: false, message: "Backend API unavailable" },
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
