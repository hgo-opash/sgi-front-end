import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  Checkbox,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

import { setLogindata } from '../slices/loginSlice';
import { setSubscriptions, deleteSubscription } from '../slices/subscriptionSlice';
import Iconify from '../components/Iconify';
import EditModal from './EditModal';
import { UserListToolbar } from '../sections/@dashboard/user';

export default function Subscription() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SubscriptionData } = useSelector((state) => state.subscription);

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
            setLogindata({ Email: res.data.email, LastLogin: res.data.lastLoggedInAt, FirstName: res.data.name })
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

  const handleClickOpen = () => {
    setOpen(true);
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
        }
      });
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {/* User */}
            Subscriptions
            {console.log(SubscriptionData)}
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New Subscription
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                      // checked={isItemSelected}
                      //  onChange={(event) => handleClick(event, name)}
                      />
                    </TableCell>
                    <TableCell>SubScription Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Trial Days</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Next Billing Date</TableCell>
                    <TableCell>Auto Renewal</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>

                {!SubscriptionData || SubscriptionData?.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        Sorry, You Don't have any Active subscription. Please Add New Subscription.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {SubscriptionData &&
                      SubscriptionData.map((row) => {
                        return (
                          <TableRow
                            hover
                            key={row._id}
                            tabIndex={-1}
                            // role="checkbox"
                            // selected={isItemSelected}
                            // aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                              //  checked={isItemSelected}
                              //  onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>
                            <TableCell align="left">{row.subscriptionName}</TableCell>
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
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {SubscriptionData && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={SubscriptionData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              // onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>

      <EditModal openEditModal={open} setOpenEditModal={setOpen} />
    </Page>
  );
}
