import api from "../config";
import { ENDPOINTS } from "../constants/endpoints";

export const getCoinPrices = async (params = {}) => {
  const defaultParams = {
    currency: "usd",
    page: 1,
    pageSize: 10,
  };

  const queryParams = { ...defaultParams, ...params };

  try {
    const response = await api.get(ENDPOINTS.COIN_PRICES, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin prices:", error);
    throw error;
  }
};

export const getCoinOHLC = async (productId, days = 30) => {
  try {
    const response = await api.get(ENDPOINTS.COIN_OHLC, {
      params: {
        productId,
        days,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin OHLC data:", error);
    throw error;
  }
};
