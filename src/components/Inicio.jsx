import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/inicio.css';
function Inicio() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {          
          return <Navigate to="/login" />;
        }
        const response = await axios.get('http://localhost:4000/usersJWT/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);        
        return <Navigate to="/login" />;
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserList();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }-

  if (userList.length === 0) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="inicio-container">
      <h1 style={{ textAlign: 'center' }}>Listado de Usuarios</h1>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inicio;