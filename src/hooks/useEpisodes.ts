import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import type { Episode, ApiResponse, EpisodeFilters } from "@/lib/types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Query keys for episodes
 */
export const episodeKeys = {
  all: ["episodes"] as const,
  lists: () => [...episodeKeys.all, "list"] as const,
  list: (page: number, filters?: EpisodeFilters) =>
    [...episodeKeys.lists(), { page, filters }] as const,
  details: () => [...episodeKeys.all, "detail"] as const,
  detail: (id: number) => [...episodeKeys.details(), id] as const,
};

/**
 * Fetch episodes from API
 */
async function fetchEpisodes(
  page: number = 1,
  filters?: EpisodeFilters
): Promise<ApiResponse<Episode>> {
  const params = new URLSearchParams();
  
  if (page > 1) params.set("page", page.toString());
  if (filters?.name) params.set("name", filters.name);
  if (filters?.episode) params.set("episode", filters.episode);
  
  const queryString = params.toString();
  const url = `${API_BASE_URL}/episode${queryString ? `?${queryString}` : ""}`;
  
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
 * Fetch single episode by ID
 */
async function fetchEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_BASE_URL}/episode/${id}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Hook to fetch paginated episodes list
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error } = useEpisodes(1);
 * ```
 */
export function useEpisodes(page: number = 1, filters?: EpisodeFilters) {
  return useQuery({
    queryKey: episodeKeys.list(page, filters),
    queryFn: () => fetchEpisodes(page, filters),
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to fetch a single episode by ID
 * 
 * @example
 * ```tsx
 * const { data: episode, isLoading } = useEpisode(1);
 * ```
 */
export function useEpisode(id: number) {
  return useQuery({
    queryKey: episodeKeys.detail(id),
    queryFn: () => fetchEpisode(id),
    staleTime: 5 * 60 * 1000,
    enabled: id > 0,
  });
}

/**
 * Hook to fetch episodes with infinite scroll
 */
export function useInfiniteEpisodes(filters?: EpisodeFilters) {
  return useInfiniteQuery({
    queryKey: [...episodeKeys.lists(), "infinite", filters],
    queryFn: ({ pageParam = 1 }) => fetchEpisodes(pageParam, filters),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return parseInt(url.searchParams.get("page") || "1", 10);
    },
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
}
