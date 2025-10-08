import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];
  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-gray-800 border border-gray-700 rounded-lg shadow-sm flex flex-col">
      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-48 bg-gray-700 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="p-5 pb-3">
            <div className="flex items-center space-x-2 mb-2">
              <ShoppingCart className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-100">
                Purchase Summary
              </h2>
            </div>
            <hr className="border-gray-700" />
          </div>

          {/* BODY */}
          <div className="flex-1 px-5">
            {/* BODY HEADER */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-1">
                Total Purchased
              </p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-gray-100">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "$0"}
                </p>
                {lastDataPoint && (
                  <div
                    className={`flex items-center text-sm font-medium ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </div>
                )}
              </div>
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPurchased" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  tick={false} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={false} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                    "Purchased",
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
                <Area
                  type="monotone"
                  dataKey="totalPurchased"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorPurchased)"
                  dot={{ fill: "#8b5cf6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
