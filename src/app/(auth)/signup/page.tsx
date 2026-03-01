"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomInput from "@src/component/customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@src/redux/reducers/authSlice";
import { useUserSignup } from "@src/hooks/apiHooks";
import {
  AiOutlineCheckCircle,
  AiOutlineStar,
  AiOutlineWifi,
  AiOutlineLoading3Quarters,
  AiOutlineUser,
  AiFillGoogleCircle,
  AiOutlineFacebook,
  AiOutlineWarning,
} from "react-icons/ai";
import { FaLeaf, FaApple, FaCarrot } from "react-icons/fa";
import { GiTomato, GiBroccoli, GiCorn } from "react-icons/gi";

// Enhanced validation schema for signup
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .trim(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(255, "Email is too long")
    .lowercase()
    .trim(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

type SignupFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignupComponent = () => {
  const methods = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  // API Hook for signup
  const {
    isError: isSignupError,
    isLoading: isSignupLoading,
    data: signupData,
    error: signupError,
    mutate: signup,
  } = useUserSignup();

  console.log("signup api is called successfully");
  console.log(signupData);

  // Watch form values for real-time validation feedback
  const watchedValues = watch();
  const watchedPassword = watch("password", "");

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (navigator.onLine) {
        toast.success("🟢 Connection restored!");
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast.error("🔴 You are offline. Please check your connection.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle API response
  useEffect(() => {
    if (signupData && !isSignupLoading) {
      // If signup returns token, store it and redirect to dashboard
      if (signupData.data?.token) {
        dispatch(setAuthToken(signupData.data.token));
        toast.success(
          signupData?.message ??
            `🎉 Welcome ${
              signupData.data.user?.name || "to Fresh Market"
            }! Account created successfully.`
        );
        reset();
        router?.push("/home");
      } else {
        // If no token, show success message and redirect to login
        toast.success(
          signupData?.message ??
            "🎊 Account created successfully! Please sign in."
        );
        reset();
        router?.push("/login?message=account-created");
      }
    }

    if (isSignupError) {
      toast.error(
        `❌ ${signupError || "Account creation failed. Please try again."}`
      );
    }
  }, [
    signupData,
    isSignupLoading,
    signupError,
    isSignupError,
    reset,
    router,
    dispatch,
  ]);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(watchedPassword);

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Fair";
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "Very Weak";
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  // Form submission handler
  const onSubmit = (data: SignupFormData) => {
    if (!navigator.onLine) {
      toast.error("🔌 You are offline. Please check your connection.");
      return;
    }

    console.log("Validated signup data:", data);

    // Remove confirmPassword and terms from the data sent to API
    const { confirmPassword, terms, ...apiData } = data;
    console.log("Data to send to API:", apiData);

    // Call the signup API
    signup(apiData);
  };

  // Social signup handlers
  const handleGoogleSignup = () => {
    if (isSignupLoading || isOffline) return;
    toast("🚀 Google Sign-Up coming soon!");
  };

  const handleFacebookSignup = () => {
    if (isSignupLoading || isOffline) return;
    toast("🚀 Facebook Sign-Up coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Offline Banner */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 sm:py-3 px-4 z-50">
          <div className="flex items-center justify-center">
            <AiOutlineWifi className="h-4 w-4 mr-2" />
            <span className="text-sm">
              You are currently offline. Please check your internet connection.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Hero Section (Hidden on mobile, visible on desktop) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(16, 185, 129, 0.8)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          {/* Static Vegetable Icons */}
          <div className="absolute inset-0 overflow-hidden">
            <FaCarrot className="absolute top-20 left-10 h-8 w-8 text-orange-200 opacity-30" />
            <GiTomato className="absolute top-40 right-20 h-10 w-10 text-red-200 opacity-40" />
            <GiBroccoli className="absolute bottom-40 left-20 h-12 w-12 text-green-200 opacity-35" />
            <GiCorn className="absolute bottom-20 right-10 h-8 w-8 text-yellow-200 opacity-30" />
            <FaApple className="absolute top-60 left-1/3 h-6 w-6 text-red-200 opacity-40" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white text-center">
            <div className="max-w-md flex flex-col items-center">
              {/* Logo Image */}
              <div className="mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <img
                    src="/logo3.png"
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                  />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Fresh & Healthy
                <br />
                <span className="text-green-200">Farm to Table</span>
              </h1>

              <p className="text-lg mb-8 text-green-100 leading-relaxed">
                Experience the finest fresh vegetables and fruits delivered
                fresh to your doorstep
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-green-200 mr-3" />
                  <span className="text-sm">100% fresh & Fresh</span>
                </div>
                <div className="flex items-center justify-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-green-200 mr-3" />
                  <span className="text-sm">Same Day Delivery</span>
                </div>
                <div className="flex items-center justify-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-green-200 mr-3" />
                  <span className="text-sm">Farm Direct Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 min-h-screen ${
            isOffline ? "pt-16 sm:pt-20" : ""
          }`}
        >
          <div className="max-w-md w-full space-y-6 sm:space-y-8">
            {/* Mobile Hero Content - Only visible on mobile */}
            <div className="lg:hidden text-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white mb-6">
              <FaLeaf className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Welcome to Fresh Market
              </h3>
              <p className="text-sm text-green-100">
                Your journey to healthy living starts here
              </p>
            </div>

            {/* Header Section */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <FaLeaf className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                <FaLeaf className="h-4 w-4 text-green-500" />
                Join the fresh market community today
              </p>
            </div>

            {/* Signup Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 sm:space-y-5"
                  noValidate
                >
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <CustomInput
                        name="name"
                        type="text"
                        label="Full Name"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <CustomInput
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <CustomInput
                        name="phone"
                        type="tel"
                        label="Phone Number"
                        placeholder="Enter your 10-digit phone number"
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <CustomInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Create a strong password"
                      />

                      {/* Password Strength Indicator */}
                      {watchedPassword && watchedPassword.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex space-x-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                                  passwordStrength > i
                                    ? getPasswordStrengthColor(passwordStrength)
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-600">
                              Password strength:{" "}
                              <span
                                className={`font-medium ${
                                  passwordStrength >= 4
                                    ? "text-green-600"
                                    : passwordStrength >= 3
                                    ? "text-blue-600"
                                    : passwordStrength >= 2
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {getPasswordStrengthText(passwordStrength)}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {passwordStrength}/5
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <CustomInput
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="pt-2">
                    <div className="flex items-start">
                      <input
                        id="terms"
                        type="checkbox"
                        {...methods.register("terms")}
                        className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1 ${
                          errors.terms ? "border-red-300" : ""
                        }`}
                        disabled={isSignupLoading || isOffline}
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 block text-sm text-gray-700 cursor-pointer"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-green-600 font-medium hover:text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-green-600 font-medium hover:text-green-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AiOutlineWarning className="h-4 w-4 mr-1 flex-shrink-0" />
                        {errors.terms.message}
                      </p>
                    )}
                  </div>

                  {/* Signup Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSignupLoading || isOffline || isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 touch-manipulation ${
                        isSignupLoading || isOffline || isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:from-green-700 hover:to-emerald-700"
                      }`}
                      aria-label={
                        isSignupLoading
                          ? "Creating account..."
                          : "Create your account"
                      }
                    >
                      {isSignupLoading || isSubmitting ? (
                        <div className="flex items-center">
                          <AiOutlineLoading3Quarters
                            className="h-4 w-4 mr-2 text-white"
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          Creating Account...
                        </div>
                      ) : isOffline ? (
                        <div className="flex items-center">
                          <AiOutlineWifi className="mr-2 h-4 w-4" />
                          Offline - Check Connection
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AiOutlineUser className="mr-2 h-4 w-4" />
                          Create Your Account
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                  </div>
                </form>
              </FormProvider>

              {/* Login Link */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-1"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <span>🔒 SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span>Data Protected</span>
                </div>
                <div className="flex items-center">
                  <FaLeaf className="h-4 w-4 text-green-500 mr-1" />
                  <span>100% fresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading spinner animation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SignupComponent;
