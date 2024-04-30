import React, { useEffect } from 'react';
 
function Logout() {
  useEffect(() => {
    // Limpia el token de autenticacion
    localStorage.removeItem('token');
   
    // Redirige al Login despues de cerrar sesion
    window.location.href = '/';
  }, []); 
 
  return (
    <div className='mainSpinner'>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Cerrando sesión...</span>
      </div>
    </div>
  );
}
 
export default Logout;