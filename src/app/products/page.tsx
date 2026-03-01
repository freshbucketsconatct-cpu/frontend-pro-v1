"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import { useProductList, useAddWishList } from "@src/hooks/apiHooks";
import { selectUser } from "@src/redux/reducers/authSlice";
import { useAppSelector } from "@src/redux/store";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EcommerceProductListing3x3 = () => {
  // State Management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [processingWishlist, setProcessingWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  // REMOVED: showOnlyInStock state
  const [isProductsFetched, setIsProductsFetched] = useState(false);
  const [expandedFilterSections, setExpandedFilterSections] = useState({
    categories: true,
    price: false,
    // REMOVED: availability section state
  });

  const user = useAppSelector(selectUser);
  const itemsPerPage = 12;

  // API Hooks
  const {
    isError,
    isLoading,
    data: productData,
    error,
    mutate: fetchProducts,
  } = useProductList();

  const { mutate: addToWishlistAPI, isAddingToWishlist } = useAddWishList();

  // Initialize user and wishlist on mount
  useEffect(() => {
    const initializeUserAndWishlist = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUserId = localStorage.getItem("user_id");
          if (!storedUserId) {
            setUserId("1");
          } else {
            setUserId(storedUserId);
          }

          try {
            const savedWishlist = localStorage.getItem("wishlist");
            if (savedWishlist) {
              const parsedWishlist = JSON.parse(savedWishlist);
              if (Array.isArray(parsedWishlist)) {
                setWishlistItems(parsedWishlist);
              } else {
                localStorage.removeItem("wishlist");
                setWishlistItems([]);
              }
            }
          } catch {
            localStorage.removeItem("wishlist");
            setWishlistItems([]);
          }
        }
      } catch (error) {
        toast.error("Failed to initialize user session");
      }
    };

    initializeUserAndWishlist();
  }, []);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts({});
      } catch (error) {
        toast.error("Failed to fetch products");
      }
    };

    if (!isProductsFetched) {
      loadProducts();
    }
  }, [fetchProducts, isProductsFetched]);

  // Handle product fetch success/error
  useEffect(() => {
    try {
      if (isError && error) {
        const errorMessage =
          error?.response?.data?.message || "Failed to load products";
        toast.error(`Failed to load products: ${errorMessage}`);
      }

      if (productData && !isLoading && !isError) {
        setIsProductsFetched(true);
      }
    } catch (err) {
      console.error("Error in product data handling:", err);
    }
  }, [productData, isLoading, error, isError]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      if (wishlistItems && wishlistItems.length >= 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      }
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlistItems]);

  // Map fetched products to component format
  const products = React.useMemo(() => {
    try {
      if (
        !productData?.data?.data.data ||
        !Array.isArray(productData.data.data.data)
      ) {
        return [];
      }

      return productData.data.data.data
        .map((p) => {
          try {
            return {
              id: p.id,
              product_id: p.product_id,
              name: p.name || "Unnamed Product",
              price: parseFloat(p.price) || 0,
              category: p.category?.name || "Uncategorized",
              image:
                p.images?.[0]?.url ||
                "https://via.placeholder.com/400?text=No+Image",
              // UPDATED: Forced In Stock Status
              inStock: true,
              unit: "/ kg",
              description: p.description || "",
              stock: p.stock || 100, // Default to a positive number
              badge: "In Stock",
              badgeColor: "bg-green-500",
            };
          } catch (err) {
            console.error("Error mapping product:", p, err);
            return null;
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.error("Error processing products:", error);
      return [];
    }
  }, [productData]);

  // Dynamically generate categories
  const categories = React.useMemo(() => {
    try {
      return ["All", ...new Set(products.map((p) => p.category))];
    } catch (error) {
      console.error("Error generating categories:", error);
      return ["All"];
    }
  }, [products]);

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    try {
      if (!productId || !Array.isArray(wishlistItems)) return false;
      return wishlistItems.includes(productId);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      return false;
    }
  };

  // Add to wishlist
  const handleAddToWishlist = async (productId) => {
    if (!productId) {
      toast.error("Invalid product. Please try again.");
      return;
    }

    if (!userId) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    if (processingWishlist || isAddingToWishlist) {
      toast.error("Please wait for the current operation to complete");
      return;
    }

    if (isInWishlist(productId)) {
      toast.info("This item is already in your wishlist!", {
        icon: "ℹ️",
        duration: 3000,
      });
      return;
    }

    try {
      setProcessingWishlist(true);

      await new Promise((resolve, reject) => {
        addToWishlistAPI(
          {
            user_id: user?.user?.id || userId,
            product_id: productId,
          },
          {
            onSuccess: (response) => {
              try {
                setWishlistItems((prev) => {
                  if (prev.includes(productId)) return prev;
                  return [...prev, productId];
                });
                toast.success("Added to wishlist!");
                resolve(response);
              } catch (err) {
                toast.error("Failed to update wishlist");
                reject(err);
              }
            },
            onError: (error) => {
              let errorMessage = "Failed to add to wishlist";
              if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
              }
              toast.error(errorMessage);
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      console.error("Error in handleAddToWishlist:", error);
    } finally {
      setProcessingWishlist(false);
    }
  };

  // Enhanced Filtering
  const filteredProducts = React.useMemo(() => {
    try {
      return products
        .filter((product) => {
          const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;

          let matchesPrice = true;
          if (priceFilter !== "all") {
            switch (priceFilter) {
              case "under-100":
                matchesPrice = product.price < 100;
                break;
              case "100-300":
                matchesPrice = product.price >= 100 && product.price <= 300;
                break;
              case "over-300":
                matchesPrice = product.price > 300;
                break;
              default:
                matchesPrice = true;
            }
          }

          const matchesPriceRange =
            product.price >= minPrice && product.price <= maxPrice;

          // REMOVED: matchesStock check (always true now)

          return matchesCategory && matchesPrice && matchesPriceRange;
        })
        .sort((a, b) => {
          try {
            switch (sortBy) {
              case "price-low":
                return a.price - b.price;
              case "price-high":
                return b.price - a.price;
              case "name":
                return a.name.localeCompare(b.name);
              case "newest":
                return b.id - a.id;
              default:
                return 0;
            }
          } catch (err) {
            console.error("Error sorting products:", err);
            return 0;
          }
        });
    } catch (error) {
      console.error("Error in filteredProducts:", error);
      return [];
    }
  }, [products, selectedCategory, priceFilter, minPrice, maxPrice, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceFilter, sortBy, minPrice, maxPrice]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory("All");
    setPriceFilter("all");
    setMinPrice(0);
    setMaxPrice(1000);
    setSortBy("featured");
    // REMOVED: setShowOnlyInStock(false);
  };

  // Count active filters
  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (priceFilter !== "all") count++;
    if (minPrice > 0 || maxPrice < 1000) count++;
    // REMOVED: if (showOnlyInStock) count++;
    return count;
  }, [selectedCategory, priceFilter, minPrice, maxPrice]);

  // Toggle filter section
  const toggleFilterSection = (section) => {
    setExpandedFilterSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filter Sidebar Component
  const FilterSidebar = () => {
    const FilterSection = ({ title, section, children }) => (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleFilterSection(section)}
          className="w-full flex items-center justify-between py-3 px-1 hover:text-green-600 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-sm lg:text-base">
            {title}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              expandedFilterSections[section] ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expandedFilterSections[section] ? "max-h-[500px] pb-3" : "max-h-0"
          }`}
        >
          {children}
        </div>
      </div>
    );

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-fit sticky top-20">
        {/* Filter Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-full mt-0.5">
                    {activeFiltersCount} active
                  </span>
                )}
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Sections */}
        <div className="p-4">
          {/* Categories */}
          <FilterSection title="Categories" section="categories">
            <div className="space-y-1.5 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate">{category}</span>
                  {selectedCategory === category && (
                    <svg
                      className="w-4 h-4 text-white flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" section="price">
            <div className="space-y-4 pt-2">
              {/* Price Display */}
              <div className="flex items-center justify-between text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                <span>₹{minPrice}</span>
                <span className="text-xs text-gray-500">to</span>
                <span>₹{maxPrice}</span>
              </div>

              {/* Sliders */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-gray-600 font-medium">
                      Min: ₹{minPrice}
                    </label>
                    <span className="text-xs text-gray-400">
                      ₹0 - ₹{maxPrice}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gradient-to-r from-green-100 to-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs text-gray-600 font-medium">
                      Max: ₹{maxPrice}
                    </label>
                    <span className="text-xs text-gray-400">
                      ₹{minPrice} - ₹1000
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gradient-to-r from-green-100 to-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Quick Price Filters */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { value: "all", label: "All Prices" },
                  { value: "under-100", label: "Under ₹100" },
                  { value: "100-300", label: "₹100-300" },
                  { value: "over-300", label: "Over ₹300" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value)}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${
                      priceFilter === option.value
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* REMOVED: Availability FilterSection */}
        </div>

        {/* Results Summary */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              {filteredProducts.length}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">Products Found</p>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Filter Drawer
  const MobileFilterDrawer = () => (
    <>
      {/* Backdrop */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Filters</h3>
              {activeFiltersCount > 0 && (
                <span className="text-xs text-gray-600">
                  {activeFiltersCount} filters applied
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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

        {/* Filter Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto">
          <FilterSidebar />
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm shadow-sm"
          >
            Apply Filters • {filteredProducts.length} Products
          </button>
        </div>
      </div>
    </>
  );

  // Top Bar Component
  const TopBar = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-4 mt-14">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Page Title */}
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h1>
          <p className="text-xs lg:text-sm text-gray-600 mt-1">
            {filteredProducts.length} products available
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none sm:w-48">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm bg-white appearance-none cursor-pointer font-medium text-gray-700"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="name">Sort by: Name A-Z</option>
              <option value="price-low">Sort by: Price: Low to High</option>
              <option value="price-high">Sort by: Price: High to Low</option>
              <option value="newest">Sort by: Newest First</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
          >
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-green-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* View Mode Toggle (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-1 bg-gray-50 rounded-lg p-0.5 border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              title="List View"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Active:
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
            >
              {selectedCategory}
              <svg
                className="w-3 h-3 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {/* REMOVED: In Stock Only tag */}
          {activeFiltersCount > 1 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-600 hover:text-gray-900 font-medium hover:underline ml-auto"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Product Card Component
  const ProductCard = ({ product }) => {
    const productInWishlist = isInWishlist(product.id);
    const isProcessing = processingWishlist;

    // List View
    if (viewMode === "list") {
      return (
        <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="relative w-full lg:w-40 h-40 lg:h-auto bg-gray-50 overflow-hidden flex-shrink-0">
              <Link href={`/productdetails/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400?text=No+Image";
                  }}
                />
              </Link>

              {/* Badges - Always In Stock */}
              <div className="absolute top-2 left-2">
                <span
                  className={`${product.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
                >
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 lg:p-4 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <Link href={`/productdetails/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg leading-tight mt-1 hover:text-green-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                {/* Wishlist Button */}
                <div className="ml-2">
                  {!productInWishlist && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToWishlist(product.id);
                      }}
                      disabled={isProcessing}
                      className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-all border border-red-200"
                    >
                      {isProcessing ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg
                          className="w-4 h-4 text-red-500"
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
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                  {product.description}
                </p>
              )}

              {/* Price & Action */}
              <div className="mt-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-xl lg:text-2xl font-bold text-green-600">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>

                <Link
                  href={`/productdetails/${product.id}`}
                  className="w-full lg:w-auto"
                >
                  <button className="w-full lg:w-auto px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-green-600 hover:bg-green-700 text-white shadow-sm">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View (default)
    return (
      <div className="group bg-white overflow-hidden border border-gray-100 hover:border-green-300 rounded-lg hover:shadow-md transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Link href={`/productdetails/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400?text=No+Image";
              }}
            />
          </Link>

          {/* Badges - Always In Stock */}
          <div className="absolute top-2 left-2">
            <span
              className={`${product.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
            >
              {product.badge}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!productInWishlist && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToWishlist(product.id);
                }}
                disabled={isProcessing}
                className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-all border border-gray-100 ${
                  isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110"
                }`}
                title="Add to Wishlist"
              >
                {isProcessing ? (
                  <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-4 h-4 text-red-500"
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
                )}
              </button>
            )}
            <button
              onClick={() => setQuickViewProduct(product)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all hover:scale-110 border border-gray-100"
              title="Quick View"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* REMOVED: Out of Stock Overlay */}
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Category */}
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 block">
            {product.category}
          </span>

          {/* Product Name */}
          <Link href={`/productdetails/${product.id}`}>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 hover:text-green-600 transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-3">
            <span className="text-lg font-bold text-green-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 ml-1">{product.unit}</span>
          </div>

          {/* Action Button */}
          <Link href={`/productdetails/${product.id}`} className="block">
            <button className="w-full py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 bg-green-600 hover:bg-green-700 text-white hover:shadow-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    );
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div
      className={`grid ${
        viewMode === "grid"
          ? "grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
          : "grid-cols-1 gap-3"
      }`}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-100 overflow-hidden animate-pulse"
        >
          {viewMode === "grid" ? (
            <>
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </>
          ) : (
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-40 h-40 bg-gray-200"></div>
              <div className="flex-1 p-3 lg:p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="text-center py-12 lg:py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
        No Products Found
      </h3>
      <p className="text-sm lg:text-base text-gray-600 mb-6 max-w-md mx-auto">
        Try adjusting your filters to find what you're looking for.
      </p>
      <button
        onClick={clearAllFilters}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
      >
        Clear All Filters
      </button>
    </div>
  );

  // Products Grid Component
  const ProductsGrid = () => (
    <div id="products">
      {isLoading ? (
        <LoadingSkeleton />
      ) : paginatedProducts.length > 0 ? (
        <>
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
                : "grid-cols-1 gap-3"
            } mb-8`}
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                <div className="hidden sm:flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`min-w-[36px] h-9 rounded-lg font-medium text-sm transition-all ${
                            currentPage === pageNumber
                              ? "bg-green-600 text-white"
                              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span key={i} className="text-gray-400 text-sm px-1">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );

  // Quick View Modal Component
  const QuickViewModal = () => {
    if (!quickViewProduct) return null;

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center p-3 bg-black bg-opacity-50">
        <div
          className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-lg animate-fade-in relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <svg
              className="w-4 h-4 text-gray-600"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400?text=No+Image";
                  }}
                />
              </div>

              {/* Badges - Always In Stock */}
              <div className="absolute top-3 left-3">
                <span
                  className={`${quickViewProduct.badgeColor} text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm`}
                >
                  {quickViewProduct.badge}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Category */}
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                {quickViewProduct.category}
              </span>

              {/* Product Name */}
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl lg:text-3xl font-bold text-green-600">
                  ₹{quickViewProduct.price.toFixed(2)}
                </span>
              </div>

              {/* Stock Status - Always In Stock */}
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg mb-4 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium text-sm">
                  In Stock • Available
                </span>
              </div>

              {/* Description */}
              {quickViewProduct.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {quickViewProduct.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto space-y-2">
                <Link
                  href={`/productdetails/${quickViewProduct.id}`}
                  className="block"
                >
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all">
                    View Full Details
                  </button>
                </Link>
                {!isInWishlist(quickViewProduct.id) && (
                  <button
                    onClick={() => {
                      handleAddToWishlist(quickViewProduct.id);
                      setQuickViewProduct(null);
                    }}
                    disabled={processingWishlist || isAddingToWishlist}
                    className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-2.5 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center space-x-2"
                  >
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>Add to Wishlist</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-30 bg-white shadow-sm">
        <Header />
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 lg:py-6">
          {/* Top Bar */}
          <TopBar />

          {/* Main Layout with Sidebar */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Products Section */}
            <div className="flex-1 min-w-0">
              {/* Products Grid */}
              <ProductsGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 w-full z-30 lg:hidden">
        <MobileBottomFooter />
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer />

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Footer */}
      <Footer />

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          /* Mobile-specific styles */
          .text-xs {
            font-size: 11px !important;
          }
          .text-sm {
            font-size: 12px !important;
          }
          .text-base {
            font-size: 13px !important;
          }
          .text-lg {
            font-size: 14px !important;
          }
          .text-xl {
            font-size: 15px !important;
          }
          .text-2xl {
            font-size: 16px !important;
          }
          .text-3xl {
            font-size: 18px !important;
          }

          /* Button sizes */
          button:not(.mobile-footer-button) {
            min-height: 36px !important;
            font-size: 13px !important;
            padding: 8px 12px !important;
          }

          /* Input sizes */
          input,
          select {
            min-height: 36px !important;
            font-size: 14px !important;
          }

          /* Card spacing */
          .p-3 {
            padding: 12px !important;
          }
          .p-4 {
            padding: 16px !important;
          }

          .py-2 {
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
          .py-3 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          /* Gap sizes */
          .gap-2 {
            gap: 8px !important;
          }
          .gap-3 {
            gap: 12px !important;
          }
          .gap-4 {
            gap: 16px !important;
          }

          /* Icon sizes */
          .w-4,
          .h-4 {
            width: 16px !important;
            height: 16px !important;
          }
          .w-5,
          .h-5 {
            width: 20px !important;
            height: 20px !important;
          }
          .w-6,
          .h-6 {
            width: 24px !important;
            height: 24px !important;
          }

          /* Border radius */
          .rounded-lg {
            border-radius: 8px !important;
          }
          .rounded-xl {
            border-radius: 10px !important;
          }

          /* Line clamp for mobile */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          /* Tablet styles */
          .text-sm {
            font-size: 13px !important;
          }
          .text-base {
            font-size: 14px !important;
          }
          .text-lg {
            font-size: 15px !important;
          }
          .text-xl {
            font-size: 16px !important;
          }
        }

        /* Safe area insets */
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }

        .pt-safe {
          padding-top: env(safe-area-inset-top);
        }

        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, border-color 0.2s ease,
            transform 0.2s ease;
        }

        /* Range slider */
        input[type="range"] {
          -webkit-appearance: none;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%);
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #10b981;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(16, 185, 129, 0.3);
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: #10b981;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(16, 185, 129, 0.3);
          cursor: pointer;
        }

        /* Modal animation */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EcommerceProductListing3x3;
