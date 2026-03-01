"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ROLES } from "@src/utils/helper";
import CustomInput from "../customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { useUserLogin } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "@src/redux/reducers/authSlice";
import {
  AiOutlineCheckCircle,
  AiOutlineStar,
  AiOutlineWifi,
  AiOutlineLoading3Quarters,
  AiOutlineUser,
  AiFillGoogleCircle,
  AiOutlineFacebook,
} from "react-icons/ai";
import { FaLeaf, FaApple, FaCarrot } from "react-icons/fa";
import { GiTomato, GiBroccoli, GiCorn } from "react-icons/gi";

const LoginComponent = () => {
  const method = useForm();
  const { handleSubmit, reset } = method;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  const {
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError,
    mutate: login,
  } = useUserLogin();

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

  useEffect(() => {
    if (loginData && !isLoginLoading) {
      dispatch(setAuthToken(loginData.data.token));
      dispatch(setUser(loginData.data));
      toast.success(loginData?.message ?? "🎉 Login Successful! Welcome back!");
      reset();
      router?.push("/home");
    }
    if (isLoginError) {
      toast.error(`🔒 ${loginError || "Login failed. Please try again."}`);
    }
  }, [
    loginData,
    isLoginLoading,
    loginError,
    isLoginError,
    reset,
    router,
    dispatch,
  ]);

  const onSubmit = (data: { email: string; password: string }) => {
    if (!navigator.onLine) {
      toast.error("🔌 You are offline. Please check your connection.");
      return;
    }

    console.log("data is here");
    console.log(data);
    login(data);
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    if (isLoginLoading || isOffline) return;
    toast("🚀 Google Sign-In coming soon!");
  };

  const handleFacebookLogin = () => {
    if (isLoginLoading || isOffline) return;
    toast("🚀 Facebook Sign-In coming soon!");
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

        {/* Right Side - Login Form */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 min-h-screen ${
            isOffline ? "pt-16 sm:pt-20" : ""
          }`}
        >
          <div className="max-w-md w-full space-y-6 sm:space-y-8">
            {/* Mobile Hero Content - Only visible on mobile */}
            <div className="lg:hidden text-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white mb-6">
              <FaLeaf className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fresh & fresh</h3>
              <p className="text-sm text-green-100">
                Farm-fresh vegetables and fruits delivered to your door
              </p>
            </div>

            {/* Header Section */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <FaLeaf className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
                <FaLeaf className="h-4 w-4 text-green-500" />
                Sign in to your fresh market account
              </p>
            </div>

            {/* Login Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <FormProvider {...method}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 sm:space-y-6"
                >
                  <div className="space-y-5">
                    <div>
                      <CustomInput
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <CustomInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        disabled={isLoginLoading || isOffline}
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        href="/forgot-password"
                        className="text-green-600 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-1"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Login Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoginLoading || isOffline}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 touch-manipulation ${
                        isLoginLoading || isOffline
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg"
                      }`}
                      aria-label={
                        isLoginLoading
                          ? "Signing in..."
                          : "Sign in to Fresh Market"
                      }
                    >
                      {isLoginLoading ? (
                        <div className="flex items-center">
                          <AiOutlineLoading3Quarters
                            className="h-4 w-4 mr-2 text-white"
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          Signing In...
                        </div>
                      ) : isOffline ? (
                        <div className="flex items-center">
                          <AiOutlineWifi className="mr-2 h-4 w-4" />
                          Offline - Check Connection
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AiOutlineUser className="mr-2 h-4 w-4" />
                          Sign In to Fresh Market
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Social Login Buttons */}
                </form>
              </FormProvider>

              {/* Sign Up Link */}
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-sm text-gray-600">
                  New to Fresh Market?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-1"
                  >
                    Create your free account
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
                  <span>Privacy Protected</span>
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

export default LoginComponent;
