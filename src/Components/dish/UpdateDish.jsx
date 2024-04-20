import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import '../../style/Style.css';

const UpdateDish = () => {
  const [dish, setDish] = useState({});
  const { id } = useParams();
  

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
    } catch (error) {
      console.error('Error updating dish:', error);
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
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Editar plato</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Nombre del plato' id='dishName' type='text' size="lg" value={dish.dishName || ''} onChange={(e) => setDish({ ...dish, dishName: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Precio' id='price' type='number' size="lg" value={dish.price || ''} onChange={(e) => setDish({ ...dish, price: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='IVA' id='vat' type='number' size="lg" value={dish.vat || ''} onChange={(e) => setDish({ ...dish, vat: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='Descripción del plato' id='dishDescription' type='text' size="lg" value={dish.dishDescription || ''} onChange={(e) => setDish({ ...dish, dishDescription: e.target.value })} />
              <MDBInput wrapperClass='mb-4' label='ID de categoría' id='categoryId' type='number' size="lg" value={dish.categoryDish?.categoryId || ''} onChange={(e) => setDish({ ...dish, categoryDish: { ...dish.categoryDish, categoryId: e.target.value } })} />
              <MDBInput wrapperClass='mb-4' label='Nombre de categoría' id='categoryName' type='text' size="lg" value={dish.categoryDish?.categoryName || ''} onChange={(e) => setDish({ ...dish, categoryDish: { ...dish.categoryDish, categoryName: e.target.value } })} />
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
