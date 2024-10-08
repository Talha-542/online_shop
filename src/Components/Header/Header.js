import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/verifySlice'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 

const Header = ({ isAdminDashboard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Online Shop</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/home' >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/products'>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/admin'>Admin Dashboard</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {!isAdminDashboard && (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                      <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <FontAwesomeIcon icon={faCartShopping} /> 
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
