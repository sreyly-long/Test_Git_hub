"use client";

import { useState } from "react";

const WIDTH = 600;
const HEIGHT = 220;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;

const BOOKED_COLOR = "#5598e7";
const CANCELED_COLOR = "#12172b";

export type BookingsDatum = { label: string; booked: number; canceled: number };

export function BookingsChart({ data }: { data: BookingsDatum[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const n = data.length;
  const slot = n > 0 ? WIDTH / n : WIDTH;
  const barWidth = slot * 0.46;

  const maxTotal = Math.max(...data.map((d) => d.booked + d.canceled), 1);
  const niceTop = Math.max(Math.ceil(maxTotal / 1000) * 1000, 4);
  const yTicks = [0, niceTop / 4, niceTop / 2, (niceTop * 3) / 4, niceTop];

  const active = hoverIndex !== null ? data[hoverIndex] : null;
  const activeX = hoverIndex !== null ? hoverIndex * slot + slot / 2 : 0;

  function valueToY(value: number) {
    return PAD_TOP + PLOT_H - (value / niceTop) * PLOT_H;
  }

  return (
    <div className="w-full select-none">
      <div className="relative w-full" style={{ height: HEIGHT }}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          {yTicks.map((tick) => (
            <line
              key={tick}
              x1={0}
              x2={WIDTH}
              y1={valueToY(tick)}
              y2={valueToY(tick)}
              stroke="#e1e0d9"
              strokeWidth={1}
            />
          ))}

          {data.map((d, i) => {
            const cx = i * slot + slot / 2;
            const x = cx - barWidth / 2;
            const canceledTop = valueToY(d.canceled);
            const canceledHeight = PAD_TOP + PLOT_H - canceledTop;
            const bookedTop = valueToY(d.canceled + d.booked);
            const bookedHeight = canceledTop - bookedTop - 2;
            const isActive = hoverIndex === i;

            return (
              <g key={d.label} opacity={hoverIndex === null || isActive ? 1 : 0.45}>
                <rect
                  x={x}
                  y={bookedTop}
                  width={barWidth}
                  height={Math.max(bookedHeight, 0)}
                  rx={3}
                  fill={BOOKED_COLOR}
                />
                <rect x={x} y={canceledTop} width={barWidth} height={canceledHeight} rx={2} fill={CANCELED_COLOR} />
                <rect
                  x={x}
                  y={PAD_TOP}
                  width={barWidth}
                  height={PLOT_H}
                  fill="transparent"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </g>
            );
          })}

          {active && (
            <line
              x1={activeX}
              x2={activeX}
              y1={PAD_TOP}
              y2={PAD_TOP + PLOT_H}
              stroke="#c3c2b7"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-[#12172b] px-3 py-1.5 text-xs text-white shadow-lg"
            style={{ left: `${(activeX / WIDTH) * 100}%`, top: "10%" }}
          >
            <div>
              <span className="text-zinc-300">Booked </span>
              <span className="font-semibold">{active.booked.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-zinc-300">Canceled </span>
              <span className="font-semibold">{active.canceled.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-1 flex justify-between text-xs text-[#898781]">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
