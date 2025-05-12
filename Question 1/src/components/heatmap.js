// src/components/Heatmap.js
import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { computeStats } from "../utils/correlationUtils";
import { computeStats } from "../utils/calculations";
const getColor = (value) => {
  if (value >= 0.9) return "#006400"; // dark green
  if (value >= 0.5) return "#66bb6a"; // light green
  if (value >= 0.1) return "#dcedc8"; // very light green
  if (value >= -0.1) return "#ffffff"; // white
  if (value >= -0.5) return "#ffcdd2"; // light red
  if (value >= -0.9) return "#e57373"; // medium red
  return "#b71c1c"; // dark red
};

const Heatmap = ({ data, stockData }) => {
  const stocks = Object.keys(stockData);

  if (!stocks.length) return null;

  return (
    <Box mt={4} overflow="auto">
      <Box display="grid" gridTemplateColumns={`80px repeat(${stocks.length}, 60px)`} gap={1}>
        <Box />
        {stocks.map((stock) => (
          <Tooltip
            key={`col-${stock}`}
            title={() => {
              const stats = computeStats(stockData[stock]);
              return `Avg: ${stats.avg.toFixed(2)}, Std Dev: ${stats.std.toFixed(2)}`;
            }}
          >
            <Box textAlign="center" fontWeight="bold">
              {stock}
            </Box>
          </Tooltip>
        ))}

        {stocks.map((rowStock, rowIndex) => (
          <React.Fragment key={`row-${rowStock}`}>
            <Tooltip
              title={() => {
                const stats = computeStats(stockData[rowStock]);
                return `Avg: ${stats.avg.toFixed(2)}, Std Dev: ${stats.std.toFixed(2)}`;
              }}
            >
              <Box textAlign="center" fontWeight="bold">
                {rowStock}
              </Box>
            </Tooltip>
            {stocks.map((colStock, colIndex) => {
              const value = data[rowIndex][colIndex];
              return (
                <Tooltip key={`${rowStock}-${colStock}`} title={value.toFixed(2)}>
                  <Box
                    width="60px"
                    height="40px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={getColor(value)}
                    borderRadius={1}
                  >
                    <Typography variant="body2">{value.toFixed(2)}</Typography>
                  </Box>
                </Tooltip>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Heatmap;
