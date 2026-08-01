import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/projects/:path*",
    "/developer-hub/:path*",
    "/certificates/:path*",
    "/achievements/:path*",
    "/resume-builder/:path*",
    "/settings/:path*",
  ],
};