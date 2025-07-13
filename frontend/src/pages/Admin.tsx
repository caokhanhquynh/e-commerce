import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

interface AdminStats {
    totalUsers: number;
    totalItems: number;
    totalOrders: number;
    revenue: number;
}

function Admin() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'items' | 'orders'>('dashboard');
  
    // fetch user and stat
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }
            
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    navigate('/');
                    return;
                }

                if (!payload || payload.type !== "admin") {
                    navigate('/');
                    return;
                }
                setUser(payload);
            } catch (error) {
                console.error('Error parsing token:', error);
                // Clear invalid token
                localStorage.removeItem('token');
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAdminStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${__API_URL__}/api/admin/stats`, {
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
            }
        };

        fetchUserData()
        fetchAdminStats()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }
    if (!user) {
        return null;
    }
  
    return (
    <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
            </div>
            </div>
        </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
                {[
                { key: 'dashboard', label: 'Dashboard' },
                { key: 'users', label: 'Users' },
                { key: 'items', label: 'Items' },
                { key: 'orders', label: 'Orders' }
                ].map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </nav>
            </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
            <div>
            <h2 className="text-lg font-semibold mb-6">Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">U</span>
                    </div>
                    </div>
                    <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">I</span>
                    </div>
                    </div>
                    <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalItems || 0}</p>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">O</span>
                    </div>
                    </div>
                    <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</p>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">$</span>
                    </div>
                    </div>
                    <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats?.revenue || 0}</p>
                    </div>
                </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                </div>
                <div className="px-6 py-4">
                <p className="text-gray-600">No recent activity to display.</p>
                </div>
            </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div>
            <h2 className="text-lg font-semibold mb-6">User Management</h2>
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4">
                <p className="text-gray-600">User management features coming soon...</p>
                </div>
            </div>
            </div>
        )}

        {activeTab === 'items' && (
            <div>
            <h2 className="text-lg font-semibold mb-6">Item Management</h2>
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4">
                <p className="text-gray-600">Item management features coming soon...</p>
                </div>
            </div>
            </div>
        )}

        {activeTab === 'orders' && (
            <div>
            <h2 className="text-lg font-semibold mb-6">Order Management</h2>
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4">
                <p className="text-gray-600">Order management features coming soon...</p>
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
    );
}

export default Admin;