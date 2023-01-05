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

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      linkTo: '/',
    },
    {
      label: 'Settings',
      icon: 'eva:settings-2-fill',
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
        <Avatar src={user?.profilePic} alt="photoURL" sx={{ width: 25, height: 25 }} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.email}
            {/* {account.displayName} */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Last Logged in at :{moment(user.lastLoggedInAt).format('MMMM Do YYYY, h:mm:ss a')}
            {/* {account.email} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => handleLogout()} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
