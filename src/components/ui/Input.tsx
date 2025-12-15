import React, { type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 mb-3",
        fullWidth && "w-full",
        className
      )}
    >
      {label && (
        <label className="text-sm font-medium text-notion-muted">{label}</label>
      )}
      <input
        className={cn(
          "px-3 py-2 rounded border border-notion-border bg-[#252525] text-notion-text text-sm transition-all outline-none shadow-sm placeholder:text-[#5f5f5f]",
          "focus:border-notion-accent focus:ring-1 focus:ring-notion-accent/40",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/40"
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
