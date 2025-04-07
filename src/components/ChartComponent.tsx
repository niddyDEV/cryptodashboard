'use client';

import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { chains } from '@/app/utils/chains';

Chart.register(...registerables, CandlestickController, CandlestickElement);

const fetchPairAddress = (tokenSymbol: string, chainName: string): string | null => {
  const chain = chains.find(c => c.name === chainName);
  if (!chain) return null;

  const token = chain.tokens.find(t => t.symbol === tokenSymbol);
  const usdt = chain.tokens.find(t => t.symbol === 'USDT');

  if (!token || !usdt) return null;

  // Для ETH/USDT пары возвращаем специальный адрес
  if (tokenSymbol === 'ETH') return '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852';
  if (tokenSymbol === 'BNB') return '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae';
  if (tokenSymbol === 'MATIC') return '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3';

  // Для других токенов возвращаем адрес токена (в реальном приложении нужно использовать реальные адреса пар)
  return token.address;
};

const fetchOHLCData = async (pairAddress: string, chainName: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_MORALIS_API_KEY || '',
    },
  };

  // Получаем текущую дату и дату неделю назад
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const url = `https://deep-index.moralis.io/api/v2.2/pairs/${pairAddress}/ohlcv?chain=${chainName.toLowerCase()}&timeframe=1h&from_date=${fromDate.toISOString()}&to_date=${toDate.toISOString()}`;
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error('Error fetching OHLC data:', err);
    return null;
  }
};

export default function ChartComponent({ 
  tokenSymbol,
  chainName 
}: { 
  tokenSymbol: string;
  chainName: string;
}) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [ohlcData, setOhlcData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const pairAddress = fetchPairAddress(tokenSymbol, chainName);
        if (!pairAddress) {
          throw new Error(`Could not find pair address for ${tokenSymbol}/USDT`);
        }

        const data = await fetchOHLCData(pairAddress, chainName);
        if (!data || !data.result) {
          throw new Error('No data returned from API');
        }

        setOhlcData(data.result);
      } catch (err) {
        console.error('Error loading chart data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load chart data');
      } finally {
        setIsLoading(false);
      }
    };

    loadChartData();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [tokenSymbol, chainName]);

  useEffect(() => {
    if (!chartRef.current || ohlcData.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Уничтожаем предыдущий график, если он существует
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: `${tokenSymbol}/USDT`,
          data: ohlcData.map(entry => ({
            x: new Date(entry.timestamp).getTime(),
            o: entry.open,
            h: entry.high,
            l: entry.low,
            c: entry.close,
          })),
          color: {
            up: '#4ade80',
            down: '#f87171',
            unchanged: '#94a3b8',
          },
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = context.raw as any;
                return [
                  `Open: ${data.o}`,
                  `High: ${data.h}`,
                  `Low: ${data.l}`,
                  `Close: ${data.c}`,
                ];
              },
            },
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM d',
              },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#94a3b8',
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#94a3b8',
            },
          },
        },
      },
    });
  }, [ohlcData, tokenSymbol]);

  return (
    <div className="chart-container p-4 bg-zinc-800 rounded-lg h-96">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="spinningTriangle"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full text-red-400">
          {error}
        </div>
      ) : (
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      )}
    </div>
  );
}