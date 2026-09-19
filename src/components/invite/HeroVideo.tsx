"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import poster from "@/assets/hero-poster.jpg";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import { invite } from "@/data/invite";

const posterSrc = typeof poster === "string" ? poster : poster.src;

export function HeroVideo() {
  const [offset, setOffset] = useState(0);

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

  return (
    <section className="relative h-[100svh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroLoop.url}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.25 0.08 250 / 0.4) 0%, transparent 35%, oklch(0.25 0.08 250 / 0.3) 70%, var(--background) 100%)",
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

          {/* <div className="font-display mt-2 space-y-0.5 text-xs text-ivory/90 sm:text-sm">
            <p>{invite.groom.parents}</p>
            <p>{invite.groom.education}</p>
            <p>{invite.groom.title}</p>
          </div> */}
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
            {/* <p>{invite.bride.education}</p> */}
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
