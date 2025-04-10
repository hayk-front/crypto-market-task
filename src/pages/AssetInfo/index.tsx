import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchCoinOHLC } from "../../redux/slices/assetSlice";
import {
  selectOHLCData,
  selectAssetLoading,
  selectAssetError,
} from "../../redux/selectors/assetSelectors";
import { AppDispatch } from "../../redux/store";
import CryptoDropdown from "../../components/CryptoDropdown";
import TimeSelector from "../../components/TimeSelector/TimeSelector";
import { TimePeriod } from "../../components/TimeSelector/types";
import { getTimeInDays } from "../../components/TimeSelector/utils";
import { formatOHLCData } from "../../utils/chartUtils";
import styles from "./index.module.css";
import burjxLogo from "../../assets/burjx-logo.png";
import Loader from "../../components/Loader";
import { Coin } from "../../types/coin";
import Chart from "../../components/Chart";
import { useCoinPrice } from "../../custom-hooks/useCoinPrice";

const AssetInfo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const productId = searchParams.get("productId");
  const dispatch = useDispatch<AppDispatch>();
  const ohlcData = useSelector(selectOHLCData);
  const loading = useSelector(selectAssetLoading);
  const error = useSelector(selectAssetError);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1m");

  const handleTimeChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  const handleAssetSelect = (asset: Coin) => {
    const productIdToUse = asset.productId || 1;
    navigate(`/asset-info?id=${asset.id}&productId=${productIdToUse}`);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (!isMounted) return;

        const days = getTimeInDays(timePeriod);
        const coinId = productId || id || "bitcoin";

        await dispatch(fetchCoinOHLC({ productId: coinId, days })).unwrap();
      } catch (err) {
        if (isMounted) {
          console.error("Error in fetchData:", err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, id, productId, timePeriod]);

  const { formattedPrice, formattedPriceChange, priceChangeClass } =
    useCoinPrice();

  if (loading) {
    return <Loader message="Loading asset data..." fullPage />;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h3>Error loading asset data</h3>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className={styles.button}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!ohlcData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h3>No data available</h3>
          <p>Could not retrieve price data for this asset.</p>
          <button onClick={() => navigate("/")} className={styles.button}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formattedData = formatOHLCData(ohlcData) as any[];

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          src={burjxLogo}
          alt="BurjX Logo"
          className={styles.logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <CryptoDropdown onAssetSelect={handleAssetSelect} />

      <div className={styles.chartContainer}>
        <div className={styles.priceContainer}>
          <div className={styles.price}>${formattedPrice}</div>
          <div className={`${styles.priceChange} ${styles[priceChangeClass]}`}>
            {formattedPriceChange}
          </div>
        </div>

        <Chart data={formattedData} />
        <TimeSelector
          currentPeriod={timePeriod}
          onPeriodChange={handleTimeChange}
        />
      </div>
    </div>
  );
};

export default AssetInfo;
