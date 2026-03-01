"use client";
import Footer from "@src/component/components/footer";
import Header from "@src/component/components/header";
import MobileBottomFooter from "@src/component/components/MobileFooter";
import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaComments,
  FaUser,
  FaStore,
  FaHome,
  FaTh,
  FaShoppingCart,
  FaBars,
  FaCheckCircle,
  FaShieldAlt,
  FaThumbsUp,
  FaStar,
  FaBolt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaChevronDown,
  FaCamera,
  FaBuilding,
  FaWarehouse,
  FaHeadset,
  FaRedo,
  FaMobileAlt,
  FaCheck,
  FaMapMarkedAlt,
  FaExclamationCircle,
} from "react-icons/fa";

const ContactPage = () => {
  // State Management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [messageLength, setMessageLength] = useState(0);

  // Refs for intersection observer
  const observerRef = useRef(null);
  const cardRefs = useRef([]);

  // Enhanced contact methods with better UX
  const contactMethods = [
    {
      icon: <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Call Us",
      description: "Mon-Sun: 8AM-10PM",
      value: "+91 98765 43210",
      action: "tel:+919876543210",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600",
      hoverShadow: "hover:shadow-blue-200",
      badge: "Popular",
    },
    {
      icon: <FaComments className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Live Chat",
      description: "Available 24/7",
      value: "Start Chat",
      action: "#chat",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-500",
      textColor: "text-green-600",
      hoverShadow: "hover:shadow-green-200",
      badge: "Fast",
    },
    {
      icon: <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Email Us",
      description: "Response in 2-4h",
      value: "Send Email",
      action: "mailto:hello@freshbucket.com",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600",
      hoverShadow: "hover:shadow-purple-200",
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Visit Store",
      description: "ahmadabad, Gujarat",
      value: "Directions",
      action: "#map",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBg: "bg-orange-500",
      textColor: "text-orange-600",
      hoverShadow: "hover:shadow-orange-200",
    },
  ];

  // Enhanced FAQ data
  const faqs = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver Monday through Sunday from 8 AM to 10 PM. Same-day delivery is available for orders placed before 6 PM, and we offer 30-minute delivery windows for your convenience.",
      icon: <FaClock className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      question: "Do you offer fresh produce?",
      answer:
        "Yes! We specialize in fresh, fresh produce sourced from local farms. All our fresh products are certified and we clearly mark fresh items on our website and app.",
      icon: <FaStore className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      question: "What's your return policy?",
      answer:
        "We offer a 100% satisfaction guarantee. If you're not happy with any product, contact us within 30 minites of delivery for a full refund or replacement. Fresh produce quality is our top priority.",
      icon: <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      question: "Is there a minimum order amount?",
      answer:
        "es, Minimum order required 149 Rs. for free home fresh delivery. order under 149 Rs. delivery charge will apply",
      icon: <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />,
    },

    {
      question: "Do you offer bulk or wholesale orders?",
      answer:
        " we offer special wholesale price for bulk orders and work with restaurants, cafes, and other businesses. Contact our wholesale team at 7801858016 Call or message.",
      icon: <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  // Trust badges data
  const trustBadges = [
    {
      icon: <FaShieldAlt className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "100% Secure",
      description: "Your data is protected",
      color: "green",
    },
    {
      icon: <FaClock className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "Fast Response",
      description: "Under 2 hours",
      color: "blue",
    },
    {
      icon: <FaThumbsUp className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "50K+ Happy",
      description: "Satisfied customers",
      color: "purple",
    },
    {
      icon: <FaStar className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: "4.8 Rating",
      description: "From 10K+ reviews",
      color: "orange",
    },
  ];

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (
      formData.phone &&
      !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.subject) {
      errors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Update message length counter
    if (name === "message") {
      setMessageLength(value.length);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        newsletter: false,
      });
      setMessageLength(0);
      setIsSubmitting(false);
      setFormErrors({});

      // Auto-hide success message
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  // Format phone number
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length > 0) {
      if (cleaned.length <= 5) {
        formatted = cleaned;
      } else if (cleaned.length <= 10) {
        formatted = `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      } else {
        formatted = `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
      }
    }

    return formatted;
  };

  // Handle phone input
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  // Success Toast Component
  const SuccessToast = () =>
    showSuccess && (
      <div className="fixed top-16 right-2 left-2 z-50 transform transition-all duration-300 animate-slide-in sm:top-20 sm:right-4 sm:left-auto sm:max-w-md">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 flex items-start space-x-3 sm:space-x-4 border-l-4 border-green-500">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <FaCheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm sm:text-lg mb-1">
              Message Sent Successfully!
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">
              We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header - Keep existing */}
      <Header />

      {/* Success Toast */}
      <SuccessToast />

      {/* Main Content */}
      <main className="pb-16 sm:pb-0">
        {/* Quick Contact Cards - Enhanced */}
        <section className="pt-14 px-3 sm:pt-16 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`
                    group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md 
                    hover:shadow-xl sm:hover:shadow-2xl transform transition-all duration-300 
                    hover:-translate-y-1 sm:hover:-translate-y-2 ${
                      method.hoverShadow
                    }
                    ${
                      visibleCards.has(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={(e) => {
                    if (method.action === "#chat") {
                      e.preventDefault();
                      alert("Live chat feature would open here");
                    }
                  }}
                >
                  {method.badge && (
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                      {method.badge}
                    </div>
                  )}

                  <div
                    className={`${method.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 -m-4 sm:-m-6`}
                  >
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div
                        className={`${method.iconBg} text-white w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md sm:shadow-lg group-hover:scale-105 sm:group-hover:scale-110 transition-transform`}
                      >
                        {method.icon}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      {method.description}
                    </p>
                    <div
                      className={`font-bold ${method.textColor} text-sm sm:text-base flex items-center group-hover:gap-1 sm:group-hover:gap-2 transition-all`}
                    >
                      <span>{method.value}</span>
                      <FaChevronDown className="w-2 h-2 sm:w-3 sm:h-3 rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Form Section */}
        <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Contact Form - 2 columns on desktop */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 lg:p-10">
                  {/* Form Header */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border ${
                              formErrors.firstName
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors text-sm sm:text-base`}
                            placeholder="John"
                          />
                        </div>
                        {formErrors.firstName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                            <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${
                            formErrors.lastName
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors text-sm sm:text-base`}
                          placeholder="Doe"
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                            <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border ${
                              formErrors.email
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors text-sm sm:text-base`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {formErrors.email && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                            <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border ${
                              formErrors.phone
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors text-sm sm:text-base`}
                            placeholder="98765 43210"
                            maxLength="11"
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                            <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${
                          formErrors.subject
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors appearance-none bg-white text-sm sm:text-base`}
                      >
                        <option value="">Select a topic</option>
                        <option value="order">Order Related</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="product">Product Inquiry</option>
                        <option value="refund">Refund/Return</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">
                          Business Partnership
                        </option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.subject && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                          <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          {formErrors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs text-gray-500">
                          {messageLength}/500
                        </span>
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        maxLength="500"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${
                          formErrors.message
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none text-sm sm:text-base`}
                        placeholder="Tell us how we can help you..."
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                          <FaExclamationCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Newsletter Checkbox */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                      />
                      <label
                        htmlFor="newsletter"
                        className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700"
                      >
                        I'd like to receive promotional emails and updates about
                        Fresh Bucket products and services.
                      </label>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 hover:shadow-lg sm:hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base ${
                          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                            newsletter: false,
                          });
                          setFormErrors({});
                          setMessageLength(0);
                        }}
                        className="sm:w-auto px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 sm:border-2 text-gray-700 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <FaRedo className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar - Office Info */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                {/* Store Info Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Visit Our Store
                  </h3>

                  {/* Store Location */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md sm:shadow-lg">
                        <FaBuilding className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                          Store Location
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Main Retail Store
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 ml-12 sm:ml-16">
                      <div className="flex items-start space-x-2">
                        <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          Shop-8, Serenity Space,
                          <br />
                          Opp. Vishwash City-9, Jagatpur,
                          <br />
                          Ahmedabad - 382481
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <FaClock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          Mon-Sat: 9AM–8PM
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <FaPhone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          +91 98765 43210
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map Placeholder */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 h-48 sm:h-64 flex flex-col items-center justify-center">
                  <FaMapMarkedAlt className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-green-600 mb-3 sm:mb-4" />
                  <p className="text-gray-700 font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    Interactive Map
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    Google Maps integration will appear here
                  </p>
                  <button className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-700 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-gray-50 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Questions
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Find quick answers to common questions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg sm:hover:shadow-xl ${
                    currentFaq === index
                      ? "ring-1 sm:ring-2 ring-green-500"
                      : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setCurrentFaq(currentFaq === index ? null : index)
                    }
                    className="w-full p-4 sm:p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                        {faq.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base pr-3 sm:pr-4">
                        {faq.question}
                      </h4>
                    </div>
                    <FaChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 ${
                        currentFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      currentFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-10 sm:pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-10">
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                Still have questions?
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white border border-green-600 text-green-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-green-50 transition-all inline-flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              >
                <FaComments className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
              <h3 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10">
                Why Customers Trust Fresh Bucket
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-${badge.color}-400 to-${badge.color}-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md sm:shadow-lg group-hover:scale-105 sm:group-hover:scale-110 transition-transform`}
                    >
                      <div className="text-white">{badge.icon}</div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                      {badge.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-20 text-center relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience Fresh Bucket?
            </h2>
            <p className="text-green-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their fresh
              grocery needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-green-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center space-x-2 text-sm sm:text-base">
                <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Shopping Now</span>
              </button>
              <button className="border border-white sm:border-2 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-white/10 backdrop-blur transition-all inline-flex items-center justify-center space-x-2 text-sm sm:text-base">
                <FaMobileAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download App</span>
              </button>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-8 sm:py-12 bg-white px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Follow Us
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
                Stay connected for the latest updates and offers
              </p>
              <div className="flex justify-center space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                >
                  <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                >
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomFooter />

      {/* Custom Styles */}
      <style jsx>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .bg-pattern {
          background-image: radial-gradient(
            circle at 2px 2px,
            white 1px,
            transparent 0
          );
          background-size: 40px 40px;
        }

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out 2s infinite;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        input:focus,
        textarea:focus,
        select:focus {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }

        button:active {
          transform: scale(0.98);
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          input,
          textarea,
          select,
          button {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }

          .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }

          .text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          }
        }

        @media (max-width: 1024px) {
          button,
          a {
            touch-action: manipulation;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
