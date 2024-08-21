import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import ProductsList from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import SearchResults from './Components/Search/Searchbar';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';

function HeaderWithLocation() {
  const location = useLocation();
  const isAdminDashboard = location.pathname.includes('/admin');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Header isAdminDashboard={isAdminDashboard} /> : null;
}

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <BrowserRouter>
      <HeaderWithLocation />
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/search" element={<SearchResults products={products} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}






// 388106 177013