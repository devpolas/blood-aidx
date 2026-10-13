import { NextRequest, NextResponse } from "next/server";
import { proxyToExpress, relayCookies } from "@/lib/expressProxy";

export async function GET(req: NextRequest) {
  const upstream = await proxyToExpress(req, "/auth/google/callback");

  const location = upstream.headers.get("location");

  if (upstream.status >= 300 && upstream.status < 400 && location) {
    const destination = new URL(location, req.url);

    // OAuth completion should redirect back to your own frontend.
    if (destination.origin !== new URL(req.url).origin) {
      return NextResponse.redirect(
        new URL("/signin?error=oauth_failed", req.url),
      );
    }

    return relayCookies(upstream, NextResponse.redirect(destination));
  }

  return relayCookies(
    upstream,
    new NextResponse(upstream.body, {
      status: upstream.status,
      headers: upstream.headers,
    }),
  );
}
