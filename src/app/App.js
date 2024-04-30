import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kitchen from '../Components/Kitchen';
import Lounge from '../Components/Lounge';
import Admin from '../Components/Admin';
import Options from '../Components/Options';
import Login from '../auth/Login';
<<<<<<< HEAD
import UpdateStaff from '../components/staff/UpdateStaff';
import AddStaff from '../components/staff/AddStaff';
import UpdateDish from '../components/dish/UpdateDish';
import AddDish from '../components/dish/AddDish';
import AddOrder from '../components/order/AddOrder';
import UpdateOrder from '../components/order/UpdateOrder';
import NotFound from '../components/NotFound';
import Logout from '../auth/Logout';
import ProtectedRoute from '../auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
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
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
