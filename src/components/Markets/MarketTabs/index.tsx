import React from "react";
import styles from "./index.module.css";
import { TABS } from "./utils";

export type TabType = "featured" | "gainers" | "losers";

interface MarketTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MarketTabs: React.FC<MarketTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabsContainer}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <span role="img" aria-label={tab.ariaLabel}>
            {tab.icon}
          </span>{" "}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MarketTabs;
