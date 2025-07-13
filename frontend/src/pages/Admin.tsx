import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

function Admin() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
        const fetchUserData = async () => {
            try {
            const token = localStorage.getItem('token');
            if (!token) return;
        
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                return;
            }
            setUser(payload);
            } catch (error) {
                console.error('Error parsing token:', error);
                // Clear invalid token
                localStorage.removeItem('token');
            }
        };

        fetchUserData()
    }, [])
  
    return (
      <div className="min-h-screen bg-gray-100">
        hello
      </div>
    );
  }
  
  export default Admin;