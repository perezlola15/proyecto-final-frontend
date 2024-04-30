import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  // Obtiene el token del almacenamiento local
  const token = localStorage.getItem('token');

  // Si no se encuentra un token, redirige al usuario al Login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si se encuentra un token, permite el acceso a la ruta protegida
  // Outlet es un marcador de posicion donde se renderizaran los componentes secundarios definidos en las rutas anidadas
  return <Outlet />;
};

export default ProtectedRoute;