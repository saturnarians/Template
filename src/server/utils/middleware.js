import { verifyToken } from '../services/auth';
import { NextResponse } from 'next/server';

export function withAuth(handler, requireAdmin = false) {
    return async (req) => {
        try {
            const token = req.headers.get('authorization')?.split(' ')[1];
            
            if (!token) {
                return new NextResponse(JSON.stringify({ message: 'Unauthorized - No token provi                                                                                                                                                                                    ded' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const decoded = await verifyToken(token);
            if (!decoded) {
                return new NextResponse(JSON.stringify({ message: 'Unauthorized - Invalid token' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (requireAdmin && decoded.role !== 'admin') {
                return new NextResponse(JSON.stringify({ message: 'Forbidden - Admin access required' }), {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            req.user = decoded;
            return handler(req);
        } catch (error) {
            return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    };
}

export function withRole(handler, allowedRoles) {
    return withAuth(async (req) => {
        if (!allowedRoles.includes(req.user.role)) {
            return new NextResponse(JSON.stringify({ error: 'Forbidden - Insufficient permissions' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return handler(req);
    });
}
