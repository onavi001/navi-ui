import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/utils/cn";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
}

type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

type SelectMixedProps = SelectProps | (SelectRootProps & { children: React.ReactNode });

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

const SelectBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectMixedProps
>(
  (props, ref) => {
    if ("options" in props) {
      const {
        options,
        placeholder,
        value,
        onValueChange,
        disabled,
        error,
        errorMessage,
        size = "md",
        ...rest
      } = props;

      return (
        <div className="space-y-1">
          <SelectPrimitive.Root
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
          >
            <SelectPrimitive.Trigger
              ref={ref}
              className={cn(
                "flex w-full items-center justify-between rounded-navi-md border border-navi-border bg-navi-surface px-3 py-2 text-navi-ink shadow-navi-sm focus:outline-none focus:ring-2 focus:ring-navi-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-navi-surface-hover dark:border-navi-border-dark dark:text-navi-ink dark:focus:ring-navi-primary",
                sizeStyles[size],
                error && "border-navi-destructive focus:ring-navi-destructive",
              )}
              {...rest}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon asChild>
                <svg
                  className="h-4 w-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content className="z-50 min-w-[8rem] overflow-hidden rounded-navi-md border border-navi-border bg-navi-surface p-1 shadow-navi-md dark:bg-navi-surface-hover dark:border-navi-border-dark">
                <SelectPrimitive.Viewport>
                  {options.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className="relative flex w-full cursor-default select-none items-center rounded-navi-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-navi-primary/10 focus:text-navi-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-navi-primary/20 dark:focus:text-navi-primary"
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>
                        {option.label}
                      </SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
          {error && errorMessage && (
            <p
              className="text-sm text-navi-destructive dark:text-navi-destructive"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </div>
      );
    }

    const { children, ...rootProps } = props;
    return <SelectPrimitive.Root {...rootProps}>{children}</SelectPrimitive.Root>;
  },
);
SelectBase.displayName = SelectPrimitive.Trigger.displayName;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between rounded-navi-md border border-navi-border bg-navi-surface px-3 py-2 text-navi-ink shadow-navi-sm focus:outline-none focus:ring-2 focus:ring-navi-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-navi-surface-hover dark:border-navi-border-dark dark:text-navi-ink dark:focus:ring-navi-primary",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg
        className="h-4 w-4 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-navi-md border border-navi-border bg-navi-surface p-1 shadow-navi-md dark:bg-navi-surface-hover dark:border-navi-border-dark",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-navi-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-navi-primary/10 focus:text-navi-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-navi-primary/20 dark:focus:text-navi-primary",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const Select = Object.assign(SelectBase, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
});

export { Select };
