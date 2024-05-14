import React from 'react';
import Navbar from '../navbar/Navbar';
import OrderLineList from './order_line/OrdersLineList';
import { Link } from 'react-router-dom';

function kitchen() {
  return (
    <div>
      <Navbar />
      <h2 style={{ marginTop: '1%' }} className='admin-title'>Pantalla de Cocina</h2>
      <OrderLineList />
      <Link to="/options" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }}>Volver</Link>
    </div>
  );
}

export default kitchen;