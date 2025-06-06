'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Clock = dynamic(() => import('react-clock').then(mod => mod.Clock), {
  ssr: false
});
const Calendar = dynamic(() => import('react-calendar'), {
  ssr: false
});

export default function Header() {
    const [time, setTime] = React.useState(new Date());
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">                    
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/images/Logo.svg"
                                alt="Church Logo"
                                width={40} 
                                height={40}
                                className="object-contain"
                                priority={true}
                            />
                        </div>
                        <a href="/" className="text-xl font-bold text-gray-800">TOTHGM</a>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="hidden md:flex space-x-4">
                            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
                            <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
                            <a href="/events" className="text-gray-600 hover:text-gray-800">Events</a>
                            <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>                            
                            {localStorage.getItem('auth-token') ? (
                                <>
                                    <a href="/admin/users" className="text-gray-600 hover:text-gray-800">Manage Users</a>
                                    <a href="/admin/hero-slider" className="text-gray-600 hover:text-gray-800">Hero Slider</a>
                                    <button onClick={() => {
                                        localStorage.removeItem('auth-token');
                                        window.location.href = '/';
                                    }} className="text-gray-600 hover:text-gray-800">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <a href="/auth/login" className="text-gray-600 hover:text-gray-800">
                                    Sign In
                                </a>
                            )}
                        </div>
                        
                        {/* <div className="hidden md:flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                <Clock value={time} size={50} />
                            </div>
                            <div className="relative group">
                                <button className="text-gray-600 hover:text-gray-800">
                                    Calendar
                                </button>
                                <div className="absolute right-0 mt-2 hidden group-hover:block z-50">
                                    <Calendar
                                        onChange={setDate}
                                        value={date}
                                        className="bg-white shadow-lg rounded-lg"
                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </nav>
        </header>
    );
}
