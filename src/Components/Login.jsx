/*import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tengo que hacer toda la logica para validar el usuario con el back
    onLogin(username);
  };

  return (
    <div>
      <h1>Gestión de un bar</h1>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Contraseña: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login; */

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8082/project/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      console.log("11111111");

      if (response.ok) {
        console.log("2222222222");
        const data = await response.json();
        const token = data.token;

        // Almacena el token en el almacenamiento local o de sesión
        localStorage.setItem('token', token);

        // Redirige a otra página o actualiza la interfaz de usuario
        window.location.href = '/admin';
      } else {
        // Si las credenciales son incorrectas o hay algún otro error,
        // maneja la respuesta del backend en consecuencia
        console.error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error al enviar las credenciales:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

