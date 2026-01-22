import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import ClientNav from "@/components/ClientNav";
import { QueryProvider } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rick and Morty App",
    template: "%s | Rick and Morty App",
  },
  description: "Explora el universo de Rick and Morty. Personajes, episodios y localizaciones de la serie.",
  keywords: ["Rick and Morty", "API", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Rick and Morty API" }],
  openGraph: {
    title: "Rick and Morty App",
    description: "Explora el universo de Rick and Morty",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        <QueryProvider>
          <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  Rick & Morty
                </span>
              </Link>
              
              <ClientNav />
            </div>
          </header>

          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="border-t border-white/10 bg-card py-8 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>
                Hecho con <span className="text-red-500">♥</span> usando{" "}
                <a
                  href="https://rickandmortyapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Rick and Morty API
                </a>
              </p>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
