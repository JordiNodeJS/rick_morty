"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function CharacterDetailError({
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
      title="Error al cargar personaje"
      description="No se pudo cargar la información del personaje."
      showHomeButton={false}
      showBackButton={true}
      backUrl="/characters"
      backLabel="Volver a personajes"
    />
  );
}
