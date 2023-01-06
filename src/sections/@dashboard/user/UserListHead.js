import PropTypes from 'prop-types';
// material
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel, Button, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  console.log(order, 'order???');

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{ backgroundColor: '#7B9EFD', borderBottomLeftRadius: '35px', borderTopLeftRadius: '35px' }}
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            // sx={{backgroundColor: '#FFFFFF'}}
          />
        </TableCell>
        {console.log(headLabel, 'label.....')}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sx={{
              backgroundColor: '#7B9EFD',
              p: '15px',
              '&:last-child': {
                borderBottomRightRadius: '35px',
                borderTopRightRadius: '35px',
              },
            }}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              // hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            > */}
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
              <span>{headCell.label}</span>
              {headCell.sort && (
                <>
                  <Typography
                    onClick={createAscSortHandler(headCell.id)}
                    style={{ display: 'flex', flexDirection: 'column', position: 'relative', cursor: 'pointer' }}
                  >
                    <ArrowDropUpIcon
                      sx={{
                        ...(order === 'asc' && orderBy === headCell.id && { color: '#000000' }),
                        position: 'absolute',
                        bottom: '-8px',
                      }}
                    />
                    <ArrowDropDownIcon
                      sx={{
                        ...(order === 'desc' && orderBy === headCell.id && { color: '#000000' }),
                        position: 'absolute',
                        top: '-8px',
                      }}
                    />
                  </Typography>
                </>
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
