import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MainLayout from "@src/Layout/MainLayout";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport configuration for PWA
export const viewport = {
  themeColor: "#6AA84F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: any = {
  title: "Fresh Buckets - Farm Fresh fresh Groceries",
  description:
    "Fresh fresh groceries delivered to your doorstep in 60 minutes. Farm Fresh • fresh • Fast Delivery",
  keywords: [
    "groceries",
    "fresh",
    "fresh",
    "delivery",
    "food",
    "vegetables",
    "fruits",
  ],
  authors: [{ name: "Fresh Buckets" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fresh Buckets",
  },
  openGraph: {
    type: "website",
    url: "https://freshbuckets.com",
    title: "Fresh Buckets",
    description: "Fresh fresh groceries delivered in 60 minutes",
    siteName: "Fresh Buckets",
  },
  twitter: {
    card: "summary_large_image",
    site: "@freshbuckets",
    creator: "@freshbuckets",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Fresh Buckets" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fresh Buckets" />
        <meta
          name="description"
          content="Farm Fresh • fresh Groceries Delivered in 60 mins"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6AA84F" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/icon-152x152.png"
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}

        {/* Splash Screens (optional but recommended) */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/apple-splash-2048-2732.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster toastOptions={{ duration: 3000 }} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
