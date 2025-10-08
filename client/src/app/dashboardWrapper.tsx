"use client";

import React, { useEffect } from "react";
import FloatingNav from "./(components)/FloatingNav/page";
import StoreProvider from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Always set dark mode class
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 text-gray-100 w-full min-h-screen">
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <FloatingNav />
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    <DashboardLayout>{children}</DashboardLayout>
  </StoreProvider>
);

export default DashboardWrapper;
