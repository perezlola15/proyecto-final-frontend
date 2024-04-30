import React from 'react';
import StaffList from './staff/StaffList';
import DishesList from './dish//DishesList';
import OrdersList from './order/OrdersList';
import '../style/Style.css';
import Navbar from '../navbar/Navbar';

function Admin() {
  return (
    <div>
      <Navbar />
      <div className="admin-panel-container">
        <div className="left-panel">
          <h2 className='admin-title'>Usuarios</h2>
          <StaffList />
          <br />
          <h2 className='admin-title'>Pedidos</h2>
          <OrdersList />
        </div>
        <div className="right-panel">
          <h2 className='admin-title'>Platos</h2>
          <DishesList />
        </div>
      </div>
    </div>
  );
}

export default Admin;
