import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import '../../style/Style.css';

const UpdateStaff = () => {
  const [staff, setStaff] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/project/api/staffs/${id}`);
        setStaff(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };
    fetchStaff();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/project/api/staffs/${id}`, staff);
      // No hay redirección aquí, ya que se ha eliminado useHistory
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
      <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
        <MDBCard style={{ width: '500px' }}>
          <MDBCardBody className='p-5' style={{ marginTop: '-30px' }}>
            <div className='d-flex flex-row justify-content-center align-items-center mb-4'>
              <MDBIcon fas icon="cubes fa-3x me-3" />
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Editar usuario</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Usuario' id='formControlLg' type='text' size="lg" value={staff.username || ''} onChange={(e) => setStaff({ ...staff, username: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Contraseña' id='formControlLg' type='password' size="lg" value={staff.password || ''} onChange={(e) => setStaff({ ...staff, password: e.target.value })} />
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='disabled' checked={staff.disabled || false} onChange={(e) => setStaff({ ...staff, disabled: e.target.checked })} />
                <label className='form-check-label' htmlFor='disabled'>Desactivado</label>
              </div>
              <div className='form-check mb-4'>
                <input className='form-check-input' type='checkbox' id='locked' checked={staff.locked || false} onChange={(e) => setStaff({ ...staff, locked: e.target.checked })} />
                <label className='form-check-label' htmlFor='locked'>Bloqueado</label>
              </div>
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit">Actualizar</MDBBtn>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver atrás</Link>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default UpdateStaff;
