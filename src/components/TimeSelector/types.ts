export type TimePeriod = "1h" | "1d" | "1w" | "1m" | "1y" | "all";

export interface TimeSelectorProps {
  currentPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export interface TimeOption {
  value: TimePeriod;
  label: string;
}
