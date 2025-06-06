import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import User from '@/server/models/User';
import { hashPassword } from '@/server/services/auth';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 400 }
            );
        }        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role
            isEmailVerified: true, // For now, auto-verify
        });

        return NextResponse.json({ 
            message: 'Registration successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }, { status: 201 });    } catch (error) {
        console.error('Registration error:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json(
                { message: messages.join(', ') },
                { status: 400 }
            );
        }
        
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return NextResponse.json(
                { message: 'Email is already registered' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}
