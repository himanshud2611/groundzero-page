import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;

    // Skip API routes - don't rewrite them
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Handle admin subdomain
    if (hostname.startsWith('admin.')) {
        // Skip if already has /admin prefix (avoid double rewrite)
        if (pathname.startsWith('/admin')) {
            return NextResponse.next();
        }

        // Rewrite root to /admin, other paths to /admin/path
        const adminPath = pathname === '/' ? '/admin' : `/admin${pathname}`;
        return NextResponse.rewrite(new URL(adminPath, request.url));
    }

    // Block /admin routes on main domain (security)
    if (pathname.startsWith('/admin') && !hostname.includes('localhost')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
