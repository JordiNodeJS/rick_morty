/**
 * Rick and Morty API Client
 * 
 * Cliente tipado para consumir la API pública de Rick and Morty
 * con estrategias de caching optimizadas para Next.js 15
 */

import {
  Character,
  Episode,
  Location,
  ApiResponse,
  CharacterFilters,
  EpisodeFilters,
  LocationFilters,
} from "./types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Opciones de configuración para fetch
 */
interface FetchOptions {
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

/**
 * Función helper para hacer peticiones a la API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    cache: options.cache || "force-cache",
    next: options.next,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convierte filtros a query string
 */
function buildQueryString(filters: Record<string, string | undefined>): string {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

// ===========================
// CHARACTERS
// ===========================

/**
 * Obtiene una lista paginada de personajes
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getCharacters(
  page: number = 1,
  filters?: CharacterFilters
): Promise<ApiResponse<Character>> {
  const filterParams = filters ? buildQueryString(filters as Record<string, string>) : "";
  const pageParam = page > 1 ? `${filterParams ? "&" : "?"}page=${page}` : "";
  const endpoint = `/character${filterParams}${pageParam}`;

  return fetchAPI<ApiResponse<Character>>(endpoint, {
    next: { revalidate: 3600, tags: ["characters"] },
  });
}

/**
 * Obtiene un personaje por ID
 * Cache: Static con revalidación cada 24 horas
 */
export async function getCharacter(id: number): Promise<Character> {
  return fetchAPI<Character>(`/character/${id}`, {
    next: { revalidate: 86400, tags: [`character-${id}`] },
  });
}

/**
 * Obtiene múltiples personajes por IDs
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const character = await getCharacter(ids[0]);
    return [character];
  }
  
  const idsString = ids.join(",");
  return fetchAPI<Character[]>(`/character/${idsString}`, {
    next: { revalidate: 3600, tags: ["characters"] },
  });
}

// ===========================
// EPISODES
// ===========================

/**
 * Obtiene una lista paginada de episodios
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getEpisodes(
  page: number = 1,
  filters?: EpisodeFilters
): Promise<ApiResponse<Episode>> {
  const filterParams = filters ? buildQueryString(filters as Record<string, string>) : "";
  const pageParam = page > 1 ? `${filterParams ? "&" : "?"}page=${page}` : "";
  const endpoint = `/episode${filterParams}${pageParam}`;

  return fetchAPI<ApiResponse<Episode>>(endpoint, {
    next: { revalidate: 3600, tags: ["episodes"] },
  });
}

/**
 * Obtiene un episodio por ID
 * Cache: Static con revalidación cada 24 horas
 */
export async function getEpisode(id: number): Promise<Episode> {
  return fetchAPI<Episode>(`/episode/${id}`, {
    next: { revalidate: 86400, tags: [`episode-${id}`] },
  });
}

/**
 * Obtiene múltiples episodios por IDs
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const episode = await getEpisode(ids[0]);
    return [episode];
  }
  
  const idsString = ids.join(",");
  return fetchAPI<Episode[]>(`/episode/${idsString}`, {
    next: { revalidate: 3600, tags: ["episodes"] },
  });
}

// ===========================
// LOCATIONS
// ===========================

/**
 * Obtiene una lista paginada de localizaciones
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getLocations(
  page: number = 1,
  filters?: LocationFilters
): Promise<ApiResponse<Location>> {
  const filterParams = filters ? buildQueryString(filters as Record<string, string>) : "";
  const pageParam = page > 1 ? `${filterParams ? "&" : "?"}page=${page}` : "";
  const endpoint = `/location${filterParams}${pageParam}`;

  return fetchAPI<ApiResponse<Location>>(endpoint, {
    next: { revalidate: 3600, tags: ["locations"] },
  });
}

/**
 * Obtiene una localización por ID
 * Cache: Static con revalidación cada 24 horas
 */
export async function getLocation(id: number): Promise<Location> {
  return fetchAPI<Location>(`/location/${id}`, {
    next: { revalidate: 86400, tags: [`location-${id}`] },
  });
}

/**
 * Obtiene múltiples localizaciones por IDs
 * Cache: ISR con revalidación cada 1 hora
 */
export async function getMultipleLocations(ids: number[]): Promise<Location[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const location = await getLocation(ids[0]);
    return [location];
  }
  
  const idsString = ids.join(",");
  return fetchAPI<Location[]>(`/location/${idsString}`, {
    next: { revalidate: 3600, tags: ["locations"] },
  });
}

// ===========================
// UTILITIES
// ===========================

/**
 * Extrae el ID de una URL de la API
 * Ejemplo: "https://rickandmortyapi.com/api/character/1" -> 1
 */
export function extractIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Extrae múltiples IDs de un array de URLs
 */
export function extractIdsFromUrls(urls: string[]): number[] {
  return urls.map(extractIdFromUrl);
}
