import { TimePeriod } from "./types";

/**
 * Converts a time period to the equivalent number of days
 * @param period The time period to convert
 * @returns Number of days
 */
export const getTimeInDays = (period: TimePeriod): number => {
  switch (period) {
    case "1h":
      return 1;
    case "1d":
      return 1;
    case "1w":
      return 7;
    case "1m":
      return 30;
    case "1y":
      return 365;
    case "all":
      return 1825; // 5 years
    default:
      return 30;
  }
};
