"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${shown ? "reveal-in" : "reveal-up"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="mx-auto flex w-40 items-center justify-center gap-3 py-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-xs text-primary">&#10084;</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-script text-center text-4xl leading-tight text-primary sm:text-5xl">
      {children}
    </h2>
  );
}
