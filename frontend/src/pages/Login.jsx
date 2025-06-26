// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const API_URL = __API_URL__;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/login`, {
                email,
                password
            },
            { withCredentials: true }
            );
            alert('Logged in!');
        } catch (err) {
            alert('Login failed', err);
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
