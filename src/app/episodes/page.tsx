import { Metadata } from "next";
import { getEpisodes } from "@/lib/rickmorty";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Pagination } from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Episodios",
  description: "Explora todos los episodios de Rick and Morty",
};

interface EpisodesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function EpisodesPage({
  searchParams,
}: EpisodesPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const data = await getEpisodes(page);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
            Episodios
          </h1>
          <p className="text-muted-foreground mt-1">
            Lista completa de todas las aventuras
          </p>
        </div>
        <div className="px-4 py-2 bg-card border border-white/10 rounded-full text-sm font-medium text-muted-foreground">
          <span className="text-primary font-bold">{data.info.count}</span> episodios emitidos
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((episode, index) => (
          <div 
            key={episode.id}
            className="animate-in zoom-in-50 duration-500 fill-mode-backwards"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <EpisodeCard episode={episode} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={data.info.pages}
        baseUrl="/episodes"
      />
    </div>
  );
}
