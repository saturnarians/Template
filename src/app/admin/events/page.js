'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EventForm from '@/client/components/admin/EventForm';
import EventList from '@/client/components/admin/EventList';

export default function EventAdmin() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.push('/auth/login');
            return;
        }
        fetchEvents(token);
    }, [router]);

    const fetchEvents = async (token) => {
        try {
            const response = await fetch('/api/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.status === 401) {
                router.push('/auth/login');
                return;
            }
            
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };    const handleSubmit = async (data) => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            const url = selectedEvent
                ? `/api/events/${selectedEvent._id}`
                : '/api/events';
            const method = selectedEvent ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.status === 401) {
                router.push('/auth/login');
                return;
            }

            if (response.ok) {
                fetchEvents(token);
                setSelectedEvent(null);
                setIsFormVisible(false);
            } else {
                const error = await response.json();
                setError(error.message);
            }
        } catch (error) {
            setError('Error saving event: ' + error.message);
        }
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsFormVisible(true);
    };    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        const token = localStorage.getItem('auth-token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                router.push('/auth/login');
                return;
            }

            if (response.ok) {
                fetchEvents(token);
            } else {
                const error = await response.json();
                setError(error.message);
            }
        } catch (error) {
            setError('Error deleting event: ' + error.message);
        }
    };    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError('')}>
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                            </svg>
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Manage Events
                    </h1>
                    <button
                        onClick={() => {
                            setSelectedEvent(null);
                            setIsFormVisible(!isFormVisible);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isFormVisible ? 'Cancel' : 'Add New Event'}
                    </button>
                </div>

                {isFormVisible && (
                    <div className="mb-8">
                        <EventForm
                            onSubmit={handleSubmit}
                            initialData={selectedEvent}
                        />
                    </div>
                )}

                <EventList
                    events={events}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}
