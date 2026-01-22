"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function EpisodeDetailError({
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
      title="Error al cargar episodio"
      description="No se pudo cargar la información del episodio."
      showHomeButton={false}
      showBackButton={true}
      backUrl="/episodes"
      backLabel="Volver a episodios"
    />
  );
}
