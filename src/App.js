import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Cocina from './Components/Cocina';
import Sala from './Components/Sala';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/sala" element={<Sala />} />
      </Routes>
    </Router>
  );
}

export default App;