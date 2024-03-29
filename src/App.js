import React from 'react';
import Login from './Login';

function App() {
  const handleLogin = (username) => {
    console.log(`Usuario ${username} ha iniciado sesión`);
    // Aquí podrías realizar la autenticación en el backend y realizar alguna acción adicional
  };

  return (
    <div>
      <h1>Gestión de un bar</h1>
      <Login onLogin={handleLogin} />
    </div>

  );
}

export default App;

/* 
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Cocina from './Cocina';
import Sala from './Sala';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cocina" component={Cocina} />
        <Route path="/sala" component={Sala} />
      </Switch>
    </div>
  </Router>
);
}

export default App;
*/