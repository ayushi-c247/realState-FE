"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Detect Safari browser
const isSafari = (): boolean => {
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|CriOS|Chromium/.test(ua);
};

export function useBlockBrowserNavigation(enabled: boolean = true) {
  const pathname = usePathname();
  useEffect(() => {
    if (!enabled) return;

    const safari = isSafari();

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    if (!safari) {
      // Non-Safari browsers: Stack fake history entries
      for (let i = 0; i < 45; i++) {
        window.history.pushState(null, "", window.location.href);
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("ended", handlePopState);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    // This will replace current state and remove extra stacked entries effect
    window.history.replaceState(null, "", window.location.href);
  }, [pathname, enabled]);
}
