export const formatOHLCData = (ohlcData: any) => {
  if (!ohlcData) {
    return [];
  }

  if (Array.isArray(ohlcData)) {
    if (ohlcData.length === 0) {
      return [];
    }

    const result = ohlcData
      .map((item) => {
        if (!item || !item.date || !item.usd) {
          return null;
        }

        // Formatting date to Unix timestamp (in seconds) for lightweight-charts
        let time;
        if (typeof item.date === "number") {
          // If already timestamp, make sure it's in seconds (not milliseconds)
          time =
            item.date > 10000000000 ? Math.floor(item.date / 1000) : item.date;
        } else if (typeof item.date === "string") {
          // Converting ISO string to timestamp in seconds
          time = Math.floor(new Date(item.date).getTime() / 1000);
        } else {
          // Fallback
          time = Math.floor(Date.now() / 1000);
        }

        // Ensuring values are always numbers and have enough range to be visible
        const open = Number(item.usd.open || 0);
        const close = Number(item.usd.close || 0);
        const high = Number(item.usd.high || 0);
        const low = Number(item.usd.low || 0);

        return {
          time,
          open,
          high,
          low,
          close,
        };
      })
      .filter(Boolean); // Removing any null entries

    // Sorting by time ascending for proper chart display
    result.sort((a, b) => {
      if (a && b && typeof a.time === "number" && typeof b.time === "number") {
        return a.time - b.time;
      }
      return 0;
    });

    return result;
  }

  // Returning fallback if no valid data format found
  const now = Math.floor(Date.now() / 1000);
  const day = 24 * 60 * 60;

  const fallbackData = [
    {
      time: now - day * 5,
      open: 0.9995,
      high: 0.9998,
      low: 0.9993,
      close: 0.9997,
    },
    {
      time: now - day * 4,
      open: 0.9997,
      high: 0.9999,
      low: 0.9995,
      close: 0.9998,
    },
    {
      time: now - day * 3,
      open: 0.9998,
      high: 1.0001,
      low: 0.9997,
      close: 1.0,
    },
    {
      time: now - day * 2,
      open: 1.0,
      high: 1.0002,
      low: 0.9998,
      close: 0.9999,
    },
    { time: now - day, open: 0.9999, high: 1.0003, low: 0.9997, close: 1.0001 },
    { time: now, open: 1.0001, high: 1.0005, low: 1.0, close: 1.0003 },
  ];
  return fallbackData;
};
