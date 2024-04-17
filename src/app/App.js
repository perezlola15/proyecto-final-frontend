import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kitchen from '../components/Kitchen';
import Lounge from '../components/Lounge';
import Admin from '../components/Admin';
import Options from '../components/Options';
import Login from '../auth/Login';
import UpdateStaff from '../components/staff/UpdateStaff';
import AddStaff from '../components/staff/AddStaff';
import UpdateDish from '../components/dish/UpdateDish';
import AddDish from '../components/dish/AddDish';
import AddOrder from '../components/order/AddOrder';
import UpdateOrder from '../components/order/UpdateOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/options" element={<Options />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addStaff" element={<AddStaff />} />
        <Route path="/updateStaff" element={<UpdateStaff />} />
        <Route path="/addDish" element={<AddDish />} />
        <Route path="/updateDish" element={<UpdateDish />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/updateOrder" element={<UpdateOrder />} />
      </Routes>
    </Router>
  );
}

export default App;