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
