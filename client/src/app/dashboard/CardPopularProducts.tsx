import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag, TrendingUp } from "lucide-react";
import React from "react";
import Rating from "../(components)/Rating";
import Image from "next/image";

const CardPopularProducts = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm flex flex-col w-full">
      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="p-5 pb-3 flex-shrink-0">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Popular Products
              </h3>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>
          <div className="overflow-auto flex-1">
            {dashboardMetrics?.popularProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={`https://s3-shelfie-inventorymanagement.s3.us-east-1.amazonaws.com/product${
                        Math.floor(Math.random() * 3) + 1
                      }.png`}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="rounded-lg bg-gray-100 dark:bg-gray-900"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center gap-2">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${product.price}
                      </span>
                      <span className="text-gray-400">|</span>
                      <Rating rating={product.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
