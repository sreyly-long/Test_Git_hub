import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/reservation",
  "/rooms",
  "/staffs",
  "/analytics",
  "/reports",
  "/reviews",
  "/invoices",
  "/settings",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has("session");

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/reservation/:path*", "/rooms/:path*", "/staffs/:path*", "/analytics/:path*", "/reports/:path*", "/reviews/:path*", "/invoices/:path*", "/settings/:path*"],
};
