import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import HeroSlider from '@/server/models/HeroSlider';
import { withAuth } from '@/server/utils/middleware';
import { withRole } from '@/server/utils/middleware';  // Ensure withRole is imported

// Get all hero slides (requires authentication)
export const GET = withAuth(async () => {
    try {
        await connectDB();
        const slides = await HeroSlider.find({ active: true })
            .sort({ order: 1 })
            .populate('createdBy', 'name');
        
        return NextResponse.json(slides);
    } catch (error) {
        console.error('Error fetching slides:', error);
        return NextResponse.json(
            { error: 'Failed to fetch slides' },
            { status: 500 }
        );
    }
});

// Create new hero slide (protected route with role check)
export const POST = withAuth(withRole(async (req) => {
    try {
        const data = await req.json();
        await connectDB();

        const slide = await HeroSlider.create({
            ...data,
            createdBy: req.user.id
        });

        return NextResponse.json(slide, { status: 201 });
    } catch (error) {
        console.error('Error creating slide:', error);
        return NextResponse.json(
            { error: 'Failed to create slide' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']));
