"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// Type declaration for beforeinstallprompt event
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    console.log("🚀 PWA Install Button initialized");

    // Check if already installed
    const checkIfInstalled = () => {
      // Method 1: Check display mode
      const isStandaloneMode = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;

      // Method 2: Check for iOS standalone
      const isIOSStandalone = (window.navigator as any).standalone;

      // Method 3: Check URL parameters
      const isFromInstalled = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;

      const installed = isStandaloneMode || isIOSStandalone || isFromInstalled;
      setIsStandalone(installed);

      if (installed) {
        console.log("📱 App is already installed");
      }
    };

    // Check if iOS
    const checkIOS = () => {
      const ios =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;
      setIsIOS(ios);
      if (ios) {
        console.log("🍎 iOS device detected");
      }
    };

    // Handle beforeinstallprompt event (for Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("🎯 beforeinstallprompt event fired!");

      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Stash the event so it can be triggered later
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);

      // Store globally for later use
      window.deferredPrompt = promptEvent;

      // Show toast notification
      // toast.success("Fresh Buckets can be installed!", {
      //   icon: "📱",
      //   duration: 3000,
      //   position: "bottom-center",
      // });
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log("✅ App was installed");
      setIsInstallable(false);
      setIsStandalone(true);
      setDeferredPrompt(null);

      toast.success("Fresh Buckets installed successfully! 🎉", {
        duration: 4000,
        position: "bottom-center",
      });
    };

    // Initial checks
    checkIfInstalled();
    checkIOS();

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // For development on localhost, simulate the event after 3 seconds
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("🏠 Localhost detected - simulating PWA environment");
      setTimeout(() => {
        if (!isStandalone && !isInstallable) {
          console.log("🔄 Simulating installable state for testing");
          setIsInstallable(true);
        }
      }, 3000);
    }

    // Cleanup
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log("🖱️ Install button clicked");

    // For iOS, show instructions
    if (isIOS) {
      console.log("📱 Showing iOS instructions");
      setShowIOSModal(true);
      return;
    }

    // For Android/Desktop with deferred prompt
    if (deferredPrompt) {
      try {
        console.log("🎯 Showing installation prompt");

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        console.log("User choice result:", choiceResult);

        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the install prompt");
          // The install was successful
          setIsInstallable(false);
          setDeferredPrompt(null);
        } else {
          console.log("❌ User dismissed the install prompt");
          toast("You can install later from browser menu", {
            icon: "💡",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("❌ Error during installation:", error);
        toast.error("Failed to install. Please try again.");
      }
    } else {
      // No deferred prompt - show instructions
      console.log("⚠️ No deferred prompt available");

      if (/Chrome/.test(navigator.userAgent)) {
        toast("Click the install icon in the address bar (📥)", {
          icon: "💡",
          duration: 4000,
          position: "bottom-center",
        });
      } else if (/Firefox/.test(navigator.userAgent)) {
        toast("Click the hamburger menu (☰) → Install", {
          icon: "💡",
          duration: 4000,
          position: "bottom-center",
        });
      } else if (/Safari/.test(navigator.userAgent)) {
        toast("Tap Share → Add to Home Screen", {
          icon: "💡",
          duration: 4000,
          position: "bottom-center",
        });
      } else {
        toast('Look for "Install" option in your browser menu', {
          icon: "💡",
          duration: 4000,
          position: "bottom-center",
        });
      }
    }
  };

  // Don't show if already installed
  if (isStandalone) {
    console.log("❌ Not showing button - app is already installed");
    return null;
  }

  // Show button if installable or on localhost for testing
  const shouldShowButton =
    isInstallable ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!shouldShowButton) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      <button
        onClick={handleInstallClick}
        className="fixed bottom-16 right-6 bg-gradient-to-r from-[#6AA84F] to-[#5A9841] 
             hover:from-[#5A9841] hover:to-[#4A872F] text-white font-bold py-3 px-6 
             rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl 
             hover:-translate-y-1 flex items-center gap-2 z-50 animate-bounce 
             lg:hidden"
        aria-label="Install Fresh Buckets App"
        title="Install Fresh Buckets App"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
        </svg>
        Install App
      </button>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2F3E2C]">
                Install Fresh Buckets on iOS
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-2 hover:bg-[#E4EDDF] rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-[#4A5A42]">
                To install Fresh Buckets on your iOS device:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#6AA84F] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-[#2F3E2C]">
                      Tap the Share button
                    </p>
                    <p className="text-sm text-[#4A5A42]">
                      Look for the <span className="font-bold">📤</span> icon in
                      Safari's toolbar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#6AA84F] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-[#2F3E2C]">
                      Scroll and tap "Add to Home Screen"
                    </p>
                    <p className="text-sm text-[#4A5A42]">
                      Scroll down the share menu to find this option
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#6AA84F] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-[#2F3E2C]">Tap "Add"</p>
                    <p className="text-sm text-[#4A5A42]">
                      Confirm by tapping Add in the top right corner
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE5D6]">
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full bg-[#6AA84F] text-white py-3 rounded-xl font-bold hover:bg-[#5A9841] transition-colors"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Toaster for notifications */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
          },
          success: {
            style: {
              background: "#6AA84F",
            },
          },
          error: {
            style: {
              background: "#E84C3D",
            },
          },
        }}
      />

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
