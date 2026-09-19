"use client";

import { useState } from "react";
import envelopeBg from "@/assets/envelope-bg.jpg";
import waxSeal from "@/assets/wax-seal.png";

const envelopeBgSrc = typeof envelopeBg === "string" ? envelopeBg : envelopeBg.src;
const waxSealSrc = typeof waxSeal === "string" ? waxSeal : waxSeal.src;

export function EnvelopeGate({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [gone, setGone] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    // Trigger audio / background transitions right as the card begins rising (smooth flap flip)
    window.setTimeout(() => {
      onOpen();
    }, 350);

    // Mark flap as flipped halfway so its z-index drops behind the rising card
    window.setTimeout(() => setFlapOpened(true), 450);
    // Remove gate overlay after full animation sequence
    window.setTimeout(() => setGone(true), 2800);
  };

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[oklch(0.96_0.02_15)] select-none"
      style={{
        animation: opening ? "gate-fade-out 750ms ease-in-out 2000ms forwards" : undefined,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Ambient background wallpaper & romantic glow (optimized without heavy dynamic filter blur) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url(${envelopeBgSrc})`,
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, oklch(0.96 0.02 15 / 0.8) 0%, oklch(0.88 0.05 18 / 0.92) 75%, oklch(0.78 0.07 20 / 0.96) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main 3D Envelope Button */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Tap to open the wedding invitation"
        className="relative mx-auto aspect-[942/998] w-[88vw] max-w-[420px] cursor-pointer select-none focus:outline-none transition-transform duration-200 active:scale-[0.99]"
        style={{
          perspective: "1200px",
          WebkitPerspective: "1200px",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
        }}
      >
        {/* Soft realistic drop shadow under envelope */}
        <div
          className="absolute -bottom-6 left-[8%] right-[8%] h-10 rounded-[50%] bg-[oklch(0.3_0.1_20/0.35)] blur-lg"
          style={{
            transform: opening
              ? "translate3d(0, 10px, 0) scale(1.1)"
              : "translate3d(0, 0, 0) scale(1)",
            WebkitTransform: opening
              ? "translate3d(0, 10px, 0) scale(1.1)"
              : "translate3d(0, 0, 0) scale(1)",
            opacity: opening ? 0.2 : 0.5,
            transition: "transform 700ms ease, opacity 700ms ease",
            willChange: opening ? "transform, opacity" : undefined,
          }}
          aria-hidden="true"
        />

        {/* 1. ENVELOPE BACK WALL & INNER VELVET LINING */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#611c2e] shadow-[0_16px_40px_rgba(70,18,30,0.35)]"
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #7d263c 0%, #561727 60%, #3e0e1a 100%)",
            }}
          />
          {/* Subtle gold inner border */}
          <div className="absolute inset-2.5 rounded-[6px] border border-[#d4af37]/35 pointer-events-none" />
          <div className="absolute inset-3.5 rounded-[4px] border border-[#d4af37]/20 pointer-events-none" />
        </div>

        {/* 2. INVITATION CARD (Slides UP out of the pocket when opened) */}
        <div
          className="absolute inset-x-[5%] bottom-[5%] top-[8%] z-20 overflow-hidden rounded-[8px] bg-[#fffef9] shadow-[0_12px_32px_rgba(70,18,30,0.22)]"
          style={{
            animation: opening
              ? "card-emerge 1300ms cubic-bezier(0.16, 1, 0.3, 1) 450ms forwards"
              : undefined,
            willChange: opening ? "transform" : undefined,
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Luxury Card Design */}
          <div className="relative flex h-full flex-col items-center justify-between p-5 text-center sm:p-6">
            {/* Double Gold Card Borders */}
            <div className="pointer-events-none absolute inset-2.5 rounded-[5px] border border-[#d8b066]/65" />
            <div className="pointer-events-none absolute inset-3.5 rounded-[3px] border border-[#d8b066]/30" />

            {/* Header */}
            <div className="pt-1">
              <div className="mx-auto mb-1 flex items-center justify-center gap-2">
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#d8b066]" />
                <span className="text-[0.65rem] text-[#d8b066]">✦</span>
                <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#d8b066]" />
              </div>
              <p className="font-display text-[0.65rem] tracking-[0.35em] text-[#8e5260] uppercase font-medium">
                Wedding Invitation
              </p>
            </div>

            {/* Names */}
            <div className="my-auto py-1">
              <h2 className="font-script text-4xl sm:text-5xl leading-tight text-[#822137]">
                Archit &amp; Inshu
              </h2>
              <div className="mx-auto my-1.5 flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-[#d8b066]/70" />
                <span className="font-script text-sm text-[#d8b066]">♥</span>
                <span className="h-px w-10 bg-[#d8b066]/70" />
              </div>
              <p className="font-display text-[0.7rem] tracking-[0.2em] text-[#6d464f] uppercase">
                Together with their families
              </p>
            </div>

            {/* Date & Venue */}
            <div className="pb-1">
              <p className="font-display text-xs tracking-[0.25em] text-[#822137] font-semibold">
                November 25, 2026
              </p>
              <p className="font-display text-[0.62rem] tracking-[0.15em] text-[#936671] uppercase mt-0.5">
                The Regis Resort, Meerut
              </p>
            </div>
          </div>
        </div>

        {/* 3. FRONT POCKET (Bottom and side flaps of original envelopeBg) */}
        <div
          className="pointer-events-none absolute inset-0 z-25 overflow-hidden rounded-[10px]"
          style={{
            clipPath: "polygon(0 0, 50% 67.5%, 100% 0, 100% 100%, 0 100%)",
            WebkitClipPath: "polygon(0 0, 50% 67.5%, 100% 0, 100% 100%, 0 100%)",
            transform: "translate3d(0, 0, 1px)",
            WebkitTransform: "translate3d(0, 0, 1px)",
          }}
        >
          {/* Original envelope background cropped precisely to the pocket */}
          <img
            src={envelopeBgSrc}
            alt=""
            aria-hidden="true"
            className="absolute left-[-4.35%] top-[-24.65%] h-[153.9%] w-[108.7%] max-w-none object-cover"
          />
          {/* Subtle gold trim & shadow along the pocket V-notch */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(60,15,25,0.06) 67.5%, transparent 70%)",
            }}
          />
        </div>

        {/* 4. TOP FLAP (Folds UPWARDS in 3D around the top hinge axis) */}
        <div
          className="absolute inset-x-0 top-0 h-[67.5%]"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transformOrigin: "top center",
            WebkitTransformOrigin: "top center",
            zIndex: flapOpened ? 10 : 35,
            animation: opening
              ? "flap-fold-up 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : undefined,
            willChange: opening ? "transform" : undefined,
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
          }}
        >
          {/* Front Face (Visible when envelope is closed) */}
          <div
            className="absolute inset-0 overflow-visible"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 2px)",
              WebkitTransform: "translate3d(0, 0, 2px)",
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                WebkitClipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
              }}
            >
              {/* Original envelope image for the top flap */}
              <img
                src={envelopeBgSrc}
                alt=""
                aria-hidden="true"
                className="absolute left-[-4.35%] top-[-36.5%] h-[228%] w-[108.7%] max-w-none object-cover"
              />
              {/* Flap lighting gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/15" />
            </div>

            {/* WAX SEAL (Mounted on the tip of the top flap) */}
            <div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 select-none"
              style={{
                width: "96px",
                height: "96px",
                animation: opening ? undefined : "soft-float 4s ease-in-out infinite",
                transform: "translate3d(0, 0, 3px)",
                WebkitTransform: "translate3d(0, 0, 3px)",
              }}
            >
              {/* Gold glow behind wax seal */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(235,190,95,0.6) 0%, rgba(212,160,50,0.12) 65%, transparent 100%)",
                  animation: opening ? undefined : "glow-pulse 3s ease-in-out infinite",
                }}
                aria-hidden="true"
              />

              {/* Authentic Golden Wax Seal */}
              <img
                src={waxSealSrc}
                alt="Golden wax seal"
                width={192}
                height={192}
                className="h-full w-full object-contain drop-shadow-[0_4px_10px_rgba(90,40,10,0.5)]"
              />

              {/* "Tap to open" Typography on the wax seal */}
              <span
                className="font-script absolute inset-0 flex flex-col items-center justify-center text-[1.1rem] leading-[0.88] font-bold text-[#542d06]"
                style={{
                  textShadow: "0 1px 1px rgba(255,245,210,0.9), 0 -1px 1px rgba(80,40,0,0.45)",
                }}
              >
                Tap
                <span className="text-[0.9rem] font-normal leading-[0.85]">to</span>
                open
              </span>
            </div>
          </div>

          {/* Back Face (Visible when rotated 180deg upwards) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(180deg) translate3d(0, 0, 2px)",
              WebkitTransform: "rotateX(180deg) translate3d(0, 0, 2px)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              WebkitClipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          >
            {/* Velvet rose lining on back face of the opened flap */}
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, #7d263c 0%, #561727 60%, #3e0e1a 100%)",
              }}
            />
            {/* Gold piping along the opened flap's diagonal edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(to bottom left, rgba(212,175,55,0.4) 1px, transparent 1px)",
              }}
            />
          </div>
        </div>
      </button>

      {/* Helper text under envelope */}
      {!opening && (
        <p
          className="font-display absolute bottom-8 left-0 right-0 text-center text-xs tracking-[0.45em] text-[#8e4557] uppercase font-medium transition-opacity duration-300"
          style={{ animation: "pulse 2.5s ease-in-out infinite" }}
        >
          Tap the seal to open
        </p>
      )}
    </div>
  );
}
