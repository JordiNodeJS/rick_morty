import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisode, extractIdsFromUrls, getMultipleCharacters } from "@/lib/rickmorty";
import { CharacterCard } from "@/components/CharacterCard";
import { ArrowLeft, Calendar, Film, Users } from "lucide-react";

interface EpisodeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EpisodeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisode(parseInt(id, 10));

  return {
    title: `${episode.episode} - ${episode.name}`,
    description: `${episode.name} - Emitido el ${episode.air_date}`,
  };
}

export default async function EpisodeDetailPage({
  params,
}: EpisodeDetailPageProps) {
  const { id } = await params;
  const episodeId = parseInt(id, 10);

  if (isNaN(episodeId)) {
    notFound();
  }

  const episode = await getEpisode(episodeId);
  const characterIds = extractIdsFromUrls(episode.characters);
  const characters = await getMultipleCharacters(characterIds);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <Link href="/episodes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 size-4" />
        Volver a episodios
      </Link>

      <div className="bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 rounded-full text-sm font-mono font-bold bg-primary/10 text-primary border border-primary/20">
              {episode.episode}
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              {episode.air_date}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {episode.name}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground border-t border-white/5 pt-6 w-fit">
            <Film className="size-5 text-primary" />
            <span className="font-medium">Detalles del episodio</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <div className="flex items-center gap-3">
          <Users className="size-6 text-primary" />
          <h2 className="text-2xl font-bold">Personajes en este episodio</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground">
            {characters.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <div 
              key={character.id}
              className="animate-in zoom-in-50 duration-500 fill-mode-backwards"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
