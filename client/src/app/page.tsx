"use client";

import Link from "next/link";
import { ArrowRight, Package, TrendingUp, BarChart3, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative h-full overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content - Scrollable on mobile */}
        <div className="relative h-full overflow-y-auto md:overflow-hidden">
          <div className="min-h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-0">
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl w-full">
              {/* Logo/Brand */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">SHELFIE</h1>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-4">
                  Smart Inventory
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Management
                  </span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                  Streamline your inventory operations with powerful analytics, 
                  real-time tracking, and intuitive management tools.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center pt-2 sm:pt-4">
                <Link href="/dashboard">
                  <button className="group px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 flex items-center space-x-2">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Feature Cards - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-10 max-w-4xl mx-auto px-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-5 hover:border-blue-500/50 transition-all text-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-900/30 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Real-time Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Live dashboards for tracking
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-5 hover:border-purple-500/50 transition-all text-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-900/30 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Smart Reporting
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Data-driven insights
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-5 hover:border-green-500/50 transition-all sm:col-span-1 col-span-1 text-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-900/30 rounded-lg flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                    Team Management
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Seamless collaboration
                  </p>
                </div>
              </div>

              {/* Spacer for mobile */}
              <div className="h-4 md:hidden"></div>
            </div>
          </div>

          {/* Footer - Responsive positioning */}
          <div className="md:absolute md:bottom-0 left-0 right-0 border-t border-gray-800 py-3 sm:py-4 bg-gray-900/50 backdrop-blur-sm">
            <p className="text-center text-gray-500 text-xs sm:text-sm">
              © 2025 SHELFIE. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
