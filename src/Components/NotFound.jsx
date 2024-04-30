import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Error 404: Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p><br />
      <img src='img/notFound.png' alt="Not Found"></img>
    </div>
  );
};

export default NotFound;
