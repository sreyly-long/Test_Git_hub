export type InvoiceStatTheme = "blue" | "green" | "orange" | "red" | "violet";

export type InvoiceStat = { viewHref: string; exportHref: string } & (
  | {
      kind: "delta";
      label: string;
      value: string;
      deltaPct: number;
      direction: "up" | "down";
      fromLabel: string;
      icon: "invoice" | "dollar";
      iconTheme: InvoiceStatTheme;
    }
  | {
      kind: "ratio";
      label: string;
      value: string;
      subtitle: string;
      icon: "invoice" | "alert";
      iconTheme: InvoiceStatTheme;
    }
);

export type PaymentMethod = "visa" | "mastercard" | "bank" | "paypal" | "cash";
