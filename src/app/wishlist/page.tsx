"use client";
import React, { useState, useEffect } from "react";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import {
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoHeartOutline,
} from "react-icons/io5";
import { TbTruckDelivery, TbRefresh } from "react-icons/tb";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";
import Header from "@src/component/components/header";
import Footer from "@src/component/components/footer";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import { BASE_URL } from "@src/config/config";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);
  const user = useAppSelector(selectUser);
  const router = useRouter();

  // Fetch wishlist data from API
  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is logged in
        if (!user?.user?.id) {
          toast.error("Please login to view your wishlist");
        }

        const response = await fetch(
          `${BASE_URL}/api/products/wishlist/${user.user.id}`
        );

        if (!response.ok) {
          toast.error(`Failed to fetch wishlist: ${response.status}`);
        }

        const result = await response.json();

        // Extract wishlist data from nested response structure
        if (result.status === "success" && result.data.success) {
          const transformedData = result.data.data.map((item) => ({
            id: item.product.id,
            uuid: item.uuid, // This is the wishlist item UUID for deletion
            wishlistId: item.wishlist_id,
            name: item.product.name,
            description:
              item.product.description || "Premium quality fresh product",
            price: item.product.price,
            originalPrice:
              item.product.originalPrice || item.product.price * 1.2,
            image:
              item.product.images && item.product.images.length > 0
                ? item.product.images[0].url
                : "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
            inStock: item.product.inStock === "AVILABLE",
            limitedStock: item.product.stock < 10,
            unit: "kg",
            stock: item.product.stock,
            sku: item.product.sku,
            category: item.product.category || "Fresh Produce",
            discount:
              Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0,
            isfresh: Math.random() > 0.5,
            isBestSeller: Math.random() > 0.7,
          }));

          setWishlistItems(transformedData);
        } else {
          toast.error(result.data.message || "Failed to load wishlist");
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(err.message || "Failed to load wishlist. Please try again.");
        toast.error(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    if (user?.user?.id) {
      fetchWishlistData();
    }
  }, [user?.user?.id]);

  // Remove item from wishlist
  const removeFromWishlist = async (uuid) => {
    try {
      if (!user?.user?.id) {
        toast.error("Please login to remove items");
        return;
      }

      setRemovingItemId(uuid);

      const response = await fetch(
        `${BASE_URL}/api/products/wishlist/remove/${uuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.user.id,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to remove from wishlist");
      }

      const result = await response.json();
      console.log("Remove wishlist response:", result);

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.uuid !== uuid)
      );
      toast.success("Item removed from wishlist");
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error(err.message || "Failed to remove item");
    } finally {
      setRemovingItemId(null);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    try {
      setAddingToCartId(item.id);

      // TODO: Implement add to cart API call
      // const response = await fetch('http://NEXT_PUBLIC_BACKEND_BASE_URL/api/cart/add', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: user.user.id,
      //     productId: item.id,
      //     quantity: 1
      //   })
      // });

      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      toast.success("Added to cart successfully!");

      // Remove from wishlist after adding to cart
      await removeFromWishlist(item.uuid);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <AiFillStar
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs sm:text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#059669",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#059669",
            },
          },
          error: {
            style: {
              background: "#dc2626",
            },
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Mobile Header Bar */}

      {/* Main Content */}
      <main className="">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6 lg:mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  My Wishlist
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  {loading
                    ? "Loading your saved items..."
                    : `${wishlistItems.length} ${
                        wishlistItems.length === 1 ? "item" : "items"
                      } saved for later`}
                </p>
              </div>
              <button
                onClick={() => router.push("/products")}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg lg:rounded-xl hover:bg-gray-50 transition-colors active:scale-95"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">
                  Continue Shopping
                </span>
              </button>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Wishlist Items */}
            <div className="lg:col-span-2">
              {/* Loading State */}
              {loading && <SkeletonLoader />}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                  <div className="max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IoAlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Oops! Something went wrong
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors active:scale-95 text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && wishlistItems.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IoHeartOutline className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Save your favorite products to buy them later
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => router.push("/products")}
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors active:scale-95 text-sm"
                      >
                        Start Shopping
                      </button>
                      <button
                        onClick={() => router.push("/products")}
                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors active:scale-95 text-sm"
                      >
                        Browse Categories
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Items Grid */}
              {!loading && !error && wishlistItems.length > 0 && (
                <>
                  {/* Mobile Grid View */}
                  <div className="lg:hidden">
                    <div className="grid grid-cols-2 gap-3">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.uuid}
                          className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 relative group"
                        >
                          {/* Image Container */}
                          <div
                            className="relative aspect-square cursor-pointer"
                            onClick={() =>
                              router.push(`/productdetails/${item.id}`)
                            }
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                              }}
                            />
                            {/* Badges */}
                            <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                              {item.discount > 0 && (
                                <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                  {item.discount}% OFF
                                </div>
                              )}
                              {item.isfresh && (
                                <div className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                  fresh
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-2.5">
                            <div
                              className="cursor-pointer mb-1.5"
                              onClick={() =>
                                router.push(`/productdetails/${item.id}`)
                              }
                            >
                              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-0.5">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {item.category}
                              </p>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-2">
                              {item.limitedStock ? (
                                <div className="flex items-center text-xs text-orange-600 font-medium">
                                  <IoAlertCircle className="w-3 h-3 mr-1" />
                                  Only {item.stock} left
                                </div>
                              ) : item.inStock ? (
                                <div className="flex items-center text-xs text-green-600 font-medium">
                                  <IoCheckmarkCircle className="w-3 h-3 mr-1" />
                                  In Stock
                                </div>
                              ) : (
                                <div className="text-xs text-red-600 font-medium">
                                  Out of Stock
                                </div>
                              )}
                            </div>

                            {/* Price */}
                            <div className="mb-2.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base font-bold text-gray-900">
                                  ₹{item.price.toFixed(2)}
                                </span>
                                {item.discount > 0 && (
                                  <span className="text-xs text-gray-500 line-through">
                                    ₹{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">
                                per {item.unit}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => removeFromWishlist(item.uuid)}
                                disabled={removingItemId === item.uuid}
                                className="flex-1 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1"
                              >
                                {removingItemId === item.uuid ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                    Removing
                                  </>
                                ) : (
                                  <>
                                    <FiTrash2 className="w-3 h-3" />
                                    Remove
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => addToCart(item)}
                                disabled={
                                  addingToCartId === item.id || !item.inStock
                                }
                                className="flex-1 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {addingToCartId === item.id
                                  ? "Adding..."
                                  : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop List View */}
                  <div className="hidden lg:block space-y-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.uuid}
                        className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div
                            className="relative flex-shrink-0 cursor-pointer"
                            onClick={() =>
                              router.push(`/productdetails/${item.id}`)
                            }
                          >
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
                                }}
                              />
                            </div>
                            {/* Badges */}
                            {item.discount > 0 && (
                              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                                {item.discount}% OFF
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() =>
                                  router.push(`/productdetails/${item.id}`)
                                }
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-base font-bold text-gray-900 truncate">
                                    {item.name}
                                  </h3>
                                  {item.isfresh && (
                                    <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                                      🌱 fresh
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1">
                                  {item.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {item.category} • SKU: {item.sku}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromWishlist(item.uuid)}
                                disabled={removingItemId === item.uuid}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                              >
                                {removingItemId === item.uuid ? (
                                  <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <FiTrash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xl font-bold text-gray-900">
                                    ₹{item.price.toFixed(2)}
                                  </span>
                                  {item.discount > 0 && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ₹{item.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500">
                                  per {item.unit}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => addToCart(item)}
                                  disabled={
                                    addingToCartId === item.id || !item.inStock
                                  }
                                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 ${
                                    item.inStock
                                      ? "bg-green-600 hover:bg-green-700 text-white"
                                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  } disabled:opacity-50`}
                                >
                                  {addingToCartId === item.id ? (
                                    <span className="flex items-center gap-1.5">
                                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                      Adding...
                                    </span>
                                  ) : (
                                    "Add to Cart"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping Footer */}
                  <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600 text-sm">
                        <span className="font-medium">
                          {wishlistItems.length}
                        </span>{" "}
                        items in wishlist
                      </div>
                      <button
                        onClick={() => router.push("/products")}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          Continue Shopping
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar - Why Shop With Us */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Benefits Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Why Shop With Us?
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        icon: IoLeafOutline,
                        title: "100% fresh",
                        desc: "Certified fresh produce",
                        color: "text-green-600",
                        bgColor: "bg-green-50",
                      },
                      {
                        icon: IoShieldCheckmarkOutline,
                        title: "Secure Payment",
                        desc: "SSL encrypted checkout",
                        color: "text-blue-600",
                        bgColor: "bg-blue-50",
                      },
                      {
                        icon: TbRefresh,
                        title: "Easy Returns",
                        desc: "30-day return policy",
                        color: "text-orange-600",
                        bgColor: "bg-orange-50",
                      },
                      {
                        icon: TbTruckDelivery,
                        title: "Fast Delivery",
                        desc: "Free shipping on ₹4150+",
                        color: "text-purple-600",
                        bgColor: "bg-purple-50",
                      },
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${benefit.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <benefit.icon
                            className={`text-lg ${benefit.color}`}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {benefit.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 p-5">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => router.push("/cart")}
                      className="w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors active:scale-95"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <FiShoppingCart className="text-green-600 w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Go to Cart
                          </p>
                          <p className="text-xs text-gray-500">
                            3 items pending
                          </p>
                        </div>
                      </div>
                      <span className="text-green-600">→</span>
                    </button>
                    <button
                      onClick={() => router.push("/recently-viewed")}
                      className="w-full flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors active:scale-95"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🕒</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Recently Viewed
                          </p>
                          <p className="text-xs text-gray-500">
                            Continue shopping
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-600">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomFooter />
      <Footer />

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

export default WishlistPage;
