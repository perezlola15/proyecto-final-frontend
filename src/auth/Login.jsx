// Login.js
import React, { useState } from 'react';
import './style/Style.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useAuth } from './auth/AuthProvider'; 
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

const Login = () => {
  const { setToken } = useAuth();
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
        const userRole = data.role; // Supongamos que recibes el rol del usuario desde el servidor

        setToken(token);

        // Determinar la ruta de redirección basada en el rol del usuario
        const redirectPath = userRole === 'ADMIN' ? '/admin' : '/options';

        // Redirigir al usuario a la ruta correspondiente
        window.location.href = redirectPath;
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
                <img src='img/logo.png' alt="logo"></img>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                <MDBBtn className="mb-4 px-5 custom-btn-width" color='dark' size='lg' type="submit" onClick={handleSubmit}>Login</MDBBtn>
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
