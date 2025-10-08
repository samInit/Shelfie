"use client";

import { Layout, Archive, Package, User, CircleDollarSign, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FloatingNav = () => {
  const pathname = usePathname();

  // Hide floating nav on home page
  if (pathname === "/") {
    return null;
  }

  const navLinks = [
    { href: "/dashboard", icon: Layout, label: "Dashboard" },
    { href: "/inventory", icon: Archive, label: "Inventory" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/users", icon: User, label: "Users" },
    { href: "/expenses", icon: CircleDollarSign, label: "Expenses" },
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-2 flex flex-col gap-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <div 
                className={`group relative p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                title={link.label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip on hover */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  {link.label}
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-700"></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingNav;
