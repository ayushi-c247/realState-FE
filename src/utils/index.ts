import * as yup from "yup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import sanitizeHtml from "sanitize-html";
import truncate from "truncate-html";

import {
  DEFAULT_PAGINATION,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/constants";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { ReadonlyURLSearchParams } from "next/navigation";
import { HandleSearchChangeParams } from "@/types/Filters";
import { SortState } from "@/types";

export const htmlToText = (html: string) => {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
};

export const formatHtmlToText = (html: string) => {
  const text = htmlToText(html).trim();
  if (!text) return "Click Here To Add";
  const words = text.split(/\s+/);
  return words.slice(0, 10).join(" ") + (words.length > 5 ? "..." : "");
};

export const convertSecondsToHoursAndMinutes = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
};
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export function truncateHtml(
  html: string,
  maxChars: number,
  ellipsis: string = "…"
): string {
  const clean = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat("img"),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title"],
    },
  });

  return truncate(clean, maxChars, {
    ellipsis,
    reserveLastWord: true,
  });
}

export const formatDateToUTCISOString = (date: Date | null) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based
  const day = date.getDate();

  // Create a new date in UTC
  const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0));
  return utcDate.toISOString(); // e.g., '2025-05-05T00:00:00.000Z'
};

export const extractDateFromISO = (isoDate: string) => {
  return new Date(isoDate).toISOString().split("T")[0];
};

export const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));

export const extractEmbedUrl = (url: string) => {
  try {
    const videoUrlRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(videoUrlRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  } catch {
    return null;
  }
};

export function truncateName(name: string, length: number) {
  return name.length <= length ? name : name.slice(0, length) + "...";
}

export const sanitizeHtmlToText = (html: string): boolean => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;

  const hasText = tmp.textContent?.trim();
  const hasMeaningfulElements = tmp.querySelector("img, svg, math");

  return !hasText && !hasMeaningfulElements;
};

export const extractPlainTextFromHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;

  const textParts: string[] = [];

  // Get all plain text
  const text = div.textContent?.trim().toLowerCase() || "";
  if (text) textParts.push(`text:${text}`);

  // Get all <img src="..."> values
  const images = div.querySelectorAll("img[src]");
  images.forEach((img) => {
    const src = img.getAttribute("src")?.trim();
    if (src) textParts.push(`img:${src}`);
  });

  return textParts.join("|"); // normalized combined string
};

export const roundToDecimal = (number: number, decimals: number) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(number * multiplier) / multiplier;
};

export const cleanBrokenImagesFromHTML = (html: string) => {
  if (!html) return "No question available";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const imgs = doc.querySelectorAll("img");

  imgs.forEach((img) => {
    const src = img.getAttribute("src") ?? "";
    // Customize this condition for your broken images
    if (src.includes("oaiusercontent.com") || !src) {
      const fallbackText = doc.createElement("p");
      fallbackText.innerHTML = "<em>Image not found.</em>";
      img.replaceWith(fallbackText);
    }
  });

  return doc.body.innerHTML;
};

export const capitalize = (str: string = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const convertUppercase = (str: string | null) => {
  if (!str) return null;
  return str.toLowerCase();
};
export const formatName = (name: string = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("_");

export function validatePrefixOrSuffix(
  value: string,
  field: "Prefix" | "Suffix"
) {
  if (!value) return null;
  if (/[a-zA-Z]/.test(value)) {
    return `${field} cannot contain letters. Please use only special characters (e.g. @, #, %).`;
  }

  if (/[0-9]/.test(value)) {
    return `${field} cannot contain numbers. Please use only special characters (e.g. @, #, %).`;
  }

  if (/,/.test(value)) {
    return `${field} cannot contain commas. Please use only special characters (e.g. @, #, %).`;
  }

  if (!/^[^a-zA-Z0-9,]{1,2}$/.test(value)) {
    return `${field} must be 1 or 2 special characters only.`;
  }

  return null;
}

// --------------- Debounced Search Hook ----------------

export const useDebouncedSearch = (minLength = 3, delay = 500) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(
    searchQuery.trim().length >= minLength ? searchQuery.trim() : "",
    delay
  );
  return { searchQuery, setSearchQuery, debouncedSearchQuery };
};

// ---------------- URL Helpers ----------------
export const dobIso = (dob: string) => new Date(dob).toISOString();

export const updateQueryParams = (
  router: any,
  pathname: string,
  searchParams: URLSearchParams,
  newParams: Record<string, any>
) => {
  const queryParts: string[] = [];

  // 1. search first
  if (newParams.search) queryParts.push(`search=${newParams.search}`);

  // 2. existing filters
  searchParams.forEach((value, key) => {
    if (!["search", "page", "limit"].includes(key)) {
      queryParts.push(`${key}=${value}`);
    }
  });

  // 3. page & limit last
  if (newParams.page) queryParts.push(`page=${newParams.page}`);
  if (newParams.limit) queryParts.push(`limit=${newParams.limit}`);

  const queryString = queryParts.join("&");
  router.replace(`${pathname}?${queryString}`, { scroll: false });
};

// ---------------- Sort Helpers ----------------

export function getNextSortState(
  currentSortBy: string | null | undefined,
  currentSortOrder: "asc" | "desc" | null | undefined,
  columnAccessor: string
): SortState {
  if (currentSortBy !== columnAccessor) {
    return { sortBy: columnAccessor, sortOrder: "asc" };
  }
  return {
    sortBy: columnAccessor,
    sortOrder: currentSortOrder === "asc" ? "desc" : "asc",
  };
}

export const hasActiveFilters = (
  filter: Record<string, any>,
  searchParams: URLSearchParams
): boolean => {
  return (
    // Check array-based filters (but NOT "search")
    Object.entries(filter).some(([key, val]) => {
      if (key === "search") return false; // exclude search
      return Array.isArray(val) && val.length > 0;
    }) ||
    // Check URL params except page, limit, and search
    Array.from(searchParams.entries()).some(([key, value]) => {
      if (["page", "limit", "search"].includes(key)) return false;
      return !!value;
    })
  );
};

export const normalizeFiltersUtil = (
  filterObj: Record<string, any>,
  searchParams: ReadonlyURLSearchParams,
  pathname: string,
  router: AppRouterInstance,
  page: number = DEFAULT_PAGINATION.page,
  limit: number = DEFAULT_PAGINATION.limit
) => {
  const normalized: Record<string, any> = {};

  // Copy only filter values that exist
  Object.entries(filterObj).forEach(([key, value]) => {
    if (!value || value.length === 0) return;
    normalized[key] = value;
  });

  // Start from existing search params
  const params = new URLSearchParams(searchParams.toString());

  // Remove old filter keys
  Object.keys(filterObj).forEach((key) => {
    params.delete(key);
  });

  // Append new filter values
  Object.entries(normalized).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  });

  // Always set page & limit
  params.set("page", String(page));
  params.set("limit", String(limit));

  router.replace(`${pathname}?${params.toString()}`, { scroll: false });

  return normalized;
};

export const normalizeFilter = (mergedFilter: Record<string, any>) => {
  return Object.entries(mergedFilter).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.length === 1 ? value[0] : value;
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};

export const handleSearchChangeUtil = ({
  value,
  router,
  pathname,
  searchParams,
  pageSize,
  setSearchQuery,
  updateQueryParams,
}: HandleSearchChangeParams) => {
  setSearchQuery(value);
  updateQueryParams(router, pathname, searchParams, {
    search: value.trim() || null,
    page: DEFAULT_PAGINATION.page,
    limit: pageSize,
  });
};

// Calculate min date (today - 18 years)
export const minYear = () => {
  const today = new Date();
  const year = today.getFullYear() - 18;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // Format: "YYYY-MM-DD"
};

export default function getCroppedImg(
  imageSrc: string,
  crop: any
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas not supported");
        return;
      }

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = (error) => reject(error);
  });
}

export function getFormattedFullName(
  firstName?: string,
  lastName?: string
): string {
  const capitalize = (str?: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return [capitalize(firstName), capitalize(lastName)]
    .filter(Boolean)
    .join(" ");
}

export function formatPublishedDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
  });
  const month = date.toLocaleDateString("en-GB", {
    month: "short",
  });
  const year = date.getFullYear();
  const weekday = date.toLocaleDateString("en-GB", {
    weekday: "short",
  });

  // Output: "01 Jan, 2025 | Sun"
  return `${day} ${month}, ${year} | ${weekday}`;
}

export const passwordValidationRules = yup
  .string()
  .required("Password is required")
  .test(
    "no-space",
    "Password must not contain spaces",
    (value) => !/\s/.test(value || "")
  )
  .test("uppercase", "Password must contain an uppercase letter", (value) =>
    /[A-Z]/.test(value || "")
  )
  .test("lowercase", "Password must contain a lowercase letter", (value) =>
    /[a-z]/.test(value || "")
  )
  .test("number", "Password must contain a number", (value) =>
    /[0-9]/.test(value || "")
  )
  .test("special", "Password must contain a special character", (value) =>
    /[^A-Za-z0-9]/.test(value || "")
  )
  .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters")
  .max(PASSWORD_MAX_LENGTH, "Password must not exceed 20 characters");
