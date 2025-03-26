import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken')?.value;
    const path = req.nextUrl.pathname;
  
    // Allow API routes
    if (path.startsWith('/api')) {
      return NextResponse.next();
    }
  
    if (path.startsWith('/login') && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  
    if (path.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    return NextResponse.next();
  }

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login'],
};
