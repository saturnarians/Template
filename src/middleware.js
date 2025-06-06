import { NextResponse } from 'next/server';
import { verifyToken } from '@/server/services/auth';

export async function middleware(request) {
    // Get the pathname of the request (e.g. /api/users, /api/admin)
    const pathname = request.nextUrl.pathname;

    // If it's an API route that starts with /api/admin
    if (pathname.startsWith('/api/admin')) {
        const token = request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: 'Authentication required' }),
                { status: 401 }
            );
        }

        try {
            const decoded = await verifyToken(token);
            
            // Check if user is admin
            if (decoded.role !== 'admin') {
                return new NextResponse(
                    JSON.stringify({ message: 'Admin access required' }),
                    { status: 403 }
                );
            }

            // Add user info to request headers for downstream use
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user-id', decoded.id);
            requestHeaders.set('x-user-role', decoded.role);

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            return new NextResponse(
                JSON.stringify({ message: 'Invalid token' }),
                { status: 401 }
            );
        }
    }

    // If it's a page route that starts with /admin
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        try {
            const decoded = await verifyToken(token);
            
            // Check if user is admin
            if (decoded.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*']
};
