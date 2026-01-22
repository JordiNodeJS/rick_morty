"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function EpisodesError({
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
      title="Error al cargar episodios"
      description="No se pudieron cargar los episodios. Por favor, verifica tu conexión e intenta de nuevo."
      showHomeButton={true}
    />
  );
}
