// place in /api/auth/me/route.js


import { NextResponse } from 'next/server';
import { verifyToken } from '@/server/services/auth';
import connectDB from '@/server/utils/db';
import User from '@/server/models/User';

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    // Get the token from cookies
    const token = req.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    // Verify the JWT token
    const payload = await verifyToken(token);

    // Find the user in the database
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user data
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });

  } catch (error) {
    console.error('Verification failed:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
