import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Users, Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Explora el universo de Rick and Morty. Descubre personajes, episodios y localizaciones.",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
      
      <div className="space-y-4 max-w-3xl animate-in fade-in zoom-in duration-500">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Explora el multiverso de <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rick and Morty
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Tu portal definitivo para descubrir cada dimensión, personaje extraño y aventura caótica.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8 animate-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
        <Link 
          href="/characters" 
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,181,204,0.5)]"
        >
          <span className="mr-2"><Users className="size-5" /></span>
          <span>Ver Personajes</span>
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link 
          href="/episodes" 
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-input bg-background px-8 font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
        >
          <span className="mr-2"><Tv className="size-5" /></span>
          <span>Ver Episodios</span>
        </Link>
      </div>

      {/* Stats or Features (Optional Placeholder) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 text-muted-foreground animate-in fade-in duration-1000 delay-500">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-foreground">800+</span>
          <span className="text-sm uppercase tracking-wider">Personajes</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-foreground">50+</span>
          <span className="text-sm uppercase tracking-wider">Episodios</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-foreground">120+</span>
          <span className="text-sm uppercase tracking-wider">Lugares</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold text-foreground">∞</span>
          <span className="text-sm uppercase tracking-wider">Dimensiones</span>
        </div>
      </div>
    </div>
  );
}
