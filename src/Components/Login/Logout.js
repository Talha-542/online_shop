import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/verifySlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate()



  const handleLogout = () => {
    dispatch(logout());
    navigate ("/")
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
