import React from 'react';
import OrdersList from './order/OrdersList';
import '../style/Style.css';

function Lounge() {
    return (
      <div>
        <div className="navbar">
                <img src="/img/logo.png" alt="Logo" />
            </div>
            <h2 className='admin-title'>Pedidos</h2>
          <OrdersList />
      </div>
    );
  }
  
  export default Lounge;

  