// "use client";
// import Footer from "@src/component/components/footer";
// import Header from "@src/component/components/header";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// const FreshMartApp = () => {
//   // State management
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
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

//   // Sample products data
//   const products = [
//     {
//       id: 1,
//       name: "fresh Strawberries",

//       price: 2.99,
//       unit: "per lb",
//       image:
//         "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "Fresh",
//       badgeColor: "bg-gradient-to-r from-green-500 to-green-600",
//     },
//     {
//       id: 2,
//       name: "Hass Avocados",
//       price: 1.79,
//       unit: "each",
//       image:
//         "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "Premium",
//       badgeColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
//     },
//     {
//       id: 3,
//       name: "Free-Range Eggs",
//       price: 4.99,
//       unit: "dozen",
//       image:
//         "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "Farm Fresh",
//       badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
//     },
//     {
//       id: 4,
//       name: "fresh Bananas",
//       price: 1.49,
//       unit: "2 lbs",
//       image:
//         "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "fresh",
//       badgeColor: "bg-gradient-to-r from-yellow-500 to-yellow-600",
//     },
//     {
//       id: 5,
//       name: "Fresh Spinach",
//       price: 2.49,
//       unit: "5 oz bag",
//       image:
//         "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "Super Fresh",
//       badgeColor: "bg-gradient-to-r from-green-600 to-green-700",
//     },
//     {
//       id: 6,
//       name: "Whole Milk",
//       price: 3.99,
//       unit: "1 gallon",
//       image:
//         "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       badge: "Local Farm",
//       badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
//     },
//   ];

//   // Functions
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const openSearch = () => {
//     setIsSearchOpen(true);
//   };

//   const closeSearch = () => {
//     setIsSearchOpen(false);
//     setSearchTerm("");
//     setSearchResults([]);
//   };

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const performSearch = (query) => {
//     if (query.length > 0) {
//       const results = products.filter(
//         (product) =>
//           product.name.toLowerCase().includes(query.toLowerCase()) ||
//           product.description.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(results);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const searchCategory = (category) => {
//     setSearchTerm(category);
//     performSearch(category);
//   };

//   const searchTerm_func = (term) => {
//     setSearchTerm(term);
//     performSearch(term);
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
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isSearchOpen, isMobileMenuOpen, isCartOpen]);

//   useEffect(() => {
//     performSearch(searchTerm);
//   }, [searchTerm]);

//   return (
//     <div className="bg-gray-50 font-sans">
//       {/* Tailwind Config */}
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

//         .category-hover {
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//         }

//         .category-hover:hover {
//           transform: translateY(-8px) scale(1.05);
//         }

//         @media (max-width: 768px) {
//           .category-hover:hover {
//             transform: translateY(-4px) scale(1.02);
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

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse 3s ease-in-out infinite;
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

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
//       `}</style>

//       {/* Enhanced Header */}
//       <Header />

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
//             {/* Mobile Menu Header */}
//             <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                     <svg
//                       className="w-7 h-7 text-white"
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
//                   </div>
//                   <div>
//                     <h2 className="font-black text-xl">FreshMart</h2>
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

//               {/* User Info */}
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

//             {/* Mobile Navigation Links */}
//             <nav className="p-6">
//               <div className="space-y-2">
//                 <a
//                   href="#home"
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                 >
//                   <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
//                     <svg
//                       className="w-5 h-5 text-green-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                       />
//                     </svg>
//                   </div>
//                   <span>Home</span>
//                 </a>

//                 <a
//                   href="#products"
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                 >
//                   <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
//                     <svg
//                       className="w-5 h-5 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//                       />
//                     </svg>
//                   </div>
//                   <span>Products</span>
//                 </a>

//                 <a
//                   href="#about"
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                 >
//                   <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
//                     <svg
//                       className="w-5 h-5 text-purple-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 11H5m14-4H9M7 11v8a2 2 0 002 2h6a2 2 0 002-2v-8"
//                       />
//                     </svg>
//                   </div>
//                   <span>About</span>
//                 </a>

//                 <a
//                   href="#offers"
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                 >
//                   <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
//                     <svg
//                       className="w-5 h-5 text-red-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex items-center justify-between flex-1">
//                     <span>Special Offers</span>
//                     <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-bold">
//                       HOT
//                     </span>
//                   </div>
//                 </a>

//                 <a
//                   href="#contact"
//                   onClick={closeMobileMenu}
//                   className="flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-green-100 hover:text-green-600 font-semibold transition-all duration-200 group"
//                 >
//                   <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-all duration-200">
//                     <svg
//                       className="w-5 h-5 text-orange-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       />
//                     </svg>
//                   </div>
//                   <span>Contact Us</span>
//                 </a>
//               </div>

//               {/* Mobile Menu Actions */}
//               <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
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

//                 <button
//                   onClick={() => {
//                     toggleCart();
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
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                   <span className="font-medium">
//                     View Cart ({getTotalItems()} items)
//                   </span>
//                 </button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Full Page Search Overlay */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 bg-white z-50">
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
//             {/* Search Header */}
//             <div className="flex items-center justify-between mb-6 lg:mb-8">
//               <div className="animate-slide-down">
//                 <h2 className="text-2xl lg:text-4xl font-black text-gray-900 mb-2">
//                   Search FreshMart
//                 </h2>
//                 <p className="text-gray-600 text-sm lg:text-base">
//                   Find fresh groceries and daily essentials from 1000+ products
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
//                 placeholder="Search for fruits, vegetables, dairy..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 autoFocus
//               />
//               <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
//                 <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
//                   ESC
//                 </kbd>
//               </div>
//             </div>

//             {/* Quick Search Categories */}
//             <div className="mb-8 lg:mb-10 animate-fade-in">
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">
//                 Popular Categories
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
//                 <button
//                   onClick={() => searchCategory("fruits")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍎</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Fresh Fruits
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       500+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("vegetables")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥬</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Vegetables
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       400+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("dairy")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥛</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Dairy & Eggs
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       150+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("meat")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥩</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Meat & Seafood
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       200+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("bakery")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍞</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Bakery
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       100+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("pantry")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥫</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Pantry Staples
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       300+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("snacks")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍿</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Snacks
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       250+ items
//                     </div>
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => searchCategory("beverages")}
//                   className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 rounded-2xl transition-all duration-300"
//                 >
//                   <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🧃</div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
//                       Beverages
//                     </div>
//                     <div className="text-xs lg:text-sm text-gray-600">
//                       180+ items
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Trending Searches */}
//             <div className="mb-6 lg:mb-8 animate-fade-in">
//               <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4">
//                 Trending Searches
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => searchTerm_func("fresh apples")}
//                   className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
//                 >
//                   fresh Apples
//                 </button>
//                 <button
//                   onClick={() => searchTerm_func("fresh milk")}
//                   className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
//                 >
//                   Fresh Milk
//                 </button>
//                 <button
//                   onClick={() => searchTerm_func("chicken breast")}
//                   className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
//                 >
//                   Chicken Breast
//                 </button>
//                 <button
//                   onClick={() => searchTerm_func("avocado")}
//                   className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
//                 >
//                   Avocado
//                 </button>
//                 <button
//                   onClick={() => searchTerm_func("whole wheat bread")}
//                   className="px-3 lg:px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
//                 >
//                   Whole Wheat Bread
//                 </button>
//               </div>
//             </div>

//             {/* Search Results */}
//             {searchResults.length > 0 && (
//               <div className="animate-slide-up">
//                 <div className="flex items-center justify-between mb-4 lg:mb-6">
//                   <h3 className="text-lg lg:text-xl font-bold text-gray-900">
//                     Search Results
//                   </h3>
//                   <span className="text-gray-600 text-sm lg:text-base">
//                     {searchResults.length} results found
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
//                   {searchResults.map((product) => (
//                     <div
//                       key={product.id}
//                       className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 relative product-card"
//                     >
//                       <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-20">
//                         <div
//                           className={`${product.badgeColor} text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold shadow-lg`}
//                         >
//                           {product.badge}
//                         </div>
//                       </div>

//                       <div className="relative overflow-hidden aspect-[4/3]">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                       </div>

//                       <div className="p-4 lg:p-6">
//                         <h3 className="font-bold text-gray-900 mb-2 text-base lg:text-lg leading-tight group-hover:text-green-600 transition-colors">
//                           {product.name}
//                         </h3>
//                         <p className="text-sm text-gray-600 mb-3 lg:mb-4">
//                           {product.description}
//                         </p>
//                         <div className="flex items-center justify-between mb-3 lg:mb-0">
//                           <span className="text-xl lg:text-2xl font-black text-green-600">
//                             ₹{product.price}
//                           </span>
//                           <span className="text-sm text-gray-500 font-medium">
//                             {product.unit}
//                           </span>
//                         </div>
//                         <Link href="/product">
//                           <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
//                             View Product
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
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
//               {/* Cart Header */}
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

//               {/* Cart Items */}
//               <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center space-x-3 p-3 lg:p-4 bg-green-50 rounded-xl border border-green-100"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-bold text-gray-900 text-sm lg:text-base">
//                         {item.name}
//                       </h4>
//                       <p className="text-xs lg:text-sm text-gray-600">
//                         {item.unit}
//                       </p>
//                       <div className="flex items-center space-x-2 mt-2">
//                         <button
//                           onClick={() => updateQuantity(item.id, -1)}
//                           className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
//                         >
//                           -
//                         </button>
//                         <span className="text-sm font-bold min-w-[20px] text-center">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => updateQuantity(item.id, 1)}
//                           className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center text-sm font-bold"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-base lg:text-lg font-bold text-green-600">
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="text-xs text-red-500 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Cart Footer */}
//               <div className="border-t border-gray-200 p-4 lg:p-6 space-y-4 bg-gradient-to-r from-white to-gray-50">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span>Subtotal</span>
//                     <span className="font-bold">
//                       ₹{getTotalPrice().toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span>Delivery</span>
//                     <span className="font-bold text-green-600">FREE</span>
//                   </div>
//                   <div className="flex items-center justify-between text-base lg:text-lg font-black border-t pt-2">
//                     <span>Total</span>
//                     <span className="text-green-600">
//                       ₹{getTotalPrice().toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//                 <button className="w-full add-to-cart-btn text-white py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300">
//                   Proceed to Checkout
//                 </button>
//                 <p className="text-xs text-center text-gray-500">
//                   Free delivery on orders over ₹999
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main>
//         {/* Hero Section */}
//         <section
//           id="home"
//           className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 lg:py-20"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//               <div className="text-center lg:text-left animate-fade-in">
//                 {/* Delivery Badge */}
//                 <div className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-green-600/10 text-green-600 font-bold text-xs lg:text-sm mb-4 lg:mb-6">
//                   <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
//                   Free delivery in 60 minutes
//                 </div>

//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
//                   Fresh Groceries
//                   <span className="block text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
//                     Delivered Fast
//                   </span>
//                 </h1>

//                 <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed">
//                   Premium quality fresh produce, farm-fresh items, and
//                   everyday essentials delivered to your doorstep.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8">
//                   <button className="gradient-green text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
//                     Start Shopping
//                   </button>
//                   <button
//                     onClick={openSearch}
//                     className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
//                   >
//                     Browse Products
//                   </button>
//                 </div>
//               </div>

//               <div className="relative animate-fade-in">
//                 <img
//                   src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
//                   alt="Fresh groceries basket"
//                   className="rounded-2xl shadow-2xl w-full"
//                 />

//                 {/* Floating Cards */}
//                 <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 lg:p-4 shadow-xl animate-float hidden lg:block">
//                   <div className="flex items-center space-x-2 lg:space-x-3">
//                     <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                       <span className="text-lg lg:text-2xl">🥬</span>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900 text-xs lg:text-sm">
//                         Fresh Today
//                       </div>
//                       <div className="text-xs text-green-600 font-medium">
//                         fresh Spinach
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 lg:p-4 shadow-xl animate-float hidden lg:block"
//                   style={{ animationDelay: "0.5s" }}
//                 >
//                   <div className="flex items-center space-x-2 lg:space-x-3">
//                     <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-xl flex items-center justify-center">
//                       <span className="text-lg lg:text-2xl">🍎</span>
//                     </div>
//                     <div>
//                       <div className="font-bold text-gray-900 text-xs lg:text-sm">
//                         35% Off
//                       </div>
//                       <div className="text-xs text-green-600 font-medium">
//                         Premium Apples
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Categories Section */}
//         <section
//           id="categories"
//           className="py-12 lg:py-20 bg-white relative overflow-hidden"
//         >
//           <div
//             className="absolute inset-0 opacity-30"
//             style={{
//               backgroundImage:
//                 'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316A34A" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
//             }}
//           ></div>

//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Header */}
//             <div className="text-center mb-12 lg:mb-16">
//               <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-green-600/10 rounded-full text-green-600 font-semibold text-xs lg:text-sm mb-4 lg:mb-6">
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 11H5m14-7l2 7-2 7M5 4l2 7-2 7"
//                   />
//                 </svg>
//                 Shop by Category
//               </div>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
//                 Fresh{" "}
//                 <span className="text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
//                   Categories
//                 </span>
//               </h2>
//               <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
//                 Explore our wide selection of fresh, fresh products across all
//                 categories
//               </p>
//             </div>

//             {/* Categories Grid */}
//             <div className="flex justify-center flex-wrap gap-4 lg:gap-6">
//               {/* Fresh Fruits */}
//               <div className="group bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 lg:p-6 text-center hover:from-red-100 hover:to-red-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
//                 <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
//                   🍎
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
//                   Fresh Fruits
//                 </h3>
//                 <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
//                   fresh & seasonal fruits
//                 </p>
//                 <div className="text-xs text-green-600 font-medium">
//                   500+ products
//                 </div>
//               </div>

//               {/* Vegetables */}
//               <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 lg:p-6 text-center hover:from-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
//                 <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
//                   🥬
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
//                   Vegetables
//                 </h3>
//                 <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
//                   Fresh garden vegetables
//                 </p>
//                 <div className="text-xs text-green-600 font-medium">
//                   400+ products
//                 </div>
//               </div>

//               {/* Dairy & Eggs */}
//               <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 lg:p-6 text-center hover:from-blue-100 hover:to-blue-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
//                 <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
//                   🥛
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
//                   Dairy & Eggs
//                 </h3>
//                 <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
//                   Farm fresh dairy products
//                 </p>
//                 <div className="text-xs text-green-600 font-medium">
//                   150+ products
//                 </div>
//               </div>

//               {/* Bakery */}
//               <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 lg:p-6 text-center hover:from-orange-100 hover:to-orange-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
//                 <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
//                   🍞
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
//                   Bakery
//                 </h3>
//                 <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
//                   Fresh baked goods daily
//                 </p>
//                 <div className="text-xs text-green-600 font-medium">
//                   100+ products
//                 </div>
//               </div>

//               {/* Pantry */}
//               <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 lg:p-6 text-center hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-lg category-hover">
//                 <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
//                   🥫
//                 </div>
//                 <h3 className="font-bold text-gray-900 mb-1 lg:mb-2 text-sm lg:text-base">
//                   Pantry
//                 </h3>
//                 <p className="text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
//                   Essential food items
//                 </p>
//                 <div className="text-xs text-green-600 font-medium">
//                   300+ products
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Featured Products Section */}

//         {/* Features Section */}
//         <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
//           {/* Background Pattern */}
//           <div
//             className="absolute inset-0 opacity-40"
//             style={{
//               backgroundImage:
//                 'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2316A34A" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
//             }}
//           ></div>

//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             {/* Header */}
//             <div className="text-center mb-12 lg:mb-16">
//               <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-green-600/10 rounded-full text-green-600 font-semibold text-xs lg:text-sm mb-4 lg:mb-6">
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//                 Why Choose Us
//               </div>
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
//                 Premium{" "}
//                 <span className="text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
//                   Features
//                 </span>
//               </h2>
//               <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                 Experience the best grocery shopping with our premium features
//                 and unmatched service quality
//               </p>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//               {/* Feature 1 */}
//               <div className="text-center group cursor-pointer">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <svg
//                     className="w-8 h-8 lg:w-10 lg:h-10 text-green-600"
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
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
//                   60 min Delivery
//                 </h3>
//                 <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                   Lightning-fast delivery to your doorstep in just 60 minutes
//                 </p>
//               </div>

//               {/* Feature 2 */}
//               <div className="text-center group cursor-pointer">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <svg
//                     className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
//                   Fresh Guarantee
//                 </h3>
//                 <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                   100% fresh products or full money back guarantee
//                 </p>
//               </div>

//               {/* Feature 3 */}
//               <div className="text-center group cursor-pointer">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <svg
//                     className="w-8 h-8 lg:w-10 lg:h-10 text-purple-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
//                   Best Prices
//                 </h3>
//                 <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                   Competitive prices with regular discounts and offers
//                 </p>
//               </div>

//               {/* Feature 4 */}
//               <div className="text-center group cursor-pointer">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <svg
//                     className="w-8 h-8 lg:w-10 lg:h-10 text-orange-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">
//                   24/7 Support
//                 </h3>
//                 <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
//                   Round-the-clock customer support for all your needs
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer />
//       {/* Mobile App Banner */}
//       <div className="fixed bottom-4 left-4 right-4 lg:hidden">
//         <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-2xl shadow-2xl border border-green-500/50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Download Our App</p>
//                 <p className="text-white/80 text-xs">
//                   Get exclusive mobile offers
//                 </p>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
//                 Install
//               </button>
//               <button className="text-white/80 hover:text-white p-1.5 rounded-lg transition-all">
//                 <svg
//                   className="w-4 h-4"
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreshMartApp;

// <------------new ------------------->
"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FreshMartApp = () => {
  // State management
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showPWAInstall, setShowPWAInstall] = useState(false);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
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

  // Sample products data
  const products = [
    {
      id: 1,
      name: "fresh Strawberries",
      price: 2.99,
      unit: "per lb",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Fresh",
      badgeColor: "bg-[#6AA84F]",
    },
    {
      id: 2,
      name: "Hass Avocados",
      price: 1.79,
      unit: "each",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Premium",
      badgeColor: "bg-[#6AA84F]",
    },
    {
      id: 3,
      name: "Free-Range Eggs",
      price: 4.99,
      unit: "dozen",
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Farm Fresh",
      badgeColor: "bg-[#F2C94C]",
    },
    {
      id: 4,
      name: "fresh Bananas",
      price: 1.49,
      unit: "2 lbs",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "fresh",
      badgeColor: "bg-[#F2C94C]",
    },
    {
      id: 5,
      name: "Fresh Spinach",
      price: 2.49,
      unit: "5 oz bag",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Super Fresh",
      badgeColor: "bg-[#6AA84F]",
    },
    {
      id: 6,
      name: "Whole Milk",
      price: 3.99,
      unit: "1 gallon",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Local Farm",
      badgeColor: "bg-[#EB7A3D]",
    },
  ];

  // Detect device and browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if app is already installed
      setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

      // Detect device and browser
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
      setIsAndroid(/android/.test(userAgent));
      setIsSafari(/safari/.test(userAgent) && !/chrome/.test(userAgent));

      // Handle Android/Chrome PWA installation
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);

        // Only show install button if not already installed
        if (!isStandalone) {
          setShowPWAInstall(true);
        }
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === "accepted") {
        setShowPWAInstall(false);
        setShowInstallPopup(false);
      }
    } else {
      // If no deferred prompt (iOS or other browsers), show instructions
      setShowInstallPopup(true);
    }
  };

  const openInstallPopup = () => {
    setShowInstallPopup(true);
  };

  const closeInstallPopup = () => {
    setShowInstallPopup(false);
  };

  // Functions
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const performSearch = (query) => {
    if (query.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const searchCategory = (category) => {
    setSearchTerm(category);
    performSearch(category);
  };

  const searchTerm_func = (term) => {
    setSearchTerm(term);
    performSearch(term);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isSearchOpen) closeSearch();
        if (isMobileMenuOpen) closeMobileMenu();
        if (isCartOpen) setIsCartOpen(false);
        if (showInstallPopup) closeInstallPopup();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMobileMenuOpen, isCartOpen, showInstallPopup]);

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMobileInstallClick = () => {
    handleInstallClick();
    closeMobileMenu();
  };

  // Get installation instructions based on device
  const getInstallInstructions = () => {
    if (isIOS) {
      return {
        title: "Install on iPhone/iPad",
        steps: [
          { icon: "📱", text: "Tap the Share button" },
          { icon: "⬇️", text: "Scroll down and tap 'Add to Home Screen'" },
          { icon: "➕", text: "Tap 'Add' in the top right corner" },
          { icon: "🏠", text: "Open from your Home Screen" },
        ],
        note: "Make sure you're using Safari browser",
      };
    } else if (isAndroid) {
      return {
        title: "Install on Android",
        steps: [
          { icon: "🌐", text: "Open in Chrome browser" },
          { icon: "⋮", text: "Tap the menu button (three dots)" },
          { icon: "📲", text: "Select 'Install app' or 'Add to Home screen'" },
          { icon: "✅", text: "Tap 'Install' to confirm" },
        ],
        note: "Works best with Chrome browser",
      };
    } else {
      return {
        title: "Install App",
        steps: [
          { icon: "🌐", text: "Use Chrome or Edge browser" },
          { icon: "📱", text: "Look for the install icon in address bar" },
          { icon: "⬇️", text: "Click 'Install' when prompted" },
          { icon: "✅", text: "Follow browser instructions" },
        ],
        note: "Chrome, Edge, and Safari support PWA installation",
      };
    }
  };

  return (
    <div className="bg-[#F6F9F3] font-sans">
      {/* Updated CSS Variables */}
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
          background: rgba(255, 255, 255, 0.95);
        }

        .product-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid var(--border-light);
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

        .category-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid var(--border-light);
        }

        .category-hover:hover {
          transform: translateY(-8px) scale(1.05);
          border-color: var(--fresh-leaf);
          box-shadow: 0 12px 30px -8px rgba(106, 168, 79, 0.3);
        }

        @media (max-width: 768px) {
          .category-hover:hover {
            transform: translateY(-4px) scale(1.02);
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* PWA install button animation */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(106, 168, 79, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(106, 168, 79, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(106, 168, 79, 0);
          }
        }

        .animate-pulse-install {
          animation: pulse 2s infinite;
        }

        /* Modal animations */
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-modal-slide-up {
          animation: modalSlideUp 0.3s ease-out forwards;
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <Header />

      {/* Install App Popup Modal */}
      {showInstallPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeInstallPopup}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-[#FAFCF8] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-modal-slide-up border-4 border-[#6AA84F] shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#6AA84F] to-[#5A9841] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">
                      Install Fresh Buckets App
                    </h2>
                    <p className="text-white/90 text-sm">
                      Get the best shopping experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeInstallPopup}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Device Detection */}

              {/* Installation Steps */}

              {/* App Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#2F3E2C]">
                  App Benefits
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#E4EDDF] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-xs font-medium text-[#2F3E2C]">
                      Faster Loading
                    </p>
                  </div>
                  <div className="bg-[#E4EDDF] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <p className="text-xs font-medium text-[#2F3E2C]">
                      Home Screen
                    </p>
                  </div>
                  {/* <div className="bg-[#E4EDDF] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">🔔</div>
                    <p className="text-xs font-medium text-[#2F3E2C]">
                      Notifications
                    </p>
                  </div>
                  <div className="bg-[#E4EDDF] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-2">📴</div>
                    <p className="text-xs font-medium text-[#2F3E2C]">
                      Offline Use
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-[#DCE5D6] p-6 bg-gradient-to-r from-[#E4EDDF] to-[#F6F9F3] rounded-b-2xl">
              {isStandalone ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#6AA84F] to-[#5A9841] rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="font-bold text-[#6AA84F] text-lg">
                    App Installed Successfully!
                  </p>
                  <p className="text-sm text-[#4A5A42]">
                    Enjoy the enhanced shopping experience
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {deferredPrompt ? (
                    <button
                      onClick={handleInstallClick}
                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#6AA84F] to-[#5A9841] text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-[#5A9841] hover:to-[#4A872F] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                      </svg>
                      <span>Install Now</span>
                    </button>
                  ) : (
                    <div className="text-center space-y-3">
                      <p className="text-[#4A5A42]">
                        Follow the instructions above to install the app
                      </p>
                      <button
                        onClick={closeInstallPopup}
                        className="w-full border-2 border-[#6AA84F] text-[#6AA84F] hover:bg-[#6AA84F] hover:text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                      >
                        Got It
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-center text-[#4A5A42]">
                    The app works offline and doesn't take much storage space
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={toggleMobileMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 max-w-full bg-[#FAFCF8] shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gradient-green text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-black text-xl">Fresh Buckets</h2>
                    <p className="text-white/90 text-sm">Farm Fresh • fresh</p>
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-white"
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
            </div>

            <nav className="p-6">
              <div className="space-y-2">
                <a
                  href="#home"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#E4EDDF] rounded-xl flex items-center justify-center group-hover:bg-[#6AA84F]/20 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-[#6AA84F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <span>Home</span>
                </a>

                <a
                  href="#products"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#E4EDDF] rounded-xl flex items-center justify-center group-hover:bg-[#6AA84F]/20 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-[#EB7A3D]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <span>Products</span>
                </a>

                <a
                  href="#about"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#E4EDDF] rounded-xl flex items-center justify-center group-hover:bg-[#6AA84F]/20 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-[#7A3E8E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14-4H9M7 11v8a2 2 0 002 2h6a2 2 0 002-2v-8"
                      />
                    </svg>
                  </div>
                  <span>About</span>
                </a>

                <a
                  href="#offers"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#E4EDDF] rounded-xl flex items-center justify-center group-hover:bg-[#6AA84F]/20 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-[#E84C3D]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between flex-1">
                    <span>Special Offers</span>
                    <span className="px-2 py-1 text-xs bg-[#E84C3D] text-white rounded-full font-bold">
                      HOT
                    </span>
                  </div>
                </a>

                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-4 px-4 py-4 rounded-xl text-[#2F3E2C] hover:bg-[#E4EDDF] hover:text-[#6AA84F] font-semibold transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-[#E4EDDF] rounded-xl flex items-center justify-center group-hover:bg-[#6AA84F]/20 transition-all duration-200">
                    <svg
                      className="w-5 h-5 text-[#F2C94C]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span>Contact Us</span>
                </a>
              </div>

              {/* Add Install App Button to Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-[#DCE5D6]">
                <button
                  onClick={() => {
                    openInstallPopup();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#6AA84F] to-[#5A9841] text-white rounded-xl font-bold hover:from-[#5A9841] hover:to-[#4A872F] transition-all duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                  </svg>
                  <span>Install App</span>
                </button>
                <p className="text-xs text-center text-[#4A5A42] mt-2">
                  Get better experience with our app
                </p>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <div className="animate-slide-down">
                <h2 className="text-2xl lg:text-4xl font-black text-[#2F3E2C] mb-2">
                  Search Fresh Buckets
                </h2>
                <p className="text-[#4A5A42] text-sm lg:text-base">
                  Find fresh groceries and fresh produce from 1000+ products
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
                placeholder="Search for fruits, vegetables, fresh produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 pr-4 lg:pr-6 flex items-center space-x-2">
                <kbd className="px-2 lg:px-3 py-1 text-sm font-medium text-[#4A5A42] bg-[#E4EDDF] rounded-lg">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Quick Search Categories */}
            <div className="mb-8 lg:mb-10 animate-fade-in">
              <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C] mb-4 lg:mb-6">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                <button
                  onClick={() => searchCategory("fruits")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-[#FFE5E5] to-[#FFD0D0] hover:from-[#FFD0D0] hover:to-[#FFB8B8] rounded-2xl transition-all duration-300 border-2 border-[#DCE5D6]"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍎</div>
                  <div className="text-center">
                    <div className="font-bold text-[#2F3E2C] mb-1 text-sm lg:text-base">
                      Fresh Fruits
                    </div>
                    <div className="text-xs lg:text-sm text-[#4A5A42]">
                      500+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("vegetables")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-[#E4EDDF] to-[#D5E5CC] hover:from-[#D5E5CC] hover:to-[#C6DDB9] rounded-2xl transition-all duration-300 border-2 border-[#DCE5D6]"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥬</div>
                  <div className="text-center">
                    <div className="font-bold text-[#2F3E2C] mb-1 text-sm lg:text-base">
                      Vegetables
                    </div>
                    <div className="text-xs lg:text-sm text-[#4A5A42]">
                      400+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("dairy")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-[#E8F4F8] to-[#D4E9F2] hover:from-[#D4E9F2] hover:to-[#C0DEEC] rounded-2xl transition-all duration-300 border-2 border-[#DCE5D6]"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🥛</div>
                  <div className="text-center">
                    <div className="font-bold text-[#2F3E2C] mb-1 text-sm lg:text-base">
                      Dairy & Eggs
                    </div>
                    <div className="text-xs lg:text-sm text-[#4A5A42]">
                      150+ items
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => searchCategory("bakery")}
                  className="flex flex-col items-center p-4 lg:p-6 bg-gradient-to-br from-[#FFF4E0] to-[#FFE9C2] hover:from-[#FFE9C2] hover:to-[#FFDEA4] rounded-2xl transition-all duration-300 border-2 border-[#DCE5D6]"
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">🍞</div>
                  <div className="text-center">
                    <div className="font-bold text-[#2F3E2C] mb-1 text-sm lg:text-base">
                      Bakery
                    </div>
                    <div className="text-xs lg:text-sm text-[#4A5A42]">
                      100+ items
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Trending Searches */}
            <div className="mb-6 lg:mb-8 animate-fade-in">
              <h3 className="text-base lg:text-lg font-bold text-[#2F3E2C] mb-3 lg:mb-4">
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => searchTerm_func("fresh apples")}
                  className="px-3 lg:px-4 py-2 bg-[#E4EDDF] hover:bg-[#6AA84F] hover:text-white text-[#2F3E2C] rounded-full text-sm font-medium transition-all duration-200"
                >
                  fresh Apples
                </button>
                <button
                  onClick={() => searchTerm_func("fresh milk")}
                  className="px-3 lg:px-4 py-2 bg-[#E4EDDF] hover:bg-[#6AA84F] hover:text-white text-[#2F3E2C] rounded-full text-sm font-medium transition-all duration-200"
                >
                  Fresh Milk
                </button>
                <button
                  onClick={() => searchTerm_func("avocado")}
                  className="px-3 lg:px-4 py-2 bg-[#E4EDDF] hover:bg-[#6AA84F] hover:text-white text-[#2F3E2C] rounded-full text-sm font-medium transition-all duration-200"
                >
                  Avocado
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="animate-slide-up">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C]">
                    Search Results
                  </h3>
                  <span className="text-[#4A5A42] text-sm lg:text-base">
                    {searchResults.length} results found
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-[#FAFCF8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-[#DCE5D6] hover:border-[#6AA84F] transition-all duration-300 hover:-translate-y-2 relative product-card"
                    >
                      <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-20">
                        <div
                          className={`${product.badgeColor} text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-full text-xs font-bold shadow-lg`}
                        >
                          {product.badge}
                        </div>
                      </div>
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 lg:p-6">
                        <h3 className="font-bold text-[#2F3E2C] mb-2 text-base lg:text-lg leading-tight group-hover:text-[#6AA84F] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mb-3 lg:mb-0">
                          <span className="text-xl lg:text-2xl font-black text-[#6AA84F]">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-[#4A5A42] font-medium">
                            {product.unit}
                          </span>
                        </div>
                        <Link href="/product">
                          <button className="lg:hidden w-full add-to-cart-btn text-white py-2 rounded-lg font-bold text-sm mt-3">
                            View Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
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
                {cartItems.map((item) => (
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
                ))}
              </div>

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
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-[#4A5A42]">
                  Free delivery on orders over ₹999
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-[#E4EDDF] via-[#F6F9F3] to-[#FAFCF8] py-8 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-[#6AA84F]/20 text-[#2F3E2C] font-bold text-xs lg:text-sm mb-4 lg:mb-6 border-2 border-[#6AA84F]/30">
                  <span className="w-2 h-2 bg-[#6AA84F] rounded-full mr-2 animate-pulse"></span>
                  Free delivery in 60 minutes
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#2F3E2C] mb-4 lg:mb-6 leading-tight">
                  Fresh Groceries
                  <span className="block text-[#6AA84F] mt-2">
                    Delivered Fast
                  </span>
                </h1>

                <p className="text-base lg:text-lg text-[#4A5A42] mb-6 lg:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Premium quality fresh produce, farm-fresh items, and everyday
                  essentials delivered to your doorstep. Experience nature's
                  best!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-6 lg:mb-8 justify-center lg:justify-start">
                  <Link href="/products">
                    <button className="gradient-red text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                      Start Shopping
                    </button>
                  </Link>
                  <button
                    onClick={openSearch}
                    className="border-2 border-[#6AA84F] text-[#6AA84F] hover:bg-[#6AA84F] hover:text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Browse Products
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6 text-sm">
                  <div className="flex items-center space-x-2 text-[#4A5A42]">
                    <svg
                      className="w-5 h-5 text-[#6AA84F]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">100% fresh</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#4A5A42]">
                    <svg
                      className="w-5 h-5 text-[#6AA84F]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">Farm Fresh</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#4A5A42]">
                    <svg
                      className="w-5 h-5 text-[#6AA84F]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">Quality Assured</span>
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#DCE5D6]">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Fresh groceries basket"
                    className="w-full"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-[#FAFCF8] rounded-xl p-3 lg:p-4 shadow-2xl animate-float hidden lg:block border-2 border-[#6AA84F]">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#E4EDDF] rounded-xl flex items-center justify-center">
                      <span className="text-lg lg:text-2xl">🥬</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#2F3E2C] text-xs lg:text-sm">
                        Fresh Today
                      </div>
                      <div className="text-xs text-[#6AA84F] font-medium">
                        fresh Spinach
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-4 bg-[#FAFCF8] rounded-xl p-3 lg:p-4 shadow-2xl animate-float hidden lg:block border-2 border-[#E84C3D]"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#FFE5E5] rounded-xl flex items-center justify-center">
                      <span className="text-lg lg:text-2xl">🍎</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#2F3E2C] text-xs lg:text-sm">
                        35% Off
                      </div>
                      <div className="text-xs text-[#E84C3D] font-medium">
                        Premium Apples
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Install Section - Updated with Popup Button */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-[#2F3E2C] to-[#3E4F3A] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#6AA84F] rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F2C94C] rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-[#6AA84F]/30 text-white font-bold text-xs lg:text-sm mb-4 lg:mb-6 border-2 border-[#6AA84F]/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                  </svg>
                  Mobile App Available
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 lg:mb-6 leading-tight">
                  Get Our
                  <span className="block text-[#6AA84F] mt-2">Mobile App</span>
                </h2>

                <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                  Download our mobile app for a seamless shopping experience.
                  Shop fresh groceries, track orders, and get exclusive offers
                  right from your phone.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#6AA84F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm lg:text-base">
                        Offline Access
                      </h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Browse products without internet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#6AA84F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm lg:text-base">
                        Push Notifications
                      </h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Instant order updates & offers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#6AA84F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm lg:text-base">
                        Faster Loading
                      </h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Optimized for mobile devices
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#6AA84F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm lg:text-base">
                        Home Screen Access
                      </h4>
                      <p className="text-white/70 text-xs lg:text-sm">
                        Quick access like native apps
                      </p>
                    </div>
                  </div>
                </div>

                {/* Install Button - Opens Popup */}
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                  <button
                    onClick={openInstallPopup}
                    className="flex items-center justify-center space-x-2 bg-white text-[#2F3E2C] hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                    </svg>
                    <span>Install App Now</span>
                  </button>

                  <button
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps",
                        "_blank"
                      );
                    }}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#6AA84F] to-[#5A9841] text-white hover:from-[#5A9841] hover:to-[#4A872F] px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold text-base lg:text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <span className="text-lg">📱</span>
                    <span>Learn More</span>
                  </button>
                </div>
              </div>

              <div className="relative animate-fade-in">
                <div className="relative mx-auto max-w-md">
                  {/* Mobile Phone Frame */}
                  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-4 lg:p-6 shadow-2xl border-8 border-gray-900 mx-auto">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>

                    {/* Phone Screen */}
                    <div className="relative bg-gradient-to-br from-[#6AA84F] to-[#4A872F] rounded-2xl overflow-hidden h-96 lg:h-[28rem]">
                      {/* App Header */}
                      <div className="bg-white/10 backdrop-blur-sm p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">🛒</span>
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-sm">
                                Fresh Buckets
                              </h3>
                              <p className="text-white/80 text-xs">
                                Online Grocery
                              </p>
                            </div>
                          </div>
                          <div className="text-white">
                            <span className="text-xs">🕒 60 min</span>
                          </div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="p-4 space-y-4">
                        {/* Featured Product */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🍓</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-bold">
                                fresh Strawberries
                              </h4>
                              <p className="text-white/80 text-sm">
                                Fresh from farm
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-white font-bold text-lg">
                                  ₹2.99
                                </span>
                                <button className="bg-white text-[#6AA84F] px-3 py-1 rounded-lg text-xs font-bold">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Categories */}
                        <div className="grid grid-cols-3 gap-2">
                          {["🍎 Fruits", "🥬 Veggies", "🥛 Dairy"].map(
                            (item, idx) => (
                              <div
                                key={idx}
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center"
                              >
                                <div className="text-2xl mb-1">
                                  {item.split(" ")[0]}
                                </div>
                                <div className="text-white text-xs">
                                  {item.split(" ")[1]}
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {/* Install Prompt in App */}
                        <div
                          onClick={openInstallPopup}
                          className="bg-gradient-to-r from-[#F2C94C]/20 to-[#EB7A3D]/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-bold text-sm">
                                Install App
                              </p>
                              <p className="text-white/80 text-xs">
                                Tap for installation guide
                              </p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home Button */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* Floating App Icons */}
                  <div className="absolute -top-2 -right-2 bg-white rounded-xl p-3 shadow-xl hidden lg:block">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#6AA84F] to-[#4A872F] rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">FB</span>
                      </div>
                      <div>
                        <div className="text-[#2F3E2C] font-bold text-xs">
                          Fresh Buckets
                        </div>
                        <div className="text-[#4A5A42] text-xs">App</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="py-12 lg:py-20 bg-[#FAFCF8] relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236AA84F" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-[#6AA84F]/20 rounded-full text-[#2F3E2C] font-semibold text-xs lg:text-sm mb-4 lg:mb-6 border-2 border-[#6AA84F]/30">
                <svg
                  className="w-4 h-4 mr-2 text-[#6AA84F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14-7l2 7-2 7M5 4l2 7-2 7"
                  />
                </svg>
                Shop by Category
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3E2C] mb-4 lg:mb-6 leading-tight">
                Fresh <span className="text-[#6AA84F]">Categories</span>
              </h2>
              <p className="text-base lg:text-xl text-[#4A5A42] max-w-2xl mx-auto leading-relaxed">
                Explore our wide selection of fresh, fresh products across all
                categories
              </p>
            </div>

            <div className="flex justify-center flex-wrap gap-4 lg:gap-6">
              {/* Fresh Fruits */}
              <Link href="/product">
                <div className="group bg-gradient-to-br from-[#FFE5E5] to-[#FFD0D0] rounded-2xl p-4 lg:p-6 text-center hover:from-[#FFD0D0] hover:to-[#FFB8B8] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl category-hover">
                  <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                    🍎
                  </div>
                  <h3 className="font-bold text-[#2F3E2C] mb-1 lg:mb-2 text-sm lg:text-base">
                    Fresh Fruits
                  </h3>
                  <p className="text-xs lg:text-sm text-[#4A5A42] mb-2 lg:mb-3">
                    fresh & seasonal fruits
                  </p>
                  <div className="text-xs text-[#6AA84F] font-medium">
                    50+ products
                  </div>
                </div>
              </Link>

              {/* Vegetables */}
              <Link href="/product">
                <div className="group bg-gradient-to-br from-[#E4EDDF] to-[#D5E5CC] rounded-2xl p-4 lg:p-6 text-center hover:from-[#D5E5CC] hover:to-[#C6DDB9] transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl category-hover">
                  <div className="text-3xl lg:text-4xl mb-3 lg:mb-4 group-hover:animate-bounce">
                    🥬
                  </div>
                  <h3 className="font-bold text-[#2F3E2C] mb-1 lg:mb-2 text-sm lg:text-base">
                    Vegetables
                  </h3>
                  <p className="text-xs lg:text-sm text-[#4A5A42] mb-2 lg:mb-3">
                    Fresh garden vegetables
                  </p>
                  <div className="text-xs text-[#6AA84F] font-medium">
                    40+ products
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 lg:py-20 bg-[#E4EDDF] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%232F3E2C" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 bg-[#6AA84F]/20 rounded-full text-[#2F3E2C] font-semibold text-xs lg:text-sm mb-4 lg:mb-6 border-2 border-[#6AA84F]/30">
                <svg
                  className="w-4 h-4 mr-2 text-[#6AA84F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2F3E2C] mb-4 lg:mb-6 leading-tight">
                Premium <span className="text-[#6AA84F]">Features</span>
              </h2>
              <p className="text-base lg:text-xl text-[#4A5A42] max-w-3xl mx-auto leading-relaxed">
                Experience the best grocery shopping with our premium features
                and unmatched service quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <div className="text-center group cursor-pointer bg-[#FAFCF8] rounded-2xl p-6 border-2 border-[#DCE5D6] hover:border-[#6AA84F] transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-[#6AA84F]/20 to-[#6AA84F]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-[#6AA84F]"
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
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C] mb-2 lg:mb-3">
                  60 min Delivery
                </h3>
                <p className="text-sm lg:text-base text-[#4A5A42] leading-relaxed">
                  Lightning-fast delivery to your doorstep in just 60 minutes
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center group cursor-pointer bg-[#FAFCF8] rounded-2xl p-6 border-2 border-[#DCE5D6] hover:border-[#F2C94C] transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-[#F2C94C]/20 to-[#F2C94C]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-[#F2C94C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C] mb-2 lg:mb-3">
                  Fresh Guarantee
                </h3>
                <p className="text-sm lg:text-base text-[#4A5A42] leading-relaxed">
                  100% fresh products or full money back guarantee
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center group cursor-pointer bg-[#FAFCF8] rounded-2xl p-6 border-2 border-[#DCE5D6] hover:border-[#7A3E8E] transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-[#7A3E8E]/20 to-[#7A3E8E]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-[#7A3E8E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C] mb-2 lg:mb-3">
                  Best Prices
                </h3>
                <p className="text-sm lg:text-base text-[#4A5A42] leading-relaxed">
                  Competitive prices with regular discounts and offers
                </p>
              </div>

              {/* Feature 4 */}
              <div className="text-center group cursor-pointer bg-[#FAFCF8] rounded-2xl p-6 border-2 border-[#DCE5D6] hover:border-[#EB7A3D] transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-gradient-to-br from-[#EB7A3D]/20 to-[#EB7A3D]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-[#EB7A3D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#2F3E2C] mb-2 lg:mb-3">
                  24/7 Support
                </h3>
                <p className="text-sm lg:text-base text-[#4A5A42] leading-relaxed">
                  Round-the-clock customer support for all your needs
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomFooter />
    </div>
  );
};

export default FreshMartApp;
