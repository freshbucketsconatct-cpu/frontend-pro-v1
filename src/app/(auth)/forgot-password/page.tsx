"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomInput from "@src/component/customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@src/config/config";
import {
  AiOutlineCheckCircle,
  AiOutlineWifi,
  AiOutlineLoading3Quarters,
  AiOutlineArrowLeft,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaLeaf, FaApple, FaCarrot } from "react-icons/fa";
import { GiTomato, GiBroccoli, GiCorn } from "react-icons/gi";
import { BiReset } from "react-icons/bi";
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi";

// Validation schema: email + newPassword
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(255, "Email is too long")
    .lowercase()
    .trim(),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

type ForgotPasswordFormData = {
  email: string;
  newPassword: string;
};

const ForgotPasswordComponent = () => {
  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Watch password for strength indicator
  const watchedPassword = watch("newPassword");

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

  // Password strength calculation
  const getPasswordStrength = (password: string | undefined) => {
    if (!password) return { score: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Fair", color: "bg-yellow-500" };
    if (score <= 4) return { score, label: "Good", color: "bg-blue-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(watchedPassword);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (!navigator.onLine) {
      toast.error("🔌 You are offline. Please check your connection.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, newPassword: data.newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      setIsLoading(false);
      setIsSuccess(true);
      toast.success("🎉 Password has been reset successfully!");
      reset();

      // Redirect to login after a short delay
      setTimeout(() => {
        router?.push("/login");
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleBackToLogin = () => {
    router?.push("/login");
  };

  // Success screen after submission
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <AiOutlineCheckCircle className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Password Reset Successful!
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Your password has been updated successfully. You will be
              redirected to the login page shortly.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-green-800 mb-1">
                    ✅ All Set!
                  </h4>
                  <p className="text-xs text-green-700">
                    You can now sign in with your new password. If you have any
                    issues, please contact support.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBackToLogin}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
            >
              <AiOutlineArrowLeft className="h-4 w-4 mr-2" />
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
            <div className="text-center max-w-md">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <BiReset className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Reset Your
                <br />
                <span className="text-green-200">Password</span>
              </h1>

              <p className="text-lg mb-8 text-green-100 leading-relaxed">
                Enter your email and set a new password to regain access to your
                account
              </p>

              {/* Features List */}
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-center">
                  <AiOutlineLock className="h-5 w-5 text-green-200 mr-3 flex-shrink-0" />
                  <span className="text-sm">Secure Password Reset</span>
                </div>
                <div className="flex items-center">
                  <HiOutlineMail className="h-5 w-5 text-green-200 mr-3 flex-shrink-0" />
                  <span className="text-sm">Email Verification</span>
                </div>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-green-200 mr-3 flex-shrink-0" />
                  <span className="text-sm">Quick & Easy Process</span>
                </div>
              </div>

              {/* Security Info */}
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <AiOutlineLock className="h-5 w-5 text-green-200 mr-2" />
                  <span className="text-sm font-medium">Account Security</span>
                </div>
                <p className="text-xs text-green-100 italic">
                  "Choose a strong password with uppercase, lowercase, numbers,
                  and special characters."
                </p>
                <p className="text-xs text-green-200 mt-1 font-medium">
                  - Fresh Market Security Team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div
          className={`w-full lg:w-1/2 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 min-h-screen ${
            isOffline ? "pt-16 sm:pt-20" : ""
          }`}
        >
          <div className="max-w-md w-full space-y-6 sm:space-y-8">
            {/* Mobile Hero Content - Only visible on mobile */}
            <div className="lg:hidden text-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white mb-6">
              <BiReset className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Reset Your Password
              </h3>
              <p className="text-sm text-green-100">
                Enter your email and new password to reset your account
              </p>
            </div>

            {/* Back Button */}
            <div className="flex items-center">
              <button
                onClick={handleBackToLogin}
                className="flex items-center text-green-600 hover:text-green-500 font-medium transition-colors duration-200"
                disabled={isLoading}
              >
                <AiOutlineArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </button>
            </div>

            {/* Header Section */}
            <div className="text-center">
              <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <HiOutlineKey className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                Enter your email address and choose a new password for your
                account
              </p>
            </div>

            {/* Reset Password Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  {/* Email Field */}
                  <div>
                    <CustomInput
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* New Password Field */}
                  <div>
                    <CustomInput
                      name="newPassword"
                      type="password"
                      label="New Password"
                      placeholder="Enter your new password"
                    />
                  </div>

                  {/* Password Strength Indicator */}
                  {watchedPassword && watchedPassword.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          Password Strength
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            passwordStrength.score <= 2
                              ? "text-red-500"
                              : passwordStrength.score <= 3
                              ? "text-yellow-500"
                              : passwordStrength.score <= 4
                              ? "text-blue-500"
                              : "text-green-500"
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i <= passwordStrength.score
                                ? passwordStrength.color
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        <div
                          className={`flex items-center text-xs ${
                            watchedPassword && watchedPassword.length >= 8
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <AiOutlineCheckCircle className="h-3 w-3 mr-1" />
                          8+ characters
                        </div>
                        <div
                          className={`flex items-center text-xs ${
                            watchedPassword && /[A-Z]/.test(watchedPassword)
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <AiOutlineCheckCircle className="h-3 w-3 mr-1" />
                          Uppercase
                        </div>
                        <div
                          className={`flex items-center text-xs ${
                            watchedPassword && /[0-9]/.test(watchedPassword)
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <AiOutlineCheckCircle className="h-3 w-3 mr-1" />
                          Number
                        </div>
                        <div
                          className={`flex items-center text-xs ${
                            watchedPassword &&
                            /[^A-Za-z0-9]/.test(watchedPassword)
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <AiOutlineCheckCircle className="h-3 w-3 mr-1" />
                          Special char
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info Box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <AiOutlineLock className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-amber-800 mb-1">
                          Security Tip
                        </h4>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          Use a strong password with at least 8 characters,
                          including uppercase, lowercase, numbers, and special
                          characters.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || isOffline || isSubmitting}
                      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 touch-manipulation ${
                        isLoading || isOffline || isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg hover:from-green-700 hover:to-emerald-700"
                      }`}
                      aria-label={
                        isLoading
                          ? "Resetting password..."
                          : "Reset Password"
                      }
                    >
                      {isLoading || isSubmitting ? (
                        <div className="flex items-center">
                          <AiOutlineLoading3Quarters
                            className="h-4 w-4 mr-2 text-white"
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          Resetting Password...
                        </div>
                      ) : isOffline ? (
                        <div className="flex items-center">
                          <AiOutlineWifi className="mr-2 h-4 w-4" />
                          Offline - Check Connection
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <HiOutlineKey className="mr-2 h-4 w-4" />
                          Reset Password
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </FormProvider>

              {/* Sign Up / Login Links */}
              <div className="mt-6 sm:mt-8 text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-1"
                  >
                    Sign In
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-1"
                  >
                    Create one here
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
                  <span>🛡️ Account Protected</span>
                </div>
                <div className="flex items-center">
                  <FaLeaf className="h-4 w-4 text-green-500 mr-1" />
                  <span>100% Fresh</span>
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

export default ForgotPasswordComponent;
