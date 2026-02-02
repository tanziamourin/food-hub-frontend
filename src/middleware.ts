import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Higher security environments (HTTPS) use the __Secure- prefix
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie) {
        // Not authenticated, redirect to login
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackURL", pathname);
        return NextResponse.redirect(loginUrl);
    }

    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/customer/:path*",
        "/adminDashboard/:path*",
        "/providerDashboard/:path*"
    ],
}
