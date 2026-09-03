import type { Activity } from "./data";
import { IconUserPlus, IconCalendarPlus, IconDollar } from "./icons";
import { Card, CardHeader, SeeAllLink } from "./Card";

const iconByKind = {
  user: { Icon: IconUserPlus, bg: "bg-[#2a78d6]/10", fg: "text-[#2a78d6]" },
  booking: { Icon: IconCalendarPlus, bg: "bg-[#eda100]/10", fg: "text-[#eda100]" },
  payment: { Icon: IconDollar, bg: "bg-[#0ca30c]/10", fg: "text-[#0ca30c]" },
} as const;

export function RecentActivity({ activity }: { activity: Activity[] }) {
  return (
    <Card>
      <CardHeader title="Recent Activity" action={<SeeAllLink />} />

      <ul className="flex flex-col gap-4">
        {activity.length === 0 && <p className="text-sm text-[#898781]">No recent activity yet.</p>}
        {activity.map((item, i) => {
          const { Icon, bg, fg } = iconByKind[item.kind];
          return (
            <li key={i} className="flex gap-3">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${fg}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#0b0b0b]">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#898781]">{item.detail}</p>
                <p className="mt-1 text-[11px] text-[#c3c2b7]">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
