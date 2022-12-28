/* eslint-disable no-nested-ternary */
/* eslint-disable no-unreachable */
import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Loader';


const PublicRoutes = () => {
  const token = localStorage.getItem('Jtoken')
  

  const { user } = useSelector(s => s.login);


  if (user?.role) {
    return token && user?.role === "user" ? <Navigate to="/dashboard" /> :
      token && user?.role === "business" ? <Navigate to="/business/companieslist" /> :
        token && user?.role === "admin" ? <Navigate to="/admin/dashboard" /> :
          <Outlet />
  }
  if (token) {
    return (<Loader />)
  } 
    return <Outlet />
}

export default PublicRoutes;
