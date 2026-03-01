"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import { useProductById } from "@src/hooks/apiHooks";
import { addToCart, selectCartItems } from "@src/redux/reducers/authSlice";
import { BASE_URL } from "@src/config/config";

// React Icons Imports
import {
  FiChevronRight,
  FiChevronUp,
  FiHome,
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiMinus,
  FiPlus,
  FiInfo,
  FiCheck,
  FiAward,
  FiThermometer,
  FiDroplet,
  FiCheckCircle,
  FiCopy,
  FiX,
  FiPackage,
  FiCoffee,
  FiFileText,
  FiPieChart,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCalendar,
  FiMapPin,
  FiTag,
} from "react-icons/fi";
import { IoLeafOutline } from "react-icons/io5";
import { TbWeight } from "react-icons/tb";

// ==================== INTERFACES ====================
interface ProductSize {
  id: number;
  weight: string;
  price: number;
  originalPrice: number;
  stock: number; // CHANGED: Added stock property
}

interface ProductNutrition {
  calories: number;
  carbs: string;
  sugar: string;
  fiber: string;
  vitaminC: string;
  potassium: string;
  folate: string;
  manganese: string;
  servingSize: string;
}

interface ProductStorage {
  temperature: string;
  humidity: string;
  tips: string[];
}

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  inStock: number;
  category: string;
  sku: string;
  brand: string;
  weight: string;
  origin: string;
  shelfLife: string;
  certifications: string[];
  images: string[];
  sizes: ProductSize[];
  description: string;
  detailedDescription: string;
  features: string[];
  nutrition: ProductNutrition;
  storage: ProductStorage;
  uses: string[];
  discount: number;
  rating: number;
  reviewCount: number;
}

interface CartItem {
  id: string;
  name: string;
  variant_id: number | null;
  image: string;
  selectedSize: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  image: string;
  category?: string;
  stock?: number;
  rating?: number;
}

// ==================== CONSTANTS ====================
const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const FEATURES_BADGES = [
  {
    icon: "FiTruck",
    text: "Free Delivery",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    icon: "IoLeafOutline",
    text: "100% fresh",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    icon: "FiShield",
    text: "Quality Checked",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

const TAB_CONFIG = [
  {
    id: "description" as const,
    label: "Description",
    icon: "FiFileText",
  },
  {
    id: "nutrition" as const,
    label: "Nutrition",
    icon: "FiPieChart",
  },
  {
    id: "storage" as const,
    label: "Storage",
    icon: "FiPackage",
  },
  {
    id: "uses" as const,
    label: "Uses",
    icon: "FiCoffee",
  },
];

// ==================== COMPONENTS ====================

// 1. Breadcrumb Component
const Breadcrumb = ({ productName }: { productName: string }) => (
  <nav className="mb-4 px-2">
    <div className="flex items-center text-xs text-gray-500 overflow-x-auto scrollbar-hide whitespace-nowrap py-2">
      <Link
        href="/"
        className="hover:text-green-600 transition-colors flex items-center gap-1"
      >
        <FiHome className="w-3 h-3" />
        <span className="hidden xs:inline">Home</span>
      </Link>
      <FiChevronRight className="w-3 h-3 mx-1 text-gray-400 flex-shrink-0" />
      <Link href="/product" className="hover:text-green-600 transition-colors">
        Products
      </Link>
      <FiChevronRight className="w-3 h-3 mx-1 text-gray-400 flex-shrink-0" />
      <span className="text-gray-900 font-medium truncate max-w-[120px]">
        {productName}
      </span>
    </div>
  </nav>
);

// 2. Mobile Gallery Modal Component
const MobileGalleryModal = ({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  showMobileGallery,
  setShowMobileGallery,
}: {
  product: ProductData;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  showMobileGallery: boolean;
  setShowMobileGallery: (show: boolean) => void;
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && product.images.length > selectedImageIndex + 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  if (!showMobileGallery) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-black">
        <button
          onClick={() => setShowMobileGallery(false)}
          className="text-white p-2"
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="text-white text-sm">
          {selectedImageIndex + 1} / {product.images.length}
        </div>
      </div>

      <div
        className="flex-1 relative flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className="w-full h-auto max-h-[70vh] object-contain"
          onError={handleImageError}
        />
      </div>

      <div className="p-4 bg-black">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImageIndex === index
                  ? "border-green-500"
                  : "border-gray-600"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Product Images Component
const ProductImages = ({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  isWishlisted,
  toggleWishlist,
  openShareModal,
  showMobileGallery,
  setShowMobileGallery,
}: {
  product: ProductData;
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  isWishlisted: boolean;
  toggleWishlist: () => void;
  openShareModal: () => void;
  showMobileGallery: boolean;
  setShowMobileGallery: (show: boolean) => void;
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && product.images.length > selectedImageIndex + 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  return (
    <>
      <div className="space-y-3 px-2">
        {/* Main Image with Touch Controls */}
        <div
          ref={imageContainerRef}
          className="relative bg-white rounded-xl shadow-sm overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setShowMobileGallery(true)}
        >
          <div className="aspect-square relative">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.discount > 0 && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                  {product.discount}% OFF
                </div>
              )}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                <IoLeafOutline className="w-3 h-3" />
                <span className="hidden xs:inline">fresh</span>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {selectedImageIndex + 1}/{product.images.length}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist();
                }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow flex items-center justify-center hover:scale-110 transition-all duration-200"
              >
                <FiHeart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                />
              </button> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openShareModal();
                }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow flex items-center justify-center hover:scale-110 transition-all duration-200"
              >
                <FiShare2 className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div
          ref={galleryRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
        >
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(index);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? "border-green-600 shadow scale-105"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      </div>

      <MobileGalleryModal
        product={product}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        showMobileGallery={showMobileGallery}
        setShowMobileGallery={setShowMobileGallery}
      />
    </>
  );
};

// 4. Product Info Component
const ProductInfo = ({
  product,
  selectedSize,
  quantity,
  currentPrice,
  currentOriginalPrice,
  setQuantity,
  handleSizeSelect,
  handleAddToCart,
  handleBuyNow,
  renderStars,
}: {
  product: ProductData;
  selectedSize: string;
  quantity: number;
  currentPrice: number;
  currentOriginalPrice: number;
  setQuantity: (quantity: number) => void;
  handleSizeSelect: (size: ProductSize) => void;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  renderStars: (rating: number) => React.ReactNode;
}) => {
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // CHANGED: Determine if the *selected* variant is in stock
  const currentVariantStock =
    product.sizes.find((s) => s.weight === selectedSize)?.stock || 0;

  return (
    <div className="space-y-4 px-2">
      {/* Category and Rating */}

      {/* Product Name */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Tagline */}
      <p className="text-gray-600 text-sm sm:text-base">{product.tagline}</p>

      {/* Price Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            ₹{currentPrice}
          </span>
          <span className="text-lg text-gray-400 line-through">
            ₹{currentOriginalPrice}
          </span>
          {product.discount > 0 && (
            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Save {product.discount}%
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">Inclusive of all taxes</div>
      </div>

      {/* Features Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {FEATURES_BADGES.map((badge, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 ${badge.bgColor} ${badge.textColor} px-3 py-2 rounded-lg text-xs`}
          >
            {badge.icon === "FiTruck" && <FiTruck className="w-4 h-4" />}
            {badge.icon === "IoLeafOutline" && (
              <IoLeafOutline className="w-4 h-4" />
            )}
            {badge.icon === "FiShield" && <FiShield className="w-4 h-4" />}
            <span>{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Stock Status - CHANGED: Shows status for currently selected size */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            currentVariantStock > 0
              ? "bg-green-500 animate-pulse"
              : "bg-red-500"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            currentVariantStock > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {currentVariantStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        {currentVariantStock > 0 && currentVariantStock < 10 && (
          <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
            Only {currentVariantStock} left!
          </span>
        )}
      </div>

      {/* Size Selection */}
      {product.sizes.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-900">
            Select Size:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {product.sizes.map((size) => {
              // CHANGED: Check specific variant stock
              const isOutOfStock = size.stock === 0;

              return (
                <button
                  key={size.id}
                  onClick={() => handleSizeSelect(size)}
                  // CHANGED: Apply disabled styling if stock is 0, but still clickable to view price/status
                  className={`px-3 py-3 rounded-lg border font-medium transition-all duration-200 relative ${
                    selectedSize === size.weight
                      ? "border-green-600 bg-green-50 text-green-700 shadow scale-105"
                      : isOutOfStock
                      ? "border-gray-100 bg-gray-50 text-gray-400"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-semibold">{size.weight}</div>
                  <div className="text-xs mt-1">
                    {isOutOfStock ? "Sold Out" : `₹${size.price}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">Quantity:</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              disabled={currentVariantStock === 0}
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <div className="w-12 text-center font-bold text-gray-900">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              disabled={currentVariantStock === 0}
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Total: ₹{currentPrice * quantity}
          </span>
        </div>
      </div>

      {/* Action Buttons - CHANGED: Disabled based on specific variant stock */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={currentVariantStock === 0}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:active:scale-100"
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>
            {currentVariantStock === 0 ? "Out of Stock" : "Add to Cart"}
          </span>
        </button>

        {/* <button
          onClick={handleBuyNow}
          disabled={currentVariantStock === 0}
          className="w-full bg-white hover:bg-gray-50 border-2 border-green-600 text-green-600 font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          <FiShoppingCart className="w-5 h-5" />
          <span>Buy Now</span>
        </button> */}
      </div>

      {/* Product Details Grid */}
      {/* <div className="pt-3 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <FiPackage className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-500">SKU</div>
              <div className="font-medium">{product.sku}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TbWeight className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-500">Weight</div>
              <div className="font-medium">{selectedSize}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-500">Origin</div>
              <div className="font-medium">{product.origin}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-500">Shelf Life</div>
              <div className="font-medium">{product.shelfLife}</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Certifications */}
      {product.certifications.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-100"
            >
              <FiAward className="w-3 h-3" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 5. Product Tabs Component
const ProductTabs = ({
  activeTab,
  setActiveTab,
  product,
}: {
  activeTab: "description" | "nutrition" | "storage" | "uses";
  setActiveTab: (tab: "description" | "nutrition" | "storage" | "uses") => void;
  product: ProductData;
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "nutrition":
        return (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Per serving: {product.nutrition?.servingSize}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(product.nutrition)
                .filter(([key]) => key !== "servingSize")
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white border border-gray-200 p-3 rounded-lg"
                  >
                    <div className="text-lg font-bold text-green-700">
                      {value}
                    </div>
                    <div className="text-xs text-gray-600 capitalize mt-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      case "storage":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiThermometer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Temperature</h4>
                    <p className="text-gray-700 text-sm">
                      {product.storage?.temperature}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiDroplet className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Humidity</h4>
                    <p className="text-gray-700 text-sm">
                      {product.storage?.humidity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Storage Tips</h4>
              <div className="space-y-2">
                {product.storage?.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
                  >
                    <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "uses":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.uses.map((use, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 p-4 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-800 text-sm pt-1">{use}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTabIcon = (iconName: string) => {
    switch (iconName) {
      case "FiFileText":
        return <FiFileText className="w-4 h-4" />;
      case "FiPieChart":
        return <FiPieChart className="w-4 h-4" />;
      case "FiPackage":
        return <FiPackage className="w-4 h-4" />;
      case "FiCoffee":
        return <FiCoffee className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 mx-2">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {getTabIcon(tab.icon)}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
};

// 6. Share Modal Component
const ShareModal = ({
  showShareModal,
  shareLink,
  isCopied,
  closeShareModal,
  copyToClipboard,
  shareOnWhatsApp,
}: {
  showShareModal: boolean;
  shareLink: string;
  isCopied: boolean;
  closeShareModal: () => void;
  copyToClipboard: () => void;
  shareOnWhatsApp: () => void;
}) => {
  if (!showShareModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Share This Product
          </h3>
          <button
            onClick={closeShareModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isCopied
                    ? "bg-green-600 text-white"
                    : "bg-green-50 text-green-700 hover:bg-green-100"
                }`}
              >
                <FiCopy className="w-4 h-4" />
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Share via
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={shareOnWhatsApp}
                className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mb-2 transition-colors">
                  <FiShare2 className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  WhatsApp
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={closeShareModal}
            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 7. Related Products Component
const RelatedProducts = ({
  relatedProducts,
  loadingRelatedProducts,
  handleRelatedProductClick,
}: {
  relatedProducts: RelatedProduct[];
  loadingRelatedProducts: boolean;
  handleRelatedProductClick: (id: string) => void;
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
  };

  if (loadingRelatedProducts) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 animate-pulse"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="p-3">
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8 mx-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">You May Also Like</h2>
        <Link
          href="/product"
          className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 text-sm"
        >
          <span>View All</span>
          <FiChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {relatedProducts.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => handleRelatedProductClick(item.id)}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 text-left w-full"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
              />
              {item.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {item.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                {item.name}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-600 ml-1">
                    {item.rating?.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{item.weight}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-gray-900">
                  ₹{item.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.originalPrice}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 8. Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 9. Error State Component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Header />
    <div className="pt-24 flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiInfo className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or failed to load.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================
const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  // ==================== STATE MANAGEMENT ====================
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "nutrition" | "storage" | "uses"
  >("description");
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showMobileGallery, setShowMobileGallery] = useState(false);

  // ==================== REDUX & API ====================
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const {
    isError,
    isLoading: apiLoading,
    data: productData,
    error,
    mutate: fetchProducts,
  } = useProductById();

  // ==================== EFFECTS ====================
  useEffect(() => {
    if (slug) {
      fetchProducts({
        id: slug,
      });
    }
  }, [fetchProducts, slug]);

  useEffect(() => {
    const handleApiResponse = () => {
      if (productData && !apiLoading && productData?.data?.data?.variants) {
        // REMOVED SUCCESS TOAST TO PREVENT SPAM
        setIsLoadingState(false);

        // Set share link
        if (typeof window !== "undefined") {
          setShareLink(`${window.location.origin}/productdetails/${slug}`);
        }

        // Initialize selected size and variant
        const variants = productData.data.data.variants;
        if (variants.length > 0) {
          const firstVariant = variants[0];
          setSelectedSize(firstVariant.name);
          setSelectedVariantId(firstVariant.id);
        }
      }
      if (isError) {
        // SHOW ERROR TOAST
        toast.error(
          `🔒 ${error || "Failed to load product. Please try again."}`
        );
        setIsLoadingState(false);
      }
    };

    handleApiResponse();
  }, [productData, apiLoading, error, isError, slug]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelatedProducts(true);
        const response = await fetch(`${BASE_URL}/api/products?limit=4`);
        const data = await response.json();

        if (data.status === "success" && data.data?.data?.data) {
          const products = data.data.data.data
            .filter((item: any) => item.id !== slug)
            .slice(0, 4)
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              originalPrice: item.price * 1.2,
              discount: Math.round(
                ((item.price * 1.2 - item.price) / (item.price * 1.2)) * 100
              ),
              weight: "1kg",
              image: item.images?.[0]?.url || DEFAULT_PRODUCT_IMAGE,
              category: item.category?.name,
              stock: item.stock,
              rating: 4.5,
            }));

          setRelatedProducts(products);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts(fallbackRelatedProducts);
      } finally {
        setLoadingRelatedProducts(false);
      }
    };

    fetchRelatedProducts();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ==================== DATA TRANSFORMATION ====================
  const transformProductData = useCallback((data: any): ProductData => {
    return {
      id: data.id,
      name: data.name,
      tagline: "Freshly harvested fresh produce",
      price: data.price,
      originalPrice: data.price * 1.2,
      inStock: data.stock,
      category: data.category.name,
      sku: data.sku,
      brand: "fresh Farm Fresh",
      weight: data.variants[0]?.name || "1kg",
      origin: "fresh Farms, India",
      shelfLife: `${data.expiryDays} days`,
      certifications: ["India fresh"],
      images:
        data.images && data.images.length > 0
          ? data.images
              .sort((a, b) => (b.isPrimary ? 1 : -1))
              .map((img: any) => img.url || DEFAULT_PRODUCT_IMAGE)
          : [DEFAULT_PRODUCT_IMAGE],
      sizes: data.variants.map((variant: any) => ({
        id: variant.id,
        weight: variant.name,
        price: variant.price,
        originalPrice: variant.price * 1.2,
        stock: variant.stock || 0, // CHANGED: Map stock from API
      })),
      description: data.description,
      detailedDescription: data.description,
      features: [
        "✓ 100% Certified fresh",
        "✓ Hand-picked at peak ripeness",
        "✓ Rich in flavor and nutrients",
        "✓ Perfect for healthy eating",
        "✓ Fresh daily delivery",
      ],
      nutrition: {
        calories: 60,
        carbs: "15g",
        sugar: "13.7g",
        fiber: "1.6g",
        vitaminC: "36.4mg",
        potassium: "168mg",
        folate: "43mcg",
        manganese: "0.1mg",
        servingSize: "100g",
      },
      storage: {
        temperature: "10-13°C",
        humidity: "85-90%",
        tips: [
          "Store in a cool, dry place",
          "Refrigerate to extend freshness",
          "Do not wash until ready to eat",
          `Use within ${data.expiryDays} days for best quality`,
        ],
      },
      uses: [
        "Fresh eating and snacking",
        "Smoothies and juice blends",
        "Desserts and salads",
        "Cooking and meal preparation",
        "Healthy food preparation",
      ],
      discount: Math.round(
        ((data.price * 1.2 - data.price) / (data.price * 1.2)) * 100
      ),
      rating: 4.8,
      reviewCount: 128,
    };
  }, []);

  const product: ProductData | null = productData?.data?.data
    ? transformProductData(productData.data.data)
    : null;

  // Fallback related products
  // const fallbackRelatedProducts: RelatedProduct[] = [
  //   {
  //     id: "2",
  //     name: "fresh Fresh Produce",
  //     price: 350,
  //     originalPrice: 420,
  //     discount: 17,
  //     weight: "1kg",
  //     image: DEFAULT_PRODUCT_IMAGE,
  //     rating: 4.5,
  //   },
  //   {
  //     id: "3",
  //     name: "Fresh fresh Items",
  //     price: 300,
  //     originalPrice: 360,
  //     discount: 17,
  //     weight: "1kg",
  //     image: DEFAULT_PRODUCT_IMAGE,
  //     rating: 4.7,
  //   },
  //   {
  //     id: "4",
  //     name: "Premium fresh Products",
  //     price: 280,
  //     originalPrice: 336,
  //     discount: 17,
  //     weight: "1kg",
  //     image: DEFAULT_PRODUCT_IMAGE,
  //     rating: 4.3,
  //   },
  //   {
  //     id: "5",
  //     name: "fresh Greens Bundle",
  //     price: 420,
  //     originalPrice: 500,
  //     discount: 16,
  //     weight: "1.5kg",
  //     image: DEFAULT_PRODUCT_IMAGE,
  //     rating: 4.9,
  //   },
  // ];

  const displayRelatedProducts =
    relatedProducts.length > 0 ? relatedProducts : [];

  // ==================== EVENT HANDLERS ====================
  const handleAddToCart = () => {
    if (!product || !selectedSizeDetails) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    // CHANGED: Prevent adding if stock is 0
    if (selectedSizeDetails.stock === 0) {
      toast.error("This variant is out of stock.");
      return;
    }

    const item: CartItem = {
      id: product.id,
      name: product.name,
      variant_id: selectedVariantId,
      image: product.images[0] || DEFAULT_PRODUCT_IMAGE,
      selectedSize,
      quantity,
      price: currentPrice,
      totalPrice: currentPrice * quantity,
    };

    dispatch(addToCart(item));
    toast.success(
      `Added ${quantity} × ${selectedSize} ${product.name} to cart! Total: ₹${
        currentPrice * quantity
      }`
    );
  };

  const handleBuyNow = () => {
    // CHANGED: Check variant stock
    if (selectedSizeDetails && selectedSizeDetails.stock === 0) {
      toast.error("This variant is out of stock.");
      return;
    }
    handleAddToCart();
    router.push("/checkout");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist! 💚"
    );
  };

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size.weight);
    setSelectedVariantId(size.id);
    setQuantity(1);
  };

  const openShareModal = () => {
    setShowShareModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    document.body.style.overflow = "unset";
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const shareOnWhatsApp = () => {
    const text = `Check out this amazing product: ${product?.name}\n${shareLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    closeShareModal();
  };

  const handleRelatedProductClick = (productId: string) => {
    router.push(`/productdetails/${productId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FiStar
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs sm:text-sm text-gray-600 ml-2">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // ==================== DERIVED VALUES ====================
  const selectedSizeDetails =
    product?.sizes?.find((size) => size.weight === selectedSize) ||
    product?.sizes?.[0];

  const currentPrice = selectedSizeDetails?.price || product?.price || 0;
  const currentOriginalPrice =
    selectedSizeDetails?.originalPrice || product?.originalPrice || 0;

  // ==================== LOADING STATE ====================
  if (apiLoading || isLoadingState || !selectedSize) {
    return <LoadingSkeleton />;
  }

  // ==================== ERROR STATE ====================
  if (!product || isError) {
    return <ErrorState onRetry={() => fetchProducts({ id: slug })} />;
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Header />
      </div>

      {/* Main Content */}
      <main className="pt-4 pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Breadcrumb */}
          <Breadcrumb productName={product.name} />

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-6">
            {/* Product Images */}
            <ProductImages
              product={product}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              openShareModal={openShareModal}
              showMobileGallery={showMobileGallery}
              setShowMobileGallery={setShowMobileGallery}
            />

            {/* Product Info */}
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              quantity={quantity}
              currentPrice={currentPrice}
              currentOriginalPrice={currentOriginalPrice}
              setQuantity={setQuantity}
              handleSizeSelect={handleSizeSelect}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              renderStars={renderStars}
            />
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 mx-2">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Product Description
              </h3>
              <div
                className={`${
                  !showMoreDescription && "max-h-24 overflow-hidden"
                } relative`}
              >
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.detailedDescription}
                </p>
                {!showMoreDescription && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
              <button
                onClick={() => setShowMoreDescription(!showMoreDescription)}
                className="text-green-600 text-sm font-medium mt-2 flex items-center gap-1"
              >
                {showMoreDescription ? "Show Less" : "Read More"}
                <FiChevronRight
                  className={`w-4 h-4 transition-transform ${
                    showMoreDescription ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Product Tabs */}
          {/* <ProductTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
          /> */}

          {/* Related Products */}
          <RelatedProducts
            relatedProducts={displayRelatedProducts}
            loadingRelatedProducts={loadingRelatedProducts}
            handleRelatedProductClick={handleRelatedProductClick}
          />
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <FiChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Share Modal */}
      <ShareModal
        showShareModal={showShareModal}
        shareLink={shareLink}
        isCopied={isCopied}
        closeShareModal={closeShareModal}
        copyToClipboard={copyToClipboard}
        shareOnWhatsApp={shareOnWhatsApp}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomFooter />
    </div>
  );
};

export default ProductDetailPage;
