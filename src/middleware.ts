import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;

    // Handle admin subdomain
    if (hostname.startsWith('admin.')) {
        // If accessing admin subdomain root, serve /admin
        // If accessing admin subdomain with path, serve /admin/path
        const adminPath = pathname === '/' ? '/admin' : `/admin${pathname}`;

        // Rewrite to the admin routes
        return NextResponse.rewrite(new URL(adminPath, request.url));
    }

    // Block /admin routes on main domain (optional security)
    if (pathname.startsWith('/admin') && !hostname.startsWith('admin.') && !hostname.includes('localhost')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match all paths except static files and API routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
