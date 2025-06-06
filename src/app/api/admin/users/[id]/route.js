import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import User from '@/server/models/User';
import { withAuth } from '@/server/utils/middleware';

// Get all users (admin only)
export const GET = withAuth(async () => {
    try {
        await connectDB();
        const users = await User.find({}, '-password').sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}, true); // true means require admin role

// Update user role (admin only)
export const PATCH = withAuth(async (req, { params }) => {
    try {
        const { role } = await req.json();
        
        if (!['user', 'admin'].includes(role)) {
            return NextResponse.json(
                { message: 'Invalid role' },
                { status: 400 }
            );
        }

        await connectDB();
        const user = await User.findByIdAndUpdate(
            params.id,
            { role },
            { new: true, select: '-password' }
        );

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { message: 'Failed to update user' },
            { status: 500 }
        );
    }
}, true); // true means require admin role
