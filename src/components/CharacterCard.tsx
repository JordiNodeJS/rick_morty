import Image from "next/image";
import Link from "next/link";
import { Character } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "@/lib/character-utils";
import { MapPin } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

interface CharacterCardProps {
  character: Character;
  /** Show favorite button (client-side feature) */
  showFavorite?: boolean;
}

export function CharacterCard({ character, showFavorite = false }: CharacterCardProps) {
  const statusConfig = getStatusConfig(character.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Link 
      href={`/characters/${character.id}`} 
      className="group relative overflow-hidden rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {showFavorite && (
            <FavoriteButton characterId={character.id} size="sm" />
          )}
          <span className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md",
            showFavorite ? "" : "ml-auto",
            statusConfig.color
          )}>
            <StatusIcon className="size-3.5" />
            {character.status}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h2 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
          {character.name}
        </h2>
        
        <div className="space-y-2 text-sm text-muted-foreground mt-auto">
          <div className="flex items-center justify-between">
            <span>Especie:</span>
            <span className="font-medium text-foreground">{character.species}</span>
          </div>
          
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <MapPin className="size-4 text-primary shrink-0" />
            <span className="truncate">{character.origin.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
