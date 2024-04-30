import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';

function Login() {
  // Define los estados del nombre de usuario y la contrasena
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Obtiene la funcion setToken del contexto de autenticacion
  const { setToken } = useAuth();

  const navigate = useNavigate();

  // Funcion para manejar el envio del formulario de inicio de sesion
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que el formulario se envie y recargue la pagina

    try {
      // Realiza una solicitud POST para iniciar sesion
      const response = await fetch('http://localhost:8082/project/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Envia el nombre de usuario y la contrasena en formato JSON
        body: JSON.stringify({ username, password })
      });

      // Obtiene el token de autenticacion del encabezado de la respuesta
      const token = response.headers.get('Authorization');

      if (response.ok) {
        if (token) {
          // Almacena el token de autenticacion
          setToken(token);

if (username.includes("admin")) {
            navigate('/admin'); // Si el nombre de usuario contiene "admin", redirige a la ruta '/admin'
          } else {
            navigate("/options"); // De lo contrario, redirige a la ruta '/options'
          }
        } else {
          console.error('Error: No se recibió un token en la respuesta.');
        }
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
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
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Inicia sesión en su cuenta</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Usuario' id='formControlLg' type='text' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Contraseña' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <MDBBtn className="mb-4 px-5 custom-btn-width" color='dark' size='lg' type="submit" onClick={handleSubmit}>Inicia sesión</MDBBtn>
              </form>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
