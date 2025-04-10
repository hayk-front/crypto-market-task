import React, { useEffect, useRef } from "react";
import { createChart, ColorType, UTCTimestamp } from "lightweight-charts";
import "./styles.css";

interface ChartProps {
  data: Array<{
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;

    if (chartInstanceRef.current) {
      chartContainerRef.current.innerHTML = "";
      chartInstanceRef.current = null;
    }

    const chartOptions = {
      layout: {
        textColor: "#919191",
        background: {
          type: ColorType.Solid,
          color: "#242424",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 280,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: {
          color: "#3A3A3A",
        },
        horzLines: {
          color: "#3A3A3A",
        },
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartInstanceRef.current = chart;

    // candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#CDFF00",
      downColor: "#FF3440",
      borderVisible: false,
      wickUpColor: "#CDFF00",
      wickDownColor: "#FF3440",
    });

    // matching data with lightweight-charts expected format
    const formattedData = data.map((item) => ({
      time: item.time as UTCTimestamp,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeries.setData(formattedData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return <div className="chart-container" ref={chartContainerRef}></div>;
};

export default Chart;
