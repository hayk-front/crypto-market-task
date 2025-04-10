import { useSelector } from "react-redux";
import { selectOHLCData } from "../redux/selectors/assetSelectors";

/**
 * Custom hook to extract and process coin price data based on ohlc data
 * @returns Object containing processed price data and helper variables
 */
export const useCoinPrice = () => {
  const ohlcData = useSelector(selectOHLCData);

  const firstCandle = ohlcData ? ohlcData[0] : null;
  const latestCandle = ohlcData ? ohlcData[ohlcData.length - 1] : null;

  const price = latestCandle?.usd.close || 0;

  let priceChangePercentage = 0;
  if (latestCandle) {
    const currentClose = latestCandle?.usd.close || 0;
    const previousClose = firstCandle?.usd.close || 0;

    if (previousClose > 0) {
      priceChangePercentage =
        ((currentClose - previousClose) / previousClose) * 100;
    }
  }

  const isPriceUp = priceChangePercentage >= 0;
  const priceChangeClass = isPriceUp ? "priceUp" : "priceDown";
  const priceChangePrefix = isPriceUp ? "+ " : "- ";

  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedPriceChange = `${priceChangePrefix}${Math.abs(
    priceChangePercentage
  ).toFixed(2)}%`;

  return {
    priceChangeClass,
    formattedPrice,
    formattedPriceChange,
  };
};
