import React, { type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, NotebookPen } from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-notion-bg text-notion-text">
      <nav className="sticky top-0 z-50 bg-notion-bg/80 backdrop-blur-md border-b border-notion-border h-[100px] flex justify-center">
        <div className="w-full max-w-[900px] px-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-notion-primary no-underline"
          >
            <span className="flex items-center justify-center w-6 h-6 bg-notion-text text-notion-bg rounded text-sm font-sans">
              P
            </span>
            Pravega
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-1.5 text-[0.95rem] transition-colors",
                isActive("/")
                  ? "text-notion-text font-medium"
                  : "text-notion-muted hover:text-notion-text"
              )}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/events"
              className={cn(
                "flex items-center gap-1.5 text-[0.95rem] transition-colors",
                isActive("/events")
                  ? "text-notion-text font-medium"
                  : "text-notion-muted hover:text-notion-text"
              )}
            >
              <Calendar size={18} />
              <span>Events</span>
            </Link>
            <Link
              to="/register"
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded font-medium transition-all text-sm",
                isActive("/register")
                  ? "bg-notion-accent text-white hover:opacity-90 shadow-sm"
                  : "text-notion-text border border-notion-border hover:bg-notion-card shadow-sm"
              )}
            >
              <NotebookPen size={18} />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[900px] mx-auto px-5 py-10">
        {children}
      </main>

      <footer className="text-center p-8 text-neutral-500 text-sm border-t border-notion-border mt-auto">
        <p>© 2025 Pravega Tech Fest</p>
      </footer>
    </div>
  );
};
