"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface YouTubePlayerInstance {
  setVolume: (volume: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime?: () => number;
}

interface YouTubeEvent {
  target: YouTubePlayerInstance;
  data?: number;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          height?: string;
          width?: string;
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: YouTubeEvent) => void;
            onStateChange?: (event: YouTubeEvent) => void;
          };
        },
      ) => YouTubePlayerInstance;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

const YOUTUBE_VIDEO_ID = "rtOvBOTyX00";
const START_TIME = 17; // 0:17
const END_TIME = 80; // 1:20

export function MusicToggle({ started }: { started: boolean }) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const checkIntervalRef = useRef<number | null>(null);
  const playerReadyRef = useRef(false);
  const userWantsPlayRef = useRef(false);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (playerRef.current || !window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player("youtube-audio-player", {
        height: "1",
        width: "1",
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          start: START_TIME,
          end: END_TIME,
          playsinline: 1,
        },
        events: {
          onReady: (event: YouTubeEvent) => {
            playerReadyRef.current = true;
            event.target.setVolume(60);
            if (userWantsPlayRef.current) {
              event.target.seekTo(START_TIME, true);
              event.target.playVideo();
              setPlaying(true);
            }
          },
          onStateChange: (event: YouTubeEvent) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (userWantsPlayRef.current) {
                event.target.seekTo(START_TIME, true);
                event.target.playVideo();
              }
            } else if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.CUED
            ) {
              if (!userWantsPlayRef.current) {
                setPlaying(false);
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    // Loop enforcement between START_TIME (17s) and END_TIME (80s)
    checkIntervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        try {
          const currentTime = playerRef.current.getCurrentTime();
          if (currentTime >= END_TIME) {
            playerRef.current.seekTo(START_TIME, true);
          }
        } catch {
          // ignore transition errors
        }
      }
    }, 250);

    return () => {
      if (checkIntervalRef.current) {
        window.clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  // When envelope is opened
  useEffect(() => {
    if (!started) return;
    userWantsPlayRef.current = true;

    if (playerReadyRef.current && playerRef.current) {
      try {
        playerRef.current.seekTo(START_TIME, true);
        playerRef.current.playVideo();
        setPlaying(true);
      } catch (e) {
        console.error("Audio playback error:", e);
      }
    }
  }, [started]);

  const toggle = () => {
    if (!playerRef.current) return;

    try {
      if (playing) {
        userWantsPlayRef.current = false;
        playerRef.current.pauseVideo();
        setPlaying(false);
      } else {
        userWantsPlayRef.current = true;
        const current = playerRef.current.getCurrentTime?.() ?? 0;
        if (current < START_TIME || current >= END_TIME) {
          playerRef.current.seekTo(START_TIME, true);
        }
        playerRef.current.playVideo();
        setPlaying(true);
      }
    } catch (e) {
      console.error("Toggle error:", e);
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame Player */}
      <div
        className="fixed -bottom-10 -left-10 h-1 w-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="youtube-audio-player" />
      </div>

      {/* Floating Music Control Button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-card/85 text-primary shadow-[var(--shadow-soft)] backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        {playing ? (
          <Volume2 className="h-5 w-5 animate-pulse text-primary" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
    </>
  );
}
