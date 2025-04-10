import React, { useCallback } from "react";
import { Coin } from "../../../types/coin";
import styles from "./index.module.css";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchCoinOHLC } from "../../../redux/slices/assetSlice";
import positiveChart from "../../../assets/chart-positive.svg";
import negativeChart from "../../../assets/chart-negative.svg";

interface CoinCardProps {
  coin: Coin;
  onCoinSelect?: (coinId: string, productId: number) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onCoinSelect }) => {
  const dispatch = useAppDispatch();
  const priceChangePercentage =
    coin.priceChangePercentage24h || coin.price_change_percentage_24h || 0;
  const isPositive = priceChangePercentage >= 0;
  const price = coin.currentPrice || coin.price || 0;

  const productId = coin.productId || 1;

  const handleCoinClick = useCallback(() => {
    dispatch(fetchCoinOHLC({ productId: productId.toString() }));

    if (onCoinSelect) {
      onCoinSelect(coin.id, productId);
    }
  }, [dispatch, onCoinSelect, coin.id, productId]);

  return (
    <div
      className={styles.coinCard}
      onClick={handleCoinClick}
      role="button"
      aria-label={`View details for ${coin.name}`}
    >
      <div className={styles.coinHeader}>
        <div className={styles.coinLogoContainer}>
          {coin.image && (
            <img src={coin.image} alt={coin.name} className={styles.coinLogo} />
          )}
        </div>
        <div className={styles.coinInfo}>
          <h2 className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</h2>
          <p className={styles.coinName}>{coin.name}</p>
        </div>
      </div>

      <div className={styles.coinChart}>
        <img
          src={isPositive ? positiveChart : negativeChart}
          alt={`${coin.name} price chart`}
          className={styles.chartSvg}
          width={188}
          height={56}
        />
      </div>

      <div className={styles.coinFooter}>
        <div className={styles.coinPrice}>
          $
          {price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div
          className={`${styles.coinChange} ${
            isPositive ? styles.positive : styles.negative
          }`}
        >
          {isPositive ? "+ " : "- "}
          {Math.abs(priceChangePercentage).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
