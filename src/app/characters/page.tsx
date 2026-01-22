import { Metadata } from "next";
import { getCharacters } from "@/lib/rickmorty";
import { CharacterCard } from "@/components/CharacterCard";
import { Pagination } from "@/components/Pagination";
import { SearchFilters } from "@/components/SearchFilters";
import type { CharacterFilters } from "@/lib/types";

export const metadata: Metadata = {
  title: "Personajes",
  description: "Explora todos los personajes del universo de Rick and Morty",
};

interface CharactersPageProps {
  searchParams: Promise<{ 
    page?: string;
    name?: string;
    status?: string;
    gender?: string;
  }>;
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  
  // Build filters from search params
  const filters: CharacterFilters = {};
  if (params.name) filters.name = params.name;
  if (params.status) filters.status = params.status as CharacterFilters["status"];
  if (params.gender) filters.gender = params.gender as CharacterFilters["gender"];

  const data = await getCharacters(page, Object.keys(filters).length > 0 ? filters : undefined);

  const hasFilters = params.name || params.status || params.gender;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            Personajes
          </h1>
          <p className="text-muted-foreground mt-1">
            Explora la base de datos completa del multiverso
          </p>
        </div>
        <div className="px-4 py-2 bg-card border border-white/10 rounded-full text-sm font-medium text-muted-foreground">
          <span className="text-primary font-bold">{data.info.count}</span> personajes encontrados
        </div>
      </div>

      <SearchFilters
        placeholder="Buscar personaje por nombre..."
        showStatusFilter
        showGenderFilter
      />

      {data.results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.results.map((character, index) => (
              <div 
                key={character.id}
                className="animate-in zoom-in-50 duration-500 fill-mode-backwards"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CharacterCard character={character} showFavorite />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={data.info.pages}
            baseUrl="/characters"
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-muted-foreground mb-2">
            No se encontraron personajes
          </p>
          {hasFilters && (
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          )}
        </div>
      )}
    </div>
  );
}
