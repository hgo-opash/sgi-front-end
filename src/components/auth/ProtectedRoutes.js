/* eslint-disable no-nested-ternary */
import React from "react"
import { useSelector } from "react-redux"

import { Navigate, Outlet } from "react-router-dom"
import Loader from "../Loader"

const ProtectedRoutes = (props) => {
	const { user } = useSelector(state => state.login)
	const token = localStorage.getItem('Jtoken')
	const getDashboardComponent = (role) => {
		switch (role) {
		  case 'business':
			return <Navigate to="/business/companieslist" />;
		  
		  case 'admin':
			return <Navigate to="/admin/dashboard" />;
	
		  default:
			return <Navigate to="/dashboard" />;
		}
	  };

	if (props.roleRequired) {
		return token ? (
			user?.role ?
				props.roleRequired === user.role ? (
					<Outlet />					
					) : (
					<>
						{getDashboardComponent(user.role)}
					</>
				) : (
					<Loader />
				)
		) : (
			<Navigate to="/login" />
		) 
	}
	return token ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoutes
