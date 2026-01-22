"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
  backLabel?: string;
}

/**
 * Reusable Error Boundary component for handling errors gracefully
 * with retry functionality and navigation options
 */
export function ErrorBoundary({
  error,
  reset,
  title = "Algo salió mal",
  description,
  showHomeButton = true,
  showBackButton = false,
  backUrl = "/",
  backLabel = "Volver",
}: ErrorBoundaryProps) {
  // Log error for debugging (in production, send to error tracking service)
  useEffect(() => {
    console.error("Error Boundary caught:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  const errorMessage = description || error.message || "Ha ocurrido un error inesperado";

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        {/* Error Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>

        {/* Error Digest for debugging */}
        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className={cn(
              "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
              "bg-primary text-primary-foreground font-medium",
              "hover:bg-primary/90 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            )}
          >
            <RefreshCcw className="w-4 h-4" />
            Intentar de nuevo
          </button>

          {showBackButton && (
            <Link
              href={backUrl}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
                "bg-card border border-white/10 font-medium",
                "hover:bg-accent hover:border-primary/50 transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
                "bg-card border border-white/10 font-medium",
                "hover:bg-accent hover:border-primary/50 transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              )}
            >
              <Home className="w-4 h-4" />
              Ir al inicio
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
