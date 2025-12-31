"use client";

import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const RouterTransition = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      nprogress.start();

      const timer = setTimeout(() => {
        nprogress.complete();
        prevPathnameRef.current = pathname;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <NavigationProgress color="blue.8" />;
};

export default RouterTransition;
