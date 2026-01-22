import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  /** List of favorite character IDs */
  favoriteIds: number[];
  
  /** Add a character to favorites */
  addFavorite: (characterId: number) => void;
  
  /** Remove a character from favorites */
  removeFavorite: (characterId: number) => void;
  
  /** Toggle a character's favorite status */
  toggleFavorite: (characterId: number) => void;
  
  /** Check if a character is favorited */
  isFavorite: (characterId: number) => boolean;
  
  /** Clear all favorites */
  clearFavorites: () => void;
}

/**
 * Zustand store for managing favorite characters
 * Persists to localStorage automatically
 * 
 * @example
 * ```tsx
 * const { favoriteIds, toggleFavorite, isFavorite } = useFavoritesStore();
 * 
 * // Toggle favorite
 * toggleFavorite(character.id);
 * 
 * // Check if favorite
 * const isLiked = isFavorite(character.id);
 * ```
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (characterId) => {
        set((state) => {
          if (state.favoriteIds.includes(characterId)) {
            return state;
          }
          return { favoriteIds: [...state.favoriteIds, characterId] };
        });
      },

      removeFavorite: (characterId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== characterId),
        }));
      },

      toggleFavorite: (characterId) => {
        const { favoriteIds } = get();
        if (favoriteIds.includes(characterId)) {
          get().removeFavorite(characterId);
        } else {
          get().addFavorite(characterId);
        }
      },

      isFavorite: (characterId) => {
        return get().favoriteIds.includes(characterId);
      },

      clearFavorites: () => {
        set({ favoriteIds: [] });
      },
    }),
    {
      name: "rick-morty-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/**
 * Selector to get the count of favorites
 */
export const useFavoritesCount = () =>
  useFavoritesStore((state) => state.favoriteIds.length);

/**
 * Selector to check if a specific character is favorited
 */
export const useIsFavorite = (characterId: number) =>
  useFavoritesStore((state) => state.favoriteIds.includes(characterId));
