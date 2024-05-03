import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Error 404: Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p><br />
      <img src='img/notFound.png' alt="Not Found"></img>
      <br /><br />
      <Link to="/" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver al Login</Link>
    </div>
  );
};

export default NotFound;
