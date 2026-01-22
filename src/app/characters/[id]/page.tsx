import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter, extractIdsFromUrls, getMultipleEpisodes } from "@/lib/rickmorty";
import { cn } from "@/lib/utils";
import { getStatusConfig, getGenderConfig } from "@/lib/character-utils";
import { ArrowLeft, Calendar, Tv, User, MapPin, Globe } from "lucide-react";

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CharacterDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(parseInt(id, 10));

  return {
    title: character.name,
    description: `${character.name} - ${character.species} de ${character.origin.name}`,
    openGraph: {
      title: character.name,
      description: `${character.name} - ${character.species}`,
      images: [character.image],
    },
  };
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;
  const characterId = parseInt(id, 10);

  if (isNaN(characterId)) {
    notFound();
  }

  const character = await getCharacter(characterId);
  const episodeIds = extractIdsFromUrls(character.episode);
  const episodes = await getMultipleEpisodes(episodeIds);

  const statusConfig = getStatusConfig(character.status);
  const StatusIcon = statusConfig.icon;
  
  const genderConfig = getGenderConfig(character.gender);
  const GenderIcon = genderConfig.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <Link href="/characters" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 size-4" />
        Volver a personajes
      </Link>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {character.name}
            </h1>
            <span className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-md",
              statusConfig.color
            )}>
              <StatusIcon className="size-4" />
              {character.status}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-white/5 space-y-1">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <User className="size-4" /> Especie
              </span>
              <p className="font-medium text-lg">{character.species}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-card border border-white/5 space-y-1">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <GenderIcon className="size-4" /> Género
              </span>
              <p className="font-medium text-lg">{character.gender}</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-white/5 space-y-1 sm:col-span-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Globe className="size-4" /> Origen
              </span>
              <p className="font-medium text-lg">{character.origin.name}</p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-white/5 space-y-1 sm:col-span-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="size-4" /> Ubicación actual
              </span>
              <p className="font-medium text-lg">{character.location.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-white/10">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tv className="size-6 text-primary" />
          Apariciones en episodios
          <span className="text-sm font-normal text-muted-foreground ml-2">({character.episode.length})</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map((episode) => (
            <Link 
              key={episode.id} 
              href={`/episodes/${episode.id}`}
              className="group p-4 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {episode.episode}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3" />
                  {episode.air_date}
                </span>
              </div>
              <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                {episode.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
