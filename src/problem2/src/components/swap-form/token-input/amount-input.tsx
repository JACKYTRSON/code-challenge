import { Input } from "@/components/ui/input";

export function AmountInput({
  value,
  onChange,
  placeholder = "Amount",
  className,
}: {
  value: number;
  onChange?: (v: number) => void;
  placeholder?: string;
  className?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      onChange?.(+val);
    }
  };

  return (
    <Input inputMode="decimal" value={value} onChange={handleChange} placeholder={placeholder} className={className} />
  );
}
