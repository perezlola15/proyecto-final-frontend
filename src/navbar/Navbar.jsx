import React from 'react';
import '../style/Style.css';
import Logout from '../auth/Logout';

const Navbar = () => {
    return (
      <div className="navbar">
        <img src="/img/logo.png" alt="Logo" />
        <Logout />
      </div>
    );
  };
  
  export default Navbar;