import React, { useRef, useCallback } from "react";
import { Coin } from "../../types/coin";
import styles from "./index.module.css";
import positiveChart from "../../assets/chart-positive.svg";
import negativeChart from "../../assets/chart-negative.svg";
import { useIntersectionObserver } from "../../custom-hooks";

interface CoinsListProps {
  coins: Coin[];
  hasMore?: boolean;
  onLastElementVisible?: () => void;
  onCoinSelect: (coinId: string, productId: number) => void;
}

const CoinsList: React.FC<CoinsListProps> = ({
  coins,
  onCoinSelect,
  onLastElementVisible,
  hasMore = true,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(() => {
    if (onLastElementVisible && hasMore) {
      onLastElementVisible();
    }
  }, [onLastElementVisible, hasMore]);

  useIntersectionObserver(loaderRef, handleIntersection, {
    threshold: 0.1,
    rootMargin: "200px",
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.coinsTable}>
        <thead>
          <tr>
            <th>Market Name</th>
            <th>Market Cap</th>
            <th>Trading Volume</th>
            <th>24h Chart</th>
            <th>Price</th>
            <th>24h Change</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const priceChangePercentage =
              coin.priceChangePercentage24h ||
              coin.price_change_percentage_24h ||
              0;
            const isPositive = priceChangePercentage >= 0;
            const price = coin.currentPrice || coin.price || 0;
            const productId = coin.productId || 1;
            const marketCap = coin.marketCap || coin.market_cap || 0;
            const tradingVolume = coin.tradingVolume || 0;

            return (
              <tr key={coin.id} className={styles.coinRow}>
                <td className={styles.marketName}>
                  <div className={styles.coinLogoContainer}>
                    {coin.image && (
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className={styles.coinLogo}
                      />
                    )}
                  </div>
                  <div className={styles.coinInfo}>
                    <div className={styles.coinSymbol}>
                      {coin.symbol.toUpperCase()}
                    </div>
                    <div className={styles.coinNameText}>{coin.name}</div>
                  </div>
                </td>
                <td>${(marketCap / 1e9).toFixed(2)} billion</td>
                <td>${(tradingVolume / 1e9).toFixed(2)} billion</td>
                <td className={styles.chartCell}>
                  <img
                    src={isPositive ? positiveChart : negativeChart}
                    alt={`${coin.name} price chart`}
                    className={styles.chartImg}
                    width={100}
                    height={40}
                  />
                </td>
                <td className={styles.priceCell}>
                  $
                  {price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={`${styles.changeCell} ${
                    isPositive ? styles.positive : styles.negative
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {priceChangePercentage.toFixed(2)}%
                </td>
                <td>
                  <button
                    className={styles.tradeButton}
                    onClick={() => onCoinSelect(coin.id, productId)}
                  >
                    Trade
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {hasMore && (
        <div className={styles.loadingIndicator} ref={loaderRef}>
          {coins.length > 0 && "Loading more coins..."}
        </div>
      )}
    </div>
  );
};

export default CoinsList;
