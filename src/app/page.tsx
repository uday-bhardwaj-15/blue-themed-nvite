"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { EnvelopeGate } from "@/components/invite/EnvelopeGate";
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
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      <EnvelopeGate onOpen={() => setOpened(true)} />
      {opened && <PetalField />}
      <MusicToggle started={opened} />

      <HeroVideo />

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
