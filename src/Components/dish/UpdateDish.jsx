import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const UpdateDish = () => {
  const [dish, setDish] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/project/api/dishes/${id}`);
        setDish(response.data);
      } catch (error) {
        console.error('Error fetching dish data:', error);
      }
    };
    fetchDish();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/project/api/dishes/${id}`, dish);
      navigate("/admin");
    } catch (error) {
      console.error('Error updating dish:', error);
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
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Editar plato</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Nombre del plato' id='dishName' type='text' size="lg" value={dish.dishName || ''} onChange={(e) => setDish({ ...dish, dishName: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Precio' id='price' type='number' size="lg" value={dish.price || ''} onChange={(e) => setDish({ ...dish, price: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='IVA' id='vat' type='number' size="lg" value={dish.vat || ''} onChange={(e) => setDish({ ...dish, vat: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Descripción del plato' id='dishDescription' type='text' size="lg" value={dish.dishDescription || ''} onChange={(e) => setDish({ ...dish, dishDescription: e.target.value })} />
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

export default UpdateDish;
