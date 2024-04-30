import React from 'react';
import '../style/Style.css';

const Logout = () => {
  const handleLogout = () => {
    // Limpia el token de autenticacion
    localStorage.removeItem('token');
   
    // Redirige al Login despues de cerrar sesion
    window.location.href = '/';
  };

  return (
    <button className='logout-button' onClick={handleLogout} >
      <img src="/img/logout.png" alt="Logout" style={{ width: '100%', height: '100%' }} />
    </button>
  );
};

export default Logout;
