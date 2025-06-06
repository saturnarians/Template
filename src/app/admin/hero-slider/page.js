'use client';

import React, { useState, useEffect } from 'react';
import HeroSlideForm from '@/client/components/admin/HeroSlideForm';
import HeroSlideList from '@/client/components/admin/HeroSlideList';

export default function HeroSliderAdmin() {
    const [slides, setSlides] = useState([]);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const response = await fetch('/api/admin/hero-slider');
            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    };

    const handleSubmit = async (data) => {
        try {
            const url = selectedSlide
                ? `/api/admin/hero-slider/${selectedSlide._id}`
                : '/api/admin/hero-slider';
            const method = selectedSlide ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                fetchSlides();
                setSelectedSlide(null);
                setIsFormVisible(false);
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Error saving slide:', error);
            alert('Failed to save slide');
        }
    };

    const handleEdit = (slide) => {
        setSelectedSlide(slide);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this slide?')) return;

        try {
            const response = await fetch(`/api/admin/hero-slider/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSlides();
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Error deleting slide:', error);
            alert('Failed to delete slide');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Manage Hero Slider
                    </h1>
                    <button
                        onClick={() => {
                            setSelectedSlide(null);
                            setIsFormVisible(!isFormVisible);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isFormVisible ? 'Cancel' : 'Add New Slide'}
                    </button>
                </div>

                {isFormVisible && (
                    <div className="mb-8">
                        <HeroSlideForm
                            onSubmit={handleSubmit}
                            initialData={selectedSlide}
                        />
                    </div>
                )}

                <HeroSlideList
                    slides={slides}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
