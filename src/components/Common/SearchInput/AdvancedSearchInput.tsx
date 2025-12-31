import { CloseButton, Input } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AdvancedSearchInputProps, TriggerMode } from "@/types/Common";

export const AdvancedSearchInput: React.FC<AdvancedSearchInputProps> = ({
  value,
  onChange,
  onClear,
  onSearch,
  debounceMs = 0,
  throttleMs = 0,
  triggerOn = "change",
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [internal, setInternal] = useState<string>(value);
  const lastFiredRef = useRef<number>(0);
  const lastURLUpdateRef = useRef<string>("");
  const isInitializedRef = useRef<boolean>(false);

  // Initialize from URL on mount (only once)
  useEffect(() => {
    if (isInitializedRef.current) return;
    
    const urlSearch = searchParams.get("search");
    if (urlSearch && !value) {
      setInternal(urlSearch);
      lastURLUpdateRef.current = urlSearch;
      if (onSearch) onSearch(urlSearch);
    }
    isInitializedRef.current = true;
  }, []); // Empty deps - only on mount

  useEffect(() => {
    setInternal(value);
  }, [value]);

  const [debounced] = useDebouncedValue(internal, Math.max(0, debounceMs));

  const throttledValue = useMemo(() => {
    if (!throttleMs) return internal;
    const now = Date.now();
    if (now - lastFiredRef.current >= throttleMs) {
      lastFiredRef.current = now;
      return internal;
    }
    return null;
  }, [internal, throttleMs]);

  useEffect(() => {
    if (triggerOn !== "change" || !onSearch) return;

    if (debounceMs > 0) {
      onSearch(debounced);
      // Update URL
      updateURL(debounced);
      return;
    }

    if (throttleMs > 0) {
      if (throttledValue !== null) {
        onSearch(throttledValue);
        updateURL(throttledValue);
      }
      return;
    }

    onSearch(internal);
    updateURL(internal);
  }, [debounced, throttledValue, internal, triggerOn, onSearch, debounceMs, throttleMs]);

  // Update URL with search param
  const updateURL = (searchValue: string) => {
    // Prevent duplicate updates
    if (lastURLUpdateRef.current === searchValue) return;
    
    lastURLUpdateRef.current = searchValue;
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    const newURL = params.toString() ? `?${params.toString()}` : pathname;
    router.replace(newURL, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (triggerOn === "enter" && e.key === "Enter" && onSearch) {
      onSearch(internal);
      updateURL(internal);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(event.currentTarget.value);
    onChange(event);
  };

  const handleClear = () => {
    setInternal("");
    onClear();
    updateURL("");
    if (triggerOn !== "change" && onSearch) onSearch("");
  };

  return (
    <Input
      value={internal}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      leftSection={<IconSearch size={18} />}
      leftSectionPointerEvents="none"
      rightSection={
        <CloseButton
          onClick={handleClear}
          aria-label="Clear search"
          style={{ visibility: internal ? "visible" : "hidden" }}
        />
      }
      rightSectionPointerEvents="all"
      {...props}
    />
  );
};

export default AdvancedSearchInput;
