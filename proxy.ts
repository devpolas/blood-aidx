import { NextRequest, NextResponse } from "next/server";

import { getDashboardPath, hasRouteAccess } from "./config";
import type { UserRole } from "./types/enum";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-account",
  "/verify-password-reset",
  "/auth/google",
] as const;

const PROTECTED_PREFIX = "/dashboard";

type AuthUser = {
  role?: UserRole;
  roles?: UserRole[];
};

type AuthResponse = {
  success: boolean;
  data?: {
    user?: AuthUser;
  };
};

function isRouteMatch(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function getUserRole(user: AuthUser): UserRole | undefined {
  return user.role ?? user.roles?.[0];
}

function getCookieHeader(
  request: NextRequest,
  setCookies: string[] = [],
): string {
  const cookies = new Map<string, string>();

  for (const cookie of request.cookies.getAll()) {
    cookies.set(cookie.name, cookie.value);
  }

  for (const cookie of setCookies) {
    const pair = cookie.split(";")[0];
    const separator = pair.indexOf("=");

    if (separator > 0) {
      cookies.set(pair.slice(0, separator), pair.slice(separator + 1));
    }
  }

  return Array.from(cookies, ([name, value]) => `${name}=${value}`).join("; ");
}

async function getAuthUser(cookieHeader: string): Promise<AuthUser | null> {
  if (!API_URL || !cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as AuthResponse;

    if (!result.success || !result.data?.user) {
      return null;
    }

    return result.data.user;
  } catch {
    return null;
  }
}

async function refreshSession(request: NextRequest) {
  if (!API_URL) {
    return null;
  }

  const cookieHeader = request.headers.get("cookie") ?? "";

  if (!cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/fresh-token`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const cookies = response.headers.getSetCookie();

    return {
      cookies,
      cookieHeader: getCookieHeader(request, cookies),
    };
  } catch {
    return null;
  }
}

function applyCookies(response: NextResponse, cookies: string[]): NextResponse {
  for (const cookie of cookies) {
    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}

function redirectToDashboard(
  request: NextRequest,
  role: UserRole,
  cookies: string[],
): NextResponse {
  return applyCookies(
    NextResponse.redirect(new URL(getDashboardPath(role), request.url)),
    cookies,
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isPublic = PUBLIC_ROUTES.some((route) => isRouteMatch(pathname, route));

  const isProtected = isRouteMatch(pathname, PROTECTED_PREFIX);

  if (!isPublic && !isProtected) {
    return NextResponse.next();
  }

  let cookieHeader = request.headers.get("cookie") ?? "";
  let refreshedCookies: string[] = [];

  let user = await getAuthUser(cookieHeader);

  if (!user) {
    const refreshed = await refreshSession(request);

    if (refreshed) {
      refreshedCookies = refreshed.cookies;
      cookieHeader = refreshed.cookieHeader;
      user = await getAuthUser(cookieHeader);
    }
  }

  const role = user ? getUserRole(user) : undefined;

  // Redirect authenticated users away from authentication pages.
  if (isPublic && user) {
    if (role) {
      return redirectToDashboard(request, role, refreshedCookies);
    }

    return applyCookies(
      NextResponse.redirect(new URL("/", request.url)),
      refreshedCookies,
    );
  }

  if (isProtected) {
    // Preserve the requested path and query string.
    if (!user || !role) {
      const callbackUrl = `${pathname}${search}`;

      const response = NextResponse.redirect(
        new URL(
          `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          request.url,
        ),
      );

      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      return response;
    }

    // Redirect /dashboard to the role-specific dashboard.
    if (pathname === PROTECTED_PREFIX) {
      return redirectToDashboard(request, role, refreshedCookies);
    }

    // Block access to another role's dashboard.
    if (!hasRouteAccess(role, pathname)) {
      return redirectToDashboard(request, role, refreshedCookies);
    }
  }

  return applyCookies(NextResponse.next(), refreshedCookies);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
