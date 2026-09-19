"use client";

import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/img-1.webp",
    alt: "Wedding moment 1",
  },
  {
    src: "/img-2.webp",
    alt: "Wedding moment 2",
  },
  {
    src: "/img-3.webp",
    alt: "Wedding moment 3",
  },
  {
    src: "/img-4.webp",
    alt: "Wedding moment 4",
  },
];

export function Gallery() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startX.current === null || startY.current === null) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Detect gesture direction on first movement
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isHorizontalSwipe.current = Math.abs(dx) >= Math.abs(dy);
        if (isHorizontalSwipe.current) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // ignore if pointer capture fails
          }
        }
      }
    }

    if (isHorizontalSwipe.current) {
      setDragOffset(dx);
    }
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;

    if (dragOffset > 45) {
      go(index - 1);
    } else if (dragOffset < -45) {
      go(index + 1);
    }

    setIsDragging(false);
    setDragOffset(0);
    startX.current = null;
    startY.current = null;
    isHorizontalSwipe.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      go(index + 1);
    }
  };

  return (
    <div
      className="mx-auto max-w-3xl px-4 select-none outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Photo Gallery"
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-gold/20 shadow-[var(--shadow-soft)] touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {/* Slides Track */}
        <div
          className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"}`}
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
          }}
        >
          {slides.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1400}
              height={900}
              draggable={false}
              loading="lazy"
              className="aspect-[14/9] w-full shrink-0 object-cover pointer-events-none"
            />
          ))}
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

        {/* Counter Badge */}
        <div className="pointer-events-none absolute top-3 right-3 rounded-full border border-gold/30 bg-card/80 px-2.5 py-0.5 text-[0.7rem] font-medium tracking-widest text-primary backdrop-blur-md">
          {index + 1} / {slides.length}
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(index - 1);
          }}
          aria-label="Previous photo"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold/40 bg-card/85 text-primary shadow-[var(--shadow-soft)] backdrop-blur-md transition-all hover:scale-110 hover:bg-card active:scale-95 focus:outline-none"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 -ml-0.5" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(index + 1);
          }}
          aria-label="Next photo"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-gold/40 bg-card/85 text-primary shadow-[var(--shadow-soft)] backdrop-blur-md transition-all hover:scale-110 hover:bg-card active:scale-95 focus:outline-none"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 -mr-0.5" />
        </button>
      </div>

      {/* Pagination Dots (Kept and given comfortable tap targets) */}
      <div className="mt-4 flex items-center justify-center gap-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => go(i)}
            className="group flex h-8 items-center justify-center px-1.5 focus:outline-none"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-primary shadow-sm"
                  : "w-2.5 bg-primary/25 group-hover:bg-primary/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
