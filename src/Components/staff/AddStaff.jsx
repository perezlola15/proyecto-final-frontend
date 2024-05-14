import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';

function AddStaff() {
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');*/
  const [disabled, setDisabled] = useState(false);
  const [locked, setLocked] = useState(false);
  const navigate = useNavigate();

  // Define los mensajes de validacion
  const messages = {
    req: "Este campo es obligatorio",
    username: "Solo se admiten caracteres alfanuméricos",
    username_length: "El nombre de usuario debe tener al menos 4 caracteres",
    password: "La contraseña debe tener al menos 6 caracteres"
  };

  // Define los patrones de validacion de campos
  const patterns = {
    //username: /^[A-Za-z0-9]{4,}$/i,
    username: /^[A-Za-z0-9]+$/i,
    username_length: /^.{4,}$/,
    password: /^.{6,}$/
  };

  // Utiliza el hook useForm para manejar el estado y las validaciones del formulario
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/project/api/staffs', {
        username: data.username,
        password: data.password,
        disabled: data.disabled,
        locked: data.locked
      });
      console.log('Staff created:', response.data);
      navigate("/admin");
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
      </div>
      <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ width: '500px' }}>
          <MDBCardBody className='p-5' style={{ marginTop: '-30px' }}>
            <div className='d-flex flex-row justify-content-center align-items-center mb-4'>
              <MDBIcon fas icon="cubes fa-3x me-3" />
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Crear usuario</h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MDBInput wrapperClass='mb-4' label='Usuario' id='username' type='text' size="lg" {...register('username', { required: messages.req, pattern: { value: patterns.username, message: messages.username}, minLength: { value: 4, message: messages.username_length } })} />
              {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
              {errors.username_length && <p style={{ color: 'red' }}>{errors.username_length.message}</p>}
              <MDBInput wrapperClass='mb-4' label='Contraseña' id='password' type='password' size="lg" {...register('password', { required: messages.req, pattern: { value: patterns.password, message: messages.password } })} />
              {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='disabled' checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
                <label className='form-check-label' htmlFor='disabled'>Desactivado</label>
              </div>
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='locked' checked={locked} onChange={(e) => setLocked(e.target.checked)} />
                <label className='form-check-label' htmlFor='locked'>Bloqueado</label>
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit">Crear</MDBBtn>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver</Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default AddStaff;
