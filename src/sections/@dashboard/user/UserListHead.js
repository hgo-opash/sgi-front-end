import PropTypes from 'prop-types';
// material
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel, Button, Typography } from '@mui/material';
import moment from 'moment';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const createAscSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const createDscSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: '#7B9EFD' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {console.log(headLabel, 'label.....')}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              // hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            > */}
            <Box sx={{ display: 'flex', alignItems: 'center',color:"#FFFFFF" }}>
              <Box>{headCell.label}</Box>
              {headCell.sort && (
                <Box sx={{ display: 'flex' }}>
                  <Iconify
                    onClick={createAscSortHandler(headCell.id)}
                    icon={'mdi:arrow-up'}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Iconify
                    onClick={createDscSortHandler(headCell.id)}
                    icon={'mdi:arrow-down'}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              )}
            </Box>
            {/* {orderBy === headCell.id ? (
              <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
            ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
