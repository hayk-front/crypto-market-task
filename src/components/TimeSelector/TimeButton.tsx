import React from "react";
import { TimePeriod } from "./types";
import styles from "./index.module.css";

interface TimeButtonProps {
  value: TimePeriod;
  label: string;
  isActive: boolean;
  onClick: (value: TimePeriod) => void;
}

export const TimeButton: React.FC<TimeButtonProps> = ({
  value,
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`${styles.timeButton} ${
      isActive ? styles.timeButtonActive : ""
    }`}
    onClick={() => onClick(value)}
    type="button"
    aria-pressed={isActive}
  >
    {label}
  </button>
);
