import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import TimeSelector from "../components/TimeSelector";
import { getAllStockPrices } from "../utils/api";
import { computeCorrelationMatrix, computeStats } from "../utils/correlationUtils";
// Removed duplicate import from calculations.js

const CorrelationPage = () => {
  const [timeframe, setTimeframe] = useState(15);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(false);
  const [correlationMatrix, setCorrelationMatrix] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllStockPrices(timeframe);
        setStockData(data);
        const matrix = computeCorrelationMatrix(data);
        setCorrelationMatrix(matrix);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [timeframe]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Correlation Heatmap
      </Typography>

      <TimeSelector value={timeframe} onChange={setTimeframe} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Heatmap data={correlationMatrix} stockData={stockData} />
      )}
    </Box>
  );
};

export default CorrelationPage;
