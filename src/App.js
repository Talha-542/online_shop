import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Components/Home/Home';
import Product from './Components/Products/Product';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
        <Routes>
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <Product /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
