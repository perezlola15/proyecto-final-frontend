import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { token } = useAuth();

  // Verificar si el usuario tiene un token
  if (!token) {
    return <Navigate to="/" />;
  }

  // Verificar si el nombre de usuario cumple con los criterios permitidos
  const username = token.username;
  const isAdmin = username.includes("admin");
  if (!isAdmin && !allowedRoles.includes(username)) {
    return <Navigate to="/options" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
