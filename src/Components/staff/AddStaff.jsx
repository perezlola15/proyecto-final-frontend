import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddStaff() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/project/api/staffs', {
        username,
        password,
        disabled,
        locked
      });
      console.log('Staff created:', response.data);
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
      <h2>Añadir staff</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="disabled">Desactivado:</label>
          <input
            type="checkbox"
            id="disabled"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="locked">Bloqueado:</label>
          <input
            type="checkbox"
            id="locked"
            checked={locked}
            onChange={(e) => setLocked(e.target.checked)}
          />
        </div>
        <button type="submit">Crear usuario</button><br />
        <Link to="/admin"><button className='button-create'>Volver atrás</button></Link>
      </form>
    </div>
  );
}

export default AddStaff;
