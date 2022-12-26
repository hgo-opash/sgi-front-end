import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Offers from './pages/Offers';
import ForgetPassword from './pages/ForgetPassword';
import VerifyToken from './pages/VerifyToken';
import Companies from './pages/Companies';
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import CompaniesList from './pages/CompaniesList';
import Agenda from './pages/Agenda';
import AdminTest from './pages/AdminTest';
// ----------------------------------------------------------------------

export default function Router() {
  const { Auth, Role } = useSelector((state) => state.login);

  const token = localStorage.getItem('Jtoken');

  return useRoutes([
    {
      // path: '',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <DashBoard /> },
        { path: '/subscription', element: <Subscription /> },
        { path: '/reports', element: <Reports /> },
        { path: '/offers', element: <Offers /> },
        { path: '/agenda', element: <Agenda /> },
        { path: '/companies', element: <Companies /> },
        { path: '/profile', element: <Profile /> },
        { path: '/companieslist', element: <CompaniesList /> },
        { path: '/admin/dashboard', element: <AdminTest /> },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: token ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        // { path: 'registerbusiness', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verify/:token', element: <VerifyToken /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
