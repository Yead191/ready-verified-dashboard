import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const allowedPaths = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-otp",
  "/auth/verify-otp",
];
const privateRoutes = [
  "/analytics",
  "/assessment",
  "/users",
  "/profile",
  "/templates",
  "/notifications",
];
export const middleware = async (request: NextRequest) => {
  const userToken = (await cookies()).get("accessToken")?.value;

  const pathname = request.nextUrl.pathname;
  // console.log(pathname);

  if (!userToken && !allowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  // console.log(userToken);

  const userFromServer = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      cache: "no-store",
    }
  );

  // Check if response is JSON and OK
  let user = null;
  if (userFromServer.ok) {
    try {
      user = (await userFromServer.json())?.data;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      user = null;
    }
  } else {
    console.error("User fetch failed:", userFromServer.status);
    user = null;
  }

  
  if (!allowedPaths.includes(request.nextUrl.pathname) && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    pathname.startsWith("/dashboard") &&
    !privateRoutes.includes(pathname) &&
    !["SUPER_ADMIN", "ADMIN"].includes(user?.role)
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
