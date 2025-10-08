import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp, BarChart3 } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];
  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-center justify-center">
        <p className="text-red-400">Failed to fetch data</p>
      </div>
    );
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm flex flex-col">
      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="p-5 pb-3">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-100">
                Sales Summary
              </h2>
            </div>
            <hr className="border-gray-700" />
          </div>

          {/* BODY */}
          <div className="flex-1">
            {/* BODY HEADER */}
            <div className="flex justify-between items-center px-5 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">
                  Total Value
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-100">
                    $
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </span>
                  <span className="flex items-center text-green-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {averageChangePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <select
                className="px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-3">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke="#374151"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                    "Total Value",
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f3f4f6"
                  }}
                  itemStyle={{
                    color: "#f3f4f6"
                  }}
                  labelStyle={{
                    color: "#f3f4f6"
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3b82f6"
                  barSize={16}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div className="p-5 pt-0">
            <hr className="border-gray-700 mb-4" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">
                {salesData.length || 0} days
              </span>
              <span className="text-gray-400">
                Highest:{" "}
                <span className="font-semibold text-gray-100">
                  {highestValueDate}
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
