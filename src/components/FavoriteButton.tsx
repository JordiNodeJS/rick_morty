"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/stores";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  characterId: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const iconSizeClasses = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

/**
 * Button to toggle favorite status for a character
 * Uses Zustand store for state management
 */
export function FavoriteButton({
  characterId,
  className,
  size = "md",
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const liked = isFavorite(characterId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(characterId);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-200",
        "bg-background/80 backdrop-blur-sm border border-white/10",
        "hover:bg-background hover:border-white/20 hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        sizeClasses[size],
        className
      )}
    >
      <Heart
        className={cn(
          iconSizeClasses[size],
          "transition-all duration-200",
          liked
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground hover:text-red-500"
        )}
      />
    </button>
  );
}
