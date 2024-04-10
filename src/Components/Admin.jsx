import React from 'react';
import StaffList from './List/StaffList';
import DishesList from './List/DishesList';
import OrdersList from './List/OrdersList';
import './List/Style.css'

function Admin() {
  return (
    <div>
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <h1>PANEL DE ADMINISTRACIÓN</h1>
      </div>
      <div className="admin-panel-container">
        <div className="left-panel">
          <h2>Usuarios</h2>
          <StaffList />
          <br /><h2>Pedidos</h2>
          <OrdersList />
        </div>
        <div className="right-panel">
          <h2>Platos</h2>
          <DishesList />
        </div>
      </div>
    </div>
  );
}

export default Admin;
