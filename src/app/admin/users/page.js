'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetch('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    localStorage.removeItem('auth-token');
                    router.push('/auth/login');
                } else {
                    setUser(data);
                }
            })
            .catch(err => {
                console.error('Error fetching user:', err);
                router.push('/auth/login');
            });
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Welcome, {user.name} 👋</h1>
            <p>Role: {user.role}</p>
        </div>
    );
}
