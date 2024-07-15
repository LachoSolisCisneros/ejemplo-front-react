import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Inicio from './components/Inicio';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:4000/usersJWT/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            setIsLoggedIn(false); 
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false); 
        }
      }
    };

    verifyToken();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/"
          element={isLoggedIn ? <Inicio /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}
export default App;
