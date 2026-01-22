"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

interface SearchFiltersProps {
  /** Placeholder text for search input */
  placeholder?: string;
  /** Show status filter (for characters) */
  showStatusFilter?: boolean;
  /** Show species filter (for characters) */
  showSpeciesFilter?: boolean;
  /** Show gender filter (for characters) */
  showGenderFilter?: boolean;
}

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "alive", label: "Vivo" },
  { value: "dead", label: "Muerto" },
  { value: "unknown", label: "Desconocido" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "male", label: "Masculino" },
  { value: "female", label: "Femenino" },
  { value: "genderless", label: "Sin género" },
  { value: "unknown", label: "Desconocido" },
];

/**
 * Search and filter component for characters/episodes
 * Syncs state with URL search params
 */
export function SearchFilters({
  placeholder = "Buscar...",
  showStatusFilter = false,
  showSpeciesFilter = false,
  showGenderFilter = false,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for immediate UI feedback
  const initialName = searchParams.get("name") || "";
  const [searchValue, setSearchValue] = useState(initialName);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sync local state with URL if it changes externally
  useEffect(() => {
    const urlName = searchParams.get("name") || "";
    if (urlName !== searchValue) {
      setSearchValue(urlName);
    }
  }, [searchParams, searchValue]);

  // Debounced value for URL updates
  const debouncedSearch = useDebouncedValue(searchValue, 300);

  // Get current filter values from URL
  const currentStatus = searchParams.get("status") || "";
  const currentGender = searchParams.get("gender") || "";

  // Update URL with new params
  const updateSearchParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      let hasChanged = false;
      
      Object.entries(updates).forEach(([key, value]) => {
        const currentValue = params.get(key) || "";
        if (currentValue !== value) {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
          hasChanged = true;
        }
      });
      
      if (hasChanged) {
        // Reset to page 1 when filters change
        params.delete("page");
        const queryString = params.toString();
        router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
      }
    },
    [router, pathname, searchParams]
  );

  // Update URL when debounced search changes
  useEffect(() => {
    const currentSearch = searchParams.get("name") || "";
    if (debouncedSearch !== currentSearch) {
      updateSearchParams({ name: debouncedSearch });
    }
  }, [debouncedSearch, updateSearchParams, searchParams]);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleClearFilters = () => {
    setSearchValue("");
    router.push(`${pathname}`);
  };

  const hasActiveFilters = searchValue || currentStatus || currentGender;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-3 rounded-lg",
            "bg-card border border-white/10",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-all"
          )}
        />
        {searchValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Filter Toggle & Filters */}
      {(showStatusFilter || showSpeciesFilter || showGenderFilter) && (
        <>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "border border-white/10 hover:border-primary/50",
                showFilters && "bg-primary/10 border-primary/50"
              )}
            >
              <Filter className="size-4" />
              Filtros
              {hasActiveFilters && (
                <span className="size-2 rounded-full bg-primary" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-card border border-white/10">
              {showStatusFilter && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Estado
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => updateSearchParams({ status: e.target.value })}
                    className={cn(
                      "px-3 py-2 rounded-md",
                      "bg-background border border-white/10",
                      "text-foreground text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary"
                    )}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {showGenderFilter && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Género
                  </label>
                  <select
                    value={currentGender}
                    onChange={(e) => updateSearchParams({ gender: e.target.value })}
                    className={cn(
                      "px-3 py-2 rounded-md",
                      "bg-background border border-white/10",
                      "text-foreground text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary"
                    )}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
