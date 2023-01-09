import React, { useState } from 'react';
import moment from 'moment';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Container,
  Fab,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
import { setSubscriptions } from '../slices/subscriptionSlice';
import { GetsubsResponse } from '../services/Service';
import SubscriptionModal from './SubscriptionModal';
import costPerMonthpic from '../images/costPerMonth.png';
import costPerYearpic from '../images/costPerYear.png';
import budgetpic from '../images/budget.png';
import variancepic from '../images/variance.png';
import { UserListHead } from '../sections/@dashboard/user';
import SearchNotFound from '../components/SearchNotFound';
import Pagination from '../layouts/dashboard/Pagination';

const TABLE_HEAD = [
  {
    id: 'subscription_name',
    label: 'Subscription Name',
    alignRight: false,
    sort: true,
  },
  { id: 'frequency', label: 'Frequency', alignRight: false },
  { id: 'trial_days', label: 'Trial Days', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false, sort: true },
  { id: 'start_date', label: 'Start Date', alignRight: false, sort: true },
  {
    id: 'next_billing_date',
    label: 'Next Billing Date',
    alignRight: false,
    sort: true,
  },
  { id: 'auto_renewal', label: 'Auto Renewal', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const DashBoard = () => {
  const [openSub, setOpenSub] = React.useState(false);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SubscriptionData } = useSelector((state) => state.subscription);
  const { user } = useSelector((state) => state.login);

  const handleClickOpenSub = () => {
    setOpenSub(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        console.log('get subs  ===>  ', res.data);
        if (res.data.success === true) {
          // dispatch(
          //   setLogindata({
          //     Email: res.data.email,
          //     LastLogin: res.data.lastLoggedInAt,
          //     Role: res.data.role,
          //     FirstName: res.data.name,
          //     ProfilePic: res.data.profilePic,
          //   })
          // );
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const sortName = (a, b) => {
    if (a.subscriptionName < b.subscriptionName) {
      return -1;
    }
    if (a.subscriptionName > b.subscriptionName) {
      return 1;
    }
    return 0;
  };

  const closePopover = (id) => {
    setOpenAlert(0);
  };

  const activeData = SubscriptionData.filter((row) => row.status === 'Active').sort();
  const inactiveData = SubscriptionData.filter((row) => row.status === 'Inactive').sort();
  const activeDataSort = activeData.sort(sortName);
  const inactiveDataSort = inactiveData.sort(sortName);
  const sortedData = [...activeDataSort, ...inactiveDataSort];

  const budget = 1000;

  const costPerMonthArray = SubscriptionData.map((val) => {
    if (val.status === 'Active') {
      return val.frequency === 'Monthly' ? val.amount : val.amount / 12;
    }
    return 0;
  });

  const costPerYearArray = SubscriptionData.map((val) => {
    if (val.status === 'Active') {
      return val.frequency === 'Annually' ? val.amount : val.amount * 12;
    }
    return 0;
  });

  const costPerMonth = costPerMonthArray.reduce((a, v) => a + v, 0).toFixed(2);
  const costPerYear = costPerYearArray.reduce((a, v) => a + v, 0).toFixed(2);
  const variance = (budget - costPerYear).toFixed(2);

  const isUserNotFound = sortedData.length === 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SubscriptionData.length) : 0;

  const imgStyle = {
    height: '70px',
    width: '70px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '-18px',
    left: '20px',
  };

  const lineSyle = {
    fontSize: '16px',
    fontWeight: 700,
    pb: '7px',
    position: 'relative',
    pt: '22px',
    '::after': {
      position: 'absolute',
      content: '""',
      left: '0',
      bottom: '0',
      height: '3px',
      width: '60px',
      backgroundColor: '#C1C8F6',
    },
  };

  return (
    <>
      <Page title="DashBoard - SGI">
        <SubscriptionModal openModal={openSub} setOpenSubModal={setOpenSub} />

        {SubscriptionData?.map((data) => {
          const d1 = moment(new Date()).format('YYYY-MM-DD');
          const d2 = moment(data.nextBilling).format('YYYY-MM-DD');
          const diff = moment(d2).diff(d1, 'days');
          const expire = diff < 7 && diff > 0;

          return (
            expire && (
              <Collapse key={data._id} in={open}>
                <Alert
                  variant="filled"
                  severity="warning"
                  action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => setOpen(false)}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mt: 2, backgroundColor: 'rgb(220, 150, 2)' }}
                >
                  <Typography sx={{ fontWeight: 1000 }}>{data.subscriptionName} </Typography>
                  This SubScription is About to End!
                </Alert>
              </Collapse>
            )
          );
        })}

        <Grid
          container
          rowSpacing={{ xs: 5, sm: 4, md: 4 }}
          columnSpacing={{ xs: 3, sm: 3, md: 3 }}
          sx={{ pt: '35px' }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #0071E3 0%, #6AB2FD 100%)' }}>
                    <img height="45px" width="45px" src={costPerMonthpic} alt="month" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#1F82E6' }}>Total Cost Per Month</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${costPerMonth}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #34DABA 0%, #54E1C2 100%)' }}>
                    <img height="45px" width="45px" src={costPerYearpic} alt="year" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#35DBBB' }}>Total Cost Per Year</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${costPerYear}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #FEB655 0%, #FFC774 100%)' }}>
                    <img height="45px" width="45px" src={budgetpic} alt="budget" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#FDBE69' }}>Total Budget</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${budget}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6} xl={3} sx={{ width: '100%' }}>
            <Card
              sx={{
                height: '130px',
                position: 'relative',
                overflow: 'visible',
                boxShadow: '0px 4px 10px 5px rgba(162, 162, 162, 0.15)',
              }}
            >
              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                <Grid item xs={4}>
                  <Box sx={{ ...imgStyle, background: 'linear-gradient(180deg, #FA5C7E 0%, #FF7C95 100%)' }}>
                    <img height="45px" width="45px" src={variancepic} alt="variance" />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                    <Box sx={{ ...lineSyle, color: '#FB5D7F' }}>Varince from Budget</Box>
                    <Box sx={{ fontSize: '30px', fontWeight: 700, mt: '10px' }}>${variance}</Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} mt={5}>
          <Typography variant="h4" sx={{ fontSize: '40px', fontWeight: 700, color: '#3D71FF' }}>
            Subscriptions
          </Typography>
          <Button
            onClick={handleClickOpenSub}
            variant="text"
            startIcon={
              <Fab
                aria-label="add"
                size="small"
                sx={{
                  color: '#FFFFFF',
                  backgroundColor: '#3D71FF',
                  ml: '-5px',
                }}
              >
                <AddIcon />
              </Fab>
            }
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '30px',
              height: '40px',
              textTransform: 'none',
            }}
          >
            ADD Subscription
          </Button>
        </Stack>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, overflowX: 'auto' }}>
            <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
              {/* <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={sortedData.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  /> */}
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: '#7B9EFD',
                      borderBottomLeftRadius: '35px',
                      borderTopLeftRadius: '35px',
                      color: '#FFFFFF',
                    }}
                  >
                    SubScription Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Frequency</TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Trial Days</TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Amount</TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Start Date</TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Next Billing Date</TableCell>
                  <TableCell sx={{ backgroundColor: '#7B9EFD', color: '#FFFFFF' }}>Auto Renewal</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: '#7B9EFD',
                      borderBottomRightRadius: '35px',
                      borderTopRightRadius: '35px',
                      color: '#FFFFFF',
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              {!SubscriptionData || SubscriptionData?.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={12} sx={{ borderRadius: '35px', backgroundColor: '#FFFFFF' }}>
                      Sorry, You Don't have any Active subscription. Please Add New Subscription.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {sortedData &&
                    sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const isItemSelected = selected.indexOf(row._id) !== -1;
                      return (
                        // row.subscriptionName === type && (
                        <>
                          <TableRow
                            hover
                            key={row._id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell
                              align="left"
                              sx={{
                                backgroundColor: '#FFFFFF',
                                borderBottomLeftRadius: '35px',
                                borderTopLeftRadius: '35px',
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                // color={row.status === 'Active' ? '#229A16' : '#ff4c00'}
                                noWrap
                              >
                                {row.subscriptionName}
                              </Typography>
                            </TableCell>
                            {/* <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                              align="center"
                              sx={{ backgroundColor: '#FFFFFF' }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                color={row.status === 'Active' ? '#229A16' : '#ff4c00'}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {row.subscriptionName}
                                </Typography>
                              </Stack>
                            </TableCell> */}
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              {row.frequency}
                            </TableCell>
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              {row.trialDays}
                            </TableCell>
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              ${row.amount}
                            </TableCell>
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              {moment(row.startDate).format('MM/DD/yyyy')}
                            </TableCell>
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              {moment(row.nextBilling).format('MM/DD/yyyy')}
                            </TableCell>
                            <TableCell align="left" sx={{ backgroundColor: '#FFFFFF' }}>
                              {row.autoRenewal ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                backgroundColor: '#FFFFFF',
                                borderBottomRightRadius: '35px',
                                borderTopRightRadius: '35px',
                              }}
                            >
                              {row.status === 'Active' && (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <FiberManualRecordIcon
                                    sx={{ color: '#34DABA', height: '13px', width: '13px', mr: '6px' }}
                                  />
                                  {row.status}
                                </Box>
                              )}
                              {row.status === 'Inactive' && (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <FiberManualRecordIcon
                                    sx={{ color: '#FF0031', height: '13px', width: '13px', mr: '6px' }}
                                  />
                                  {row.status}
                                </Box>
                              )}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              )}

              {/* {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={12}
                      sx={{ p: 0, borderRadius: '35px', backgroundColor: '#FFFFFF' }}
                    >
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )} */}
            </Table>
          </TableContainer>
        </Scrollbar>

        {SubscriptionData && (
          <>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Pagination
                page={page + 1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                count={Math.ceil(SubscriptionData.length / rowsPerPage)}
                onChange={handleChangePage}
              />
            </Box>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={SubscriptionData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </>
        )}
      </Page>
    </>
  );
};

export default DashBoard;
