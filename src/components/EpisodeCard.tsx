import Link from "next/link";
import { Episode } from "@/lib/types";
import { Calendar, Users } from "lucide-react";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link 
      href={`/episodes/${episode.id}`} 
      className="group relative block p-6 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-primary/10 text-primary border border-primary/20">
            {episode.episode}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-background/50 px-2 py-1 rounded-full">
            <Users className="size-3" />
            {episode.characters.length} personajes
          </span>
        </div>

        <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
          {episode.name}
        </h2>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="size-4 text-primary" />
          <span>Emitido el {episode.air_date}</span>
        </div>
      </div>
    </Link>
  );
}
