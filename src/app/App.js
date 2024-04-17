import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kitchen from '../components/Kitchen';
import Lounge from '../components/Lounge';
import Admin from '../components/Admin';
import Options from '../components/Options';
import Login from '../auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/options" element={<Options />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/lounge" element={<Lounge />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;