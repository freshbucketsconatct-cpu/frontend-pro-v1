"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2F3E2C] text-white py-16 lg:py-20 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">
                  Fresh Buckets
                </h3>
                <p className="text-[#6AA84F] text-sm font-bold">
                  Fresh • Fast • Quality
                </p>
              </div>
            </div>
            <p className="text-[#DCE5D6] leading-relaxed mb-6">
              Your trusted partner for fresh, fresh groceries delivered fast to
              your doorstep. Quality guaranteed, satisfaction assured.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://twitter.com/freshbuckets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4A5A42] hover:bg-[#6AA84F] rounded-xl flex items-center justify-center transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 text-[#DCE5D6] group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/freshbuckets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4A5A42] hover:bg-[#6AA84F] rounded-xl flex items-center justify-center transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 text-[#DCE5D6] group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/freshbuckets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4A5A42] hover:bg-[#6AA84F] rounded-xl flex items-center justify-center transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 text-[#DCE5D6] group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/freshbuckets"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#4A5A42] hover:bg-[#6AA84F] rounded-xl flex items-center justify-center transition-all duration-200 group"
              >
                <svg
                  className="w-5 h-5 text-[#DCE5D6] group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Matching Header Navigation */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/home"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Categories</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/products?category=fruits"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Fresh Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=vegetables"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Vegetables
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=fresh"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 flex items-center group"
                >
                  <svg
                    className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  fresh Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support with Phone Numbers */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">
              Contact & Support
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6AA84F] mt-1 flex-shrink-0"
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
                <div>
                  <p className="text-white font-medium">Order Helpline</p>
                  <a
                    href="tel:91 8866858016"
                    className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 text-sm block"
                  >
                    +91 8866858016
                  </a>
                  <p className="text-[#7A8B70] text-xs mt-1">
                    For order placement, tracking & delivery queries
                  </p>
                  <p className="text-[#7A8B70] text-xs">
                    Mon-Sun: 7 AM - 11 PM
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6AA84F] mt-1 flex-shrink-0"
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
                <div>
                  <p className="text-white font-medium">Customer Inquiry</p>
                  <a
                    href="tel:+917801858016"
                    className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 text-sm block"
                  >
                    +91 7801858016
                  </a>
                  <p className="text-[#7A8B70] text-xs mt-1">
                    For product inquiries, complaints & feedback
                  </p>
                  <p className="text-[#7A8B70] text-xs">24/7 Available</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6AA84F] mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-white font-medium">Email Support</p>
                  <a
                    href="mailto:support@freshbuckets.com"
                    className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors duration-200 text-sm block"
                  >
                    support@freshbuckets.com
                  </a>
                  <p className="text-[#7A8B70] text-xs mt-1">
                    Response within 2 hours
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#4A5A42] pt-8 lg:pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-[#DCE5D6] text-sm text-center lg:text-left">
                © 2025 Fresh Buckets. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 lg:space-x-6 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/sitemap"
                  className="text-[#DCE5D6] hover:text-[#6AA84F] transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            {/* <div className="flex items-center space-x-4">
              <span className="text-[#DCE5D6] text-sm font-medium">
                Secure Payments:
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-white rounded-md flex items-center justify-center px-1">
                  <span className="text-xs font-bold text-gray-800">VISA</span>
                </div>
                <div className="w-10 h-6 bg-white rounded-md flex items-center justify-center px-1">
                  <span className="text-xs font-bold text-gray-800">MC</span>
                </div>
                <div className="w-10 h-6 bg-white rounded-md flex items-center justify-center px-1">
                  <span className="text-xs font-bold text-gray-800">UPI</span>
                </div>
                <div className="w-10 h-6 bg-white rounded-md flex items-center justify-center px-1">
                  <span className="text-xs font-bold text-gray-800">Paytm</span>
                </div>
                <div className="w-10 h-6 bg-white rounded-md flex items-center justify-center px-1">
                  <span className="text-xs font-bold text-gray-800">COD</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-[#4A5A42]">
            <div className="flex flex-col lg:flex-row items-center justify-between text-[#7A8B70] text-sm">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <p>
                  Fresh Buckets is a registered trademark. GSTIN:
                  24AABCF1234M1Z5
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-[#6AA84F] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-[#6AA84F] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Fresh Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
