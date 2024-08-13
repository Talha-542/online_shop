import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Product from './Components/Products/Product';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
    <Header />
        <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/product"
          element={isAuthenticated ? <Product /> : <Navigate to="/Product" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
        />
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    // <Routes>
    //   <Route path='/' element={ <Home /> } />
    //   <Route path='/product' element={ <Product /> } />
    //   <Route path='/cart' element={ <Cart /> } />
    //   <Route path='/login' element={ <Login /> } />
    // </Routes>
    // </BrowserRouter>
  );
}
