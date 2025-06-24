import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import * as React from 'react';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  // example React fetch call
  fetch(`${API_URL}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data.message));
  return (
    <Router>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button variant="contained">Hello world</Button>
      <Badge badgeContent={4} color="primary">
        <MailIcon color="action" />
      </Badge>

      <nav style={{ padding: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
