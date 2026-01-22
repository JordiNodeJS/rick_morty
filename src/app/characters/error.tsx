"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function CharactersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Error al cargar personajes"
      description="No se pudieron cargar los personajes. Por favor, verifica tu conexión e intenta de nuevo."
      showHomeButton={true}
    />
  );
}
