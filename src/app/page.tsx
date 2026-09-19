"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { EnvelopeIntro } from "@/components/invite/EnvelopeIntro";
import { HeroVideo } from "@/components/invite/HeroVideo";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { PetalField } from "@/components/invite/PetalField";
import { ScratchReveal } from "@/components/invite/ScratchReveal";
import { Gallery } from "@/components/invite/Gallery";
import { Countdown } from "@/components/invite/Countdown";
import { Timeline } from "@/components/invite/Timeline";
import { Venue } from "@/components/invite/Venue";
import { Divider, Reveal, SectionTitle } from "@/components/invite/Reveal";
import { invite } from "@/data/invite";

export default function Home() {
  // "intro" → showing EnvelopeIntro, "fading" → white overlay fading out, "invite" → fully visible
  const [phase, setPhase] = useState<"intro" | "fading" | "invite">("intro");
  const [musicStarted, setMusicStarted] = useState(false);
  // White overlay opacity: 1 while intro plays, fades to 0 over 1s after onComplete
  const [whiteOpacity, setWhiteOpacity] = useState(1);

  const handleIntroComplete = () => {
    // Intro is done (white-out already at 1 inside EnvelopeIntro).
    // Ensure music starts if not already started
    setMusicStarted(true);
    // Switch to "fading" so invitation content renders, then fade overlay to 0.
    setPhase("fading");
    // Tiny delay to ensure the DOM has painted the invitation before we start fading
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWhiteOpacity(0);
        setTimeout(() => setPhase("invite"), 1000);
      });
    });
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Envelope video intro — unmounts after white-out */}
      {phase === "intro" && (
        <EnvelopeIntro
          onStartMusic={() => setMusicStarted(true)}
          onComplete={handleIntroComplete}
        />
      )}

      {/* White overlay that persists after EnvelopeIntro unmounts and fades out over 1s */}
      {(phase === "fading" || phase === "invite") && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            background: "#ffffff",
            opacity: whiteOpacity,
            transition: phase === "fading" ? "opacity 1s ease-out" : "none",
          }}
        />
      )}

      {phase !== "intro" && <PetalField />}
      <MusicToggle started={musicStarted} />

      <HeroVideo playing={phase !== "intro"} />

      <section className="relative px-6 py-20">
        <Reveal>
          <Divider />
          <p className="font-script mx-auto max-w-2xl text-center text-2xl leading-relaxed text-primary/90 sm:text-3xl">
            {invite.welcome} <span className="text-primary">&#10084;</span>
          </p>
          <Divider />
        </Reveal>
      </section>

      <section className="px-6 pb-24">
        <Reveal>
          <SectionTitle>Scratch to Reveal</SectionTitle>
          <Divider />
          <ScratchReveal />
        </Reveal>
      </section>

      <section className="bg-[var(--gradient-blush)] py-20">
        <Reveal>
          <Divider />
          <Gallery />
        </Reveal>
      </section>

      <section className="px-6 py-20">
        <Reveal>
          <SectionTitle>Counting Down to Forever</SectionTitle>
          <Divider />
          <Countdown />
        </Reveal>
      </section>

      <section className="bg-[var(--gradient-blush)] px-6 py-20">
        <Reveal>
          <Clock className="mx-auto h-6 w-6 text-primary" />
          <SectionTitle>Program Timeline</SectionTitle>
          <Divider />
        </Reveal>
        <Timeline />
      </section>

      <section className="px-6 py-20">
        <Reveal>
          <MapPin className="mx-auto h-6 w-6 text-primary" />
          <SectionTitle>Venue</SectionTitle>
          <Divider />
          <Venue />
        </Reveal>
      </section>

      <footer className="bg-[var(--gradient-blush)] px-6 py-20 text-center">
        <Reveal>
          <p className="font-script text-3xl text-primary">
            {invite.groom.name}&nbsp;&nbsp; &amp; &nbsp;&nbsp; {invite.bride.name}
          </p>
          <Divider />
          <p className="font-display mx-auto max-w-md text-sm text-muted-foreground">
            {invite.closing}
          </p>
          <p className="font-display mt-6 text-[1rem] uppercase tracking-[0.4em] text-primary/60">
            25 . 11 . 2026
          </p>
        </Reveal>
      </footer>
    </main>
  );
}
