import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../style/Style.css';

const UpdateStaff = () => {
  const [staff, setStaff] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/project/api/staffs/${id}`);
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaff();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8082/project/api/staffs/${id}', staff);
      // No hay redirección aquí, ya que se ha eliminado useHistory
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
      <h2>Editar staff</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={staff.username || ''}
          onChange={(e) => setStaff({ ...staff, username: e.target.value })}
        /><br /><br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={staff.password || ''}
          onChange={(e) => setStaff({ ...staff, password: e.target.value })}
        /><br /><br />
        <label htmlFor="disabled">Disabled:</label>
        <input
          type="checkbox"
          id="disabled"
          checked={staff.disabled || false}
          onChange={(e) => setStaff({ ...staff, disabled: e.target.checked })}
        /><br /><br />
        <label htmlFor="locked">Locked:</label>
        <input
          type="checkbox"
          id="locked"
          checked={staff.locked || false}
          onChange={(e) => setStaff({ ...staff, locked: e.target.checked })}
        /><br /><br />
        <button type="submit">Actualizar</button>
        <Link to="/admin"><button className='button-create'>Volver atrás</button></Link>
      </form>
    </div>
  );
};

export default UpdateStaff;
