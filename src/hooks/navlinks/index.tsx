import { useMemo } from "react";

export function useNavLinkStyles(isActive: boolean) {
  return useMemo(
    () => ({
      root: {
        color: "var(--toggle-icon)",
        borderRadius: "100px",
        boxShadow: isActive ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
        backgroundColor: isActive ? "var(--white-color)" : "transparent",
        transition: "all 0.3s",
      },
      label: { fontWeight: 400 },
    }),
    [isActive],
  );
}

export function useParentLinkStyles(isActive: boolean) {
  return useMemo(
    () => ({
      root: {
        color: isActive ? "var(--white-color)" : "var(--toggle-icon)",
        borderRadius: "8px",
        boxShadow: isActive ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
        backgroundColor: isActive ? " var(--toggle-icon)" : "transparent",
        transition: "all 0.3s ease-in-out",
      },
      label: { fontWeight: 400 },
    }),
    [isActive],
  );
}

// Dropdown menu style (minimal)
export function useDropdownNavLinkStyles(isActive: boolean) {
  return useMemo(
    () => ({
      root: {
        color: isActive ? "var(--active-color)" : "var(--toggle-icon)",
        transition: "all 0.3s",
        backgroundColor: "transparent",
        borderLeft: isActive ? "4px solid var(--active-color)" : "4px solid transparent",
      },
      label: { fontWeight: 400 },
    }),
    [isActive],
  );
}
