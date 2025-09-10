import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const protectedRoutes = [
    "/",
    "/about-us",
    "/privacy-policy",
    "/terms-conditions",
    "/faq",
    "/notifications",
    "/analytics",
    "/users",
    "/subscription",
    "/assessment",
    "/assessment/:path*",
    "/categories",
    "/templates",
    "/earnings",
  ];
  const notProtectedRoutes = ["/auth/login"];
  const additionalConditions = [
    request.nextUrl.pathname.startsWith("/assessment"),
  ];
  const pathname = request.nextUrl.pathname;
  const token = (await cookies()).get("accessToken")?.value;

  if (
    (!token && protectedRoutes.includes(pathname)) ||
    (additionalConditions.includes(true) && !token)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/:path*"],
};
