import React from "react";
import type { FallbackProps } from "react-error-boundary";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-notion-bg text-notion-text p-4">
      <Card className="max-w-md w-full flex flex-col items-center text-center p-8 bg-notion-card border-notion-border shadow-notion">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
          <AlertTriangle size={32} />
        </div>

        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-notion-muted mb-6">
          We encountered an unexpected error. Please try again.
        </p>

        {error && (
          <div className="w-full text-left bg-[#1A1A1A] p-3 rounded border border-notion-border mb-6 overflow-auto max-h-40">
            <code className="text-xs text-red-400 font-mono wrap-break-word">
              {error.message}
            </code>
          </div>
        )}

        <Button
          onClick={resetErrorBoundary}
          variant="primary"
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      </Card>
    </div>
  );
};
