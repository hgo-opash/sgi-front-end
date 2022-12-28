import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// routes
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import MainRoutes from './routes';
import { getProfile } from './slices/loginSlice';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getProfile())
    .unwrap()
    .catch(() => {
      navigate('/login')
    })
  }, [dispatch]);
  
  return (
    <ThemeProvider>
      <ScrollToTop />
      <MainRoutes/>
    </ThemeProvider>
  );
}
