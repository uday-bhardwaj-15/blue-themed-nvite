"use client";

import { useEffect, useState } from "react";
import { invite } from "@/data/invite";

function calculateTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: diff <= 0,
  };
}

export function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(invite.weddingDate));

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(invite.weddingDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(invite.weddingDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cells = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md w-full px-2">
        {cells.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-card/90 to-card/60 p-3 sm:p-4 text-center border border-gold/30 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-transform hover:scale-105"
          >
            <div className="font-display text-3xl font-bold tabular-nums text-primary sm:text-4xl">
              {mounted ? String(value).padStart(2, "0") : "--"}
            </div>
            <div className="font-display mt-1 text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {label}
            </div>
          </div>
        ))}
      </div>

      {timeLeft.isExpired && mounted && (
        <p className="font-script mt-4 text-2xl text-primary animate-pulse">
          Today is the special day! ✨
        </p>
      )}
    </div>
  );
}
