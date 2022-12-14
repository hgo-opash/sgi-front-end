import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { setSubscriptions, deleteSubscription } from '../slices/subscriptionSlice';
import Iconify from '../components/Iconify';
import { DeletesubResponse, GetsubsResponse } from '../services/Service';

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SubscriptionData } = useSelector((state) => state.subscription);

  React.useEffect(() => {
    GetsubsResponse()
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          dispatch(setSubscriptions({ subscriptions: res.data.data }));
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handledelete = (val) => {
    DeletesubResponse(val).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        dispatch(deleteSubscription(val));
      }
    });
  };

  return (
    <Page title="Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dashboard
            {console.log(SubscriptionData)}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
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
                      SubscriptionData.map((row) => 
                         (
                          <TableRow
                            hover
                            key={row._id}
                            tabIndex={-1}
                            // role="checkbox"
                            // selected={isItemSelected}
                            // aria-checked={isItemSelected}
                          >
                            <TableCell align="left">{row.subscriptionName}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.frequency}</TableCell>
                            <TableCell align="left">{row.trialDays}</TableCell>
                            <TableCell align="left">{row.amount}</TableCell>
                            <TableCell align="left">{moment(row.startDate).format('MM/DD/yyyy')}</TableCell>
                            <TableCell align="left">{moment(row.nextBilling).format('MM/DD/yyyy')}</TableCell>
                            <TableCell align="left">{JSON.stringify(row.autoRenewal)}</TableCell>
                            <TableCell align="center">
                              <Button>
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
                        )
                      )}
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
    </Page>
  );
}
