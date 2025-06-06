'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LayoutDashboard, Users, Sliders, Info, Phone } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: User, label: 'Manage Users' },
  { icon: Sliders, label: 'Manage Slides' },
  { icon: Info, label: 'Manage About' },
  { icon: Phone, label: 'Manage Contact' },
  { icon: Settings, label: 'Settings' },
];

export default function page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) router.push('/auth/login');

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.role !== 'superadmin') {
          router.push('/auth/login');
        } else {
          setUser(data);
        }
      })
      .catch(() => router.push('/auth/login'));
  }, []);

  if (!user) return <div className="p-6 text-center">Loading Dashboard...</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6 space-y-6">
        <div className="text-2xl font-bold">Church Admin</div>
        <div className="flex flex-col gap-4">
          <div className="font-semibold text-lg">{user.name}</div>
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded-md"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white border-b px-6 py-4 shadow-sm">
          <div className="text-xl font-bold text-blue-800">Church Logo</div>
          <div className="flex items-center gap-4">
            <img
              src="/avatar-placeholder.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border"
            />
            <button className="text-sm text-blue-800">Settings</button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h1>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-sm text-gray-500">Total Programs</h2>
              <p className="text-xl font-bold">12</p>
            </div>
            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-sm text-gray-500">Total Users</h2>
              <p className="text-xl font-bold">56</p>
            </div>
            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-sm text-gray-500">Slides</h2>
              <p className="text-xl font-bold">5</p>
            </div>
            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-sm text-gray-500">Messages</h2>
              <p className="text-xl font-bold">24</p>
            </div>
          </div>

          {/* Settings Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Profile Settings</h2>
            <div className="space-y-3">
              <div>Email: {user.email}</div>
              <div>Phone: +234 *** *** ****</div>
              <div>Password: ******** <button className="ml-2 text-blue-600 text-sm">Change</button></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
