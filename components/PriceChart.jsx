'use client';

import React, { useEffect, useState } from 'react';
import { getPriceHistory } from '@/app/action';
import { toast } from 'sonner';

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import { Skeleton } from './ui/skeleton';

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg">
        
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-bold text-orange-600 mt-1">
          price : ₹{payload[0].value}
        </p>

      </div>
    );
  }

  return null;
}

function PriceChart({ productId }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true);

        const result = await getPriceHistory(productId);

        console.log('price history', result);

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        const formattedData =
          result?.map((item) => ({
            price: item.price,

            date: new Date(
              item.checked_at
            ).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'numeric',
            }),
          })) || [];

        setChartData(formattedData);

      } catch (error) {
        console.error(error);

        toast.error(
          'Failed to fetch price history'
        );

      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadData();
    }

  }, [productId]);

  if (loading) {
    return (
      <div className="w-full">
        
        <Skeleton className="h-5 w-32 mb-5" />

        <div className="space-y-4">
          
          <Skeleton className="h-[170px] w-full rounded-xl" />

          <div className="flex justify-between">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
          </div>

        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="h-[170px] flex items-center justify-center">
        <p className="text-sm text-gray-500">
          No price history available
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      <h3 className="text-base font-bold text-gray-800 mb-4">
        Price History
      </h3>

      <div className="h-[170px] w-full">
        
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 11,
                fill: '#9ca3af',
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 11,
                fill: '#9ca3af',
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#ea580c',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#ea580c"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: '#ea580c',
                strokeWidth: 0,
              }}
              activeDot={{
                r: 7,
                fill: '#ea580c',
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}

export default PriceChart;