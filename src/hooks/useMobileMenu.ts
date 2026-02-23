import { useCallback, useEffect, useRef, useState } from "react";

const BACKDROP_DEBOUNCE_MS = 150;

export const mobileMenuLinks = [
  { id: "top", label: "Home" },
  { id: "contact", label: "Contact" },
  { id: "pricing", label: "Pricing" },
  { id: "experience", label: "Experience" },
  { id: "menu", label: "Menu" },
];

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenedAtRef = useRef<number>(0);
  const menuPanelRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const btn = menuButtonRef.current;
    if (!btn) return;
    const handleClick = () => {
      setMenuOpen((prev) => {
        if (!prev) menuOpenedAtRef.current = Date.now();
        return !prev;
      });
    };
    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (Date.now() - menuOpenedAtRef.current < BACKDROP_DEBOUNCE_MS) return;
    closeMenu();
  }, [closeMenu]);

  return {
    menuOpen,
    closeMenu,
    handleBackdropClick,
    menuButtonRef,
    menuPanelRef,
  };
}
