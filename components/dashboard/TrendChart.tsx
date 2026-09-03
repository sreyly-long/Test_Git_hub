"use client";

import { useId, useMemo, useState } from "react";
import { smoothPath } from "./chart-utils";

type TrendChartProps = {
  data: { label: string; value: number }[];
  color?: string;
  yAxisTicks: number[];
  formatValue: (value: number) => string;
  formatTooltipTitle?: (label: string) => string;
  height?: number;
};

const WIDTH = 600;

export function TrendChart({
  data,
  color = "#2a78d6",
  yAxisTicks,
  formatValue,
  formatTooltipTitle,
  height = 220,
}: TrendChartProps) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const padTop = 16;
  const padBottom = 24;
  const plotH = height - padTop - padBottom;
  const maxTick = yAxisTicks[yAxisTicks.length - 1];

  const points = useMemo(
    () =>
      data.map((d, i) => ({
        x: data.length > 1 ? (i / (data.length - 1)) * WIDTH : WIDTH / 2,
        y: padTop + plotH - (d.value / maxTick) * plotH,
      })),
    [data, maxTick, plotH, padTop],
  );

  const linePath = useMemo(() => smoothPath(points), [points]);
  const areaPath = `${linePath} L${points[points.length - 1].x},${padTop + plotH} L${points[0].x},${padTop + plotH} Z`;

  const active = hoverIndex !== null ? points[hoverIndex] : null;
  const activeDatum = hoverIndex !== null ? data[hoverIndex] : null;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(fraction * (data.length - 1));
    setHoverIndex(Math.min(data.length - 1, Math.max(0, idx)));
  }

  const tooltipLeftPct = active ? (active.x / WIDTH) * 100 : 0;

  return (
    <div className="w-full select-none">
      <div
        className="relative w-full"
        style={{ height }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {yAxisTicks.map((tick) => {
            const y = padTop + plotH - (tick / maxTick) * plotH;
            return (
              <line
                key={tick}
                x1={0}
                x2={WIDTH}
                y1={y}
                y2={y}
                stroke="#e1e0d9"
                strokeWidth={1}
              />
            );
          })}

          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
          <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} />

          {active && (
            <>
              <line
                x1={active.x}
                x2={active.x}
                y1={padTop}
                y2={padTop + plotH}
                stroke={color}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.6}
              />
              <circle
                cx={active.x}
                cy={active.y}
                r={5}
                fill="#fff"
                stroke={color}
                strokeWidth={2.5}
              />
            </>
          )}
        </svg>

        {active && activeDatum && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-[#12172b] px-3 py-1.5 text-xs text-white shadow-lg"
            style={{ left: `${tooltipLeftPct}%`, top: `${(active.y / height) * 100}%` }}
          >
            <div className="font-semibold">{formatValue(activeDatum.value)}</div>
            <div className="text-[10px] text-zinc-300">
              {formatTooltipTitle ? formatTooltipTitle(activeDatum.label) : activeDatum.label}
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
