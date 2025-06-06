import { NextResponse } from 'next/server';
import { verifyToken } from '@/server/services/auth';

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    // Protect API admin routes
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

            if (!['admin' , 'superadmin'].includes(decoded.role)) {
                console.log('Decoded Role:', decoded.role);
                return new NextResponse(
                    JSON.stringify({ message: 'Admin access required' }),
                    { status: 403 }
                );
            }

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

    // Protect page routes like /admin
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        try {
            const decoded = await verifyToken(token);

            if (!['admin', 'superadmin'].includes(decoded.role)) {
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
