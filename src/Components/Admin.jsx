import React from 'react';
import StaffList from './StaffList';
import DishesList from './DishesList';
import OrdersList from './OrdersList';
import '../style/Style.css';

function Admin() {
  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
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
