import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const expenseSummary = dashboardMetrics?.expenseSummary[0];
  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm flex flex-col">
      {isLoading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-40 bg-gray-700 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="p-5 pb-3">
            <div className="flex items-center space-x-2 mb-2">
              <PieChartIcon className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-100">
                Expense Summary
              </h2>
            </div>
            <hr className="border-gray-700" />
          </div>

          {/* BODY */}
          <div className="flex-1 flex flex-col xl:flex-row items-center justify-between px-5 gap-4">
            {/* CHART */}
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="font-bold text-xl text-gray-100">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>

            {/* LABELS */}
            <ul className="flex flex-col justify-center gap-3 flex-1">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-sm"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  <span className="text-gray-300 truncate">
                    {entry.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div className="p-5 pt-3">
            <hr className="border-gray-700 mb-3" />
            {expenseSummary && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  Average:{" "}
                  <span className="font-semibold text-gray-100">
                    ${expenseSummary.totalExpenses.toFixed(2)}
                  </span>
                </p>
                <span className="flex items-center text-green-400 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
