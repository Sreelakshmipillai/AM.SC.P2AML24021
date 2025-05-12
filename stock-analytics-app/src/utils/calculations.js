// Calculate average
export const calculateAverage = (arr) => {
  if (!arr.length) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
};

// Calculate standard deviation
export const calculateStdDev = (arr) => {
  const avg = calculateAverage(arr);
  const variance =
    arr.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / (arr.length - 1);
  return Math.sqrt(variance);
};

// Covariance between two arrays
const calculateCovariance = (arr1, arr2) => {
  const avg1 = calculateAverage(arr1);
  const avg2 = calculateAverage(arr2);
  const n = Math.min(arr1.length, arr2.length);
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += (arr1[i] - avg1) * (arr2[i] - avg2);
  }
  return cov / (n - 1);
};

// Pearson Correlation Coefficient
export const calculateCorrelation = (arr1, arr2) => {
  const std1 = calculateStdDev(arr1);
  const std2 = calculateStdDev(arr2);
  if (std1 === 0 || std2 === 0) return 0; // avoid division by 0
  const cov = calculateCovariance(arr1, arr2);
  return cov / (std1 * std2);
};

// Compute the full correlation matrix
export const computeCorrelationMatrix = (stockData) => {
  const tickers = Object.keys(stockData);
  const matrix = [];

  for (let i = 0; i < tickers.length; i++) {
    const row = [];
    for (let j = 0; j < tickers.length; j++) {
      const prices1 = stockData[tickers[i]]?.map((p) => p.price) || [];
      const prices2 = stockData[tickers[j]]?.map((p) => p.price) || [];
      const minLength = Math.min(prices1.length, prices2.length);
      row.push(calculateCorrelation(prices1.slice(-minLength), prices2.slice(-minLength)));
    }
    matrix.push(row);
  }

  return matrix;
};

// Compute stats (avg and std dev) for one stock
export const computeStats = (stockPrices) => {
  const prices = stockPrices.map((d) => d.price);
  return {
    avg: calculateAverage(prices),
    std: calculateStdDev(prices),
  };
};
