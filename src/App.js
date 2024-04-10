import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Kitchen from './Components/Kitchen';
import Lounge from './Components/Lounge';
import Admin from './Components/Admin';
import Options from './Components/Options';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/options" element={<Options />} />
        <Route path="/cocina" element={<Kitchen />} />
        <Route path="/sala" element={<Lounge />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;