import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  TableHead,
  Menu,
  alpha,
  MenuItem,
  Divider,
} from '@mui/material';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { saveAs } from "file-saver";
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { setLogindata } from '../slices/loginSlice';
import { deleteSubscription, setSubscriptions } from '../slices/subscriptionSlice';
import SubscriptionModal from './SubscriptionModal';
import SuccessToast from '../toast/Success';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'subscription_name', label: 'Subscription Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'frequency', label: 'Frequency', alignRight: false },
  { id: 'trial_days', label: 'Trial Days', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'start_date	', label: 'Start Date', alignRight: false },
  { id: 'next_billing_date', label: 'Next Billing Date', alignRight: false },
  { id: 'auto_renewal', label: 'Auto Renewal', alignRight: false },
  { id: 'edit	', label: 'Edit', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  console.log(stabilizedThis, 'stabilizedThis');
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.subscriptionName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Subscription() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [openSub, setOpenSub] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SubscriptionData } = useSelector((state) => state.subscription);
  const openMenu = Boolean(anchorEl);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getsubs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          dispatch(
            setLogindata({
              Email: res.data.email,
              LastLogin: res.data.lastLoggedInAt,
              FirstName: res.data.name,
              ProfilePic: res.data.profilePic,
            })
          );
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = SubscriptionData.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handledelete = (val) => {
    // console.log(val);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/deletsub`,
        { id: val.row._id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('Jtoken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          dispatch(deleteSubscription(val));
          SuccessToast('Successfully Deleted');
        }
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSub = () => {
    setOpenSub(true);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SubscriptionData.length) : 0;

  const filteredUsers = applySortFilter(SubscriptionData, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  console.log(SubscriptionData, 'SubscriptionData');
  

  const headers = [
    { label: 'Subscription Name', key: 'subscriptionName' },
    { label: 'Frequency', key: 'frequency' },
    { label: 'Trial Days', key: 'trialDays' },
    { label: 'Start Date', key: 'startDate' },
    { label: 'Next Billing', key: 'nextBilling' },
    { label: 'Amount', key: 'amount' },
    { label: 'AutoRenewal', key: 'autoRenewal' },
    { label: 'Status', key: 'status' },
  ];
  console.log(selected, 'selected');

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: 1,
      minWidth: 180,
      // color:
      //   theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          // color: theme.palette.text.secondary,
          marginRight: 1.5,
        },
        '&:active': {
          // backgroundColor: alpha(
          //   theme.palette.primary.main,
          //   theme.palette.action.selectedOpacity,
          // ),
        },
      },
    },
  }));

  const exportFile = () => {

    // const subName =  SubscriptionData.map((data) => {
    //   return subName.push( data.subscriptionName);
    // })
  

    // console.log("this is subName ==> ", subName);
    const blob = new Blob([JSON.stringify(SubscriptionData)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "my-subscription");
    setAnchorEl(null);
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Subscriptions
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={handleClickOpenSub}
              variant="contained"
              component={RouterLink}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              ADD Subscription
            </Button>
            <Box sx={{ height: '100%', alignItems: 'center' }}>
              <Button
                id="demo-customized-button"
                aria-controls={openMenu ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickMenu}
                startIcon={<Iconify icon="ic:round-cloud-download" />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{marginLeft:"15px"}}
              >
                Download
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <CSVLink
                  data={SubscriptionData}
                  headers={headers}
                  filename={'my-subscription'}
                  className="btn btn-primary"
                  target="_blank"
                  style={{ textDecoration: 'none', color:"black" }}
                >
                  <MenuItem onClick={handleCloseMenu} disableRipple>
                    Export as Comma-Separated Spreadsheet(.CSV)
                  </MenuItem>
                </CSVLink>

                <CSVLink
                  separator={'\t'}
                  data={SubscriptionData}
                  headers={headers}
                  filename={'my-subscription.csv'}
                  className="btn btn-primary"
                  target="_blank"
                  style={{textDecoration: 'none', color:"black" }}
                >
                  <MenuItem onClick={handleCloseMenu} disableRipple>
                    Export as Tab-Delimited Spreadsheet(.DNL)
                  </MenuItem>
                </CSVLink>

                <MenuItem onClick={() => exportFile()} disableRipple>
                  Export as Plain Text(.TXT)
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>
        </Stack>
        <SubscriptionModal openModal={openSub} setOpenSubModal={setOpenSub} />
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, overflow: 'hidden' }}>
              <Table>
                {/* <TableHead sx={{ backgroundColor: '#d0eddb' }}> */}
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={SubscriptionData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {/* </TableHead> */}
                <TableBody>
                  {filteredUsers &&
                    filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const isItemSelected = selected.indexOf(row._id) !== -1;
                      return (
                        // {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        // const { id, name, role, status, company, avatarUrl, isVerified } = row;

                        // return (
                        <TableRow
                          hover
                          key={row._id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row._id)} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {row.subscriptionName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.frequency}</TableCell>
                          <TableCell align="left">{row.trialDays}</TableCell>
                          <TableCell align="left">{row.amount}</TableCell>
                          <TableCell align="left">{moment(row.startDate).format('MM/DD/yyyy')}</TableCell>
                          <TableCell align="left">{moment(row.nextBilling).format('MM/DD/yyyy')}</TableCell>
                          <TableCell align="left">{JSON.stringify(row.autoRenewal)}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handleClickOpen(handleClickOpen);
                              }}
                            >
                              <Iconify icon="ic:twotone-mode-edit-outline" color="#1877F2" width={22} height={22} />
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handledelete({ row });
                              }}
                            >
                              <Iconify icon="ic:twotone-delete" color="#DF3E30" width={22} height={22} />
                            </Button>
                          </TableCell>
                          {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                          {/* <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell> */}
                        </TableRow>
                        //   )
                        // )}
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={SubscriptionData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
