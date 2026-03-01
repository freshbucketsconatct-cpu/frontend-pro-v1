"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaTh,
  FaComments,
  FaShoppingCart,
  FaHeart, // <-- Wishlist icon added
} from "react-icons/fa";

const MobileBottomFooter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = useState("home");

  useEffect(() => {
    if (pathname === "/") {
      setActiveNavItem("home");
    } else if (pathname.startsWith("/products")) {
      setActiveNavItem("products");
    } else if (pathname.startsWith("/contact")) {
      setActiveNavItem("contact");
    } else if (pathname.startsWith("/cart")) {
      setActiveNavItem("cart");
    } else if (pathname.startsWith("/wishlist")) {
      // <-- updated
      setActiveNavItem("wishlist");
    } else {
      setActiveNavItem("");
    }
  }, [pathname]);

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40">
      <div className="grid grid-cols-5 h-16">
        {/* Home */}
        <button
          onClick={() => handleNavigation("/")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "home" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaHome className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>

        {/* Products */}
        <button
          onClick={() => handleNavigation("/products")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "product" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaTh className="w-6 h-6" />
          <span className="text-xs font-medium">Products</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => handleNavigation("/contact")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "contact" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaComments className="w-6 h-6" />
          <span className="text-xs font-medium">Contact</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => handleNavigation("/cart")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "cart" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <div className="relative">
            <FaShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <span className="text-xs font-medium">Cart</span>
        </button>

        {/* Wishlist (Replaced Profile) */}
        <button
          onClick={() => handleNavigation("/wishlist")}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeNavItem === "wishlist" ? "text-green-600" : "text-gray-600"
          }`}
        >
          <FaHeart className="w-6 h-6" />
          <span className="text-xs font-medium">Wishlist</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomFooter;
