// AuthProvider.js
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import axios from 'axios';

// Crea el contexto de autenticacion
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Estado para almacenar el token de autenticacion
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  // Configura el token de autorizacion en las solicitudes axios
  useEffect(() => {
    if (token) {
      console.log("token encontrado")
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Crea el valor del contexto de autenticacion
  const contextValue = useMemo(() => ({
    token,
    setToken,
  }), [token]);

  // Provee el contexto de autenticacion a los componentes hijos
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto de autenticacion
export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext };
