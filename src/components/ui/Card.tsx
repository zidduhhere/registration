import React, { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={cn(
        "bg-notion-card border border-notion-border rounded-md p-4 shadow-sm transition-all duration-200",
        hoverable && "cursor-pointer hover:bg-[#2c2c2c] hover:border-[#4d4d4d]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
