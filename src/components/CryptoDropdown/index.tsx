import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { useAppSelector } from "../../redux/hooks";
import { selectCoins } from "../../redux/selectors/marketSelectors";
import chevronDownIcon from "../../assets/icons/chevron-down.svg";
import { Coin } from "../../types/coin";
import { useSearchParams } from "react-router-dom";
import useOutsideClick from "../../custom-hooks/useOutsideClick";

interface CryptoDropdownProps {
  onAssetSelect: (asset: Coin) => void;
}

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({ onAssetSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const coins = useAppSelector(selectCoins);
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");

  const [selectedAsset, setSelectedAsset] = useState<Coin>({
    id: "default",
    name: "",
    symbol: "",
  });

  useEffect(() => {
    if (coins.length === 0) return;

    if (queryId) {
      const foundCoin = coins.find((coin) => coin.id === queryId);
      if (foundCoin) {
        const coinWithProductId = {
          ...foundCoin,
          productId: foundCoin.productId || Number(foundCoin.id) || 1,
        };
        setSelectedAsset(coinWithProductId);
        return;
      }
    }

    if (selectedAsset.id === "default") {
      const firstCoin = {
        ...coins[0],
        productId: coins[0].productId || Number(coins[0].id) || 1,
      };
      setSelectedAsset(firstCoin);
    }
  }, [coins, queryId, selectedAsset.id]);

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  const handleAssetClick = (asset: Coin, e: React.MouseEvent) => {
    e.stopPropagation();
    const assetWithProductId = {
      ...asset,
      productId: asset.productId || Number(asset.id) || 1,
    };
    setSelectedAsset(assetWithProductId);
    onAssetSelect(assetWithProductId);
    setIsDropdownOpen(false);
  };

  if (!selectedAsset) {
    return null;
  }

  return (
    <div
      className={`${styles.coinHeader} ${
        isDropdownOpen ? styles.dropdownActive : ""
      }`}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      ref={dropdownRef}
    >
      <div className={styles.coinIconContainer}>
        {selectedAsset.image ? (
          <img
            src={selectedAsset.image}
            alt={selectedAsset.symbol}
            className={styles.coinIcon}
          />
        ) : (
          <div className={styles.coinIcon}>
            {selectedAsset.symbol.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className={styles.coinName}>
        {selectedAsset.name} ({selectedAsset.symbol?.toUpperCase()})
        <div className={styles.dropdownIcon}>
          <img src={chevronDownIcon} alt="Dropdown" width="20" height="20" />
        </div>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          {coins.map((asset) => (
            <div
              key={asset.id}
              className={styles.dropdownItem}
              onClick={(e) => handleAssetClick(asset, e)}
            >
              {asset.image ? (
                <img
                  src={asset.image}
                  alt={asset.symbol}
                  className={styles.coinIconSmall}
                />
              ) : (
                <div className={styles.coinIconSmall}>
                  {asset.symbol.charAt(0)}
                </div>
              )}
              <span className={styles.coinNameText}>
                {asset.name}{" "}
                <span className={styles.coinSymbol}>
                  ({asset.symbol?.toUpperCase()})
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;
