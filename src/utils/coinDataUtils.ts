import { Coin, OHLCDataResponse } from "../types/coin";

export const compareCoinWithOHLC = (
  coin: Coin,
  ohlcData: OHLCDataResponse | null
): {
  matches: boolean;
  message?: string;
  data?: any;
} => {
  if (!ohlcData) {
    return { matches: false, message: "No OHLC data available for comparison" };
  }

  if (!ohlcData.usd || !ohlcData.date) {
    return {
      matches: false,
      message: "OHLC data is missing required properties",
    };
  }

  const comparisonResult = {
    matches: true,
    data: {
      coin: {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        currentPrice: coin.currentPrice || coin.price || 0,
      },
      ohlc: {
        date: new Date(ohlcData.date).toISOString(),
        usd: ohlcData.usd,
      },
    },
  };

  return comparisonResult;
};

export const formatOHLCData = (ohlcData: OHLCDataResponse | null) => {
  if (!ohlcData) return null;

  return {
    date: new Date(ohlcData.date).toLocaleDateString(),
    openUSD: ohlcData.usd.open.toFixed(2),
    highUSD: ohlcData.usd.high.toFixed(2),
    lowUSD: ohlcData.usd.low.toFixed(2),
    closeUSD: ohlcData.usd.close.toFixed(2),
  };
};
