'use client';

import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

Chart.register(...registerables, CandlestickController, CandlestickElement);

const fetchOHLCData = async (pairAddress: string, fromDate: string, toDate: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    },
  };

  const url = `https://deep-index.moralis.io/api/v2.2/pairs/${pairAddress}/ohlcv?chain=eth&timeframe=1h&currency=usd&fromDate=${fromDate}&toDate=${toDate}`;
  console.log('Fetching URL:', url);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data.result;
  } catch (err) {
    console.error('Error fetching OHLC data:', err);
    return null;
  }
};

export default function ChartComponent({ pairAddress }: { pairAddress: string }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [ohlcData, setOhlcData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchOHLCData(pairAddress, '2024-01-01', '2024-01-08');
      if (data) {
        setOhlcData(data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [pairAddress]);

  useEffect(() => {
    if (chartRef.current && ohlcData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'candlestick',
          data: {
            datasets: [
              {
                label: 'OHLC',
                data: ohlcData.map((entry) => ({
                  x: new Date(entry.timestamp).getTime(),
                  o: entry.open,
                  h: entry.high,
                  l: entry.low,
                  c: entry.close,
                })),
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'hour',
                },
              },
              y: {
                beginAtZero: false,
              },
            },
          },
        });

        return () => chart.destroy();
      }
    }
  }, [ohlcData]);

  return (
    <div className="chart-container p-4 bg-zinc-700 rounded-lg">
      {isLoading ? (
        <div className='chart-loader flex justify-center items-center'></div>
      ) : (
        <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
}