import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import Event from '@/server/models/Event';
import { withRole } from '@/server/utils/middleware';

// Get specific event
export async function GET(req, { params }) {
    try {
        await connectDB();
        const event = await Event.findById(params.id)
            .populate('createdBy', 'name');
        
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch event' },
            { status: 500 }
        );
    }
}

// Update event (protected route)
export const PUT = withRole(async (req, { params }) => {
    try {
        const data = await req.json();
        await connectDB();

        const event = await Event.findByIdAndUpdate(
            params.id,
            { ...data },
            { new: true }
        );

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update event' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']);

// Delete event (protected route)
export const DELETE = withRole(async (req, { params }) => {
    try {
        await connectDB();
        
        const event = await Event.findByIdAndDelete(params.id);
        
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Event deleted successfully' }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']);
