import api from "../config";
import { ENDPOINTS } from "../constants/endpoints";
import {
  Coin,
  CoinPriceParams,
  OHLCDataResponse,
  PaginatedResponse,
} from "../../types/coin";
import axios, { AxiosError } from "axios";

export const getCoinPrices = async (
  params: CoinPriceParams = {}
): Promise<PaginatedResponse<Coin>> => {
  const defaultParams: CoinPriceParams = {
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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Error response data:", axiosError.response.data);
        console.error("Error response status:", axiosError.response.status);
      } else if (axiosError.request) {
        console.error("Error request:", axiosError.request);
      }
    }
    throw error;
  }
};

export const getCoinOHLC = async (
  productId: string,
  days: number = 30
): Promise<OHLCDataResponse> => {
  try {
    const response = await api.get(ENDPOINTS.COIN_OHLC, {
      params: {
        productId,
        days,
      },
    });

    if (!response.data || !response.data.usd) {
      console.error("Invalid OHLC data format received:", response.data);
      throw new Error("Invalid data format received from API");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error("Error response data:", axiosError.response.data);
        console.error("Error response status:", axiosError.response.status);
      } else if (axiosError.request) {
        console.error("Error request:", axiosError.request);
      }
    }
    throw error;
  }
};
