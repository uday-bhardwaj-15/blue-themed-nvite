"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import waxSeal from "@/assets/wax-seal.png";

const waxSealSrc = typeof waxSeal === "string" ? waxSeal : waxSeal.src;

// Natural dimensions of public/Gemini_Generated_Image_p4bh5dp4bh5dp4bh.png
const ENVELOPE_BG = "/Gemini_Generated_Image_p4bh5dp4bh5dp4bh.png";
const ENVELOPE_NAT_W = 2682;
const ENVELOPE_NAT_H = 1568;
const SEAL_X = 0.5055; // Exact center of wax seal on envelope flap
const SEAL_Y = 0.7241; // Exact vertical center of wax seal
const SEAL_HEIGHT_RATIO = 0.3724; // 584px / 1568px — matches the exact height of the image wax seal

const VIDEO_LANDSCAPE = "/videos/envelope-open.mp4";
const VIDEO_PORTRAIT = "/videos/envelope-open-portrait.mp4";

type Phase = "idle" | "playing" | "ending" | "done";

interface HotspotRect {
  left: number;
  top: number;
  size: number;
}

interface EnvelopeIntroProps {
  onStartMusic: () => void;
  onComplete: () => void;
}

export function EnvelopeIntro({ onStartMusic, onComplete }: EnvelopeIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hotspot, setHotspot] = useState<HotspotRect | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const endingFiredRef = useRef(false);
  const [videoSrc, setVideoSrc] = useState(VIDEO_LANDSCAPE);
  const hasPlayedRef = useRef(false);

  // Preload hero video links for silky fast handover after intro
  useEffect(() => {
    const desktopLink = document.createElement("link");
    desktopLink.rel = "preload";
    desktopLink.as = "video";
    desktopLink.href = "/Wedding_invitation_background_video_1080p_20260919194758.mp4";
    desktopLink.type = "video/mp4";
    document.head.appendChild(desktopLink);

    const mobileLink = document.createElement("link");
    mobileLink.rel = "preload";
    mobileLink.as = "video";
    mobileLink.href = "/Marble_balcony_overlooking_sea_20260919202027.mp4";
    mobileLink.type = "video/mp4";
    document.head.appendChild(mobileLink);

    return () => {
      try {
        document.head.removeChild(desktopLink);
        document.head.removeChild(mobileLink);
      } catch {
        // ignore cleanup if already detached
      }
    };
  }, []);

  // Responsive video source detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setVideoSrc(mq.matches ? VIDEO_PORTRAIT : VIDEO_LANDSCAPE);
    const handler = (e: MediaQueryListEvent) => {
      setVideoSrc(e.matches ? VIDEO_PORTRAIT : VIDEO_LANDSCAPE);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Body and document scroll lock while intro is active
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    const prevTouch = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      document.body.style.touchAction = prevTouch;
    };
  }, []);

  // Calculate wax seal hotspot location and size to exactly match the background image wax seal
  const computeHotspot = useCallback(() => {
    if (typeof window === "undefined") return;
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const natW = ENVELOPE_NAT_W;
    const natH = ENVELOPE_NAT_H;
    const scale = Math.max(vpW / natW, vpH / natH);
    const rendW = natW * scale;
    const rendH = natH * scale;
    const offsetX = (vpW - rendW) / 2;
    const offsetY = (vpH - rendH) / 2;

    // Sized to match the exact height of the wax seal in the image
    const size = rendH * SEAL_HEIGHT_RATIO;

    setHotspot({
      left: offsetX + SEAL_X * rendW,
      top: offsetY + SEAL_Y * rendH,
      size,
    });
  }, []);

  useEffect(() => {
    computeHotspot();
    window.addEventListener("resize", computeHotspot, { passive: true });
    return () => window.removeEventListener("resize", computeHotspot);
  }, [computeHotspot]);

  // Smooth ending transition (white-out)
  const triggerEnding = useCallback(() => {
    if (endingFiredRef.current) return;
    endingFiredRef.current = true;
    setPhase("ending");
    setOverlayOpacity(1); // 600ms fade to white
    // Song starts right as the envelope video ends
    onStartMusic();
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 900); // 600ms fade + 300ms hold
  }, [onComplete, onStartMusic]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => {
      setVideoReady(true);
    };

    const onTimeUpdate = () => {
      const v = videoRef.current;
      if (!v || !v.duration || endingFiredRef.current) return;
      if (v.duration - v.currentTime <= 0.4) triggerEnding();
    };

    const onEnded = () => triggerEnding();

    // If portrait video isn't found, fallback silently to landscape
    const onError = () => {
      if (!hasPlayedRef.current && videoSrc === VIDEO_PORTRAIT) {
        setVideoSrc(VIDEO_LANDSCAPE);
      } else {
        triggerEnding();
      }
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [videoSrc, triggerEnding]);

  const handleSealTap = useCallback(() => {
    if (phase !== "idle") return;
    const video = videoRef.current;
    if (!video) return;
    setPhase("playing");
    hasPlayedRef.current = true;
    // Note: Music will start when envelope video ends as requested
    video.play().catch(() => triggerEnding());
  }, [phase, triggerEnding]);

  if (phase === "done") return null;

  const isIdle = phase === "idle";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 select-none overflow-hidden bg-[oklch(0.97_0.02_240)]"
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, oklch(0.97 0.02 240 / 0.95) 0%, oklch(0.90 0.05 242 / 0.97) 70%, oklch(0.82 0.08 245 / 1) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Static Envelope Image (idle state) */}
      <img
        src={ENVELOPE_BG}
        alt="Wedding Invitation Envelope"
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isIdle ? 1 : videoReady ? 0 : 1,
        }}
      />

      {/* Opening Video (smoothly cross-fades in on play) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300"
        style={{
          opacity: isIdle ? 0 : videoReady ? 1 : 0,
          transform: "translate3d(0,0,0)",
        }}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
      />

      {/* Wax Seal Overlay & Hotspot Button (shown in idle state) */}
      {hotspot && isIdle && (
        <button
          type="button"
          aria-label="Tap the seal to open the invitation"
          onClick={handleSealTap}
          className="group absolute rounded-full focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{
            left: hotspot.left,
            top: hotspot.top,
            width: hotspot.size,
            height: hotspot.size,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}
        >
          {/* Pulsing gold glow ring animation around seal */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              animation: "seal-ring-pulse 2s ease-in-out infinite",
            }}
          />

          {/* Royal Wax Seal Image */}
          <img
            src={waxSealSrc}
            alt="Royal Wax Seal"
            className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(20,40,80,0.45)] transition-transform duration-200 group-hover:scale-105"
            draggable={false}
          />
        </button>
      )}

      {/* "TAP THE SEAL TO OPEN" caption */}
      <p
        className="font-display absolute bottom-8 left-0 right-0 text-center text-xs tracking-[0.45em] text-[#244c80] uppercase font-medium pointer-events-none"
        style={{
          opacity: isIdle ? 1 : 0,
          transition: "opacity 0.3s ease",
          animation: isIdle ? "pulse 2.5s ease-in-out infinite" : undefined,
        }}
        aria-hidden={!isIdle}
      >
        Tap the seal to open
      </p>

      {/* Seamless White-out overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "#ffffff",
          opacity: overlayOpacity,
          transition: phase === "ending" ? "opacity 0.6s ease-in" : "none",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
