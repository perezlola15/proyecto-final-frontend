import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

function AddStaff() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/project/api/staffs', {
        username,
        password,
        disabled,
        locked
      });
      console.log('Staff created:', response.data);
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
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Usuario' id='formControlLg' type='text' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Contraseña' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='disabled' checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
                <label className='form-check-label' htmlFor='disabled'>Desactivado</label>
              </div>
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='locked' checked={locked} onChange={(e) => setLocked(e.target.checked)} />
                <label className='form-check-label' htmlFor='locked'>Bloqueado</label>
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit" onClick={handleSubmit}>Crear</MDBBtn>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver atrás</Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default AddStaff;
