"use client";

import { useState } from "react";

export type DonutSlice = {
  name: string;
  value: number;
  pct: number;
  color: string;
};

type DonutProps = {
  slices: DonutSlice[];
  totalLabel: string;
  totalSubLabel: string;
};

const SIZE = 176;
const STROKE = 26;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;
const GAP = 3;

export function Donut({ slices, totalLabel, totalSubLabel }: DonutProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const total = slices.reduce((sum, s) => sum + s.value, 0);

  const cumulativeOffsets = slices.reduce<number[]>((acc, slice, i) => {
    const previous = i === 0 ? 0 : acc[i - 1];
    acc.push(previous + (slice.pct / 100) * CIRCUMFERENCE);
    return acc;
  }, []);

  const segments = slices.map((slice, i) => {
    const length = (slice.pct / 100) * CIRCUMFERENCE;
    const dash = Math.max(length - GAP, 0);
    const offset = i === 0 ? 0 : cumulativeOffsets[i - 1];
    return { ...slice, dashArray: `${dash} ${CIRCUMFERENCE - dash}`, dashOffset: -offset, index: i };
  });

  const active = hoverIndex !== null ? slices[hoverIndex] : null;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          className="-rotate-90 select-none"
        >
          {segments.map((seg) => (
            <circle
              key={seg.name}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="round"
              opacity={hoverIndex === null || hoverIndex === seg.index ? 1 : 0.4}
              onMouseEnter={() => setHoverIndex(seg.index)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: "pointer", transition: "opacity 120ms" }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {active ? (
            <>
              <span className="text-xs text-[#52514e]">{active.name}</span>
              <span className="text-xl font-bold text-[#0b0b0b]">{active.value.toLocaleString()}</span>
              <span className="text-xs text-[#898781]">{active.pct}%</span>
            </>
          ) : (
            <>
              <span className="text-xs text-[#898781]">{totalLabel}</span>
              <span className="text-xl font-bold text-[#0b0b0b]">{total.toLocaleString()}</span>
              <span className="text-xs text-[#898781]">{totalSubLabel}</span>
            </>
          )}
        </div>
      </div>

      <ul className="grid w-full grid-cols-1 gap-x-4 gap-y-1.5 text-xs">
        {slices.map((slice, i) => (
          <li
            key={slice.name}
            className="flex cursor-default items-center justify-between gap-2 rounded px-1 py-0.5"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{ opacity: hoverIndex === null || hoverIndex === i ? 1 : 0.5 }}
          >
            <span className="flex items-center gap-1.5 text-[#52514e]">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              {slice.name} ({slice.value.toLocaleString()})
            </span>
            <span className="font-medium text-[#0b0b0b]">{slice.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
