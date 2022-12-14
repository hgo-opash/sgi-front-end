import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// material
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import SuccessToast from '../../../toast/Success';
import ErrorToast from '../../../toast/Error';
import { deleteSubscription } from '../../../slices/subscriptionSlice';
import { DeletAllResponse } from '../../../services/Service';
// import DeleteModal from '../../../DeleteModal';
import DeleteModal from '../../../pages/DeleteModal';
import filterIcon from '../../../images/filterIcon.png';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 50,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 300,
  height: 40,
  backgroundColor: '#FFFFFF',
  borderRadius: '30px',
  borderColor: '#FFFFFF',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedIDs,
  setSelected,
  onRequestSort,
  headLabel,
  setCname,
  cname,
}) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createAscSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <RootStyle
    // sx={{
    //   ...(numSelected > 0 && {
    //     color: 'primary.main',
    //     bgcolor: 'primary.lighter',
    //   }),
    // }}
    >
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search Subscription..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: '#3D71FF', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <>
        <Tooltip title="Filter list">
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2, backgroundColor: '#3D71FF', height: '30px', width: '30px' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img src={filterIcon} alt="filterIcon" />
          </IconButton>
        </Tooltip>
      </>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ display: 'flex' }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={cname === 'subscriptionName'}
                  onChange={() => setCname('subscriptionName')}
                  name='subscriptionName'
                />
              }
              label="Subscription Name"
            />
            <FormControlLabel
              control={<Checkbox checked={cname === 'frequency'} onChange={() => setCname('frequency')} name='frequency' />}
              label="Frequency"
            />
            <FormControlLabel
              control={<Checkbox checked={cname === 'trialDays'} onChange={() => setCname('trialDays')} name='trialDays' />}
              label="Trial Days"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={cname === 'amount'} onClick={() => setCname('amount')} name='amount' />}
              label="Amount"
            />
            <FormControlLabel
              control={<Checkbox checked={cname === 'startDate'} onClick={() => setCname('startDate')} name='startDate' />}
              label="Start Date"
            />
            <FormControlLabel
              control={<Checkbox checked={cname === 'nextBilling'} onClick={() => setCname('nextBilling')} name='nextBilling' />}
              label="Next Billing Date"
            />
          </FormGroup>
        </MenuItem>
      </Menu>
    </RootStyle>
  );
}
