"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import React from "react";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  SlidersHorizontal,
  User,
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex items-center cursor-pointer rounded-lg transition-all duration-200 ${
          isCollapsed ? "justify-center py-3" : "justify-start px-4 py-3"
        } ${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Icon className={`w-5 h-5 ${!isCollapsed && "mr-3"}`} />
        {!isCollapsed && (
          <span className="font-medium text-sm">{label}</span>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const sidebarLinks = [
    { href: "/dashboard", icon: Layout, label: "Dashboard" },
    { href: "/inventory", icon: Archive, label: "Inventory" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/users", icon: User, label: "Users" },
    { href: "/settings", icon: SlidersHorizontal, label: "Settings" },
    { href: "/expenses", icon: CircleDollarSign, label: "Expenses" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-50 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`flex items-center ${
          isSidebarCollapsed ? "justify-center" : "justify-start px-6"
        } h-16 border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          {!isSidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              SHELFIE
            </h1>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`flex flex-col gap-2 mt-6 ${isSidebarCollapsed ? "px-2" : "px-4"}`}>
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 ${
          isSidebarCollapsed ? "text-center" : ""
        }`}
      >
        <p className={`text-xs text-gray-500 dark:text-gray-400 ${isSidebarCollapsed ? "hidden" : ""}`}>
          © 2025 SHELFIE
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
