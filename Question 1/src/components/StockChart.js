import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer
} from 'recharts';
import { Typography, Box } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ backgroundColor: '#fff', padding: 2, border: '1px solid #ccc' }}>
        <Typography variant="subtitle2">Time: {label}</Typography>
        <Typography variant="body2">Price: ${payload[0].value.toFixed(2)}</Typography>
      </Box>
    );
  }
  return null;
};

const StockChart = ({ data, average, stockName }) => {
  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="price" stroke="#1976d2" strokeWidth={2} dot={false} />
          <ReferenceLine y={average} stroke="#ff5722" strokeDasharray="4 4" label="Avg" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StockChart;
