import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  // example React fetch call
  fetch(`${API_URL}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data.message));
  return (
    <Router>
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
