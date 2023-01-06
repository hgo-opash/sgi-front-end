import {
  alpha,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination as MUIPagination,
  Select,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import styled from 'styled-components';

const Pagination = ({ page, onPageChange, count, onChange, onRowsPerPageChange, rowsPerPage }) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '14px' }}>Row Per Page:</Typography>
        <Box>
          <FormControl size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={(e) => {
                console.log(e.target.value, 'ee');
                handleChange(e);
              }}
              defaultValue={5}
              sx={{
                height: '30px',
                width: '65px',
                fontSize: '14px',
                backgroundColor: '#FFFFFF',
                borderRadius: '30px',
                ml: '5px',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '0',
                  borderRadius: '30px',
                },
                '& .MuiSvgIcon-root': {
                  color: '#0071E3',
                  //   right:"12px"
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <MUIPagination
        defaultPage={0}
        page={page}
        count={count}
        onChange={onChange}
        color="primary"
        sx={{ mt: '12px' }}
      />
    </Box>
  );
};
export default Pagination;
