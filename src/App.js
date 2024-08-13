import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Components/Login/Login';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? <h1>Welcome Back!</h1> : <Login />}
    </div>
  );
}

export default App;
