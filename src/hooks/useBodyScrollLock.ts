import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    document.body.classList.toggle("modal-open", locked);
  }, [locked]);
}
