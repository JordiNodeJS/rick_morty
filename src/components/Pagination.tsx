"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    const queryString = params.toString();
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    router.push(url);
  };

  return (
    <div className="flex justify-center items-center gap-4 py-8 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "border border-white/10 bg-card hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50"
        )}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>
      
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span className="text-foreground">{currentPage}</span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "border border-white/10 bg-card hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50"
        )}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
