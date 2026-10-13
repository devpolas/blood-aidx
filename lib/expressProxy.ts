import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_BASE_URL?.replace(/\/+$/, "");

export async function proxyToExpress(
  req: NextRequest,
  expressPath: string,
): Promise<Response> {
  if (!API_URL) {
    return Response.json(
      { success: false, message: "API URL is not configured" },
      { status: 500 },
    );
  }

  const url = new URL(`${API_URL}/${expressPath.replace(/^\/+/, "")}`);
  url.search = req.nextUrl.search;

  const headers = new Headers();
  const cookie = req.headers.get("cookie");
  const contentType = req.headers.get("content-type");
  const accept = req.headers.get("accept");

  if (cookie) headers.set("cookie", cookie);
  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  try {
    return await fetch(url, {
      method: req.method,
      headers,
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : await req.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return Response.json(
      { success: false, message: "Backend API unavailable" },
      { status: 502 },
    );
  }
}

export function relayCookies(from: Response, to: NextResponse): NextResponse {
  for (const cookie of from.headers.getSetCookie()) {
    // Remove the backend's domain so the browser can store
    // the cookie for the frontend domain.
    to.headers.append("Set-Cookie", cookie.replace(/;\s*domain=[^;]*/gi, ""));
  }

  return to;
}
