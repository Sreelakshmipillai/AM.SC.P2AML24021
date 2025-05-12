import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import StockChart from '../components/StockChart';
import TimeSelector from '../components/TimeSelector';
import { fetchStockData } from '../utils/api';
import { calculateAverage } from '../utils/calculations';

const StockPage = () => {
  const [stockName] = useState('AAPL'); // Example stock
  const [timeFrame, setTimeFrame] = useState(15); // default: last 15 minutes
  const [stockData, setStockData] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchStockData(stockName, timeFrame);
      setStockData(data);
      setAverage(calculateAverage(data));
    };
    loadData();
  }, [stockName, timeFrame]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {stockName} Stock Price Overview
      </Typography>
      <TimeSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      <StockChart data={stockData} average={average} stockName={stockName} />
    </Box>
  );
};

export default StockPage;
