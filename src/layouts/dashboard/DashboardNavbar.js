import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Avatar, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// components
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Logo from '../../images/Logo.png';
import NavSection from '../../components/NavSection';
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 25;
const APPBAR_DESKTOP = 45;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  // },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    // padding: theme.spacing(0, 5),
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // position: 'absolute',
  // padding: theme.spacing(1),
  padding: '2px 0px 2px 20px',
  justifyContent: 'space-between',
  backgroundColor: '#BCCEFF',
  // [theme.breakpoints.up('md')]: {
  //   alignItems: 'flex-start',
  //   padding: theme.spacing(7, 5, 0, 7),
  // },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { ProfilePic } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();

  return (
    <RootStyle>
      <HeaderStyle>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Logo} width="150px" height="40px" alt="login" style={{ objectFit: 'contain' }} />
        </Box>

        <ToolbarStyle>
          {/* <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
            <Avatar
              // sx={{ width: 150, height: 150 }}
              alt="Avtar"
              // src="http://localhost:3000/638ed335be04698b37d40b75avatar1.png"
              src={`${process.env.REACT_APP_API_URL}/${ProfilePic}`}
            />
          </IconButton> */}

          {/* <Searchbar /> */}
          {/* <Box sx={{ flexGrow: 1 }} /> */}

          <NavSection navConfig={navConfig} />

          <Avatar
            sx={{
              height: '25px',
              width: '25px',
              backgroundColor: '#FFFF',
              cursor: 'pointer',
              ml:"20px"
              // display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <SearchIcon color="primary" sx={{ height: '18px', width: '18px' }} />
          </Avatar>

          <Box
            sx={{
              height: '30px',
              borderRadius: '30px',
              backgroundColor: '#3D71FF',
              display: 'flex',
              alignItems: 'center',
              p: '8px',
              ml: '5px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#FFFF', fontSize: '13px', fontWeight: 700 }}>
                {user?.firstName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFFF', fontSize: '13px', fontWeight: 400, ml: '5px' }}>
                Last Login:{moment(user?.lastLoggedInAt).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: '33px',
              borderRadius: '30px',
              backgroundColor: '#3D71FF',
              p: '8px',
              ml: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <NotificationsPopover />
              <LanguagePopover />
              <AccountPopover />
            </Stack>
          </Box>
        </ToolbarStyle>
      </HeaderStyle>
    </RootStyle>
  );
}
