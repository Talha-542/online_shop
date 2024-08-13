import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}

export default App;
