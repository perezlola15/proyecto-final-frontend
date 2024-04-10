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
import './Login.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

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

      if (response.ok) {
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
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='img/login.png' alt="login form" className='rounded-start w-100' />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column' style={{ marginLeft: '4%' }}>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" />
                <img src='img/logo.png'></img>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                <MDBBtn className="mb-4 px-5 custom-btn-width" color='dark' size='lg' type="submit">Login</MDBBtn>
              </form>
              <a className="small text-muted" href="#!">Forgot password?</a><br /><br />
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
