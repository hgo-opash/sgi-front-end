import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.login);
  const location = useLocation();

  return (
    // eslint-disable-next-line no-nested-ternary, react/prop-types
    auth?.Role?.find((role) => allowedRoles?.includes(role)) ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
