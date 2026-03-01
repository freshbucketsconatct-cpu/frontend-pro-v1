"use client";

import ReduxProvider from "@src/redux/reduxProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthLayout from "./AuthLayout";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <AuthLayout>{children}</AuthLayout>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default MainLayout;
