/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

//Types imports
type ChildrenProps = {
  children: React.ReactNode;
};
//Component imports
import useAuth from "@src/hooks/useAuth";

const AuthLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn in AuthLayout:", isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  const noAuthRoutes = ["/login", "/register"];
  const authRoutes = ["/cart", "/orders", "/wishlist"];

  useEffect(() => {
    if (isLoggedIn && noAuthRoutes.includes(pathname)) {
      router.push("/home");
    } else if (!isLoggedIn && authRoutes.includes(pathname)) {
      router.push("/login");
    }
  }, [authRoutes, isLoggedIn, noAuthRoutes, pathname, router]);

  return <>{children}</>;
};

export default AuthLayout;
