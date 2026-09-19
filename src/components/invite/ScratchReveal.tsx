"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { invite } from "@/data/invite";

const SIZE = 300;

function icsFile() {
  // Wedding Day: 25th Nov 2026, 8:00 PM IST onwards -> 14:30 UTC
  const start = "20261125T143000Z";
  const end = "20261125T183000Z";
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Inshu and Archit//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:inshu-archit-${start}`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Wedding of ${invite.bride.name} & ${invite.groom.name}`,
    `LOCATION:${invite.venue.name}, ${invite.venue.address}`,
    "DESCRIPTION:Your gracious presence is requested.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "inshu-archit-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    grad.addColorStop(0, "#b8d7f7");
    grad.addColorStop(0.5, "#4a86c6");
    grad.addColorStop(1, "#18457e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = i % 2 ? "#ffffff" : "#d4af37";
      ctx.fillRect(Math.random() * SIZE, Math.random() * SIZE, 2, 2);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * SIZE;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 64) > 0.5) setRevealed(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-[280px] w-[280px]"
        style={{
          clipPath:
            "path('M140 262 C 40 190, 4 132, 4 92 C 4 44, 40 14, 78 14 C 106 14, 130 30, 140 52 C 150 30, 174 14, 202 14 C 240 14, 276 44, 276 92 C 276 132, 240 190, 140 262 Z')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[oklch(0.985_0.01_8)] pt-6 text-center">
          <p className="font-display text-lg font-semibold text-primary">{invite.dateLabel}</p>
          <p className="font-script text-3xl text-primary/80">{invite.dayLabel}</p>
          <p className="font-display mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            8:00 PM
          </p>
        </div>
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="absolute inset-0 h-full w-full touch-none transition-opacity duration-700"
          style={{ opacity: revealed ? 0 : 1, cursor: "grab" }}
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />
      </div>

      <p className="font-display mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {revealed ? "Save the date" : "Scratch the heart"}
      </p>

      <button
        type="button"
        onClick={icsFile}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03]"
      >
        <CalendarPlus className="h-4 w-4" />
        Save the date
      </button>
      <p className="font-display mt-2 text-xs text-muted-foreground">
        Add this event to your calendar
      </p>
    </div>
  );
}
