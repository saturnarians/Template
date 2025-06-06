import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import Event from '@/server/models/Event';
import { withRole } from '@/server/utils/middleware';

// Get all events
export async function GET() {
    try {
        await connectDB();
        const events = await Event.find()
            .sort({ date: 1 })
            .populate('createdBy', 'name');
        
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// Create new event (protected route)
export const POST = withRole(async (req) => {
    try {
        const data = await req.json();
        await connectDB();

        const event = await Event.create({
            ...data,
            createdBy: req.user.id
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']);
