const petals = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 100,
  size: 8 + ((i * 7) % 12),
  duration: 14 + ((i * 5) % 12),
  delay: -(i * 1.7),
  drift: ((i % 5) - 2) * 4,
}));

export function PetalField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block rounded-[100%_0_100%_0] bg-blush/70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            ["--drift" as string]: `${p.drift}vw`,
          }}
        />
      ))}
    </div>
  );
}
