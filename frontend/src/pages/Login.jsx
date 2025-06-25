// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login() {
    console.log('🔍 Raw VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🔍 Type:', typeof import.meta.env.VITE_API_URL);
    console.log('🔍 Length:', import.meta.env.VITE_API_URL?.length);
    
    const API_URL = __API_URL__;
    console.log('🔍 Final API_URL:', API_URL);
    console.log('🔍 Final API_URL:', import.meta.env.RAILWAY_PUBLIC_DOMAIN);
    console.log('🔍 Final API_URL:', import.meta.env.VITE_MESS);


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
