'use client';

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Import necessary icons for mobile menu (e.g., Heroicons)
// You might need to install: npm install @heroicons/react
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


const Clock = dynamic(() => import('react-clock').then(mod => mod.Clock), {
    ssr: false
});
const Calendar = dynamic(() => import('react-calendar'), {
    ssr: false
});

export default function Header() {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
    const [isSticky, setIsSticky] = useState(false); // State for sticky header
    const [isHidden, setIsHidden] = useState(false); // State for hiding header on scroll up
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position

    // Effect for the real-time clock
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Effect for sticky and hide/show header behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if header should be sticky
            // We make it sticky after scrolling down a certain amount (e.g., 100px)
            setIsSticky(currentScrollY > 100);

            // Determine if header should be hidden/shown
            if (currentScrollY > lastScrollY && currentScrollY > 200) { // Scroll down and past initial offset
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY || currentScrollY < 100) { // Scroll up or near top
                setIsHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // Re-run effect when lastScrollY changes

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            // Conditional classes for sticky, hidden, and transitions
            className={`
                bg-white shadow-md
                fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out
                ${isSticky ? 'shadow-lg' : ''}
                ${isHidden ? '-translate-y-full' : 'translate-y-0'}
            `}
        >
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Site Title */}
                    <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 flex-shrink-0"> {/* Add flex-shrink-0 */}
                            <Image
                                src="/images/Logo.svg"
                                alt="Church Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                                priority={true}
                            />
                        </div>
                        <a href="/" className="text-xl font-bold text-gray-800 whitespace-nowrap">TOTHGM</a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-4">
                            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
                            <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
                            <a href="/events" className="text-gray-600 hover:text-gray-800">Events</a>
                            <a href="/contact" className="text-gray-600 hover:text-gray-800">Contact</a>
                            {localStorage.getItem('auth-token') ? (
                                <>
                                    <a href="/admin/users" className="text-gray-600 hover:text-gray-800">Manage Users</a>
                                    <a href="/admin/hero-slider" className="text-gray-600 hover:text-gray-800">Hero Slider</a>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('auth-token');
                                            window.location.href = '/';
                                        }}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <a href="/auth/login" className="text-gray-600 hover:text-gray-800">
                                    Sign In
                                </a>
                            )}
                        </div>

                        {/* Calendar Dropdown - Keep as is, it's already hidden on mobile */}
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
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-8 w-8" /> // Close icon
                            ) : (
                                <Bars3Icon className="h-8 w-8" /> // Hamburger icon
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg py-4 transition-all duration-300 ease-in-out">
                    <div className="container mx-auto px-6 flex flex-col space-y-4">
                        <a href="/" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Home</a>
                        <a href="/about" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>About</a>
                        <a href="/events" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Events</a>
                        <a href="/contact" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Contact</a>
                        {localStorage.getItem('auth-token') ? (
                            <>
                                <a href="/admin/users" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Manage Users</a>
                                <a href="/admin/hero-slider" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Hero Slider</a>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('auth-token');
                                        window.location.href = '/';
                                    }}
                                    className="text-gray-800 hover:text-blue-600 text-left w-full"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <a href="/auth/login" className="text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>
                                Sign In
                            </a>
                        )}
                        {/* Calendar in mobile menu can be added here if needed */}
                        {/* <div className="py-2">
                             <Calendar onChange={setDate} value={date} className="bg-white shadow-lg rounded-lg w-full" />
                        </div> */}
                    </div>
                </div>
            )}
        </header>
    );
}