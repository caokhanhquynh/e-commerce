import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

type User = {
  id: string;
  email: string;
  name: string;
};

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return;
      }
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.name,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error parsing token:', error);
      // Clear invalid token
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    // Clear token
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  const toggleCart = async () => {
    if (!showCart) {
      try {
        const res = await fetch(`${__API_URL__}/api/carts/${user ? user.id : ''}`);
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    }
    setShowCart(!showCart);
  };

  const handleOrder = async () => {
    try {
      // 1. Create new order
      const resOrder = await fetch(`${__API_URL__}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user ? user.id : 0 })
      });
      const orderData = await resOrder.json();
      const oid = orderData.data.oid;
  
      // 2. Add each item to order_items
      await Promise.all(cartItems.map(item =>
        fetch(`${__API_URL__}/api/order_items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oid, iid: item.iid, quantity: item.quantity })
        })
      ));
  
      // 3. Clear the cart
      await fetch(`${__API_URL__}/api/carts/clear/${user ? user.id : 0}`, { method: 'DELETE' });
  
      // 4. Show toast and refresh
      alert("Order placed successfully!");
      setCartItems([]);
      setShowCart(false);
  
    } catch (err) {
      console.error("Order failed", err);
      alert("Order failed. Try again.");
    }
  };
  


  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ShoppingCart className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">ShopHub</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

          {isLoggedIn && user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 text-sm font-medium">
                Welcome, {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
              <button onClick={toggleCart}>
                <ShoppingCart className="h-5 w-5"/>
              </button>

              {showCart && (
                <div className="absolute right-0 top-10 w-72 bg-white shadow-xl rounded-xl border border-gray-200 z-50 p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Your Cart</h3>

                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-500">Cart is empty.</p>
                  ) : (
                    <>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {cartItems.map(item => (
                        <li key={item.iid} className="flex items-center space-x-3">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-md border"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">${item.price}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={handleOrder}
                      className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200"
                    >
                      Place Order
                    </button>
                    </>
                  )}
                </div>
              )}

            </div>):(
            <div className="hidden sm:flex items-center space-x-3">
              <Link to="/login">
                <button className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Login
                </button>
              </Link>
              
              <Link to="/register">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </div>)}
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;