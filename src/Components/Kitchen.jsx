import React from 'react';
import Navbar from '../navbar/Navbar';
import OrderLineList from './order_line/OrdersLineList';

function kitchen() {
  return (
    <div>
      <Navbar />
      <h2>Pantalla de Cocina</h2>
      <OrderLineList />
    </div>
  );
}

export default kitchen;