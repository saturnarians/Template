import { NextResponse } from 'next/server';
import connectDB from '@/server/utils/db';
import HeroSlider from '@/server/models/HeroSlider';
import { withRole } from '@/server/utils/middleware';

// Get specific slide
export async function GET(req, { params }) {
    try {
        await connectDB();
        const slide = await HeroSlider.findById(params.id)
            .populate('createdBy', 'name');
        
        if (!slide) {
            return NextResponse.json(
                { error: 'Slide not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch slide' },
            { status: 500 }
        );
    }
}

// Update slide (protected route)
export const PUT = withRole(async (req, { params }) => {
    try {
        const data = await req.json();
        await connectDB();

        const slide = await HeroSlider.findByIdAndUpdate(
            params.id,
            { ...data },
            { new: true }
        );

        if (!slide) {
            return NextResponse.json(
                { error: 'Slide not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(slide);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update slide' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']);

// Delete slide (protected route)
export const DELETE = withRole(async (req, { params }) => {
    try {
        await connectDB();
        
        const slide = await HeroSlider.findByIdAndDelete(params.id);
        
        if (!slide) {
            return NextResponse.json(
                { error: 'Slide not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Slide deleted successfully' }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete slide' },
            { status: 500 }
        );
    }
}, ['admin', 'superadmin']);
