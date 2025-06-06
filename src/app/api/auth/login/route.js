import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import User from '@/server/models/User';
import { comparePasswords, generateToken } from '@/server/services/auth';

export async function POST(req) {
    try {
        // First try to parse the request
        let email, password;
        try {
            const body = await req.json();
            email = body.email;
            password = body.password;
            console.log('Received login request for:', email);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            return NextResponse.json(
                { error: 'Invalid request format' },
                { status: 400 }
            );
        }

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        console.log('Attempting to connect to DB...');
        await connectDB();
        console.log('DB connection successful');

        console.log('Looking for user with email:', email);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isPasswordValid = await comparePasswords(password, user.password);        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Skip verification check for superadmin
        if (user.role !== 'superadmin' && (!user.isEmailVerified || !user.isPhoneVerified)) {
            return NextResponse.json(
                { error: 'Please verify your email and phone number' },
                { status: 403 }
            );
        }

        const token = generateToken(user);

        return NextResponse.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });    } catch (error) {
        console.error('Login error:', error);
        console.error('Stack trace:', error.stack);
        
        // Ensure we send a proper JSON response even for DB connection errors
        if (error.name === 'MongoServerError') {
            return NextResponse.json(
                { error: 'Database connection failed. Please try again.' },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { error: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
