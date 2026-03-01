// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Image from "next/image";

// // Custom debounce hook with proper cleanup
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// const Header = () => {
//   // State management
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cartItems, setCartItems] = useState([
//     {
//       id: "strawberries",
//       name: "fresh Strawberries",
//       price: 2.99,
//       unit: "1 lb",
//       quantity: 2,
//       image:
//         "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
//     },
//     {
//       id: "avocados",
//       name: "Hass Avocados",
//       price: 1.79,
//       unit: "each",
//       quantity: 3,
//       image:
//         "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
//     },
//   ]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalResults, setTotalResults] = useState(0);
//   const [hasSearched, setHasSearched] = useState(false);

//   const profileRef = useRef(null);
//   const abortControllerRef = useRef(null);
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   const ITEMS_PER_PAGE = 10;

//   // Search API call with debouncing and abort controller
//   useEffect(() => {
//     const performSearch = async () => {
//       // Cancel previous request if exists
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }

//       if (debouncedSearchTerm.length === 0) {
//         setSearchResults([]);
//         setTotalResults(0);
//         setTotalPages(0);
//         setCurrentPage(1);
//         setHasSearched(false);
//         return;
//       }

//       // Create new abort controller for this request
//       abortControllerRef.current = new AbortController();

//       setIsSearching(true);
//       setError(null);
//       setHasSearched(true);

//       try {
//         const response = await axios.get(
//           `http://NEXT_PUBLIC_BACKEND_BASE_URL/api/products?search=${encodeURIComponent(
//             debouncedSearchTerm
//           )}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
//           {
//             signal: abortControllerRef.current.signal,
//           }
//         );

//         if (response.data.status === "success") {
//           const searchData =
//             response.data.data?.data?.data || response.data.data?.data || [];
//           const pagination =
//             response.data.data?.data?.pagination ||
//             response.data.data?.pagination ||
//             {};

//           setSearchResults(searchData);
//           setTotalResults(pagination.total || searchData.length);
//           setTotalPages(pagination.totalPages || 1);
//         } else {
//           setSearchResults([]);
//           setTotalResults(0);
//           setTotalPages(0);
//         }
//       } catch (err) {
//         if (err.name === "CanceledError") {
//           console.log("Request canceled");
//         } else {
//           console.error("Search error:", err);
//           setError("Failed to search products");
//           setSearchResults([]);
//           setTotalResults(0);
//           setTotalPages(0);
//         }
//       } finally {
//         setIsSearching(false);
//       }
//     };

//     performSearch();

//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, [debouncedSearchTerm, currentPage]);

//   // Functions
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const openSearch = () => {
//     setIsSearchOpen(true);
//     setCurrentPage(1);
//     setHasSearched(false);
//   };

//   const closeSearch = () => {
//     setIsSearchOpen(false);
//     setSearchTerm("");
//     setSearchResults([]);
//     setCurrentPage(1);
//     setTotalResults(0);
//     setTotalPages(0);
//     setHasSearched(false);
//   };

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const handleLogout = () => {
//     console.log("Logging out...");
//     setIsProfileOpen(false);
//   };

//   const handleSearchInput = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const updateQuantity = (itemId, change) => {
//     setCartItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === itemId
//             ? { ...item, quantity: Math.max(0, item.quantity + change) }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

//   const getTotalItems = () => {
//     return cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   // Keyboard event listener
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         if (isSearchOpen) closeSearch();
//         if (isMobileMenuOpen) closeMobileMenu();
//         if (isCartOpen) setIsCartOpen(false);
//         if (isProfileOpen) setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isSearchOpen, isMobileMenuOpen, isCartOpen, isProfileOpen]);

//   // Click outside profile dropdown to close
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-gray-50 font-sans">
//       {/* Enhanced CSS Styles */}
//       <style jsx global>{`
//         :root {
//           --primary: #16a34a;
//           --primary-dark: #15803d;
//           --primary-light: #22c55e;
//         }

//         .glass-effect {
//           backdrop-filter: blur(10px);
//           background: rgba(255, 255, 255, 0.95);
//         }

//         .product-card {
//           transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           border: 1px solid transparent;
//         }

//         .product-card:hover {
//           transform: translateY(-8px) scale(1.02);
//           box-shadow: 0 20px 40px -12px rgba(22, 163, 74, 0.15);
//           border-color: rgba(22, 163, 74, 0.2);
//         }

//         @media (max-width: 768px) {
//           .product-card:hover {
//             transform: translateY(-4px) scale(1.01);
//           }
//         }

//         .gradient-green {
//           background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
//         }

//         .add-to-cart-btn {
//           background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
//           transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//         }

//         .add-to-cart-btn:hover {
//           background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(22, 163, 74, 0.3);
//         }

//         @media (max-width: 768px) {
//           .add-to-cart-btn:hover {
//             transform: translateY(-1px);
//           }
//         }

//         .nav-link {
//           position: relative;
//           transition: all 0.3s ease;
//         }

//         .nav-link::after {
//           content: "";
//           position: absolute;
//           width: 0;
//           height: 2px;
//           bottom: -4px;
//           left: 50%;
//           background: linear-gradient(90deg, #16a34a, #22c55e);
//           transition: all 0.3s ease;
//           transform: translateX(-50%);
//         }

//         .nav-link:hover::after {
//           width: 100%;
//         }

//         .animate-fade-in {
//           animation: fadeIn 0.4s ease-out forwards;
//         }

//         .animate-slide-up {
//           animation: slideUp 0.4s ease-out forwards;
//         }

//         .animate-slide-down {
//           animation: slideDown 0.3s ease-out forwards;
//         }

//         .profile-dropdown {
//           animation: dropdownSlide 0.2s ease-out forwards;
//         }

//         @keyframes fadeIn {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideUp {
//           0% {
//             transform: translateY(10px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes slideDown {
//           0% {
//             transform: translateY(-10px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes dropdownSlide {
//           0% {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       {/* Enhanced Header */}
//       <header className="glass-effect shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
//         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo Section */}
//             <Link
//               href="/"
//               className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer"
//             >
//               <div className="relative w-10 h-10 lg:w-16 lg:h-16 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
//                 <Image
//                   src="/logo3.png"
//                   alt="Fresh Bucket Logo"
//                   fill
//                   className="object-contain"
//                   priority
//                 />
//               </div>
//               <div>
//                 <h1 className="text-lg lg:text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors duration-200">
//                   Fresh Bucket
//                 </h1>
//                 <p className="text-xs text-green-600 font-bold leading-tight opacity-80 hidden sm:block">
//                   Fresh • Fast • Quality
//                 </p>
//               </div>
//             </Link>

//             {/* Desktop Navigation Links */}
//             <div className="hidden lg:flex items-center space-x-8">
//               <Link
//                 href="/home"
//                 className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/product"
//                 className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
//               >
//                 Products
//               </Link>
//               <Link
//                 href="/about"
//                 className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className="nav-link relative text-gray-700 hover:text-green-600 font-semibold py-2 transition-all duration-300"
//               >
//                 Contact
//               </Link>
//             </div>

//             {/* Right Side Icons */}
//             <div className="flex items-center space-x-1 lg:space-x-2">
//               {/* Search Button */}
//               <div className="relative">
//                 <button
//                   onClick={openSearch}
//                   className="relative p-2 lg:p-3 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group"
//                 >
//                   <svg
//                     className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full animate-pulse hidden lg:block"></div>
//                 </button>
//               </div>

//               {/* Wishlist Button */}
//               <div className="relative hidden sm:block">
//                 <Link href="/wishlist">
//                   <button className="relative p-2 lg:p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-200 group">
//                     <svg
//                       className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                       />
//                     </svg>
//                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
//                       2
//                     </div>
//                   </button>
//                 </Link>
//               </div>

//               {/* Cart Button */}
//               <div className="relative">
//                 <Link href="/cart">
//                   <button className="relative p-2 lg:p-3 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group">
//                     <svg
//                       className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                     <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
//                       {getTotalItems()}
//                     </div>
//                   </button>
//                 </Link>
//               </div>

//               {/* Profile Button */}
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={toggleProfile}
//                   className="relative p-2 lg:p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 group"
//                 >
//                   <svg
//                     className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                   </svg>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
//                     <div className="py-2">
//                       <Link href="/orders">
//                         <button
//                           onClick={() => setIsProfileOpen(false)}
//                           className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 text-left"
//                         >
//                           <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                             />
//                           </svg>
//                           <span className="font-semibold">Orders</span>
//                         </button>
//                       </Link>
//                       <div className="border-t border-gray-100"></div>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-left"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                           />
//                         </svg>
//                         <span className="font-semibold">Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 rounded-xl hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 group"
//               >
//                 <svg
//                   className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* Quick Action Bar */}
//         <div className="bg-green-50 border-t border-green-100 py-2">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center space-x-3 lg:space-x-6">
//                 <div className="flex items-center space-x-1 text-green-600 font-medium">
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <span className="hidden sm:inline">Delivery in 60 mins</span>
//                   <span className="sm:hidden">60 min delivery</span>
//                 </div>
//                 <div className="flex items-center space-x-1 text-gray-600 hidden sm:flex">
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                   </svg>
//                   <span className="hidden lg:inline">Ahmedabad, India</span>
//                   <span className="lg:hidden">AHM 380001</span>
//                 </div>
//               </div>
//               <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
//                 <span>🔥 Free delivery on orders ₹999+</span>
//                 <span className="hidden lg:inline">|</span>
//                 <span className="hidden lg:inline">
//                   💰 Best prices guaranteed
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
//           onClick={toggleMobileMenu}
//         >
//           <div
//             className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative w-12 h-12 flex-shrink-0 bg-white/10 rounded-xl p-1.5 backdrop-blur-sm">
//                     <Image
//                       src="/logo.png"
//                       alt="Fresh Bucket Logo"
//                       fill
//                       className="object-contain"
//                     />
//                   </div>
//                   <div>
//                     <h2 className="font-black text-xl">Fresh Bucket</h2>
//                     <p className="text-white/80 text-sm">
//                       Fresh • Fast • Quality
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={toggleMobileMenu}
//                   className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
//                 >
//                   <svg
//                     className="w-6 h-6 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="mt-4 pt-4 border-t border-white/20">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">J</span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white">John Doe</p>
//                     <p className="text-white/70 text-sm">
//                       john.doe@example.com
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <nav className="p-6">
//               <div className="space-y-2">
//                 {[
//                   {
//                     href: "/home",
//                     icon: "🏠",
//                     label: "Home",
//                     color: "bg-green-100",
//                   },
//                   {
//                     href: "/product",
//                     icon: "📦",
//                     label: "Products",
//                     color: "bg-blue-100",
//                   },
//                   {
//                     href: "/about",
//                     icon: "ℹ️",
//                     label: "About",
//                     color: "bg-purple-100",
//                   },
//                   {
//                     href: "/offers",
//                     icon: "💰",
//                     label: "Special Offers",
//                     color: "bg-red-100",
//                     badge: "HOT",
//                   },
//                   {
//                     href: "/contact",
//                     icon: "📞",
//                     label: "Contact Us",
//                     color: "bg-orange-100",
//                   },
//                 ].map((item, index) => (
//                   <Link
//                     key={index}
//                     href={item.href}
//                     onClick={closeMobileMenu}
//                     className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                   >
//                     <div
//                       className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200`}
//                     >
//                       <span className="text-lg">{item.icon}</span>
//                     </div>
//                     <div className="flex items-center justify-between flex-1">
//                       <span>{item.label}</span>
//                       {item.badge && (
//                         <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-bold">
//                           {item.badge}
//                         </span>
//                       )}
//                     </div>
//                   </Link>
//                 ))}
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
//                 <Link href="/wishlist">
//                   <button
//                     onClick={closeMobileMenu}
//                     className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                       />
//                     </svg>
//                     <span className="font-medium">Wishlist (2)</span>
//                   </button>
//                 </Link>

//                 <button
//                   onClick={() => {
//                     openSearch();
//                     closeMobileMenu();
//                   }}
//                   className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                   <span className="font-medium">Search Products</span>
//                 </button>

//                 <Link href="/cart">
//                   <button
//                     onClick={closeMobileMenu}
//                     className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                     <span className="font-medium">
//                       View Cart ({getTotalItems()} items)
//                     </span>
//                   </button>
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Full Page Search Overlay - ONLY SHOWS RESULTS AFTER SEARCH */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 bg-white z-50">
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
//             {/* Search Header */}
//             <div className="flex items-center justify-between mb-6 lg:mb-8">
//               <div className="animate-slide-down">
//                 <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-2">
//                   Search Fresh Bucket
//                 </h2>
//                 <p className="text-gray-600 text-sm lg:text-base">
//                   Find fresh groceries and daily essentials
//                 </p>
//               </div>
//               <button
//                 onClick={closeSearch}
//                 className="p-2 lg:p-3 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 group"
//               >
//                 <svg
//                   className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Search Input */}
//             <div className="relative mb-6 lg:mb-8 animate-slide-up">
//               <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 className="w-full pl-12 lg:pl-16 pr-16 lg:pr-20 py-4 lg:py-5 text-lg lg:text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-green-600 bg-gray-50/50 shadow-sm transition-all duration-300"
//                 placeholder="Search for products... (e.g., Sweet and juicy)"
//                 value={searchTerm}
//                 onChange={handleSearchInput}
//                 autoFocus
//               />
//               {isSearching && (
//                 <div className="absolute inset-y-0 right-12 flex items-center">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
//                 </div>
//               )}
//               <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
//                 <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
//                   ESC
//                 </kbd>
//               </div>
//             </div>

//             {/* Typing Indicator */}
//             {searchTerm !== debouncedSearchTerm && searchTerm.length > 0 && (
//               <div className="mb-4 text-center">
//                 <p className="text-sm text-gray-500 italic">
//                   Typing... (search will execute after you stop typing)
//                 </p>
//               </div>
//             )}

//             {/* Empty State - Show when search is not performed yet */}
//             {!hasSearched && !isSearching && (
//               <div className="text-center py-16 animate-fade-in">
//                 <div className="text-gray-400 mb-6">
//                   <svg
//                     className="w-24 h-24 mx-auto"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Start searching for products
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Type something in the search box above to find products
//                 </p>
//                 <div className="flex flex-wrap items-center justify-center gap-2">
//                   <span className="text-sm text-gray-500">Try searching:</span>
//                   <button
//                     onClick={() => setSearchTerm("Sweet and juicy")}
//                     className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
//                   >
//                     Sweet and juicy
//                   </button>
//                   <button
//                     onClick={() => setSearchTerm("fresh")}
//                     className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
//                   >
//                     fresh
//                   </button>
//                   <button
//                     onClick={() => setSearchTerm("Fresh")}
//                     className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
//                   >
//                     Fresh
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Loading State */}
//             {isSearching && (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Searching products...</p>
//               </div>
//             )}

//             {/* Error State */}
//             {error && !isSearching && hasSearched && (
//               <div className="text-center py-12">
//                 <div className="text-red-500 mb-4">
//                   <svg
//                     className="w-16 h-16 mx-auto"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="1"
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   Error occurred
//                 </h3>
//                 <p className="text-gray-600">{error}</p>
//               </div>
//             )}

//             {/* Search Results */}
//             {!isSearching && hasSearched && searchResults.length > 0 && (
//               <div className="animate-slide-up">
//                 <div className="flex items-center justify-between mb-4 lg:mb-6">
//                   <h3 className="text-lg lg:text-xl font-bold text-gray-900">
//                     Search Results
//                   </h3>
//                   <span className="text-gray-600 text-sm lg:text-base">
//                     {totalResults} results found (Page {currentPage} of{" "}
//                     {totalPages})
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
//                   {searchResults.map((product) => (
//                     <div
//                       key={product.id}
//                       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 relative product-card"
//                     >
//                       <Link href={`/productdetails/${product.id}`}>
//                         <div className="relative overflow-hidden aspect-[4/3]">
//                           <img
//                             src={
//                               product.images?.find((img) => img.isPrimary)
//                                 ?.url ||
//                               "https://via.placeholder.com/300x225?text=No+Image"
//                             }
//                             alt={product.name}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                           {product.inStock === "AVILABLE" && (
//                             <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
//                               In Stock
//                             </div>
//                           )}
//                         </div>
//                       </Link>

//                       <div className="p-4 lg:p-6">
//                         <h3 className="font-bold text-gray-900 mb-2 text-base lg:text-lg leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-2">
//                           {product.description}
//                         </p>

//                         {product.category && (
//                           <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mb-2">
//                             {product.category.name}
//                           </span>
//                         )}

//                         <div className="flex items-center justify-between mb-3 lg:mb-0">
//                           <div>
//                             <span className="text-xl lg:text-2xl font-black text-green-600">
//                               ₹{parseFloat(product.price).toFixed(2)}
//                             </span>
//                             {product.sku && (
//                               <p className="text-xs text-gray-500">
//                                 SKU: {product.sku}
//                               </p>
//                             )}
//                           </div>
//                           <span className="text-sm text-gray-500 font-medium">
//                             Stock: {product.stock}
//                           </span>
//                         </div>

//                         <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
//                           View Product
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-center space-x-2 mt-8">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                     >
//                       Previous
//                     </button>

//                     <div className="flex items-center space-x-2">
//                       {[...Array(totalPages)].map((_, index) => {
//                         const pageNum = index + 1;
//                         if (
//                           pageNum === 1 ||
//                           pageNum === totalPages ||
//                           (pageNum >= currentPage - 1 &&
//                             pageNum <= currentPage + 1)
//                         ) {
//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => handlePageChange(pageNum)}
//                               className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                                 currentPage === pageNum
//                                   ? "bg-green-600 text-white font-bold"
//                                   : "bg-gray-200 hover:bg-gray-300"
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         } else if (
//                           pageNum === currentPage - 2 ||
//                           pageNum === currentPage + 2
//                         ) {
//                           return <span key={pageNum}>...</span>;
//                         }
//                         return null;
//                       })}
//                     </div>

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* No Results Found */}
//             {!isSearching &&
//               hasSearched &&
//               debouncedSearchTerm === searchTerm &&
//               searchResults.length === 0 && (
//                 <div className="text-center py-12">
//                   <div className="text-gray-400 mb-4">
//                     <svg
//                       className="w-20 h-20 mx-auto"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1"
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     No products found for "{debouncedSearchTerm}"
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     Try searching with different keywords
//                   </p>
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
//                   >
//                     Clear Search
//                   </button>
//                 </div>
//               )}
//           </div>
//         </div>
//       )}

//       {/* Cart Sidebar */}
//       {isCartOpen && (
//         <div className="fixed inset-0 z-50">
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50"
//             onClick={toggleCart}
//           ></div>
//           <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white shadow-2xl">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
//                 <div>
//                   <h2 className="text-lg lg:text-xl font-black text-gray-900">
//                     Your Cart
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     {getTotalItems()} items
//                   </p>
//                 </div>
//                 <button
//                   onClick={toggleCart}
//                   className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
//                 {cartItems.length === 0 ? (
//                   <div className="text-center py-8">
//                     <div className="text-gray-400 mb-4">
//                       <svg
//                         className="w-16 h-16 mx-auto"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1"
//                           d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
//                         />
//                       </svg>
//                     </div>
//                     <p className="text-gray-500 font-medium">
//                       Your cart is empty
//                     </p>
//                     <button
//                       onClick={() => {
//                         toggleCart();
//                         openSearch();
//                       }}
//                       className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
//                     >
//                       Start Shopping
//                     </button>
//                   </div>
//                 ) : (
//                   cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center space-x-3 p-3 lg:p-4 bg-green-50 rounded-xl border border-green-100"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
//                       />
//                       <div className="flex-1">
//                         <h4 className="font-bold text-gray-900 text-sm lg:text-base">
//                           {item.name}
//                         </h4>
//                         <p className="text-xs lg:text-sm text-gray-600">
//                           {item.unit}
//                         </p>
//                         <div className="flex items-center space-x-2 mt-2">
//                           <button
//                             onClick={() => updateQuantity(item.id, -1)}
//                             className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
//                           >
//                             -
//                           </button>
//                           <span className="text-sm font-bold min-w-[20px] text-center">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() => updateQuantity(item.id, 1)}
//                             className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center text-sm font-bold"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-base lg:text-lg font-bold text-green-600">
//                           ₹{(item.price * item.quantity).toFixed(2)}
//                         </p>
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-xs text-red-500 hover:text-red-700"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               {cartItems.length > 0 && (
//                 <div className="border-t border-gray-200 p-4 lg:p-6 space-y-4 bg-gradient-to-r from-white to-gray-50">
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span className="font-bold">
//                         ₹{getTotalPrice().toFixed(2)}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span>Delivery</span>
//                       <span className="font-bold text-green-600">FREE</span>
//                     </div>
//                     <div className="flex items-center justify-between text-base lg:text-lg font-black border-t pt-2">
//                       <span>Total</span>
//                       <span className="text-green-600">
//                         ₹{getTotalPrice().toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                   <button className="w-full add-to-cart-btn text-white py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300">
//                     Proceed to Checkout
//                   </button>
//                   <p className="text-xs text-center text-gray-500">
//                     Free delivery on orders over ₹999
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;
"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { BASE_URL } from "@src/config/config";
import { useRouter } from "next/navigation";
import useAuth from "@src/hooks/useAuth";
import { ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartCount } from "@src/redux/reducers/authSlice";

// Custom debounce hook with proper cleanup
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Small Product Card Component for Search Results
const SearchProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-[#FAFCF8] rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-[#DCE5D6] hover:border-[#6AA84F] transition-all duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={
            product.images?.find((img) => img.isPrimary)?.url ||
            "https://via.placeholder.com/150?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.inStock === "AVILABLE" && (
          <div className="absolute top-1 right-1 bg-[#6AA84F] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
            In Stock
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-xs text-[#2F3E2C] line-clamp-1 group-hover:text-[#6AA84F] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs font-bold text-[#6AA84F] mt-1">
          ₹{parseFloat(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  // Auth state - only isLoggedIn parameter
  const { isLoggedIn } = useAuth();
  console.log("User is logged in:", isLoggedIn);

  // Get cart count from Redux - MUST BE AT TOP LEVEL
  const cartCount = useSelector(selectCartCount);

  // UI State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: "strawberries",
      name: "fresh Strawberries",
      price: 2.99,
      unit: "1 lb",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
    },
    {
      id: "avocados",
      name: "Hass Avocados",
      price: 1.79,
      unit: "each",
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
    },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const profileRef = useRef(null);
  const abortControllerRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();

  const ITEMS_PER_PAGE = 10;

  // Search API call with debouncing and abort controller
  useEffect(() => {
    const performSearch = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (debouncedSearchTerm.length === 0) {
        setSearchResults([]);
        setTotalResults(0);
        setTotalPages(0);
        setCurrentPage(1);
        setHasSearched(false);
        return;
      }

      abortControllerRef.current = new AbortController();

      setIsSearching(true);
      setError(null);
      setHasSearched(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/api/products?search=${encodeURIComponent(
            debouncedSearchTerm
          )}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            signal: abortControllerRef.current.signal,
          }
        );

        if (response.data.status === "success") {
          const searchData =
            response.data.data?.data?.data || response.data.data?.data || [];
          const pagination =
            response.data.data?.data?.pagination ||
            response.data.data?.pagination ||
            {};

          setSearchResults(searchData);
          setTotalResults(pagination.total || searchData.length);
          setTotalPages(pagination.totalPages || 1);
        } else {
          setSearchResults([]);
          setTotalResults(0);
          setTotalPages(0);
        }
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Request canceled");
        } else {
          console.error("Search error:", err);
          setError("Failed to search products");
          setSearchResults([]);
          setTotalResults(0);
          setTotalPages(0);
        }
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm, currentPage]);

  // Functions
  const openSearch = () => {
    setIsSearchOpen(true);
    setCurrentPage(1);
    setHasSearched(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    setCurrentPage(1);
    setTotalResults(0);
    setTotalPages(0);
    setHasSearched(false);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogin = () => {
    setIsProfileOpen(false);
    router.push("/login");
  };

  const handleSignup = () => {
    setIsProfileOpen(false);
    router.push("/signup");
  };

  const handleLogout = () => {
    console.log("Logging out...");

    setIsProfileOpen(false);
    localStorage.clear();

    window.location.href = "/";
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleProductClick = (productId) => {
    closeSearch(); // Close search modal first
    router.push(`/productdetails/${productId}`);
  };

  const updateQuantity = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isCartOpen) setIsCartOpen(false);
        if (isProfileOpen) setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isCartOpen, isProfileOpen]);

  // Click outside profile dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#F6F9F3] font-sans">
      {/* Fresh Buckets Color Palette CSS */}
      <style jsx global>{`
        :root {
          --primary-green: #2f3e2c;
          --fresh-leaf: #6aa84f;
          --tomato-red: #e84c3d;
          --bg-main: #f6f9f3;
          --bg-section: #e4eddf;
          --bg-card: #fafcf8;
          --text-primary: #2f3e2c;
          --text-secondary: #4a5a42;
          --yellow-corn: #f2c94c;
          --carrot-orange: #eb7a3d;
          --eggplant-purple: #7a3e8e;
          --border-light: #dce5d6;
          --border-dark: #7a8b70;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(250, 252, 248, 0.95);
          border-bottom: 2px solid var(--border-light);
        }

        .product-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid var(--border-light);
          background: var(--bg-card);
        }

        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(106, 168, 79, 0.25);
          border-color: var(--fresh-leaf);
        }

        @media (max-width: 768px) {
          .product-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }

        .gradient-green {
          background: linear-gradient(
            135deg,
            var(--fresh-leaf) 0%,
            #7bc05d 100%
          );
        }

        .gradient-red {
          background: linear-gradient(
            135deg,
            var(--tomato-red) 0%,
            #f15a4a 100%
          );
        }

        .add-to-cart-btn {
          background: linear-gradient(
            135deg,
            var(--tomato-red) 0%,
            #f15a4a 100%
          );
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(
            135deg,
            #d43d2d 0%,
            var(--tomato-red) 100%
          );
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(232, 76, 61, 0.4);
        }

        @media (max-width: 768px) {
          .add-to-cart-btn:hover {
            transform: translateY(-1px);
          }
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          color: var(--text-primary);
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 50%;
          background: linear-gradient(
            90deg,
            var(--fresh-leaf),
            var(--yellow-corn)
          );
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:hover {
          color: var(--fresh-leaf);
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .profile-dropdown {
          animation: dropdownSlide 0.2s ease-out forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes dropdownSlide {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Search Button Enhancement */
        @media (max-width: 640px) {
          .mobile-search-btn {
            padding: 8px;
            min-width: 40px;
            min-height: 40px;
          }

          .mobile-search-icon {
            width: 20px;
            height: 20px;
          }

          .mobile-search-text {
            display: none;
          }

          .mobile-search-full {
            display: flex;
            align-items: center;
            background: #e4eddf;
            border-radius: 8px;
            padding: 4px 8px;
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>

      {/* Enhanced Header with Fresh Buckets Colors */}
      <header className="glass-effect shadow-lg sticky top-0 z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-2 lg:space-x-3 group cursor-pointer"
            >
              <div className="relative w-10 h-10 lg:w-16 lg:h-16 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo3.png"
                  alt="Fresh Bucket Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-black text-[#2F3E2C] group-hover:text-[#6AA84F] transition-colors duration-200">
                  Fresh Buckets
                </h1>
                <p className="text-xs text-[#6AA84F] font-bold leading-tight opacity-80 hidden sm:block">
                  Farm Fresh • fresh
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/home"
                className="nav-link relative font-semibold py-2 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="nav-link relative font-semibold py-2 transition-all duration-300"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="nav-link relative font-semibold py-2 transition-all duration-300"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="nav-link relative font-semibold py-2 transition-all duration-300"
              >
                Contact
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              {/* Enhanced Responsive Search Button */}
              <div className="relative">
                {/* Desktop Search Button */}
                <button
                  onClick={openSearch}
                  className="hidden sm:flex relative p-2 lg:p-3 rounded-xl hover:bg-[#E4EDDF] text-[#4A5A42] hover:text-[#6AA84F] transition-all duration-200 group items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="hidden lg:inline text-sm font-medium">
                    Search
                  </span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#6AA84F] rounded-full animate-pulse"></div>
                </button>

                {/* Mobile Search Button */}
                <button
                  onClick={openSearch}
                  className="sm:hidden mobile-search-btn relative p-2 rounded-lg hover:bg-[#E4EDDF] text-[#4A5A42] hover:text-[#6AA84F] transition-all duration-200 group"
                >
                  <svg
                    className="mobile-search-icon w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Wishlist Button - Only show when logged in */}
              {isLoggedIn && (
                <div className="relative hidden sm:block">
                  <Link href="/wishlist">
                    <button className="relative p-2 lg:p-3 rounded-xl hover:bg-[#FFE5E5] text-[#4A5A42] hover:text-[#E84C3D] transition-all duration-200 group">
                      <svg
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              )}

              {/* Cart Button */}
              <div className="relative">
                <Link href="/cart">
                  <button className="relative p-2 lg:p-3 rounded-xl hover:bg-[#E4EDDF] text-[#4A5A42] hover:text-[#6AA84F] transition-all duration-200 group">
                    <ShoppingCartIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#E84C3D] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              {/* Profile Button */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="relative p-2 lg:p-3 rounded-xl hover:bg-[#E8F4F8] text-[#4A5A42] hover:text-[#7A3E8E] transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-64 bg-[#FAFCF8] rounded-xl shadow-2xl border-2 border-[#DCE5D6] overflow-hidden z-50">
                    <div className="py-2">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-[#DCE5D6]">
                        {isLoggedIn ? (
                          <div>
                            <p className="font-bold text-[#2F3E2C]">
                              Welcome back!
                            </p>
                            <p className="text-sm text-[#4A5A42]">
                              You are logged in
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold text-[#2F3E2C]">
                              Welcome to Fresh Buckets!
                            </p>
                            <p className="text-sm text-[#4A5A42]">
                              Login for better experience
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Authentication Buttons Section - Only show when NOT logged in */}
                      {!isLoggedIn && (
                        <div className="px-3 py-2 border-b border-[#DCE5D6]">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <button
                              onClick={handleLogin}
                              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-[#E4EDDF] to-[#F6F9F3] hover:from-[#6AA84F] hover:to-[#5A9841] hover:text-white text-[#2F3E2C] transition-all duration-200 group"
                            >
                              <svg
                                className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                              </svg>
                              <span className="font-semibold text-sm">
                                Login
                              </span>
                            </button>

                            <button
                              onClick={handleSignup}
                              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-[#FFE5E5] to-[#FFF0F0] hover:from-[#EB7A3D] hover:to-[#E84C3D] hover:text-white text-[#2F3E2C] transition-all duration-200 group"
                            >
                              <svg
                                className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                              </svg>
                              <span className="font-semibold text-sm">
                                Sign Up
                              </span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Navigation Links */}
                      <div className="space-y-1">
                        {/* Orders - Show for both logged in and guest */}
                        <Link href={isLoggedIn ? "/orders" : "/login"}>
                          <button
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] transition-all duration-200 text-left"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                              />
                            </svg>
                            <span className="font-semibold">
                              {isLoggedIn ? "My Orders" : "View Orders"}
                            </span>
                            {!isLoggedIn && (
                              <span className="text-xs bg-[#F2C94C] text-[#2F3E2C] px-2 py-0.5 rounded-full ml-auto">
                                Guest
                              </span>
                            )}
                          </button>
                        </Link>

                        {/* Profile - Show for both logged in and guest */}

                        {/* Wishlist - Only show when logged in */}
                        {isLoggedIn && (
                          <Link href="/wishlist">
                            <button
                              onClick={() => setIsProfileOpen(false)}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] transition-all duration-200 text-left"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              <span className="font-semibold">Wishlist</span>
                            </button>
                          </Link>
                        )}
                      </div>

                      {/* Footer Section */}
                      <div className="border-t border-[#DCE5D6] mt-2">
                        {isLoggedIn ? (
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-[#2F3E2C] hover:bg-[#FFE5E5] hover:text-[#E84C3D] transition-all duration-200 text-left"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            <span className="font-semibold">Logout</span>
                          </button>
                        ) : (
                          <Link href="/help">
                            <button
                              onClick={() => setIsProfileOpen(false)}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-[#4A5A42] hover:bg-[#E4EDDF] transition-all duration-200 text-left"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Help & Support</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Quick Action Bar */}
        <div className="bg-[#E4EDDF] border-t-2 border-[#DCE5D6] py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3 lg:space-x-6">
                <div className="flex items-center space-x-1 text-[#6AA84F] font-bold">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Delivery in 60 mins</span>
                  <span className="sm:hidden">60 min delivery</span>
                </div>
                <div className="flex items-center space-x-1 text-[#4A5A42] hidden sm:flex font-medium">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  <span className="hidden lg:inline">Ahmedabad, India</span>
                  <span className="lg:hidden">AHM 380001</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-xs text-[#4A5A42] font-medium">
                <span className="hidden lg:inline">|</span>
                <span className="hidden lg:inline flex items-center">
                  <span className="text-[#F2C94C] mr-1">💰</span>
                  Best prices guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full Page Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="animate-slide-down">
                <h2 className="text-2xl lg:text-4xl font-black text-[#2F3E2C] mb-2">
                  Search Fresh Buckets
                </h2>
                <p className="text-[#4A5A42] text-sm lg:text-base">
                  Find fresh groceries and fresh produce
                </p>
              </div>
              <button
                onClick={closeSearch}
                className="p-2 lg:p-3 rounded-xl hover:bg-[#E4EDDF] text-[#4A5A42] hover:text-[#2F3E2C] transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative mb-6 lg:mb-8 animate-slide-up">
              <div className="absolute inset-y-0 left-0 pl-4 lg:pl-6 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 lg:h-6 lg:w-6 text-[#7A8B70]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-12 lg:pl-16 pr-16 lg:pr-20 py-4 lg:py-5 text-lg lg:text-xl border-2 border-[#DCE5D6] rounded-2xl focus:outline-none focus:ring-0 focus:border-[#6AA84F] bg-[#FAFCF8] shadow-sm transition-all duration-300 text-[#2F3E2C]"
                placeholder="Search for products... (e.g., Sweet and juicy)"
                value={searchTerm}
                onChange={handleSearchInput}
                autoFocus
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-12 flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6AA84F]"></div>
                </div>
              )}
              <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
                <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-[#4A5A42] bg-[#E4EDDF] rounded-lg">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Typing Indicator */}
            {searchTerm !== debouncedSearchTerm && searchTerm.length > 0 && (
              <div className="mb-4 text-center">
                <p className="text-sm text-[#4A5A42] italic">
                  Typing... (search will execute after you stop typing)
                </p>
              </div>
            )}

            {/* Empty State */}
            {!hasSearched && !isSearching && (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-[#7A8B70] mb-6">
                  <svg
                    className="w-24 h-24 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2F3E2C] mb-3">
                  Start searching for products
                </h3>
                <p className="text-[#4A5A42] mb-6">
                  Type something in the search box above to find products
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-sm text-[#4A5A42]">Try searching:</span>
                  <button
                    onClick={() => setSearchTerm("Sweet and juicy")}
                    className="px-3 py-1 bg-[#E4EDDF] text-[#6AA84F] rounded-full text-sm font-medium hover:bg-[#6AA84F] hover:text-white transition-colors"
                  >
                    Sweet and juicy
                  </button>
                  <button
                    onClick={() => setSearchTerm("fresh")}
                    className="px-3 py-1 bg-[#E4EDDF] text-[#6AA84F] rounded-full text-sm font-medium hover:bg-[#6AA84F] hover:text-white transition-colors"
                  >
                    fresh
                  </button>
                  <button
                    onClick={() => setSearchTerm("Fresh")}
                    className="px-3 py-1 bg-[#E4EDDF] text-[#6AA84F] rounded-full text-sm font-medium hover:bg-[#6AA84F] hover:text-white transition-colors"
                  >
                    Fresh
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6AA84F] mx-auto mb-4"></div>
                <p className="text-[#4A5A42]">Searching products...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isSearching && hasSearched && (
              <div className="text-center py-12">
                <div className="text-[#E84C3D] mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2F3E2C] mb-2">
                  Error occurred
                </h3>
                <p className="text-[#4A5A42]">{error}</p>
              </div>
            )}

            {/* Search Results */}
            {!isSearching && hasSearched && searchResults.length > 0 && (
              <div className="animate-slide-up">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C]">
                    Search Results
                  </h3>
                  <span className="text-[#4A5A42] text-sm lg:text-base">
                    {totalResults} results found (Page {currentPage} of{" "}
                    {totalPages})
                  </span>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
                  {searchResults.map((product) => (
                    <SearchProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-[#E4EDDF] text-[#2F3E2C] hover:bg-[#6AA84F] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    >
                      Previous
                    </button>

                    <div className="flex items-center space-x-2">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        if (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 &&
                            pageNum <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                                currentPage === pageNum
                                  ? "bg-[#6AA84F] text-white font-bold"
                                  : "bg-[#E4EDDF] text-[#2F3E2C] hover:bg-[#DCE5D6]"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === currentPage - 2 ||
                          pageNum === currentPage + 2
                        ) {
                          return (
                            <span key={pageNum} className="text-[#4A5A42]">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-[#E4EDDF] text-[#2F3E2C] hover:bg-[#6AA84F] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* No Results Found */}
            {!isSearching &&
              hasSearched &&
              debouncedSearchTerm === searchTerm &&
              searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-[#7A8B70] mb-4">
                    <svg
                      className="w-20 h-20 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#2F3E2C] mb-2">
                    No products found for "{debouncedSearchTerm}"
                  </h3>
                  <p className="text-[#4A5A42] mb-4">
                    Try searching with different keywords
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-2 bg-[#6AA84F] text-white rounded-lg font-medium hover:bg-[#5A9841] transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleCart}
          ></div>
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#FAFCF8] shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 lg:p-6 border-b-2 border-[#DCE5D6] bg-gradient-to-r from-[#E4EDDF] to-[#F6F9F3]">
                <div>
                  <h2 className="text-lg lg:text-xl font-black text-[#2F3E2C]">
                    Your Cart
                  </h2>
                  <p className="text-sm text-[#4A5A42]">
                    {getTotalItems()} items
                  </p>
                </div>
                <button
                  onClick={toggleCart}
                  className="p-2 rounded-lg hover:bg-[#DCE5D6] text-[#4A5A42] hover:text-[#2F3E2C] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-[#7A8B70] mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-[#4A5A42] font-medium mb-4">
                      Your cart is empty
                    </p>
                    <button
                      onClick={() => {
                        toggleCart();
                        openSearch();
                      }}
                      className="px-6 py-2 bg-[#6AA84F] text-white rounded-lg font-medium hover:bg-[#5A9841] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 lg:p-4 bg-[#E4EDDF] rounded-xl border-2 border-[#DCE5D6]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover border-2 border-[#DCE5D6]"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2F3E2C] text-sm lg:text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs lg:text-sm text-[#4A5A42]">
                          {item.unit}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#DCE5D6] hover:bg-[#7A8B70] hover:text-white flex items-center justify-center text-sm font-bold transition-all"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold min-w-[20px] text-center text-[#2F3E2C]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#6AA84F] hover:bg-[#5A9841] text-white flex items-center justify-center text-sm font-bold transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base lg:text-lg font-bold text-[#6AA84F]">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-[#E84C3D] hover:text-[#D43D2D] font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t-2 border-[#DCE5D6] p-4 lg:p-6 space-y-4 bg-gradient-to-r from-[#E4EDDF] to-[#F6F9F3]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-[#4A5A42]">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#2F3E2C]">
                        ₹{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#4A5A42]">
                      <span>Delivery</span>
                      <span className="font-bold text-[#6AA84F]">FREE</span>
                    </div>
                    <div className="flex items-center justify-between text-base lg:text-lg font-black border-t-2 border-[#DCE5D6] pt-2">
                      <span className="text-[#2F3E2C]">Total</span>
                      <span className="text-[#6AA84F]">
                        ₹{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="w-full add-to-cart-btn text-white py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300">
                    {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                  </button>
                  {!isLoggedIn && (
                    <div className="text-center">
                      <p className="text-xs text-[#4A5A42] mb-2">
                        <button
                          onClick={() => {
                            toggleCart();
                            handleLogin();
                          }}
                          className="text-[#6AA84F] hover:text-[#5A9841] font-medium mx-1"
                        >
                          Login
                        </button>
                        or
                        <button
                          onClick={() => {
                            toggleCart();
                            handleSignup();
                          }}
                          className="text-[#6AA84F] hover:text-[#5A9841] font-medium mx-1"
                        >
                          Sign up
                        </button>
                        for faster checkout
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-center text-[#4A5A42]">
                    Free delivery on orders over ₹999
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
