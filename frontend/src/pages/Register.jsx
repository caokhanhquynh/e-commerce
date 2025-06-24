import React, { useState } from 'react';

export default function Signup() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage('Signup successful!');
            setFormData({ email: '', password: '', name: '' });
        } else {
            setMessage(data.error || 'Signup failed');
        }
        } catch (err) {
        console.error(err);
        setMessage('An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

            <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 mb-3 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
            />

            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
            Sign Up
            </button>

            {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}
        </form>
        </div>
    );
}
