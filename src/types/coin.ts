export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  productId?: number;
  currentPrice?: number;
  price?: number;
  market_cap?: number;
  marketCap?: number;
  price_change_percentage_24h?: number;
  priceChangePercentage24h?: number;
  tradingVolume?: number;
  sparkline?: number[];
}

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}

export interface CoinPriceParams {
  currency?: string;
  page?: number;
  pageSize?: number;
}

export interface CoinOHLCData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface OHLCDataResponse {
  date: number;
  usd: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  aed: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  [currency: string]: any;
}
