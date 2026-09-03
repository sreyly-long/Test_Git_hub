export function WaveBackground() {
  return (
    <svg
      viewBox="0 0 520 640"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g fill="none" stroke="#ffffff" strokeWidth="1.1">
        <path d="M-40 420 C 80 380, 140 480, 260 440 S 460 380, 560 430" opacity="0.10" />
        <path d="M-40 460 C 90 410, 160 520, 280 470 S 470 420, 560 470" opacity="0.14" />
        <path d="M-40 500 C 100 440, 180 560, 300 500 S 480 460, 560 510" opacity="0.18" />
        <path d="M-40 540 C 110 470, 200 600, 320 530 S 490 500, 560 550" opacity="0.22" />
        <path d="M-40 580 C 120 500, 220 640, 340 560 S 500 540, 560 590" opacity="0.28" />
      </g>
      <g fill="none" stroke="#5598e7" strokeWidth="1.1">
        <path d="M-40 500 C 60 560, 160 440, 280 500 S 460 580, 560 520" opacity="0.20" />
        <path d="M-40 540 C 70 600, 180 480, 300 540 S 470 620, 560 560" opacity="0.24" />
        <path d="M-40 580 C 80 640, 200 520, 320 580 S 480 660, 560 600" opacity="0.28" />
      </g>
    </svg>
  );
}
