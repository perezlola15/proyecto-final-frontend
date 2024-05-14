import React from 'react';
import OrdersList from './order/OrdersList';
import '../style/Style.css';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

function Lounge() {
  return (
    <div>
      <Navbar />
      <h2 style={{ marginTop: '1%' }} className='admin-title'>Pedidos</h2>
      <OrdersList />
      <Link to="/options" className="mb-4 px-6 custom-btn-width btn btn-dark btn-lg" style={{ marginLeft: '1%' }}>Volver</Link>
    </div>
  );
}

export default Lounge;

