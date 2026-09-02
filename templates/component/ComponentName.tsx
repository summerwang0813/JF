import type { InputHTMLAttributes } from "react";

export type ComponentNameVariant = "default" | "active" | "disabled";

export interface ComponentNameProps {
  variant?: ComponentNameVariant;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function ComponentName({
  variant = "default",
  value = "",
  placeholder = "请输入",
  disabled = false,
  className,
  onValueChange,
}: ComponentNameProps) {
  const isActive = variant === "active";
  const isDisabled = disabled || variant === "disabled";

  return (
    <input
      className={cx(
        "h-fd-input w-full rounded-fd-sm border bg-fd-card px-fd-4 text-fd-body text-fd-primary outline-none",
        isActive ? "border-fd-active" : "border-fd-default",
        isDisabled && "cursor-not-allowed text-fd-disabled",
        className,
      )}
      disabled={isDisabled}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
    />
  );
}
