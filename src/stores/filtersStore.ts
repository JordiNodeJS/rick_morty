import { create } from "zustand";
import type { CharacterFilters, EpisodeFilters } from "@/lib/types";

interface FiltersState {
  /** Character filters */
  characterFilters: CharacterFilters;
  
  /** Episode filters */
  episodeFilters: EpisodeFilters;
  
  /** Search query */
  searchQuery: string;
  
  /** Update character filters */
  setCharacterFilters: (filters: Partial<CharacterFilters>) => void;
  
  /** Update episode filters */
  setEpisodeFilters: (filters: Partial<EpisodeFilters>) => void;
  
  /** Update search query */
  setSearchQuery: (query: string) => void;
  
  /** Reset all filters */
  resetFilters: () => void;
  
  /** Reset character filters */
  resetCharacterFilters: () => void;
  
  /** Reset episode filters */
  resetEpisodeFilters: () => void;
}

const initialCharacterFilters: CharacterFilters = {};
const initialEpisodeFilters: EpisodeFilters = {};

/**
 * Zustand store for managing search and filter state
 * 
 * @example
 * ```tsx
 * const { characterFilters, setCharacterFilters } = useFiltersStore();
 * 
 * // Update filters
 * setCharacterFilters({ status: "alive" });
 * 
 * // Reset filters
 * resetCharacterFilters();
 * ```
 */
export const useFiltersStore = create<FiltersState>()((set) => ({
  characterFilters: initialCharacterFilters,
  episodeFilters: initialEpisodeFilters,
  searchQuery: "",

  setCharacterFilters: (filters) => {
    set((state) => ({
      characterFilters: { ...state.characterFilters, ...filters },
    }));
  },

  setEpisodeFilters: (filters) => {
    set((state) => ({
      episodeFilters: { ...state.episodeFilters, ...filters },
    }));
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  resetFilters: () => {
    set({
      characterFilters: initialCharacterFilters,
      episodeFilters: initialEpisodeFilters,
      searchQuery: "",
    });
  },

  resetCharacterFilters: () => {
    set({ characterFilters: initialCharacterFilters });
  },

  resetEpisodeFilters: () => {
    set({ episodeFilters: initialEpisodeFilters });
  },
}));

/**
 * Selector to check if any character filters are active
 */
export const useHasActiveCharacterFilters = () =>
  useFiltersStore((state) => Object.values(state.characterFilters).some(Boolean));

/**
 * Selector to check if any episode filters are active
 */
export const useHasActiveEpisodeFilters = () =>
  useFiltersStore((state) => Object.values(state.episodeFilters).some(Boolean));
