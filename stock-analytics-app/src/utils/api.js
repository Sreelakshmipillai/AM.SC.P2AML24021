import axios from 'axios';

const BASE_URL = 'http://your-stock-api-server.com/api'; // Replace with actual API base URL

export const fetchStockData = async (stockName, minutes) => {
  try {
    const response = await axios.get(`${BASE_URL}/stocks/${stockName}/prices`, {
      params: { minutes }
    });

    // Assuming the API returns an array of { time: 'HH:mm:ss', price: number }
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};
