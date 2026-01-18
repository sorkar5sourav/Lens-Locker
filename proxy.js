import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protected routes - require authentication
  const protectedRoutes = ["/gear/add"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Only check authentication for protected routes
  if (isProtectedRoute) {
    try {
      // Try to get the token - getToken will automatically handle cookie names
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // If accessing protected route without token, redirect to login
      if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // If there's an error reading the token, redirect to login
      console.error("Proxy auth error:", error);
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // For admin routes, we still need the token
  const adminRoutes = ["/dashboard", "/admin"];
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAdminRoute) {
    try {
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token || token?.role !== "admin") {
        return NextResponse.rewrite(new URL("/forbidden", request.url));
      }
    } catch (error) {
      console.error("Proxy admin auth error:", error);
      return NextResponse.rewrite(new URL("/forbidden", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gear/add/:path*", "/dashboard/:path*", "/admin/:path*"],
};
