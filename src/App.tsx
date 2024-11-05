// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './Components/Register';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import ProtectedRoute from './Components/ProtectRoute';
import axios from 'axios';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [id, setId] = useState(-1);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data) {
            setId(response.data.sub);
            setEmail(response.data.email);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false); // In case of error (e.g., token invalid)
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };
  
    checkAuth();
  }, []);

  // Wait for validating the token
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route for Home */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home id={id} email={email} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;