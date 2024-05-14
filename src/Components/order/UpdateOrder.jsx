import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const UpdateOrder = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Funcion para obtener los datos del pedido
    const fetchOrder = async () => {
      try {
        // Se hace una solicitud GET a la api para obtener los datos del pedido con un id concreto
        const response = await axios.get(`http://localhost:8082/project/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    // Llamada a la funcion para obtener la lista de pedidos
    fetchOrder();
  }, [id]);

  // Funcion para manejar el envio del formulario de actualizacion del pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Se realiza una solicitud PUT a la api para actualizar los datos del pedido con un id concreto
      await axios.put(`http://localhost:8082/project/api/orders/${id}`, order);
      // Si se actualiza correctamente el plato, se redirige al panel de admin
      //navigate("/admin");
    } catch (error) {
      console.error('Error updating order:', error);
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
              <h5 className="fw-normal" style={{ letterSpacing: '1px' }}>Editar pedido</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Mesa' id='orderTable' type='number' size="lg" value={order.orderTable || ''} onChange={(e) => setOrder({ ...order, orderTable: e.target.value })} />
              <div className="d-flex justify-content-center">
                <MDBBtn className="mb-4 custom-btn-width" color='dark' size='lg' type="submit">Actualizar</MDBBtn>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="/admin" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg">Volver</Link>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default UpdateOrder;
