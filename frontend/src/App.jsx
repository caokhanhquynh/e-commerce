import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import * as React from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddItemForm from './pages/AddItem';

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  // example React fetch call
  fetch(`${API_URL}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data.message));
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add_items" element={<AddItemForm />} />
      </Routes>
    </Router>
  );
}

export default App;
