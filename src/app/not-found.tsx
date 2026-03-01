"use client";
import React, { useState, useEffect } from "react";
import { Home, Search, ShoppingCart, Sprout, Wheat, Apple } from "lucide-react";

export default function Farmer404Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-100 overflow-hidden relative">
      {/* Animated Background Elements */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Animated Tractor/Farm Icon */}

        {/* 404 Text */}
        <div className="text-center mb-6">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
            Oops! Crop Not Found
          </h2>
          <p className="text-lg md:text-xl text-green-700 max-w-md mx-auto mb-2">
            Looks like this page got lost in the fields!
          </p>
          <p className="text-base md:text-lg text-green-600 max-w-lg mx-auto">
            The harvest you're looking for might have been moved or doesn't
            exist anymore.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md px-4">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (window.location.href = "/home")}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
          <button
            className="flex-1 bg-white hover:bg-gray-50 text-green-700 font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-green-200"
            onClick={() => (window.location.href = "/home")}
          >
            <ShoppingCart size={20} />
            Shop Now
          </button>
        </div>

        {/* Search Bar */}

        {/* Decorative Ground Line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600"></div>
      </div>
    </div>
  );
}
