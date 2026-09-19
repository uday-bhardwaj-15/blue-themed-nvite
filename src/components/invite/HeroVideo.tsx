"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import poster from "@/assets/hero-poster.jpg";
import { invite } from "@/data/invite";

const posterSrc = typeof poster === "string" ? poster : poster.src;

// Desktop: landscape/wide video (1080p)
const desktopVideoSrc = "/Wedding_invitation_background_video_1080p_20260919194758.mp4";
// Mobile: portrait/balcony video (vertical-friendly)
const mobileVideoSrc = "/Marble_balcony_overlooking_sea_20260919202027.mp4";

export function HeroVideo({ playing = false }: { playing?: boolean }) {
  const [offset, setOffset] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Detect mobile breakpoint (< 640px = sm)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback — silent
      });
    }
  }, [playing]);

  // When video source changes (mobile ↔ desktop), keep playing state
  const videoSrc = isMobile ? mobileVideoSrc : desktopVideoSrc;

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#6a97c7]">
      {/* Seamless Sky & Ocean Backdrop matching video palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #6290c0 0%, #7fa9d2 30%, #9bc2e5 60%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Responsive video — mobile uses portrait balcony, desktop uses landscape wedding */}
      <video
        key={videoSrc}
        ref={videoRef}
        className="absolute inset-0 m-auto h-full w-full object-cover object-center"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="auto"
        autoPlay={playing}
      />

      {/* Cinematic Vignette Overlay for Typography Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,35,70,0.40) 0%, rgba(15,35,70,0.12) 35%, rgba(15,35,70,0.28) 70%, var(--background) 100%)",
        }}
      />

      {/* Main Hero Content */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-1 px-6 text-center"
        style={{
          transform: `translateY(calc(-8vh + ${offset * 0.22}px))`,
          opacity: Math.max(0, 1 - offset / 620),
        }}
      >
        <div className="font-display mt-2 space-y-0.5 text-xs text-ivory/90 sm:text-sm">
          <p>{invite.groom.education}</p>
          <p>{invite.groom.title}</p>
          <p>{invite.groom.parents}</p>
        </div>
        {/* Heart */}
        <span className="text-lg text-ivory/90">&#10084;</span>

        {/* Welcome Text */}
        <p className="font-script mt-1 max-w-xs text-lg leading-relaxed text-ivory/95 drop-shadow-lg sm:max-w-sm sm:text-2xl">
          We are honored to welcome you to the Wedding Ceremony of...
        </p>
        {/* Groom */}
        <div className="mb-0">
          <h2 className="font-script gold-text text-5xl leading-[1.3] py-2 drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] sm:text-8xl">
            {invite.groom.name}
          </h2>
        </div>

        {/* Ampersand */}
        <p className="font-script my-0 text-2xl text-ivory/85 sm:text-3xl">&amp;</p>
        {/* Bride */}
        <div className="">
          <h1 className="font-script gold-text text-5xl leading-[1.3] py-2 drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] sm:text-8xl">
            {invite.bride.name}
          </h1>

          <div className="font-display  space-y-0.5 text-xs text-ivory/90 sm:text-sm">
            <p>{invite.bride.parents}</p>
            <p>{invite.bride.title}</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center text-ivory/85">
        <span className="font-display text-[0.65rem] uppercase tracking-[0.5em]">Scroll</span>

        <ChevronDown
          className="mt-1 h-5 w-5"
          style={{
            animation: "soft-float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
