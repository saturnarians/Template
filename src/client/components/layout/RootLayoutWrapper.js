'use client';

import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/client/layout/ClientLayout'), {
    ssr: false
});

export default function RootLayoutWrapper({ children }) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    );
}
