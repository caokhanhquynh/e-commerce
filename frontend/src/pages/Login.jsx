// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    fetch(`${API_URL}/api/sellers`, {credentials: 'include'})
    .then(res => res.json())
    .then(data => console.log(data));

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post(`${API_URL}/api/login`, {
            email,
            password
        },
        { withCredentials: true }
        );
        console.log("im here", res);
        localStorage.setItem('token', res.data.token);
        alert('Logged in!');
        } catch (err) {
        alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        </form>
    );
}

export default Login;
