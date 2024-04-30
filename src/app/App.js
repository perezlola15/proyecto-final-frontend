import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kitchen from '../Components/Kitchen';
import Lounge from '../Components/Lounge';
import Admin from '../Components/Admin';
import Options from '../Components/Options';
import Login from '../auth/Login';
import UpdateStaff from '../Components/staff/UpdateStaff';
import AddStaff from '../Components/staff/AddStaff';
import UpdateDish from '../Components/dish/UpdateDish';
import AddDish from '../Components/dish/AddDish';
import AddOrder from '../Components/order/AddOrder';
import UpdateOrder from '../Components/order/UpdateOrder';
import NotFound from '../Components/NotFound';

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
        <Route path="/updateStaff/:id" element={<UpdateStaff />} />
        <Route path="/addDish" element={<AddDish />} />
        <Route path="/updateDish/:id" element={<UpdateDish />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/updateOrder/:id" element={<UpdateOrder />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;