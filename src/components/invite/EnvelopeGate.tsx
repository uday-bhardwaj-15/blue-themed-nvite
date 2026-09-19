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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[oklch(0.97_0.02_240)] select-none"
      style={{
        animation: opening ? "gate-fade-out 750ms ease-in-out 2000ms forwards" : undefined,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Ambient background wallpaper & romantic blue glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
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
            "radial-gradient(ellipse at 50% 45%, oklch(0.97 0.02 240 / 0.82) 0%, oklch(0.90 0.05 242 / 0.92) 75%, oklch(0.82 0.08 245 / 0.97) 100%)",
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
          className="absolute -bottom-6 left-[8%] right-[8%] h-10 rounded-[50%] bg-[oklch(0.25_0.1_250/0.3)] blur-lg"
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

        {/* 1. ENVELOPE BACK WALL & INNER ROYAL SAPPHIRE LINING */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#122849] shadow-[0_16px_40px_rgba(15,35,70,0.35)] z-1"
          style={{
            transform: "translate3d(0, 0, 0px)",
            WebkitTransform: "translate3d(0, 0, 0px)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #1e457e 0%, #132e57 60%, #0c1e38 100%)",
            }}
          />
          {/* Subtle gold inner border */}
          <div className="absolute inset-2.5 rounded-[6px] border border-[#d4af37]/40 pointer-events-none" />
          <div className="absolute inset-3.5 rounded-[4px] border border-[#d4af37]/25 pointer-events-none" />
        </div>

        {/* 2. INVITATION CARD (Slides UP out of the pocket when opened) */}
        <div
          className="absolute inset-x-[5%] bottom-[5%] top-[8%] z-20 overflow-hidden rounded-[8px] bg-[#fffefc] shadow-[0_12px_32px_rgba(15,35,70,0.22)]"
          style={{
            animation: opening
              ? "card-emerge 1300ms cubic-bezier(0.16, 1, 0.3, 1) 450ms forwards"
              : undefined,
            willChange: opening ? "transform" : undefined,
            transform: "translate3d(0, 0, 8px)",
            WebkitTransform: "translate3d(0, 0, 8px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Luxury Card Design */}
          <div className="relative flex h-full flex-col items-center justify-between p-5 text-center sm:p-6">
            {/* Double Gold Card Borders */}
            <div className="pointer-events-none absolute inset-2.5 rounded-[5px] border border-[#d8b066]/75" />
            <div className="pointer-events-none absolute inset-3.5 rounded-[3px] border border-[#d8b066]/35" />

            {/* Header */}
            <div className="pt-1">
              <div className="mx-auto mb-1 flex items-center justify-center gap-2">
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#d8b066]" />
                <span className="text-[0.65rem] text-[#d8b066]">✦</span>
                <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#d8b066]" />
              </div>
              <p className="font-display text-[0.65rem] tracking-[0.35em] text-[#3b5e8c] uppercase font-medium">
                Wedding Invitation
              </p>
            </div>

            {/* Names */}
            <div className="my-auto py-1">
              <h2 className="font-script text-4xl sm:text-5xl leading-tight text-[#163868]">
                Archit &amp; Inshu
              </h2>
              <div className="mx-auto my-1.5 flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-[#d8b066]/75" />
                <span className="font-script text-sm text-[#d8b066]">🪷</span>
                <span className="h-px w-10 bg-[#d8b066]/75" />
              </div>
              <p className="font-display text-[0.7rem] tracking-[0.2em] text-[#4a6d9b] uppercase">
                Together with their families
              </p>
            </div>

            {/* Date & Venue */}
            <div className="pb-1">
              <p className="font-display text-xs tracking-[0.25em] text-[#163868] font-semibold">
                November 25, 2026
              </p>
              <p className="font-display text-[0.62rem] tracking-[0.15em] text-[#5578a5] uppercase mt-0.5">
                The Regis Resort, Meerut
              </p>
            </div>
          </div>
        </div>

        {/* 3. FRONT POCKET (Bottom and side flaps of powder-blue envelopeBg) */}
        <div
          className="pointer-events-none absolute inset-0 z-25 overflow-hidden rounded-[10px]"
          style={{
            clipPath: "polygon(0 0, 50% 67.5%, 100% 0, 100% 100%, 0 100%)",
            WebkitClipPath: "polygon(0 0, 50% 67.5%, 100% 0, 100% 100%, 0 100%)",
            transform: "translate3d(0, 0, 12px)",
            WebkitTransform: "translate3d(0, 0, 12px)",
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
                "linear-gradient(to bottom, transparent 0%, rgba(20,50,90,0.08) 67.5%, transparent 70%)",
            }}
          />

          {/* Front Pocket Inscription matching the reference image */}
          <div className="absolute bottom-5 left-0 right-0 text-center px-4">
            <p className="font-script text-[1.1rem] sm:text-[1.25rem] text-[#183d6e] font-medium leading-snug">
              Grateful to have you in my journey
            </p>
            <div className="flex items-center justify-center gap-2 mt-0.5 opacity-85">
              <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#d8b066]" />
              <span className="text-[0.6rem] text-[#d8b066]">🪷</span>
              <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#d8b066]" />
            </div>
          </div>
        </div>

        {/* 4. TOP FLAP (Folds UPWARDS in 3D around the top hinge axis) */}
        <div
          className="absolute inset-x-0 top-0 h-[67.5%]"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transformOrigin: "top center",
            WebkitTransformOrigin: "top center",
            zIndex: flapOpened ? 2 : 35,
            animation: opening
              ? "flap-fold-up 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : undefined,
            willChange: opening ? "transform" : undefined,
            transform: opening ? undefined : "translate3d(0, 0, 15px)",
            WebkitTransform: opening ? undefined : "translate3d(0, 0, 15px)",
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
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

              {/* Gold cord piping along the diagonal V-edges */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(212,175,55,0.7) 1.5px, transparent 1.5px), linear-gradient(to bottom left, rgba(212,175,55,0.7) 1.5px, transparent 1.5px)",
                }}
              />
            </div>

            {/* WAX SEAL (Mounted on the tip of the top flap) */}
            <div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 select-none"
              style={{
                width: "98px",
                height: "98px",
                animation: opening ? undefined : "soft-float 4s ease-in-out infinite",
                transform: "translate3d(0, 0, 3px)",
                WebkitTransform: "translate3d(0, 0, 3px)",
              }}
            >
              {/* Gold & blue glow behind wax seal */}
              <div
                className="absolute -inset-2 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(235,190,95,0.45) 0%, rgba(26,60,115,0.15) 60%, transparent 80%)",
                  animation: opening ? undefined : "glow-pulse 3s ease-in-out infinite",
                }}
                aria-hidden="true"
              />

              {/* Authentic Royal Sapphire Wax Seal with Gold Lotus (Transparent) */}
              <img
                src={waxSealSrc}
                alt="Royal Blue lotus wax seal"
                width={196}
                height={196}
                className="h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(15,35,70,0.55)]"
              />
            </div>
          </div>

          {/* Back Face (Visible when rotated 180deg upwards) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(180deg) translate3d(0, 0, 1px)",
              WebkitTransform: "rotateX(180deg) translate3d(0, 0, 1px)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              WebkitClipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          >
            {/* Velvet Royal Sapphire lining on back face of the opened flap */}
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, #1e457e 0%, #132e57 60%, #0c1e38 100%)",
              }}
            />
            {/* Gold piping along the opened flap's diagonal edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(212,175,55,0.5) 1.5px, transparent 1.5px), linear-gradient(to bottom left, rgba(212,175,55,0.5) 1.5px, transparent 1.5px)",
              }}
            />
          </div>
        </div>
      </button>

      {/* Helper text under envelope */}
      {!opening && (
        <p
          className="font-display absolute bottom-8 left-0 right-0 text-center text-xs tracking-[0.45em] text-[#244c80] uppercase font-medium transition-opacity duration-300"
          style={{ animation: "pulse 2.5s ease-in-out infinite" }}
        >
          Tap the seal to open
        </p>
      )}
    </div>
  );
}
