'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const getEventsForDate = (date) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const selectedEvents = getEventsForDate(selectedDate);

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h1 className="text-4xl font-bold text-center mb-12">Church Events</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Event Calendar</h2>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="w-full bg-white rounded-lg shadow p-4"
                        tileContent={({ date }) => {
                            const dayEvents = getEventsForDate(date);
                            return dayEvents.length > 0 ? (
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-indigo-600 rounded-full"></div>
                            ) : null;
                        }}
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-6">
                        Events for {selectedDate.toLocaleDateString()}
                    </h2>
                    {selectedEvents.length > 0 ? (
                        <div className="space-y-6">
                            {selectedEvents.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-white rounded-lg shadow p-6"
                                >
                                    <h3 className="text-xl font-semibold mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {event.description}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {event.time}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mt-2">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        {event.location}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No events scheduled for this date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
