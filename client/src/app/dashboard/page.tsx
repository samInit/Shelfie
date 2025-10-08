"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
  LayoutDashboard,
} from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-8 max-w-[2000px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Dashboard
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-14">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Summary - Full Width */}
            <CardSalesSummary />

            {/* Purchase and Expense Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardPurchaseSummary />
              <CardExpenseSummary />
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Customer & Expenses"
                primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
                dateRange="22 - 29 October 2023"
                details={[
                  {
                    title: "Customer Growth",
                    amount: "175.00",
                    changePercentage: 131,
                    IconComponent: TrendingUp,
                  },
                  {
                    title: "Expenses",
                    amount: "10.00",
                    changePercentage: -56,
                    IconComponent: TrendingDown,
                  },
                ]}
              />
              <StatCard
                title="Dues & Pending Orders"
                primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
                dateRange="22 - 29 October 2023"
                details={[
                  {
                    title: "Dues",
                    amount: "250.00",
                    changePercentage: 131,
                    IconComponent: TrendingUp,
                  },
                  {
                    title: "Pending Orders",
                    amount: "147",
                    changePercentage: -56,
                    IconComponent: TrendingDown,
                  },
                ]}
              />
              <StatCard
                title="Sales & Discount"
                primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
                dateRange="22 - 29 October 2023"
                details={[
                  {
                    title: "Sales",
                    amount: "1000.00",
                    changePercentage: 20,
                    IconComponent: TrendingUp,
                  },
                  {
                    title: "Discount",
                    amount: "200.00",
                    changePercentage: -10,
                    IconComponent: TrendingDown,
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Column - 1/3 width - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CardPopularProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
