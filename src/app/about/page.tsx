"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

// --- Premium Icon Set (No External Dependencies) ---
const Icons = {
  // General
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
  Leaf: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 3.033c5.25 4.965 2.625 15.37-6.75 14.218 5.25-9.375 9-14.25 14.625-14.25-1.5 8.625-5.25 13.5-12.75 12.375 3-4.5 5.625-10.875 1.125-13.875L9.375 7.158"
      />
    </svg>
  ),
  Tractor: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  ),
  Star: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  ),

  // Mission/Values
  ShieldCheck: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  ),
  Truck: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  ),
  Lightning: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
  Heart: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  ),
  Currency: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Refresh: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),

  // Products
  Apple: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 4c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"
        opacity="0.8"
      />
      <path d="M14.5 9a2.5 2.5 0 0 0-5 0" stroke="currentColor" fill="none" />
    </svg>
  ),
  Carrot: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  ), // Abstracted

  // UI
  ShoppingBag: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
  Mobile: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  ),
  Medal: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 01-1.125-1.125v-9.375m.955 4.243a5.21 5.21 0 118.534-4.243 5.21 5.21 0 01-8.534 4.243zm0 0V2.25L9 2.25"
      />
    </svg>
  ),
};

// Main About Page Component
const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef([]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: "75K+",
      label: "Happy Families",
      icon: <Icons.Users />,
      color: "bg-green-100 text-green-700",
    },
    {
      number: "3000+",
      label: "Fresh Products",
      icon: <Icons.Leaf />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      number: "850+",
      label: "Partner Farms",
      icon: <Icons.Tractor />,
      color: "bg-orange-100 text-orange-700",
    },
    {
      number: "4.9★",
      label: "Customer Rating",
      icon: <Icons.Star />,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "FreshBucket has transformed our family's eating habits. The fresh vegetables are always crisp and flavorful.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1a1?auto=format&fit=crop&w=100&q=80",
      highlight: "Family health transformed",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, NCR",
      rating: 5,
      text: "As a health-conscious individual, I appreciate the quality. They taste like they're straight from the farm!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      highlight: "Farm-fresh taste",
    },
    {
      name: "Sneha Gupta",
      location: "Bangalore",
      rating: 5,
      text: "The seasonal fruits selection is amazing! My kids love the sweet mangoes and crisp apples.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      highlight: "Kids love it!",
    },
    {
      name: "Vikram Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Perfect for working professionals! Fresh vegetables delivered at 7 AM. Saves me hours every week.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      highlight: "Time-saving",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      subtitle: "Freshness Delivered in 60 minutes",
      content:
        "To revolutionize how India eats by delivering farm-fresh, 100% fresh fruits and vegetables directly to urban households within 60 minutes. We make healthy eating convenient and accessible.",
      points: [
        "30-minute delivery guarantee",
        "Direct sourcing from farms",
        "7-point quality check",
        "Supporting sustainable farming",
      ],
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      cta: "Shop Fresh Now",
    },
    vision: {
      title: "Our Vision",
      subtitle: "India's #1 Fresh Food Platform",
      content:
        "To become India's most trusted and largest fresh produce delivery platform, serving 1 million households daily while supporting 10,000+ farmers with sustainable livelihoods.",
      points: [
        "Carbon-neutral delivery by 2025",
        "Empowering 10,000+ farmers",
        "Pan-India presence in 50+ cities",
        "Zero food waste commitment",
      ],
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      cta: "Join Our Journey",
    },
    values: [
      {
        title: "Freshness Guarantee",
        desc: "Delivered within 24 hours of harvest.",
        icon: <Icons.Leaf />,
        color: "bg-green-50 text-green-600",
      },
      {
        title: "Farm-to-Door",
        desc: "Direct from farmer to you.",
        icon: <Icons.Tractor />,
        color: "bg-yellow-50 text-yellow-600",
      },
      {
        title: "Quality Certified",
        desc: "Strict quality checks. 100% satisfaction.",
        icon: <Icons.ShieldCheck />,
        color: "bg-blue-50 text-blue-600",
      },
      {
        title: "Sustainable",
        desc: "Eco-friendly packaging. fresh practices.",
        icon: <Icons.Leaf />,
        color: "bg-emerald-50 text-emerald-600",
      },
      {
        title: "Customer First",
        desc: "24/7 support. Easy returns.",
        icon: <Icons.Heart />,
        color: "bg-red-50 text-red-600",
      },
      {
        title: "Transparent",
        desc: "No hidden charges. Honest pricing.",
        icon: <Icons.Currency />,
        color: "bg-purple-50 text-purple-600",
      },
    ],
  };

  const features = [
    {
      title: "Farm Fresh",
      description: "Hand-picked daily from certified farms",
      icon: <Icons.Tractor />,
      color: "text-green-600 bg-green-50",
      details: ["fresh", "No Chemicals"],
    },
    {
      title: "Super Fast",
      description: "Fastest fresh produce delivery in India",
      icon: <Icons.Lightning />,
      color: "text-yellow-600 bg-yellow-50",
      details: ["Metro Cities", "On-time"],
    },
    {
      title: "Chemical Free",
      description: "Completely pesticide-free produce",
      icon: <Icons.Leaf />,
      color: "text-emerald-600 bg-emerald-50",
      details: ["Certified", "Safe for Kids"],
    },
    {
      title: "Easy Returns",
      description: "100% satisfaction money back",
      icon: <Icons.Refresh />,
      color: "text-blue-600 bg-blue-50",
      details: ["Instant Refund", "No Questions"],
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Farm Selection",
      description: "Certified fresh farms",
      icon: <Icons.Leaf />,
    },
    {
      step: "02",
      title: "Quality Check",
      description: "7-point inspection",
      icon: <Icons.ShieldCheck />,
    },
    {
      step: "03",
      title: "Fast Packing",
      description: "Packed in 15 mins",
      icon: <Icons.Lightning />,
    },
    {
      step: "04",
      title: "Doorstep Delivery",
      description: "Home in 60 mins",
      icon: <Icons.Truck />,
    },
  ];

  const categories = [
    {
      name: "Seasonal Fruits",
      items: ["Mangoes", "Apples", "Bananas"],
      icon: <Icons.Apple />,
    },
    {
      name: "Vegetables",
      items: ["Tomatoes", "Potatoes", "Onions"],
      icon: <Icons.Carrot />,
    }, // Reused generic
    {
      name: "Exotic",
      items: ["Avocados", "Kiwis", "Broccoli"],
      icon: <Icons.Leaf />,
    },
    {
      name: "Leafy Greens",
      items: ["Spinach", "Lettuce", "Kale"],
      icon: <Icons.Leaf />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .fade-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 700ms, transform 700ms;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .text-gradient {
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <Header />

      <main className="pt-16 pb-24 lg:pb-0">
        {/* --- Hero Section --- */}
        <section
          id="hero"
          ref={(el) => (sectionsRef.current[0] = el)}
          className={`relative min-h-[600px] flex items-center justify-center overflow-hidden bg-white ${
            isVisible.hero ? "fade-enter-active" : "fade-enter"
          }`}
        >
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 bg-yellow-50 rounded-full blur-3xl opacity-60"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider mb-6 border border-green-200">
                <div className="w-4 h-4">
                  <Icons.Medal />
                </div>{" "}
                INDIA'S #1 FRESH DELIVERY
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                Farm Fresh <br />
                <span className="text-gradient">To Your Doorstep</span>
              </h1>
              <p className="text-gray-500 text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
                Experience the taste of 100% fresh produce delivered directly
                from local farms to your kitchen in under 60 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href={"/products"}>
                  <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <div className="w-5 h-5">
                      <Icons.ShoppingBag />
                    </div>{" "}
                    Shop Now
                  </button>
                </Link>
                <button className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <div className="w-5 h-5">
                    <Icons.Mobile />
                  </div>{" "}
                  Get App
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section
          id="stats"
          ref={(el) => (sectionsRef.current[1] = el)}
          className={`py-8 ${
            isVisible.stats ? "fade-enter-active" : "fade-enter"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`${stat.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300`}
                >
                  <div className="w-8 h-8 mx-auto mb-2 opacity-80">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm font-semibold opacity-80 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Story Tabs Section --- */}
        <section
          id="tabs"
          ref={(el) => (sectionsRef.current[2] = el)}
          className={`py-16 md:py-24 bg-white ${
            isVisible.tabs ? "fade-enter-active" : "fade-enter"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                Why <span className="text-green-600">FreshBucket?</span>
              </h2>
              <p className="text-gray-500">
                Building a healthier India, one delivery at a time.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-100 p-1.5 rounded-xl overflow-x-auto max-w-full">
                {["mission", "vision", "values"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {activeTab !== "values" ? (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {tabContent[activeTab].title}
                    </h3>
                    <h4 className="text-lg text-green-600 font-semibold mb-6">
                      {tabContent[activeTab].subtitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {tabContent[activeTab].content}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {tabContent[activeTab].points.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <div className="w-3 h-3">
                              <Icons.ShieldCheck />
                            </div>
                          </div>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <button className="text-green-600 font-bold hover:text-green-700 flex items-center gap-2 group">
                      {tabContent[activeTab].cta}
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                  <div className="order-1 md:order-2 relative">
                    <div className="absolute inset-0 bg-green-200 rounded-3xl rotate-3 transform"></div>
                    <img
                      src={tabContent[activeTab].image}
                      alt="About"
                      className="relative rounded-3xl shadow-xl w-full h-80 md:h-[500px] object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabContent.values.map((val, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div
                        className={`w-12 h-12 ${val.color} rounded-xl flex items-center justify-center text-2xl mb-4`}
                      >
                        <div className="w-6 h-6">{val.icon}</div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {val.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Process Section --- */}
        <section
          id="process"
          className="py-16 bg-green-900 text-white relative overflow-hidden"
        >
          {/* Background Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black mb-4">Farm to Fork</h2>
              <p className="text-green-200">
                Our transparent journey to your kitchen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all">
                    <div className="text-4xl font-black text-white/10 absolute top-4 right-4">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 mb-4 text-white">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-green-100">{step.description}</p>
                  </div>
                  {idx !== processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <span className="text-green-500">➜</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Categories Section --- */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-green-600 p-2">
                      {cat.icon}
                    </div>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md">
                      FRESH
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{cat.name}</h3>
                  <ul className="space-y-1">
                    {cat.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-500 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Testimonials Section (Restored) --- */}
      </main>

      <Footer />
      {/* Mobile Bottom Footer Wrapper */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileBottomFooter />
      </div>
    </div>
  );
};

export default AboutPage;
