import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login({ setIsLoggedIn }) {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    //console.log("Datos enviados:", { email, password });
    try {
      const response = await axios.post('http://localhost:4000/usersJWT/login', { email, password });      
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error de respuesta del servidor:', error.response.data);
        setError(error.response.data.message || 'Error en el servidor');
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setError('Error de red. Verifica tu conexión.');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        setError('Error inesperado. Inténtalo de nuevo más tarde.');
      }
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="white-text">Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label className="white-text" htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="white-text" htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}
export default Login;