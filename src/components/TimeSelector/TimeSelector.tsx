import React from "react";
import { TimeButton } from "./TimeButton";
import { TIME_OPTIONS } from "./constants";
import { TimeSelectorProps } from "./types";
import styles from "./index.module.css";

const TimeSelector: React.FC<TimeSelectorProps> = ({
  currentPeriod,
  onPeriodChange,
}) => {
  return (
    <div
      className={styles.timeSelector}
      role="group"
      aria-label="Time period selection"
    >
      {TIME_OPTIONS.map((option) => (
        <TimeButton
          key={option.value}
          value={option.value}
          label={option.label}
          isActive={currentPeriod === option.value}
          onClick={onPeriodChange}
        />
      ))}
    </div>
  );
};

export default TimeSelector;
