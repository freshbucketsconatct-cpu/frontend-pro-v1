"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomInput from "@src/component/customeFormField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AiOutlineCheckCircle,
  AiOutlineStar,
  AiOutlineWifi,
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiFillGoogleCircle,
  AiOutlineFacebook,
  AiOutlineWarning,
  AiOutlineArrowLeft,
  AiOutlineShield,
} from "react-icons/ai";
import { FaLeaf, FaApple, FaCarrot } from "react-icons/fa";
import { GiTomato, GiBroccoli, GiCorn } from "react-icons/gi";
import { BiReset } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";

// Enhanced validation schema for forgot password
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .max(255, "Email is too long")
    .lowercase()
    .trim(),
});

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPasswordComponent = () => {
  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Watch form values for real-time validation feedback
  const watchedValues = watch();

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

  const onSubmit = (data: ForgotPasswordFormData) => {
    if (!navigator.onLine) {
      toast.error("🔌 You are offline. Please check your connection.");
      return;
    }

    console.log("Forgot password request for:", data);

    // Simulate loading
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setSubmittedEmail(data.email);
      toast.success(`📧 Password reset link sent to ${data.email}`);
      reset();
    }, 2000);
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    if (isLoading || isOffline) return;
    toast("🚀 Google Sign-In coming soon!");
  };

  const handleFacebookLogin = () => {
    if (isLoading || isOffline) return;
    toast("🚀 Facebook Sign-In coming soon!");
  };

  const handleBackToLogin = () => {
    router?.push("/login");
  };

  const handleResendEmail = () => {
    if (!submittedEmail) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`📧 Password reset link sent again to ${submittedEmail}`);
    }, 1500);
  };

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <HiOutlineMail className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent a password reset link to{" "}
              <span className="font-semibold text-green-600">
                {submittedEmail}
              </span>
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                {/* <AiOutlineShield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" /> */}
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-green-800 mb-1">
                    Security Notice
                  </h4>
                  <p className="text-xs text-green-700">
                    The reset link will expire in 1 hour for security reasons.
                    Check your spam folder if you don't see the email.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Resend Email"
                )}
              </button>

              <button
                onClick={handleBackToLogin}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                <AiOutlineArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </button>
            </div>
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
                Forgot Your
                <br />
                <span className="text-green-200">Password?</span>
              </h1>

              <p className="text-lg mb-8 text-green-100 leading-relaxed">
                No worries! We'll help you reset your password and get back to
                enjoying fresh, fresh produce
              </p>

              {/* Features List */}
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-center">
                  {/* <AiOutlineShield className="h-5 w-5 text-green-200 mr-3 flex-shrink-0" /> */}
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
                  {/* <AiOutlineShield className="h-5 w-5 text-green-200 mr-2" /> */}
                  <span className="text-sm font-medium">Account Security</span>
                </div>
                <p className="text-xs text-green-100 italic">
                  "Your account security is our top priority. Reset links expire
                  in 1 hour."
                </p>
                <p className="text-xs text-green-200 mt-1 font-medium">
                  - Fresh Market Security Team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
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
                We'll help you get back to fresh, healthy living
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
                <BiReset className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                Enter your email address and we'll send you a link to reset your
                password
              </p>
            </div>

            {/* Forgot Password Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
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

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <AiOutlineMail className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 mb-1">
                          What happens next?
                        </h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                          We'll send you a secure link to reset your password.
                          The link will expire in 1 hour for security.
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
                        isLoading ? "Sending reset link..." : "Send reset link"
                      }
                    >
                      {isLoading || isSubmitting ? (
                        <div className="flex items-center">
                          <AiOutlineLoading3Quarters
                            className="h-4 w-4 mr-2 text-white"
                            style={{ animation: "spin 1s linear infinite" }}
                          />
                          Sending Reset Link...
                        </div>
                      ) : isOffline ? (
                        <div className="flex items-center">
                          <AiOutlineWifi className="mr-2 h-4 w-4" />
                          Offline - Check Connection
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <HiOutlineMail className="mr-2 h-4 w-4" />
                          Send Reset Link
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-500">
                        Or sign in with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isLoading || isOffline}
                      className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 touch-manipulation"
                      aria-label="Sign in with Google"
                    >
                      <AiFillGoogleCircle className="h-5 w-5 text-red-500" />
                      <span className="ml-2">Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      disabled={isLoading || isOffline}
                      className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 touch-manipulation"
                      aria-label="Sign in with Facebook"
                    >
                      <AiOutlineFacebook className="h-5 w-5 text-blue-600" />
                      <span className="ml-2">Facebook</span>
                    </button>
                  </div>
                </form>
              </FormProvider>

              {/* Sign Up Link */}
              <div className="mt-6 sm:mt-8 text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-600">
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
                  {/* <AiOutlineShield className="h-4 w-4 text-green-500 mr-1" /> */}
                  <span>Account Protected</span>
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

export default ForgotPasswordComponent;
