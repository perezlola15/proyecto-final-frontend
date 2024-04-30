import React from 'react';
import OrdersList from './order/OrdersList';
import '../style/Style.css';
import Navbar from '../navbar/Navbar';

function Lounge() {
  return (
    <div>
      <Navbar />
      <h2 className='admin-title'>Pedidos</h2>
      <OrdersList />
    </div>
  );
}

export default Lounge;

