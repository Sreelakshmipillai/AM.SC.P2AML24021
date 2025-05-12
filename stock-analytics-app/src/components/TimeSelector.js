import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TimeSelector = ({ timeFrame, setTimeFrame }) => {
  const options = [5, 15, 30, 60];

  return (
    <Box sx={{ mt: 2, mb: 4, minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="timeframe-select-label">Time Frame (minutes)</InputLabel>
        <Select
          labelId="timeframe-select-label"
          value={timeFrame}
          label="Time Frame (minutes)"
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              Last {option} minutes
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimeSelector;
