import { Card, CardHeader, SeeAllLink } from "./Card";
import { BarList } from "./BarList";

function ratingLabel(score: number) {
  if (score >= 9) return "Excellent";
  if (score >= 7.5) return "Very Good";
  if (score >= 6) return "Good";
  if (score >= 4) return "Fair";
  return "Needs Improvement";
}

export function OverallRatings({
  score,
  totalReviews,
  starCounts,
}: {
  score: number;
  totalReviews: number;
  starCounts: Record<1 | 2 | 3 | 4 | 5, number>;
}) {
  return (
    <Card>
      <CardHeader title="Overall Ratings" action={<SeeAllLink />} />

      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2a78d6]/30 bg-[#2a78d6]/5 text-lg font-bold text-[#2a78d6]">
          {score.toFixed(1)}
        </span>
        <div>
          <p className="text-sm font-semibold text-[#0b0b0b]">{ratingLabel(score)}</p>
          <p className="text-xs text-[#898781]">{totalReviews.toLocaleString()} verified reviews</p>
        </div>
      </div>

      <div className="mt-5">
        <BarList
          items={([5, 4, 3, 2, 1] as const).map((stars) => ({
            label: `${stars} Star${stars === 1 ? "" : "s"}`,
            value: String(starCounts[stars]),
            percent: totalReviews ? (starCounts[stars] / totalReviews) * 100 : 0,
          }))}
        />
      </div>
    </Card>
  );
}
