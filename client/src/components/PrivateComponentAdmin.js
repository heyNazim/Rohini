import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponentAdmin = () => {
  const auth = localStorage.getItem('auth');

  // Check if auth exists and equals 'admin'
  return auth === 'admin' ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateComponentAdmin;
