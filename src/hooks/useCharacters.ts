import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import type { Character, ApiResponse, CharacterFilters } from "@/lib/types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Query keys for characters
 */
export const characterKeys = {
  all: ["characters"] as const,
  lists: () => [...characterKeys.all, "list"] as const,
  list: (page: number, filters?: CharacterFilters) =>
    [...characterKeys.lists(), { page, filters }] as const,
  details: () => [...characterKeys.all, "detail"] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
};

/**
 * Fetch characters from API
 */
async function fetchCharacters(
  page: number = 1,
  filters?: CharacterFilters
): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  
  if (page > 1) params.set("page", page.toString());
  if (filters?.name) params.set("name", filters.name);
  if (filters?.status) params.set("status", filters.status);
  if (filters?.species) params.set("species", filters.species);
  if (filters?.gender) params.set("gender", filters.gender);
  
  const queryString = params.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ""}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch single character by ID
 */
async function fetchCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Hook to fetch paginated characters list
 * Use this for client-side data fetching with caching
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCharacters(1, { status: "alive" });
 * ```
 */
export function useCharacters(page: number = 1, filters?: CharacterFilters) {
  return useQuery({
    queryKey: characterKeys.list(page, filters),
    queryFn: () => fetchCharacters(page, filters),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch a single character by ID
 * 
 * @example
 * ```tsx
 * const { data: character, isLoading } = useCharacter(1);
 * ```
 */
export function useCharacter(id: number) {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => fetchCharacter(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: id > 0,
  });
}

/**
 * Hook to fetch characters with infinite scroll
 * 
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCharacters();
 * ```
 */
export function useInfiniteCharacters(filters?: CharacterFilters) {
  return useInfiniteQuery({
    queryKey: [...characterKeys.lists(), "infinite", filters],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return parseInt(url.searchParams.get("page") || "1", 10);
    },
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to search characters by name
 * Includes debouncing support
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useSearchCharacters(debouncedSearchTerm);
 * ```
 */
export function useSearchCharacters(name: string) {
  return useQuery({
    queryKey: characterKeys.list(1, { name }),
    queryFn: () => fetchCharacters(1, { name }),
    enabled: name.length >= 2,
    staleTime: 30 * 1000, // 30 seconds for search results
  });
}
