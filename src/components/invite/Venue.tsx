import { MapPin } from "lucide-react";
import { invite } from "@/data/invite";

export function Venue() {
  return (
    <div className="px-6 text-center">
      <p className="font-display text-lg font-semibold text-foreground">{invite.venue.name}</p>
      <p className="font-display mt-1 text-sm text-muted-foreground">{invite.venue.address}</p>

      <svg
        viewBox="0 0 240 90"
        className="mx-auto mt-6 w-64 text-primary/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 88V44h40v44M180 88V44h40v44" />
        <path d="M40 44a10 10 0 0 1 20 0M200 44a10 10 0 0 1 20 0" />
        <path d="M70 88V34h100v54" />
        <path d="M90 88V56a30 30 0 0 1 60 0v32" />
        <path d="M120 34c-16 0-26-12-26-24 0 0 10 8 26 8s26-8 26-8c0 12-10 24-26 24z" />
        <path d="M120 10V2" />
      </svg>

      <a
        href={invite.venue.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <MapPin className="h-4 w-4" />
        Open in maps
      </a>
    </div>
  );
}
