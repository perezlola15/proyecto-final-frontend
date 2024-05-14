import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { useForm } from 'react-hook-form';

function Login() {
  // Obtiene la funcion setToken del contexto de autenticacion
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Define los mensajes de validacion
  const messages = {
    req: "Este campo es obligatorio",
    username: "Solo se admiten caracteres alfanuméricos"
  };
  // Define los patrones de validacion de campos
  const patterns = {
    username: /^[A-Za-z0-9]+$/i
  };
  // Las validaciones se activan cada vez que cambia el valor de un campo del formulario
  useForm({ mode: "onChange" });

  // Utiliza el hook useForm para manejar el estado y las validaciones del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Funcion para manejar el envio del formulario de inicio de sesion
  const onSubmit = async (data) => {
    try {
      // Realiza una solicitud POST para iniciar sesion
      const response = await fetch('http://localhost:8082/project/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Utiliza los datos del formulario obtenidos de useForm
      });

      // Obtiene el token de autenticacion del encabezado de la respuesta
      const token = response.headers.get('Authorization');

      if (response.ok) {
        if (token) {
          // Almacena el token de autenticacion
          setToken(token);

          // Verifica el nombre de usuario y lo redirgire a una ruta determinada
          if (data.username.includes("admin")) {
            navigate('/admin'); // Si el nombre de usuario contiene "admin", redirige a la ruta '/admin'
          } else {
            navigate("/options"); // De lo contrario, redirige a la ruta '/options'
          }
        } else {
          console.error('Error: No token received in response.');
        }
      } else {
        console.error('Request error:', response.status);
      }
    } catch (error) {
      console.error('Sign in failed :', error);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <MDBInput wrapperClass='mb-4' label='Usuario' id='username' type='text' size="lg" {...register('username', { required: messages.req, 
                pattern: { value: patterns.username, message: messages.username } })} />
                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                <MDBInput wrapperClass='mb-4' label='Contraseña' id='password' type='password' size="lg" {...register('password', { required: messages.req })} />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                <MDBBtn className="mb-4 px-5 custom-btn-width" color='dark' size='lg' type="submit">Inicia sesión</MDBBtn>
              </form>
              <a className="small text-muted" href="/forgotpass">¿Ha olvidado su contraseña?</a><br /><br />
              <div className='d-flex flex-row justify-content-start'>
                <a href="terms" className="small text-muted me-1">Términos de uso.</a>
                <a href="privacy" className="small text-muted">Política de privacidad.</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
