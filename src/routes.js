import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoutes from "./components/auth/PublicRoutes"
import ProtectedRoutes from "./components/auth/ProtectedRoutes"
import DashboardLayout from "./layouts/dashboard"
import DashBoard from "./pages/DashBoard"
import Subscription from "./pages/Subscription"
import Offers from "./pages/Offers"
import Reports from "./pages/Reports"
import Agenda from "./pages/Agenda"
import Companies from "./pages/Companies"
import Profile from "./pages/Profile"
import CompaniesList from "./pages/CompaniesList"
import AdminTest from "./pages/AdminTest"
import Page404 from "./pages/Page404"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgetPassword from "./pages/ForgetPassword"
import VerifyToken from "./pages/VerifyToken"

const MainRoutes = () => (
	<Routes>
		{/** Protected Routes */}
		{/** Wrap all Route under ProtectedRoutes element */}

		<Route path="/" element={<ProtectedRoutes roleRequired="business" />}>
			<Route path="/business" element={<DashboardLayout />}>
				<Route path="/business/companies" element={<Companies />} />
				<Route path="/business/companieslist" element={<CompaniesList />} />
				<Route path="profile" element={<Profile />} />
				<Route path="/business/" element={<Navigate replace to='/business/companieslist' />} />
			</Route>
			<Route path='/' element={<Navigate replace to='/business/companieslist' />}  />
		</Route>

		<Route path="/" element={<ProtectedRoutes roleRequired="admin" />}>
			<Route path="/admin" element={<DashboardLayout />}>
				<Route path="/admin/dashboard" element={<AdminTest />} />
				<Route path="profile" element={<Profile />} />
				<Route path="/admin/" element={<Navigate replace to='/admin/dashboard' />} />
			</Route>
			<Route path="/" element={<Navigate replace to='/admin/dashboard' />} />
		</Route>

		<Route path="/" element={<ProtectedRoutes roleRequired="user" />}>
			<Route path="/" element={<DashboardLayout />}>
				<Route path="dashboard" element={<DashBoard />} />
				<Route path='subscription' element={<Subscription />} />
				<Route path="reports" element={<Reports />} />
				<Route path="offers" element={<Offers />} />
				<Route path="calendar" element={<Agenda />} />
				<Route path="profile" element={<Profile />} />
				<Route path="/" element={<Navigate replace to="/dashboard" />} />
			</Route>
		</Route>

		<Route path="/" element={<PublicRoutes data={{token: localStorage.getItem('Jtoken')}} />}>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/forgetpassword" element={<ForgetPassword />} />
			<Route path="/verify/:token" element={<VerifyToken />} />
			<Route path="/404" element={<Page404 />} />
		</Route>

		{/** Permission denied route */}
		<Route path="*" element={<Page404 />} />
	</Routes>
)

export default MainRoutes
