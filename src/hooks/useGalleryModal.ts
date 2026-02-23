import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/components/Gallery";

export function useGalleryModal() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setSelectedImage(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  const handleSelectImage = useCallback((image: GalleryItem) => {
    setSelectedImage(image);
  }, []);

  return { selectedImage, setSelectedImage, handleSelectImage };
}
