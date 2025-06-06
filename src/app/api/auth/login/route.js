import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import User from '@/server/models/User';
import { comparePasswords } from '@/server/services/auth';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user || !(await comparePasswords(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (
            user.role !== 'superadmin' &&
            (!user.isEmailVerified || !user.isPhoneVerified)
        ) {
            return NextResponse.json(
                { error: 'Please verify your email and phone number' },
                { status: 403 }
            );
        }

        // Generate JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            id: user._id.toString(),
            role: user.role,
            email: user.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secret);

        // Set token as HTTP-only cookie
        const cookie = serialize('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax',
        });

        const response = NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
            },
        });

        response.headers.set('Set-Cookie', cookie);

        return response;
    } catch (error) {
        console.error('Login error:', error.message);
        console.error(error.stack);
        return NextResponse.json(
            { error: 'Internal server error during login' },
            { status: 500 }
        );
    }
}
