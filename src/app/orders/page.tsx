"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import { BASE_URL } from "@src/config/config";
import { selectUser } from "@src/redux/reducers/authSlice";
import { useAppSelector } from "@src/redux/store";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";

const OrdersPage = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const user = useAppSelector(selectUser);

  // Ref for intersection observer
  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  const LIMIT = 10; // Items per page

  // Get user ID from localStorage or context
  const getUserId = () => {
    if (typeof window !== "undefined") {
      const userId = user?.user?.id;
      return userId;
    }
    return null;
  };

  // Fetch orders from API
  const fetchOrders = useCallback(
    async (pageNum) => {
      if (loading) return; // Prevent duplicate requests

      try {
        setLoading(true);
        setError(null);

        const userId = getUserId();
        if (!userId) {
          // toast.error("User not authenticated");
          // handled silently to prevent loops if user is loading
        }

        const response = await fetch(
          `${BASE_URL}/api/orders/getuser/${userId}?page=${pageNum}&limit=${LIMIT}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // toast.error(`Failed to fetch orders`);
        }

        const result = await response.json();

        if (result.status === "success" && result.data) {
          const newOrders = result.data.data || [];
          const pagination = result.data.meta || {}; // Updated to 'meta' based on your JSON

          // Append new orders to existing ones
          setOrders((prevOrders) => {
            // Prevent duplicate orders
            const existingIds = new Set(prevOrders.map((o) => o.id));
            const uniqueNewOrders = newOrders.filter(
              (order) => !existingIds.has(order.id)
            );
            return [...prevOrders, ...uniqueNewOrders];
          });

          setTotalOrders(pagination.total || 0);
          setHasMore(pageNum < (pagination.totalPages || 1));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Initial fetch on component mount
  useEffect(() => {
    fetchOrders(1);
  }, []);

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          fetchOrders(nextPage);
          return nextPage;
        });
      }
    },
    [hasMore, loading, fetchOrders]
  );

  // Setup Intersection Observer
  useEffect(() => {
    const option = {
      root: null, // viewport
      rootMargin: "200px", // Load 200px before reaching the bottom
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, option);

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Map API status to UI status
  const mapOrderStatus = (apiStatus) => {
    const statusMap = {
      CONFIRMED: "processing",
      PENDING: "processing",
      PROCESSING: "processing",
      SHIPPED: "in-transit",
      DELIVERED: "delivered",
      CANCELLED: "cancelled",
    };
    return statusMap[apiStatus] || "processing";
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const badges = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "✓",
        label: "Delivered",
      },
      "in-transit": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "🚚",
        label: "In Transit",
      },
      processing: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "⏳",
        label: "Processing",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "✗",
        label: "Cancelled",
      },
    };
    return badges[status] || badges.processing;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Error state
  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Order Not Found
            </h3>
            <p className="text-base text-gray-600 mb-6">
              We couldn’t find any orders for your account.
            </p>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <style jsx global>{`
        .order-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(22, 163, 74, 0.15);
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @media (max-width: 640px) {
          .order-card:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">Showing {orders.length} orders</p>
        </div>

        {orders.length === 0 && !loading ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 sm:w-24 sm:h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              You haven't placed any orders yet.
            </p>
            <Link href="/">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:space-y-4">
              {orders.map((order, index) => {
                const mappedStatus = mapOrderStatus(order.status);
                const statusBadge = getStatusBadge(mappedStatus);

                return (
                  <div
                    key={order.id}
                    className="order-card bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                    style={{ animationDelay: `${(index % 10) * 0.05}s` }}
                  >
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 lg:p-6 border-b border-green-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900">
                              Order #{order.order_id}
                            </h3>
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text}`}
                            >
                              {statusBadge.icon} {statusBadge.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <span>{formatDate(order.placedAt)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>{order.items?.length || 0} items</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>{order.paymentMethod}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                          <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-gray-600">
                              Total Amount
                            </p>
                            <p className="text-lg sm:text-xl lg:text-2xl font-black text-green-600">
                              ₹{parseFloat(order.grandTotal).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setSelectedOrder(
                                selectedOrder === order.id ? null : order.id
                              )
                            }
                            className="p-2 rounded-lg hover:bg-green-200 text-green-700 transition-colors"
                          >
                            <svg
                              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                                selectedOrder === order.id ? "rotate-180" : ""
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
                        </div>
                      </div>
                    </div>

                    {/* Order Details (Expandable) */}
                    {selectedOrder === order.id && (
                      <div className="p-3 sm:p-4 lg:p-6 animate-slide-in">
                        {/* Order Items */}
                        <div className="mb-4 sm:mb-6">
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
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
                            <span>Order Items</span>
                          </h4>
                          <div className="space-y-2 sm:space-y-3">
                            {order.items?.map((item) => {
                              // --- CHANGE START: Correct Data Extraction based on JSON ---
                              const variant = item.variant;
                              const product = variant?.product || item.product;
                              const unitLabel = variant?.unit?.short; // e.g., "gm", "kg"
                              const variantName = variant?.name;
                              // --- CHANGE END ---

                              return (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl"
                                >
                                  <img
                                    src={
                                      product?.image ||
                                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200"
                                    }
                                    alt={product?.name || "Product"}
                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg object-cover flex-shrink-0"
                                    onError={(e) => {
                                      e.target.src =
                                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200";
                                    }}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                                      {product?.name || "Product"}
                                    </h5>

                                    {/* --- CHANGE START: Display Variant + Unit --- */}
                                    {(variantName || unitLabel) && (
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        {variantName}{" "}
                                        {unitLabel ? `- ${unitLabel}` : ""}
                                      </p>
                                    )}
                                    {/* --- CHANGE END --- */}

                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                      Qty: {item.quantity} × ₹
                                      {parseFloat(item.price).toFixed(2)}
                                    </p>
                                  </div>
                                  <p className="font-bold text-green-600 text-sm sm:text-base whitespace-nowrap">
                                    ₹{parseFloat(item.total).toFixed(2)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2">
                          <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="text-gray-700">Subtotal</span>
                            <span className="font-semibold text-gray-900">
                              ₹{parseFloat(order.totalAmount).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm sm:text-base">
                            <span className="text-gray-700">
                              Delivery Charges
                            </span>
                            <span className="font-semibold text-gray-900">
                              ₹{parseFloat(order.shippingCost).toFixed(2)}
                            </span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex items-center justify-between text-sm sm:text-base">
                              <span className="text-gray-700">Discount</span>
                              <span className="font-semibold text-green-600">
                                -₹{parseFloat(order.discount).toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div className="border-t-2 border-green-300 pt-2 mt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-base sm:text-lg font-black text-gray-900">
                                Grand Total
                              </span>
                              <span className="text-xl sm:text-2xl font-black text-green-600">
                                ₹{parseFloat(order.grandTotal).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          <Link
                            href={"/contact"}
                            className="w-full px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200 text-sm sm:text-base sm:col-span-2"
                          >
                            <p className="text-center">Need Help?</p>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              ref={loaderRef}
              className="flex justify-center items-center py-8"
            >
              {loading && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 font-semibold">
                    Loading more orders...
                  </p>
                </div>
              )}
              {!hasMore && orders.length > 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-600 font-semibold mb-4">
                    ✓ You've reached the end of your orders
                  </p>
                  <button
                    onClick={scrollToTop}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {orders.length > 5 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 z-50"
          aria-label="Scroll to top"
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <Footer />
    </div>
  );
};

export default OrdersPage;
