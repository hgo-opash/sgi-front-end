/* eslint-disable import/no-named-as-default-member */
import { filter } from 'lodash';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CSVLink } from 'react-csv';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { setSubscriptions } from '../slices/subscriptionSlice';
import { GetcompaniesResponse } from '../services/Service';
import DeleteModal from './DeleteModal';
import DeleteCompanyModal from './DeleteCompanyModal';
import SubscriptionModal from './SubscriptionModal';
import EditCompanyModal from './EditCompanyModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: '', label: '' },
  {
    id: 'companyType',
    label: 'Type',
    alignRight: false,
  },
  { id: 'name', label: 'Name', alignRight: false, sort: true },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false, sort: true },
  { id: 'popular', label: 'Popular', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false, sort: true },
  { id: 'updatedAt', label: 'Updated At', alignRight: false, sort: true },
  { id: 'updatedBy', label: 'Updated By', alignRight: false },
  { id: 'edit', label: 'Edit', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  // console.log(a, b, orderBy, 'ab company>>>>>>>>>');
  console.log(orderBy, 'orderBy company');
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  console.log(order, orderBy, '>?????');
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, cname) {
  console.log(query, cname, 'query');
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if (cname === 'description') {
      return filter(array, (_user) => _user?.description.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    }
    if (cname === 'subscriptionName') {
      return filter(array, (_user) => _user?.subscriptionName.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    }
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CompaniesList(props) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [editData, setEditData] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [openSub, setOpenSub] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [cname, setCname] = useState('description');
  const [deleteid, setDeleteId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { SubscriptionData } = useSelector((state) => state.subscription);
  const openMenu = Boolean(anchorEl);

  console.log(editData, 'editData>>>');

  React.useEffect(() => {
    GetcompaniesResponse()
      .then((res) => {
        console.log(res.data, 'company ????????/');
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

  const handleRequestSort = (event, property) => {
    console.log(property, event, 'not ok company....');
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

  const handledelete = (id) => {
    setDeleteId(id);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SubscriptionData.length) : 0;

  const sortName = (a, b) => {
    if (a.subscriptionName < b.subscriptionName) {
      return -1;
    }
    if (a.subscriptionName > b.subscriptionName) {
      return 1;
    }
    return 0;
  };

  //   const activeData = SubscriptionData.filter((row) => row.status === 'Active');
  //   const inactiveData = SubscriptionData.filter((row) => row.status === 'Inactive');
  //   const sub1 = activeData.sort(sortName);
  //   const sub2 = inactiveData.sort(sortName);
  //   const filteredSubsData = [...sub1, ...sub2];
  const filteredSubsData = SubscriptionData;

  const filteredSubs = applySortFilter(filteredSubsData, getComparator(order, orderBy), filterName, cname);

  const isUserNotFound = filteredSubs.length === 0;

  console.log(SubscriptionData, 'SubscriptionData');

  const headers = [
    { label: 'Type', key: 'companyType' },
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Website', key: 'website' },
    { label: 'Price', key: 'price' },
    { label: 'Popular', key: 'popular' },
    { label: 'Created At', key: 'createdAt' },
    { label: 'Updated At', key: 'updatedAt' },
    { label: 'Updated By', key: 'updatedBy' },
  ];

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
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          marginRight: 1.5,
        },
      },
    },
  }));

  const sortData = filteredSubs.map((row) => ({
    ...row,
    startDate: moment(row.createdAt).format('MM-DD-yyyy'),
    nextBilling: moment(row.updatedAt).format('MM-DD-yyyy'),
    popular: row.popular ? 'Yes' : 'No',
  }));
  console.log(sortData, 'sortData>>>>');

  return (
    <Page title="Subscriptions">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Subscriptions List
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
              sx={{ marginLeft: '15px' }}
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
                data={sortData}
                headers={headers}
                filename={'my-subscription'}
                className="btn btn-primary"
                target="_blank"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <MenuItem onClick={handleCloseMenu} disableRipple>
                  Export as Comma-Separated Spreadsheet(.CSV)
                </MenuItem>
              </CSVLink>

              <CSVLink
                separator={'\t'}
                data={sortData}
                headers={headers}
                filename={'my-subscription.dnl'}
                className="btn btn-primary"
                target="_blank"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <MenuItem onClick={handleCloseMenu} disableRipple>
                  Export as Tab-Delimited Spreadsheet(.DNL)
                </MenuItem>
              </CSVLink>

              <CSVLink
                data={sortData}
                headers={headers}
                filename={'my-subscription.txt'}
                className="btn btn-primary"
                target="_blank"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <MenuItem onClick={handleCloseMenu} disableRipple>
                  Export as Plain Text(.TXT)
                </MenuItem>
              </CSVLink>
            </StyledMenu>
          </Box>
        </Box>
      </Stack>

      <SubscriptionModal openModal={openSub} setOpenSubModal={setOpenSub} />
              {console.log(selected,"selected")}
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selectedIDs={selected}
          setSelected={setSelected}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, overflowX: 'scroll' }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredSubs.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredSubs &&
                  filteredSubs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const isItemSelected = selected.indexOf(row._id) !== -1;
                    return (
                      <>
                        <EditCompanyModal openEditModal={open} setOpenEditModal={setOpen} data={editData} />
                        <DeleteCompanyModal
                          openDeleteModal={openDelete}
                          setOpenDelete={setOpenDelete}
                          id={[deleteid]}
                          setSelected={setSelected}
                        />
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
                          {/* <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpenTable(!openTable)}>
                              {openTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell> */}
                          <TableCell component="th" scope="row" padding="none">
                            <Typography variant="subtitle2" noWrap>
                              {row.companyType}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            <span
                              style={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {row.description}
                            </span>
                          </TableCell>
                          <TableCell align="left">{row.website}</TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.popular ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">{moment(row.createdAt).format('MM/DD/yyyy')}</TableCell>
                          <TableCell align="left">{moment(row.updatedAt).format('MM/DD/yyyy')}</TableCell>
                          <TableCell align="left">{row.updatedBy}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handleClickOpen(handleClickOpen);
                                setEditData(row);
                              }}
                            >
                              <Iconify icon="ic:twotone-mode-edit-outline" color="#1877F2" width={22} height={22} />
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                setOpenDelete(true);
                                handledelete(row._id);
                                setSelected([]);
                              }}
                            >
                              <Iconify icon="ic:twotone-delete" color="#DF3E30" width={22} height={22} />
                            </Button>
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
    </Page>
  );
}
