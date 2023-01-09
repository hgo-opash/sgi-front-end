import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Fab } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import { logout } from '../../slices/loginSlice';
import HomeIcon from '../../images/HomeIcon.png';
import SettingsIcon from '../../images/SettingsIcon.png';
import LogoutIcon from '../../images/LogoutIcon.png';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  console.log(user, 'user>>>>>>>>');

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: HomeIcon,
      linkTo: '/',
    },
    {
      label: 'Settings',
      icon: SettingsIcon,
      // eslint-disable-next-line no-nested-ternary
      linkTo: user?.role === 'admin' ? '/admin/profile' : user?.role === 'business' ? '/business/profile' : '/profile',
    },
  ];
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = () => {
    setOpen(null);
    dispatch(logout())
      .unwrap()
      .then(() => {
        console.log('logout done');
        // navigate('/login');
      })
      .catch((err) => {
        console.log({ err });
        // navigate('/')
      });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          width: 25,
          height: 25,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src={user?.profilePic}
          alt="photoURL"
          sx={{ width: 25, height: 25 }}
        />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          width:"160px",
          p: 2,
          mt: 1.5,
          ml: 1.75,
          borderRadius: '25px',
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        {/* <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Last Logged in at :{moment(user.lastLoggedInAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
        </Box> */}

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack>
          {MENU_OPTIONS.map((option) => (
            <>
              <MenuItem
                sx={{ p: 0.5 }}
                key={option.label}
                to={option.linkTo}
                component={RouterLink}
                onClick={handleClose}
              >
                <img width="20px" height="20px" src={option.icon} alt="icon" style={{marginRight:"10px"}} />
                {option.label}
              </MenuItem>
              <Divider />
            </>
          ))}
        </Stack>

        <MenuItem sx={{ p: 0.5 }} onClick={() => handleLogout()}>
          <img width="17px" height="17px" src={LogoutIcon} alt="icon" style={{marginRight:"10px",marginLeft:"5px"}} />
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
