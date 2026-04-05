import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils/cn";

export type ProgressVariant = "default" | "success" | "warning" | "destructive";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "value" | "max"
> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  label?: string;
  indeterminate?: boolean;
}

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

const variantStyles: Record<ProgressVariant, string> = {
  default: "bg-navi-primary dark:bg-navi-primary-light",
  success: "bg-navi-success dark:bg-navi-success-light",
  warning: "bg-navi-warning dark:bg-navi-warning-light",
  destructive: "bg-navi-destructive dark:bg-navi-destructive-light",
};

const widthByStep5: Record<number, string> = {
  0: "w-0",
  5: "w-[5%]",
  10: "w-[10%]",
  15: "w-[15%]",
  20: "w-[20%]",
  25: "w-[25%]",
  30: "w-[30%]",
  35: "w-[35%]",
  40: "w-[40%]",
  45: "w-[45%]",
  50: "w-[50%]",
  55: "w-[55%]",
  60: "w-[60%]",
  65: "w-[65%]",
  70: "w-[70%]",
  75: "w-[75%]",
  80: "w-[80%]",
  85: "w-[85%]",
  90: "w-[90%]",
  95: "w-[95%]",
  100: "w-full",
};

const clamp = (input: number, min: number, max: number) =>
  Math.min(max, Math.max(min, input));

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      label,
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const safeValue = clamp(value, 0, safeMax);
    const percentage = Math.round((safeValue / safeMax) * 100);
    const step5 = Math.round(percentage / 5) * 5;
    const widthClass = widthByStep5[clamp(step5, 0, 100)];

    return (
      <div className="w-full space-y-1.5">
        {showLabel ? (
          <div className="flex items-center justify-between text-xs text-navi-neutral/60 dark:text-navi-neutral/60">
            <span>{label ?? "Progress"}</span>
            <span>{indeterminate ? "..." : `${percentage}%`}</span>
          </div>
        ) : null}

        <ProgressPrimitive.Root
          ref={ref}
          max={safeMax}
          value={indeterminate ? null : safeValue}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-navi-neutral/10 dark:bg-navi-neutral/25",
            sizeStyles[size],
            className,
          )}
          aria-busy={indeterminate ? true : undefined}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full rounded-full transition-[width] duration-300 ease-out",
              variantStyles[variant],
              indeterminate
                ? "w-1/3 animate-[navi-progress-indeterminate_1.2s_ease-in-out_infinite]"
                : widthClass,
            )}
          />
        </ProgressPrimitive.Root>
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress };
