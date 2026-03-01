// pages/ProductPage.jsx or app/products/page.jsx
"use client";
import React from "react";
import Header from "@src/component/components/header";
import Footer from "@src/component/components/footer";

const ProductPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-32 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Your product page content goes here */}
          <h1>Product Page</h1>
          {/* ... rest of your content ... */}
        </div>
      </main>

      {/* Footer - Automatically shows mobile footer on mobile, desktop footer on desktop */}
      <Footer />
    </div>
  );
};

export default ProductPage;
