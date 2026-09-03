export type ReviewStatTheme = "amber" | "blue" | "green" | "red";

export type ReviewStat = { viewHref: string; exportHref: string } & (
  | {
      kind: "rating";
      label: string;
      value: number;
      deltaPct: number;
      direction: "up" | "down";
      fromLabel: string;
    }
  | {
      kind: "delta";
      label: string;
      value: string;
      deltaPct: number;
      direction: "up" | "down";
      fromLabel: string;
      iconTheme: ReviewStatTheme;
    }
  | {
      kind: "ratio";
      label: string;
      value: string;
      subtitle: string;
      iconTheme: ReviewStatTheme;
    }
);
