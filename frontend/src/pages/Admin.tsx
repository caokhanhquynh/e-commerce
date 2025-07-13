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
    const [isLoading, setIsLoading] = useState(true);
  
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

        fetchUserData()
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
        hello
      </div>
    );
  }
  
  export default Admin;