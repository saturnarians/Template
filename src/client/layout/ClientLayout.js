'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Footer from '../layout/Footer';


// Import all CSS here in the client component
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Header = dynamic(() => import('../layout/Header'), {
    ssr: false
});

export default function ClientLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer/>
            
        </>
    );
}
