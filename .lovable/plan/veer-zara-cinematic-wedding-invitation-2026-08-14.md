# Veer & Zara — Cinematic Wedding Invitation

A single-page, mobile-first invitation that opens with a sealed envelope, plays soft background music, and unfolds through cinematic scroll sections over a looping video backdrop.

## Experience flow

```text
1. SEALED ENVELOPE   pink embossed envelope, gold wax seal "Tap to open"
        |  tap -> seal presses/cracks, flap rotates open in 3D,
        |          inner card slides up, envelope falls away
2. HERO              looping video backdrop (dusk arches, drifting curtains)
                     "Veer" & "Zara" script names + parents/titles, SCROLL cue
3. WELCOME NOTE      script blessing text between gold heart dividers
4. SCRATCH TO REVEAL heart-shaped scratch canvas hiding the wedding date
                     + "Save the Date" (.ics calendar download)
5. GALLERY           swipeable photo slider with dots
6. COUNTDOWN         live days / hours / minutes / seconds tiles
7. PROGRAM TIMELINE  Guest Arrival, Wedding Ceremony, Reception
8. VENUE             The Taj Mahal Palace, Colaba, Mumbai + map link
9. CLOSING           thank-you note, floating petals
```

Music: a soft instrumental loops after the envelope is tapped (browser autoplay rules mean the tap is the unlock). A floating mute/unmute button stays fixed top-right, as in the reference.

## Interactivity and motion

- Envelope: real 3D open — CSS `perspective` + `rotateX` flap, wax seal scale/crack, card lift with spring easing, then cross-fade into the hero.
- Video hero: full-bleed autoplaying muted loop video, dark gradient scrim for legibility, parallax on the name block as you scroll.
- Scroll reveals: each section fades and rises into view once (IntersectionObserver based), never a hard cut.
- Scratch card: pointer/touch drawing on a canvas masked to a heart, auto-reveals past ~55% scratched.
- Ambient layer: slow drifting petals and a soft glow that persist across sections.
- Countdown ticks live every second; gallery supports swipe, arrows, and dots.
- Respects `prefers-reduced-motion` (video pauses to a still frame, animations become fades).

## Look and feel

Blush rose and deep maroon with warm gold accents, matching the reference: `#fdf1f2` backgrounds, `#8c1c2b` maroon headings, `#c9a24a` gold, soft ivory on the video hero. Headings in an elegant script (Great Vibes / Cormorant), body in a refined serif. Rounded soft cards, gentle shadows, generous whitespace.

## Assets I will create

- Envelope front + gold wax seal art, hero fallback frame, 4-5 gallery images, venue line-art — all AI generated in the wedding palette.
- An 8-second cinematic loop video (dusk arches, drifting sheer curtains, petals) generated and used as the hero backdrop, with a generated still as poster/fallback.
- A royalty-free soft instrumental track for the background music.
- All media hosted as CDN assets so the repo stays light.

## Technical notes

- Single route at `/` (`src/routes/index.tsx`) with section components under `src/components/invite/` (`EnvelopeGate`, `HeroVideo`, `WelcomeNote`, `ScratchReveal`, `Gallery`, `Countdown`, `Timeline`, `Venue`, `MusicToggle`, `PetalField`).
- All couple/event data in one `src/data/invite.ts` config object (demo details: Veer & Zara, Jun 30 2026, The Taj Mahal Palace) so text is easy to swap later.
- Palette, fonts, radii and shadows added as semantic tokens in `src/styles.css`; fonts loaded via a `<link>` in `__root.tsx`.
- Motion via CSS keyframes/transitions plus small hooks; scratch card uses a canvas with `destination-out` compositing; "Save the date" generates an `.ics` client-side.
- Page-specific SEO head: title, description, og/twitter tags with the hero image.
- No backend needed (no RSVP/guestbook in this scope).
