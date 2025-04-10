import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCoinPrices } from "../../redux/slices/marketSlice";
import {
  selectCoins,
  selectLoading,
  selectError,
  selectPage,
  selectPageSize,
  selectTotalPages,
} from "../../redux/selectors/marketSelectors";
import { Coin } from "../../types/coin";
import { MarketTabs, CoinGrid, TabType } from "../../components/Markets";
import { CoinsList } from "../../components";
import styles from "./index.module.css";
import burjxLogo from "../../assets/burjx-logo.png";
import Loader from "../../components/Loader";

const Market: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const coins = useAppSelector(selectCoins);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const currentPage = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const totalPages = useAppSelector(selectTotalPages);
  const [activeTab, setActiveTab] = useState<TabType>("featured");
  const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false);

  useEffect(() => {
    dispatch(fetchCoinPrices({ page: 1, pageSize }));
  }, [dispatch, pageSize]);

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading && !hasTriggeredLoad) {
      setHasTriggeredLoad(true);
      dispatch(fetchCoinPrices({ page: currentPage + 1, pageSize }));
    }
  };

  useEffect(() => {
    if (!loading) {
      setHasTriggeredLoad(false);
    }
  }, [currentPage, loading]);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;

    setActiveTab(tab);
  };

  const handleCoinSelect = (coinId: string, productId: number) => {
    navigate(`/asset-info?id=${coinId}&productId=${productId}`);
  };

  const getFilteredCoins = (): Coin[] => {
    if (activeTab === "gainers") {
      return [...coins].sort((a, b) => {
        const aChange =
          a.priceChangePercentage24h || a.price_change_percentage_24h || 0;
        const bChange =
          b.priceChangePercentage24h || b.price_change_percentage_24h || 0;
        return bChange - aChange;
      });
    } else if (activeTab === "losers") {
      return [...coins].sort((a, b) => {
        const aChange =
          a.priceChangePercentage24h || a.price_change_percentage_24h || 0;
        const bChange =
          b.priceChangePercentage24h || b.price_change_percentage_24h || 0;
        return aChange - bChange;
      });
    }
    return coins;
  };

  const filteredCoins = getFilteredCoins();

  if (loading && coins.length === 0) {
    return <Loader fullPage />;
  }

  if (error && coins.length === 0) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={burjxLogo} alt="BurjX Logo" className={styles.logo} />
      </div>
      <section className={styles.marketSection}>
        <h1 className={styles.title}>Markets</h1>

        <MarketTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className={styles.gridContainer}>
          {loading && coins.length === 0 && <Loader />}
          <CoinGrid
            coins={filteredCoins}
            onLastElementVisible={handleLoadMore}
            onCoinSelect={handleCoinSelect}
            hasMore={currentPage < totalPages}
          />
        </div>
      </section>
      <section className={styles.marketSection}>
        <h1 className={styles.title}>All Coins</h1>

        <CoinsList
          coins={coins}
          onCoinSelect={handleCoinSelect}
          onLastElementVisible={handleLoadMore}
          hasMore={currentPage < totalPages}
        />
      </section>
    </div>
  );
};

export default Market;
