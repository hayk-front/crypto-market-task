import React, { useRef, useCallback } from "react";
import { Coin } from "../../../types/coin";
import CoinCard from "../CoinCard";
import styles from "./index.module.css";
import { useIntersectionObserver } from "../../../custom-hooks";

interface CoinGridProps {
  coins: Coin[];
  onLastElementVisible?: () => void;
  onCoinSelect?: (coinId: string, productId: number) => void;
  hasMore?: boolean;
}

const CoinGrid: React.FC<CoinGridProps> = ({
  coins,
  onLastElementVisible,
  onCoinSelect,
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

  if (!coins.length) {
    return <div className={styles.empty}>No coins available</div>;
  }

  return (
    <div className={styles.grid}>
      {coins.map((coin) => (
        <div key={coin.id} className={styles.gridItem}>
          <CoinCard coin={coin} onCoinSelect={onCoinSelect} />
        </div>
      ))}
      {hasMore && (
        <>
          <div ref={loaderRef} className={styles.loaderContainer}>
            {coins.length > 0 && <div className={styles.loader}></div>}
          </div>
          <div className={styles.endPadding}></div>
        </>
      )}
    </div>
  );
};

export default CoinGrid;
