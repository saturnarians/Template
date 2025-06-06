import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Adjust path based on where your auth file is

// Simulated user DB for demo (replace with actual DB fetch)
const users = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
  { _id: '2', name: 'Admin Adminson', email: 'admin@example.com', role: 'admin' },
  { _id: '3', name: 'Super Admin', email: 'super@example.com', role: 'superadmin' },
];

export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyToken(token); // uses your jose setup

    const user = users.find((u) => u.email === payload.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error('Verification failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
