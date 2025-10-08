import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 
      ? "text-green-600 dark:text-green-400" 
      : "text-red-600 dark:text-red-400";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      {/* HEADER */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {dateRange}
          </span>
        </div>
        <hr className="border-gray-200 dark:border-gray-700" />
      </div>

      {/* BODY */}
      <div className="flex items-center gap-6 px-5 pb-5">
        <div className="rounded-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          {primaryIcon}
        </div>
        <div className="flex-1 space-y-3">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {detail.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ${detail.amount}
                  </span>
                  <div className="flex items-center">
                    <detail.IconComponent
                      className={`w-4 h-4 mr-1 ${getChangeColor(
                        detail.changePercentage
                      )}`}
                    />
                    <span
                      className={`font-medium text-sm ${getChangeColor(
                        detail.changePercentage
                      )}`}
                    >
                      {formatPercentage(detail.changePercentage)}
                    </span>
                  </div>
                </div>
              </div>
              {index < details.length - 1 && (
                <hr className="border-gray-200 dark:border-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
