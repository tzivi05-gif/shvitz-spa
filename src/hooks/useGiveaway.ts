import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "shvitz-giveaway-dismissed";
const SHOW_DELAY_MS = 1200;

export function useGiveaway() {
  const [showGiveaway, setShowGiveaway] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !window.localStorage.getItem(STORAGE_KEY)) {
        const timer = window.setTimeout(() => setShowGiveaway(true), SHOW_DELAY_MS);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleGiveawayClose = useCallback(() => {
    setShowGiveaway(false);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!showGiveaway || !href.startsWith("#")) return;
      e.preventDefault();
      handleGiveawayClose();
      const id = href.slice(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            window.history.pushState(null, "", href);
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    },
    [showGiveaway, handleGiveawayClose]
  );

  return { showGiveaway, handleGiveawayClose, handleAnchorClick };
}
