const WIDTH = 400;
const HEIGHT = 160;
const PAD_TOP = 12;
const PAD_BOTTOM = 20;
const PLOT_H = HEIGHT - PAD_TOP - PAD_BOTTOM;
const TICKS = [0, 25, 50, 75, 100];
const MAX = 100;

export type OccupancyPoint = { label: string; value: number };

export function OccupancyBarChart({ data }: { data: OccupancyPoint[] }) {
  const n = data.length || 1;
  const slot = WIDTH / n;
  const barWidth = slot * 0.42;

  function valueToY(value: number) {
    return PAD_TOP + PLOT_H - (value / MAX) * PLOT_H;
  }

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ height: HEIGHT }}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          {TICKS.map((tick) => (
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
            const y = valueToY(d.value);
            return (
              <rect
                key={d.label}
                x={x}
                y={y}
                width={barWidth}
                height={PAD_TOP + PLOT_H - y}
                rx={4}
                fill="#5598e7"
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-1 flex justify-between text-xs text-[#898781]">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
