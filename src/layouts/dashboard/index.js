import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// material
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { setLogindata } from '../../slices/loginSlice';
import { GetUserResponse } from '../../services/Service';
import Footer from './Footer';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 25;
const APP_BAR_DESKTOP = 45;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  // overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: '#F2F2F2',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 35,
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 35,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  // const { Role } = useSelector((state) => state.login);
  // const Role = localStorage.getItem('Role');

  // useEffect(() => {
  //   if (Role === 'business') {
  //     navigate('/companies', { replace: true });
  //   }
  //   if (Role === 'user') {
  //     navigate('/dashboard', { replace: true });
  //   }
  // }, []);

  return (
    <>
      <RootStyle>
        <DashboardNavbar
        //  onOpenSidebar={() => setOpen(true)}
        />
        {/* <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}
        {/* <Container> */}
        <MainStyle>
          <Outlet />
        </MainStyle>
        {/* </Container> */}
      </RootStyle>
      {/* <Container> */}
      <Footer />
      {/* </Container> */}
    </>
  );
}
