import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/verifySlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const Navigate =  useNavigate()



  const handleLogout = () => {
    dispatch(logout());
    Navigate ("/")
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
