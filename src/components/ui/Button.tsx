import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "minimal";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-notion-accent text-white hover:bg-sky-700 border border-transparent shadow-sm",
    secondary:
      "bg-[#252525] text-notion-text border border-notion-border hover:bg-notion-card shadow-sm",
    minimal:
      "bg-transparent text-notion-muted hover:bg-notion-card hover:text-notion-text",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-3 text-lg h-12",
  };

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      whileTap={{ scale: 0.7 }}
      animate={{
        scale: 1,
      }}
      whileHover={{
        scale: 0.95,
        marginTop: "-2px",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
