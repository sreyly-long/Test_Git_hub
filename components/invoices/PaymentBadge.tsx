import { IconCreditCard, IconBank, IconCash } from "@/components/dashboard/icons";
import type { PaymentMethod } from "./data";

const config: Record<PaymentMethod, { label: string; tile: string; Icon: typeof IconCreditCard }> = {
  visa: { label: "Credit Card", tile: "bg-[#184f95] text-white", Icon: IconCreditCard },
  mastercard: { label: "Credit Card", tile: "bg-gradient-to-br from-[#eda100] to-[#e34948] text-white", Icon: IconCreditCard },
  bank: { label: "Bank Transfer", tile: "bg-[#e1e0d9] text-[#52514e]", Icon: IconBank },
  paypal: { label: "PayPal", tile: "bg-[#184f95] text-white", Icon: IconCreditCard },
  cash: { label: "Cash", tile: "bg-[#0ca30c]/15 text-[#006300]", Icon: IconCash },
};

export function PaymentBadge({ method, detail }: { method: PaymentMethod; detail: string }) {
  const { label, tile, Icon } = config[method];

  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${tile}`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="leading-tight">
        <p className="text-[#0b0b0b]">{label}</p>
        {detail && <p className="text-xs text-[#898781]">{detail}</p>}
      </div>
    </div>
  );
}
