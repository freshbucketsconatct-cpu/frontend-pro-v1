"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiTag,
  FiPackage,
  FiShield,
  FiTruck,
  FiX,
  FiMapPin,
  FiHome,
  FiSearch,
  FiChevronRight,
  FiChevronDown,
  FiShoppingCart,
  FiAlertCircle,
} from "react-icons/fi";
import {
  FiEdit2, // ADD THIS
} from "react-icons/fi";
import { IoCheckmarkCircle, IoCashOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectUser,
} from "@src/redux/reducers/authSlice";
import Header from "@src/component/components/header";
import Footer from "@src/component/components/footer";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@src/redux/store";
import { BASE_URL } from "@src/config/config";

// ==================== TYPES ====================
interface Society {
  id: number;
  name: string;
  area: string;
  pincode: string;
  deliveryAvailable: boolean;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "work" | "other";
}

interface AppliedCoupon {
  code: string;
  couponId: string | number | null;
  type: string;
  value: number;
  discountAmount: number;
  finalAmount: number;
}

interface CartItem {
  id: string;
  name: string;
  selectedSize: string;
  variant_id?: number | null;
  image: string;
  quantity: number;
  price: number;
}

interface CartData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

// ==================== CONSTANTS ====================
const FREE_DELIVERY_THRESHOLD = 100;
const SHIPPING_CHARGE = 30;

const STATIC_SOCIETIES: Society[] = [
  {
    id: 1,
    name: "Gala Heaven",
    area: "Vaishnodevi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 2,
    name: "Gala Celestia",
    area: "Vaishnodevi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 3,
    name: "Reflection Apartment",
    area: "Vaishnodevi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 4,
    name: "Abhilash Apartments",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 5,
    name: "Saaga Residency",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 6,
    name: "Shree Balaji WindPark",
    area: "Vaishnodevi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 7,
    name: "Adani Pratham",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 8,
    name: "Malabar Exotica",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 9,
    name: "Malabar County 3",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 10,
    name: "Malabar County 2",
    area: "Tragad",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 11,
    name: "Malabar County 1",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 12,
    name: "Tirupati Aakruti Greenz",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 13,
    name: "Elite Mars",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 14,
    name: "Parkview",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 15,
    name: "Swarnim Square",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 16,
    name: "Wertical Space",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 17,
    name: "Vandemataram Fabula",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 18,
    name: "Alaya Belmonte",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 19,
    name: "Aristo Akalpya",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 20,
    name: "Signature Infinity",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 21,
    name: "Alaya Heights",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 22,
    name: "Kesar Alanta",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 23,
    name: "Casa Elite",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 24,
    name: "Swarnim Sentossa",
    area: "Chharodi",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 25,
    name: "Alexa",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 26,
    name: "Archway",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 27,
    name: "Krishna Heights",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 28,
    name: "Ganesh Genesis",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 29,
    name: "Ananta",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 30,
    name: "Shree Vishnudhara Gardens",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 31,
    name: "Seventh Bliss",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 32,
    name: "Status Elysium",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 33,
    name: "Western Height",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 34,
    name: "Serenity Space",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 35,
    name: "Prathna Lavish",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 36,
    name: "Seventh Parisar",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 37,
    name: "Vishwas City 9",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 38,
    name: "Simandhar Status",
    area: "Jagatpur",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 39,
    name: "Heart Villa",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 40,
    name: "Dwarka Apartment",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 41,
    name: "Shayona Green",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 42,
    name: "Seventh Avenue",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 43,
    name: "Unique Aashiyana",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 44,
    name: "Chanakya Apartment",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 45,
    name: "Stavan Ample",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 46,
    name: "ICB Flora",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 47,
    name: "Silver Harmony",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 48,
    name: "Seventh Paradise",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 49,
    name: "Vishwas City 11",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 50,
    name: "Setu Vatika",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 51,
    name: "Dharti Saket Height",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 52,
    name: "Shukan Glory",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 53,
    name: "Simandhar Metro",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 54,
    name: "Vishwas City 10",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 55,
    name: "Diva Heights",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 56,
    name: "Victory Sunrise",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 57,
    name: "Anand Sapphire",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 58,
    name: "Vishwas City 7",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 59,
    name: "Vishwas City 6",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 60,
    name: "Shripad Residency",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 61,
    name: "Anutham Apartment",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 62,
    name: "Vraj Residency",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 63,
    name: "Vishwa Heights",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 64,
    name: "Shree Vishnudhara Homes",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 65,
    name: "Parivar Homes",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 66,
    name: "Royal Heights",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 67,
    name: "Royal Lakend",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 68,
    name: "Olive Greens",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 69,
    name: "Satyamev Vista",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 70,
    name: "Aristo Aalayam",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 71,
    name: "Silver Nest",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 72,
    name: "Vishesh Residency",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 73,
    name: "Shlok Parisar",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 74,
    name: "Shaligram Square",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 75,
    name: "Solitaire Vista",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 76,
    name: "Saral Residency",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 77,
    name: "Seventh Yash",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 78,
    name: "Aristo Bliss",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 79,
    name: "Popular Paradise",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 80,
    name: "Royal Homes",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 81,
    name: "Devnagar Village",
    area: "Gota",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 82,
    name: "Ganesh Parisar",
    area: "Chenpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 83,
    name: "Ganesh Gold",
    area: "Chenpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 84,
    name: "Shayona Shikhar",
    area: "Vandematram",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 85,
    name: "Vandematram City",
    area: "Vandematram",
    pincode: "382481",
    deliveryAvailable: true,
  },
  {
    id: 86,
    name: "Savvy Swaraj",
    area: "Savvy Swaraj",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 87,
    name: "Skywalk Luxuria",
    area: "Savvy Swaraj",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 88,
    name: "Shubh Vastu Heights",
    area: "Chenpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 89,
    name: "Skywalk",
    area: "Chenpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 90,
    name: "Ganesh Skyline 2",
    area: "Chenpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 91,
    name: "Tivoli Apartment",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 92,
    name: "Eden",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 93,
    name: "Vrindavan",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 94,
    name: "Elite Mercury",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 95,
    name: "Aaryan Emerald",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 96,
    name: "Signature Celestia",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 97,
    name: "Ananya Allium",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 98,
    name: "Aristo Anandam 2",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 99,
    name: "Siddharth Luxuria",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 100,
    name: "Atrius",
    area: "Jagatpur",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 101,
    name: "Carmel",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 102,
    name: "Yash Evana",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 103,
    name: "Sun Rising Homes",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 104,
    name: "Godrej Green Glades",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 105,
    name: "Belvedere Towers",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 106,
    name: "Nirman Rejoice",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 107,
    name: "Vishakha Olivia & Eliana",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
  {
    id: 108,
    name: "Akruti Elegance",
    area: "Godrej Garden City",
    pincode: "382470",
    deliveryAvailable: true,
  },
];

// ==================== COMPONENTS ====================

// 1. EmptyCart Component
const EmptyCart = ({ router }: { router: any }) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Header />
    <div className="lg:hidden bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
      <div className="px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
        >
          <FiArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500">0 items</p>
        </div>
        <div className="p-2 rounded-lg bg-green-50 text-green-600">
          <FiShoppingCart className="w-5 h-5" />
        </div>
      </div>
    </div>

    <main className="pt-16 lg:pt-24 pb-20 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPackage className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h3>
            <p className="text-gray-600 text-sm lg:text-base mb-8">
              Add fresh fresh products to your cart
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors active:scale-95"
              >
                Start Shopping
              </button>
              <button
                onClick={() => router.push("/products")}
                className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors active:scale-95"
              >
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    <MobileBottomFooter />
  </div>
);

// 2. CartItem Component
const CartItemComponent = ({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, size: string, change: number) => void;
  onRemove: (id: string, size: string) => void;
}) => (
  <div className="bg-white rounded-lg lg:rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
    {/* Mobile Layout */}
    <div className="lg:hidden">
      <div className="flex gap-3 p-3">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => onRemove(item.id, item.selectedSize)}
            className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center active:scale-95"
          >
            <FiTrash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500">{item.selectedSize}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                /* DISABLED REMOVED HERE */
                className="w-8 h-8 flex items-center justify-center active:bg-gray-100 transition-colors"
              >
                <FiMinus className="w-3 h-3 stroke-2" />
              </button>
              <div className="w-8 text-center font-bold text-gray-900 text-sm">
                {item.quantity}
              </div>
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                className="w-8 h-8 flex items-center justify-center active:bg-gray-100 transition-colors"
              >
                <FiPlus className="w-3 h-3 stroke-2" />
              </button>
            </div>

            <div className="text-right">
              <p className="text-base font-bold text-gray-900">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">₹{item.price} each</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Desktop Layout */}
    <div className="hidden lg:block p-4 lg:p-6">
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.selectedSize}</p>
              </div>
              <button
                onClick={() => onRemove(item.id, item.selectedSize)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-95"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                /* DISABLED REMOVED HERE */
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <FiMinus className="w-4 h-4 stroke-2" />
              </button>
              <div className="w-12 text-center font-bold text-gray-900">
                {item.quantity}
              </div>
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <FiPlus className="w-4 h-4 stroke-2" />
              </button>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">₹{item.price} each</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 3. FreeDeliveryBanner Component (Updated Logic)
const FreeDeliveryBanner = ({ subtotal }: { subtotal: number }) => {
  const isFree = subtotal > FREE_DELIVERY_THRESHOLD;
  const amountNeeded = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div
      className={`bg-gradient-to-r ${
        isFree ? "from-green-50 to-emerald-50" : "from-orange-50 to-yellow-50"
      } rounded-xl p-4 border ${
        isFree ? "border-green-200" : "border-orange-200"
      } mb-4 lg:mb-6 transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 ${
            isFree ? "bg-green-600" : "bg-orange-500"
          } rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <FiTruck className="text-white w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-gray-900 text-sm lg:text-base">
            {isFree
              ? "Free Delivery!"
              : `Add ₹${amountNeeded.toFixed(2)} for Free Delivery`}
          </p>
          <p className="text-gray-600 text-xs lg:text-sm">
            {isFree
              ? "Your order qualifies for free shipping"
              : `Order above ₹${FREE_DELIVERY_THRESHOLD} to avoid shipping charges`}
          </p>
        </div>
        {isFree ? (
          <IoCheckmarkCircle className="text-green-600 w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0" />
        ) : (
          <FiAlertCircle className="text-orange-500 w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

// 4. PromoCodeSection Component
const PromoCodeSection = ({
  promoCode,
  setPromoCode,
  showPromoInput,
  setShowPromoInput,
  appliedCoupon,
  setAppliedCoupon,
  applyPromocode,
  isProcessing,
}: {
  promoCode: string;
  setPromoCode: (code: string) => void;
  showPromoInput: boolean;
  setShowPromoInput: (show: boolean) => void;
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
  applyPromocode: () => void;
  isProcessing: boolean;
}) => {
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setPromoCode("");
    toast.success("Promo code removed");
  };

  if (!appliedCoupon && !showPromoInput) {
    return (
      <button
        onClick={() => setShowPromoInput(true)}
        className="w-full mb-4 p-3 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg transition-all flex items-center justify-between active:scale-98"
      >
        <div className="flex items-center gap-2">
          <FiTag className="text-green-600" />
          <span className="font-semibold text-gray-900 text-sm">
            Have a promo code?
          </span>
        </div>
        <span className="text-green-600 font-semibold text-sm">Apply</span>
      </button>
    );
  }

  if (showPromoInput && !appliedCoupon) {
    return (
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === "Enter" && applyPromocode()}
            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none text-sm"
            disabled={isProcessing}
          />
          <button
            onClick={applyPromocode}
            disabled={isProcessing || !promoCode.trim()}
            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all disabled:bg-gray-300 active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    );
  }

  if (appliedCoupon) {
    return (
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 text-sm">
              {appliedCoupon.code}
            </p>
            <p className="text-xs text-green-700">
              {appliedCoupon.type === "FIXED"
                ? `₹${appliedCoupon.value}`
                : `${appliedCoupon.value}%`}{" "}
              off applied
            </p>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="text-red-600 font-semibold text-xs hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// 5. PriceBreakdown Component (Updated Logic)
const PriceBreakdown = ({
  cartItems,
  subtotal,
  discount,
  shipping,
  total,
}: {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}) => (
  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
    <div className="flex justify-between">
      <span className="text-gray-600 text-sm">
        Subtotal ({cartItems.length} items)
      </span>
      <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600 text-sm">Shipping</span>
      <span
        className={`font-bold ${
          shipping === 0 ? "text-green-600" : "text-gray-900"
        }`}
      >
        {shipping === 0 ? "FREE" : `₹${shipping}`}
      </span>
    </div>
    {discount > 0 && (
      <div className="flex justify-between text-green-700">
        <span className="font-medium text-sm">Discount</span>
        <span className="font-bold">-₹{discount.toFixed(2)}</span>
      </div>
    )}
  </div>
);

// 6. CheckoutButton Component
const CheckoutButton = ({
  onClick,
  disabled,
  total,
}: {
  onClick: () => void;
  disabled: boolean;
  total: number;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-300 shadow-lg shadow-green-600/30 active:scale-98"
  >
    Proceed to Checkout
  </button>
);

// 7. TrustBadges Component
const TrustBadges = () => (
  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <FiShield className="text-gray-400 w-3 h-3" />
      <span>Secure checkout</span>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <FiTruck className="text-gray-400 w-3 h-3" />
      <span>Free shipping on orders above ₹{FREE_DELIVERY_THRESHOLD}</span>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <IoCashOutline className="text-gray-400 w-3 h-3" />
      <span>Cash on Delivery available</span>
    </div>
  </div>
);

// 8. SocietySelector Component (for CheckoutModal)
const SocietySelector = ({
  selectedSociety,
  setSelectedSociety,
  searchQuery,
  setSearchQuery,
  showSocietyDropdown,
  setShowSocietyDropdown,
  errors,
  setErrors,
}: {
  selectedSociety: Society | null;
  setSelectedSociety: (society: Society) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSocietyDropdown: boolean;
  setShowSocietyDropdown: (show: boolean) => void;
  errors: any;
  setErrors: (errors: any) => void;
}) => {
  const filteredSocieties = searchQuery.trim()
    ? STATIC_SOCIETIES.filter(
        (society) =>
          society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          society.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          society.pincode.includes(searchQuery)
      )
    : STATIC_SOCIETIES;

  const handleSocietySelect = (society: Society) => {
    if (society.deliveryAvailable) {
      setSelectedSociety(society);
      setSearchQuery("");
      setShowSocietyDropdown(false);
      if (errors.society) {
        setErrors((prev: any) => ({ ...prev, society: "" }));
      }
      toast.success(`Selected: ${society.name}`, {
        icon: "📍",
        duration: 2000,
      });
    } else {
      toast.error("Delivery not available in this area", { icon: "❌" });
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Select Society / Locality *
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowSocietyDropdown(!showSocietyDropdown)}
          className={`w-full px-4 py-3 border-2 rounded-lg text-left flex items-center justify-between transition-all active:scale-98 ${
            errors.society
              ? "border-red-500"
              : selectedSociety
              ? "border-green-600 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FiMapPin
              className={`w-4 h-4 flex-shrink-0 ${
                selectedSociety ? "text-green-600" : "text-gray-400"
              }`}
            />
            {selectedSociety ? (
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 truncate text-sm">
                  {selectedSociety.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {selectedSociety.area}, Ahmedabad • {selectedSociety.pincode}
                </p>
              </div>
            ) : (
              <span className="text-gray-500 text-sm">
                Choose your society in Ahmedabad
              </span>
            )}
          </div>
          <FiChevronDown
            className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
              showSocietyDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {showSocietyDropdown && (
          <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-hidden">
            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search society, area, or pincode..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-green-600 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredSocieties.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">No societies found</p>
                </div>
              ) : (
                filteredSocieties.map((society) => (
                  <button
                    key={society.id}
                    type="button"
                    onClick={() => handleSocietySelect(society)}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 active:scale-98 ${
                      !society.deliveryAvailable
                        ? "opacity-50 cursor-not-allowed bg-gray-50"
                        : ""
                    } ${
                      selectedSociety?.id === society.id ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <FiMapPin
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          selectedSociety?.id === society.id
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm truncate ${
                            selectedSociety?.id === society.id
                              ? "text-green-700"
                              : "text-gray-900"
                          }`}
                        >
                          {society.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {society.area}, Ahmedabad • {society.pincode}
                        </p>
                        {!society.deliveryAvailable && (
                          <p className="text-xs text-red-600 font-semibold mt-1">
                            Delivery not available
                          </p>
                        )}
                      </div>
                      {selectedSociety?.id === society.id && (
                        <IoCheckmarkCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {errors.society && (
        <p className="text-red-500 text-sm mt-1">{errors.society}</p>
      )}
    </div>
  );
};

// 9. CheckoutModal Component (UPDATED)
// Add this new component for displaying saved address
const SavedAddressDisplay = ({
  address,
  society,
  onEdit,
  onUseNewAddress,
}: {
  address: any;
  society: Society | null;
  onEdit: () => void;
  onUseNewAddress: () => void;
}) => (
  <div className="space-y-4">
    {/* Selected Address Card */}
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FiMapPin className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Last Used Address
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Your previous delivery address
            </p>
          </div>
        </div>
        <IoCheckmarkCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
      </div>

      <div className="bg-white rounded-lg p-4 border border-green-200">
        <div className="flex items-start gap-3 mb-3">
          <FiHome className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-gray-900 capitalize text-sm mb-1">
              {address.addressType || "Home"} Address
            </p>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">{address.fullName}</p>
              <p>{address.phone}</p>
              {address.email && <p className="text-xs">{address.email}</p>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-2 text-sm text-gray-600">
          <p>
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>
          <p className="font-semibold text-green-700">
            {society?.name || address.societyName},{" "}
            {society?.area || address.societyArea}
          </p>
          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 py-2.5 px-4 bg-white border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all active:scale-95"
        >
          <FiMapPin className="inline mr-2 w-4 h-4" />
          Edit Address
        </button>
        <button
          onClick={onUseNewAddress}
          className="flex-1 py-2.5 px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all active:scale-95"
        >
          <FiPlus className="inline mr-2 w-4 h-4" />
          Use New Address
        </button>
      </div>
    </div>

    {/* Quick Info */}
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <FiTruck className="text-green-600 w-4 h-4 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Ready for Delivery
          </p>
          <p className="text-xs text-gray-600 mt-0.5">
            Your order will be delivered to this address within 60 minutes
          </p>
        </div>
      </div>
    </div>
  </div>
);

const fetchLastOrder = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/orders?page=1&limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (
      result.status === "success" &&
      result.data?.data &&
      result.data.data.length > 0
    ) {
      return {
        success: true,
        order: result.data.data[0],
      };
    }

    return {
      success: false,
      order: null,
    };
  } catch (error) {
    console.error("Fetch last order error:", error);
    return {
      success: false,
      order: null,
      error: error,
    };
  }
};

// Helper function to find society from address
const findSocietyFromAddress = (address: any): Society | null => {
  if (!address?.societyName) return null;

  const society = STATIC_SOCIETIES.find(
    (s) =>
      s.name.toLowerCase() === address.societyName.toLowerCase() &&
      s.area.toLowerCase() === address.societyArea.toLowerCase() &&
      s.pincode === address.societyPincode
  );

  return society || null;
};

// Component to display saved address
const SavedAddressCard = ({
  address,
  society,
  onEdit,
}: {
  address: any;
  society: Society | null;
  onEdit: () => void;
}) => (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 lg:p-5 border-2 border-green-300">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
          <FiMapPin className="text-white w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm lg:text-base">
            Default Delivery Address
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">From your last order</p>
        </div>
      </div>
      <IoCheckmarkCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
    </div>

    <div className="bg-white rounded-lg p-3 lg:p-4 border border-green-200">
      <div className="flex items-start gap-3 mb-3">
        <FiHome className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-gray-900 capitalize text-sm mb-1">
            {address.addressType || "Home"} Address
          </p>
          <div className="space-y-1 text-xs lg:text-sm text-gray-600">
            <p className="font-semibold text-gray-900">{address.fullName}</p>
            <p>{address.phone}</p>
            {address.email && <p className="text-xs">{address.email}</p>}
          </div>
        </div>
        <button
          onClick={onEdit}
          className="p-2 hover:bg-green-100 rounded-lg transition-colors active:scale-95"
          title="Edit address"
        >
          <FiEdit2 className="w-4 h-4 text-green-600" />
        </button>
      </div>

      <div className="border-t border-gray-200 pt-3 space-y-1 lg:space-y-2 text-xs lg:text-sm text-gray-600">
        <p>
          {address.addressLine1}
          {address.addressLine2 && `, ${address.addressLine2}`}
        </p>
        <p className="font-semibold text-green-700">
          {address.societyName}, {address.societyArea}
        </p>
        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>
      </div>
    </div>
  </div>
);
// 9. CheckoutModal Component (UPDATED WITH ADDRESS DISPLAY MODE)
const CheckoutModal = ({
  isOpen,
  onClose,
  cartData,
  appliedCoupon,
}: {
  isOpen: boolean;
  onClose: (orderSuccess: boolean) => void;
  cartData: CartData;
  appliedCoupon: AppliedCoupon | null;
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "",
    addressType: "home",
  });
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSocietyDropdown, setShowSocietyDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Address management states
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [hasLoadedAddress, setHasLoadedAddress] = useState(false);

  const router = useRouter();
  const user = useAppSelector(selectUser);

  // Load last order address when modal opens
  useEffect(() => {
    const loadDefaultAddress = async () => {
      if (!isOpen || hasLoadedAddress || !user?.user?.user_id) return;

      setIsLoadingAddress(true);

      try {
        const result = await fetchLastOrder(user.user.user_id);

        if (result.success && result.order?.Address) {
          const address = result.order.Address;

          // Find matching society
          const matchedSociety = findSocietyFromAddress(address);

          // Set default address
          setDefaultAddress(address);

          // Also set form data in background (for editing)
          setFormData({
            fullName: address.fullName || "",
            phone: address.phone || "",
            email: address.email || "",
            addressLine1: address.addressLine1 || "",
            addressLine2: address.addressLine2 || "",
            city: address.city || "Ahmedabad",
            state: address.state || "Gujarat",
            pincode: address.pincode || "",
            addressType: address.addressType || "home",
          });

          if (matchedSociety) {
            setSelectedSociety(matchedSociety);
          }

          // Show saved address, not form
          setShowAddressForm(false);

          // toast.success("Default address loaded", {
          //   icon: "📍",
          //   duration: 2000,
          // });
        } else {
          // No previous order - show form directly
          setShowAddressForm(true);
        }

        setHasLoadedAddress(true);
      } catch (error) {
        console.error("Error loading address:", error);
        setShowAddressForm(true);
        setHasLoadedAddress(true);
      } finally {
        setIsLoadingAddress(false);
      }
    };

    loadDefaultAddress();
  }, [isOpen, hasLoadedAddress, user]);

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setHasLoadedAddress(false);
      setShowAddressForm(false);
      setDefaultAddress(null);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: any = {};
    if (!selectedSociety) newErrors.society = "Please select a society";
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim() || formData.phone.length !== 10)
      newErrors.phone = "Valid 10-digit phone required";
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address is required";
    if (!formData.pincode.trim() || formData.pincode.length !== 6)
      newErrors.pincode = "Valid 6-digit pincode required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEditAddress = () => {
    setShowAddressForm(true);
    // toast.info("Edit your address", { icon: "✏️", duration: 2000 });
  };

  const handleAddNewAddress = () => {
    // Clear form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "",
      addressType: "home",
    });
    setSelectedSociety(null);
    setShowAddressForm(true);
    // toast.info("Add new delivery address", { icon: "➕", duration: 2000 });
  };

  const handleCancelAddressEdit = () => {
    if (defaultAddress) {
      // Restore default address data
      setFormData({
        fullName: defaultAddress.fullName || "",
        phone: defaultAddress.phone || "",
        email: defaultAddress.email || "",
        addressLine1: defaultAddress.addressLine1 || "",
        addressLine2: defaultAddress.addressLine2 || "",
        city: defaultAddress.city || "Ahmedabad",
        state: defaultAddress.state || "Gujarat",
        pincode: defaultAddress.pincode || "",
        addressType: defaultAddress.addressType || "home",
      });

      const matchedSociety = findSocietyFromAddress(defaultAddress);
      if (matchedSociety) {
        setSelectedSociety(matchedSociety);
      }

      setShowAddressForm(false);
      toast.success("Using default address", { icon: "📍", duration: 2000 });
    }
  };

  const handleNext = () => {
    // If using default address (not showing form)
    if (defaultAddress && !showAddressForm) {
      setStep(2);
      toast.success("Proceed to review your order", { icon: "✅" });
      return;
    }

    // If showing form, validate it
    if (step === 1 && validateForm()) {
      setStep(2);
      toast.success("Proceed to review your order", { icon: "✅" });
    } else if (step === 1) {
      toast.error("Please fill all required fields", { icon: "⚠️" });
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Placing your order...");

    // Determine which address to use
    const addressToUse =
      defaultAddress && !showAddressForm
        ? defaultAddress
        : {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email || "",
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2 || "",
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            addressType: formData.addressType,
            societyName: selectedSociety?.name || "",
            societyArea: selectedSociety?.area || "",
            societyPincode: selectedSociety?.pincode || "",
            isDeliveryAvailable: selectedSociety?.deliveryAvailable || false,
          };

    const orderPayload = {
      user_id: user?.user?.user_id,
      coupon_id: appliedCoupon?.couponId || null,
      totalAmount: parseFloat(cartData.subtotal.toFixed(2)),
      discount: parseFloat(cartData.discount.toFixed(2)),
      shippingCost: parseFloat(cartData.shipping.toFixed(2)),
      grandTotal: parseFloat(cartData.total.toFixed(2)),
      items: cartData.items.map((item) => ({
        product_id: item.id,
        variant_id: item.variant_id || null,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
        total: parseFloat((item.price * item.quantity).toFixed(2)),
      })),
      Address: addressToUse,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paymentMethod: "COD",
    };

    try {
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (response.ok && (data.success || data.status === "success")) {
        const orderId = data.orderId || data.data?.id || data.id || "N/A";

        toast.success(
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-green-500 text-2xl flex-shrink-0" />
              <span className="font-bold text-lg">
                Order Placed Successfully!
              </span>
            </div>
          </div>,
          {
            duration: 5000,
            style: {
              background: "#f0fdf4",
              color: "#166534",
              border: "2px solid #22c55e",
              padding: "16px",
              maxWidth: "500px",
            },
          }
        );

        setTimeout(() => onClose(true), 1500);
      } else {
        const errorList: string[] = [];
        if (data.message) errorList.push(data.message);
        if (data.error) errorList.push(data.error);

        if (data.errors) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((err: any) => errorList.push(String(err)));
          } else if (typeof data.errors === "object") {
            Object.keys(data.errors).forEach((key) => {
              const val = data.errors[key];
              if (Array.isArray(val)) {
                errorList.push(`${key}: ${val.join(", ")}`);
              } else {
                errorList.push(`${key}: ${val}`);
              }
            });
          }
        }

        if (errorList.length === 0) errorList.push("Failed to place order");
        const uniqueErrors = Array.from(new Set(errorList));

        toast.error(
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">Order Failed</span>
            <ul className="list-disc pl-4 text-sm space-y-1">
              {uniqueErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-600 mt-1">Please try again</p>
          </div>,
          {
            duration: 5000,
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "2px solid #ef4444",
              padding: "16px",
            },
          }
        );
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        <div className="flex flex-col gap-2">
          <span className="font-bold text-base">Network Error</span>
          <p className="text-sm">Could not connect to the server</p>
          <p className="text-xs text-gray-600">
            Please check your internet connection
          </p>
        </div>,
        {
          duration: 4000,
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "2px solid #ef4444",
            padding: "16px",
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isStep1Valid =
    defaultAddress && !showAddressForm
      ? true
      : selectedSociety &&
        formData.fullName.trim() &&
        formData.phone.trim().length === 10 &&
        formData.addressLine1.trim() &&
        formData.pincode.trim().length === 6;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => onClose(false)}
      />

      <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center pointer-events-none">
        <div
          className="bg-white w-full lg:max-w-2xl lg:rounded-2xl max-h-[90vh] lg:max-h-[85vh] overflow-hidden pointer-events-auto flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {step === 1 && "Delivery Address"}
                  {step === 2 && "Review & Confirm"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">Step {step} of 2</p>
              </div>
            </div>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2 px-4 lg:px-6 py-3 bg-gray-50 flex-shrink-0">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Loading Overlay */}
          {isLoadingAddress && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-gray-700">
                  Loading address...
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <div className="p-4 lg:p-6 space-y-4">
                {/* Show Default Address or Form */}
                {defaultAddress && !showAddressForm ? (
                  <>
                    {/* Saved Address Display */}
                    <SavedAddressCard
                      address={defaultAddress}
                      society={selectedSociety}
                      onEdit={handleEditAddress}
                    />

                    {/* Add New Address Button */}
                    <button
                      onClick={handleAddNewAddress}
                      className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-green-700 font-semibold active:scale-98"
                    >
                      <FiPlus className="w-5 h-5" />
                      Add New Delivery Address
                    </button>

                    {/* Quick Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <FiTruck className="text-green-600 w-4 h-4 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Ready for Delivery
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Your order will be delivered within 60 minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Address Form
                  <div className="space-y-4">
                    {/* Back button if editing default address */}
                    {defaultAddress && showAddressForm && (
                      <button
                        onClick={handleCancelAddressEdit}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        Use Default Address
                      </button>
                    )}

                    {/* Address Type */}
                    <div className="flex gap-2">
                      {(["home", "work", "other"] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              addressType: type,
                            }))
                          }
                          className={`flex-1 py-2.5 px-4 rounded-lg border-2 font-semibold capitalize transition-all active:scale-95 ${
                            formData.addressType === type
                              ? "border-green-600 bg-green-50 text-green-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <FiHome className="inline mr-2 w-4 h-4" />
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Society Selector */}
                    <SocietySelector
                      selectedSociety={selectedSociety}
                      setSelectedSociety={setSelectedSociety}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      showSocietyDropdown={showSocietyDropdown}
                      setShowSocietyDropdown={setShowSocietyDropdown}
                      errors={errors}
                      setErrors={setErrors}
                    />

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all text-sm ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-200 focus:border-green-600"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="10-digit number"
                          maxLength={10}
                          className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all text-sm ${
                            errors.phone
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-200 focus:border-green-600"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-green-600 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        House/Flat No, Building Name *
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="e.g., Flat 301, Tower A"
                        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all text-sm ${
                          errors.addressLine1
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-200 focus:border-green-600"
                        }`}
                      />
                      {errors.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.addressLine1}
                        </p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="e.g., Near Metro Station"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-green-600 transition-all text-sm"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        maxLength={6}
                        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all text-sm ${
                          errors.pincode
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-200 focus:border-green-600"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>

                    {/* Info Banner */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-green-600 w-4 h-4 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Delivering to Ahmedabad, Gujarat
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            Selected areas in Ahmedabad
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: REVIEW */}
            {step === 2 && (
              <div className="p-4 lg:p-6 space-y-4">
                {/* Address Summary */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base">
                      Delivering to{" "}
                      {defaultAddress && !showAddressForm
                        ? defaultAddress.addressType
                        : formData.addressType}
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-green-600 text-sm font-semibold hover:text-green-700 active:scale-95"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {defaultAddress && !showAddressForm ? (
                      <>
                        <p className="font-semibold text-gray-900">
                          {defaultAddress.fullName}
                        </p>
                        <p>{defaultAddress.phone}</p>
                        <p>
                          {defaultAddress.addressLine1}
                          {defaultAddress.addressLine2 &&
                            `, ${defaultAddress.addressLine2}`}
                        </p>
                        <p className="font-semibold text-green-700">
                          {defaultAddress.societyName},{" "}
                          {defaultAddress.societyArea}
                        </p>
                        <p>
                          {defaultAddress.city}, {defaultAddress.state} -{" "}
                          {defaultAddress.pincode}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-900">
                          {formData.fullName}
                        </p>
                        <p>{formData.phone}</p>
                        <p>
                          {formData.addressLine1}
                          {formData.addressLine2 &&
                            `, ${formData.addressLine2}`}
                        </p>
                        <p className="font-semibold text-green-700">
                          {selectedSociety?.name}, {selectedSociety?.area}
                        </p>
                        <p>Ahmedabad, Gujarat - {formData.pincode}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Payment Method - COD */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <IoCashOutline className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">
                          Payment Method
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Cash on Delivery
                        </p>
                      </div>
                    </div>
                    <IoCheckmarkCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                        <IoCashOutline className="text-green-600 text-lg" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Pay ₹{cartData.total.toFixed(2)} when delivered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">
                    Order Summary ({cartData.items.length} items)
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                    {cartData.items.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-sm">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 text-sm">
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    {cartData.items.length > 3 && (
                      <p className="text-sm text-gray-500 text-center pt-2">
                        +{cartData.items.length - 3} more items
                      </p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ₹{cartData.subtotal.toFixed(2)}
                      </span>
                    </div>
                    {cartData.discount > 0 && (
                      <div className="flex justify-between text-green-700">
                        <span>Discount</span>
                        <span className="font-semibold">
                          -₹{cartData.discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span
                        className={`font-semibold ${
                          cartData.shipping === 0
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {cartData.shipping === 0
                          ? "FREE"
                          : `₹${cartData.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-bold text-gray-900">
                        Total (COD)
                      </span>
                      <span className="font-black text-green-600 text-lg">
                        ₹{cartData.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <FiTruck className="text-green-600 w-5 h-5" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        Expected Delivery
                      </p>
                      <p className="text-sm text-gray-600">within 60 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 lg:p-6 flex-shrink-0 bg-white">
            {step === 1 ? (
              <button
                onClick={handleNext}
                disabled={!isStep1Valid || isLoadingAddress}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-green-600/30 active:scale-98"
              >
                Continue to Review
                <FiChevronRight className="inline ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-300 shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 active:scale-98"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <IoCashOutline className="w-5 h-5" />
                    <span className="text-sm lg:text-base">
                      Place Order (Pay ₹{cartData.total.toFixed(2)} on Delivery)
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== MAIN COMPONENT ====================
const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalofcart = useSelector(selectCartTotal);
  const router = useRouter();

  const [promoCode, setPromoCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // --- Shipping Logic ---
  const subtotal = totalofcart;
  const shipping = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const discount = appliedCoupon?.discountAmount || 0;
  const total = subtotal - discount + shipping;

  // Update quantity (MODIFIED FOR REMOVE ON ZERO)
  const updatequantity = (id: string, selectedSize: string, change: number) => {
    const item = cartItems.find(
      (i: any) => i.id === id && i.selectedSize === selectedSize
    );
    if (item) {
      const newQuantity = item.quantity + change;

      // If new quantity is 0 or less, remove item
      if (newQuantity <= 0) {
        dispatch(removeFromCart({ id, selectedSize }));
        // toast.success("Removed from cart", { icon: "🗑️", duration: 2000 });
      } else {
        // Otherwise update quantity
        dispatch(
          updateQuantity({
            id,
            selectedSize,
            quantity: newQuantity,
          })
        );
        // toast.success("Quantity updated", {
        //   icon: change > 0 ? "➕" : "➖",
        //   duration: 1500,
        // });
      }
    }
  };

  // Remove item
  const removeItem = (id: string, selectedSize: string) => {
    dispatch(removeFromCart({ id, selectedSize }));
    toast.success("Removed from cart", { icon: "🗑️", duration: 2000 });
  };

  // Apply promo code
  const applyPromocode = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code", { icon: "⚠️" });
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Validating promo code...");

    try {
      const response = await fetch(
        `${BASE_URL}/api/cupon/${promoCode}/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderValue: subtotal,
            userId: "89c03353-6c44-443a-80fa-cf79da22d2db",
          }),
        }
      );
      const data = await response.json();

      toast.dismiss(loadingToast);

      if (response.ok && data.status === "success" && data.data) {
        setAppliedCoupon({
          code: promoCode,
          couponId: data.data.coupon?.id,
          type: data.data.coupon?.type,
          value: data.data.coupon?.value,
          discountAmount: data.data.discountAmount,
          finalAmount: data.data.finalAmount,
        });
        setShowPromoInput(false);

        const discountText =
          data.data.coupon?.type === "FIXED"
            ? `₹${data.data.coupon?.value}`
            : `${data.data.coupon?.value}%`;
        toast.success(`Promo code applied! You saved ${discountText}`, {
          icon: "🎉",
          duration: 3000,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #22c55e",
          },
        });
      } else {
        console.log("error is coming", data);
        // ========== ERROR HANDLING START ==========
        const errorList: string[] = [];
        // 1. Check top-level message/error
        if (data.message) errorList.push(data.message);
        if (data.error) errorList.push(data.error);

        // 2. Check nested 'errors' object or array
        if (data.errors) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((err: any) => errorList.push(String(err)));
          } else if (typeof data.errors === "object") {
            Object.keys(data.errors).forEach((key) => {
              const val = data.errors[key];
              if (Array.isArray(val)) {
                errorList.push(`${key}: ${val.join(", ")}`);
              } else {
                errorList.push(`${key}: ${val}`);
              }
            });
          }
        }

        // 3. Fallback
        if (errorList.length === 0)
          errorList.push("Invalid promo code or criteria not met");

        // 4. Remove duplicates
        const uniqueErrors = Array.from(new Set(errorList));

        toast.error(
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm">Action Failed</span>
            <ul className="list-disc pl-4 text-xs space-y-0.5">
              {uniqueErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>,
          {
            icon: "❌",
            duration: 4000,
          }
        );
        // ========== ERROR HANDLING END ==========
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to validate promo code", { icon: "⚠️" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckoutClick = () => setShowCheckoutModal(true);

  const handleModalClose = (orderSuccess: boolean) => {
    setShowCheckoutModal(false);
    // Only clear cart when order is successfully placed
    if (orderSuccess) {
      dispatch(clearCart());
      setAppliedCoupon(null);
      router.push("/orders");
    }
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return <EmptyCart router={router} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{cartItems.length} items</p>
          </div>
          <div className="p-2 rounded-lg bg-green-50 text-green-600">
            <FiShoppingCart className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 lg:pt-24 pb-20 lg:pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6 lg:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  Shopping Cart
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  {cartItems.length} items in your cart
                </p>
              </div>
              <button
                onClick={() => router.push("/shop")}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg lg:rounded-xl hover:bg-gray-50 transition-colors active:scale-95"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">
                  Continue Shopping
                </span>
              </button>
            </div>
          </div>

          {/* Free Delivery Banner */}
          <FreeDeliveryBanner subtotal={subtotal} />

          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-3 lg:space-y-4">
                {cartItems.map((item: any, index: number) => (
                  <CartItemComponent
                    key={index}
                    item={item}
                    onUpdateQuantity={updatequantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <PromoCodeSection
                    promoCode={promoCode}
                    setPromoCode={setPromoCode}
                    showPromoInput={showPromoInput}
                    setShowPromoInput={setShowPromoInput}
                    appliedCoupon={appliedCoupon}
                    setAppliedCoupon={setAppliedCoupon}
                    applyPromocode={applyPromocode}
                    isProcessing={isProcessing}
                  />

                  {/* Price Breakdown */}
                  <PriceBreakdown
                    cartItems={cartItems}
                    subtotal={subtotal}
                    discount={discount}
                    shipping={shipping}
                    total={total}
                  />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <CheckoutButton
                    onClick={handleCheckoutClick}
                    disabled={isProcessing}
                    total={total}
                  />

                  <TrustBadges />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div className="lg:hidden mt-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <PromoCodeSection
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                showPromoInput={showPromoInput}
                setShowPromoInput={setShowPromoInput}
                appliedCoupon={appliedCoupon}
                setAppliedCoupon={setAppliedCoupon}
                applyPromocode={applyPromocode}
                isProcessing={isProcessing}
              />

              {/* Price Summary */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700 mb-2">
                    <span className="text-sm">Discount</span>
                    <span className="font-bold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Shipping</span>
                  <span
                    className={`font-bold ${
                      shipping === 0 ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Total (COD)</p>
                    <p className="text-2xl font-black text-gray-900">
                      ₹{total.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={handleCheckoutClick}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-300 shadow-lg shadow-green-600/30 active:scale-95"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <Footer />

      {/* Mobile Bottom Footer */}
      <MobileBottomFooter />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={handleModalClose}
        cartData={{
          items: cartItems,
          subtotal,
          discount,
          shipping,
          total,
        }}
        appliedCoupon={appliedCoupon}
      />

      {/* Global Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ShoppingCartPage;
