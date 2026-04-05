import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format, isAfter, isBefore, isValid } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { cn } from "@/utils/cn";
import "react-day-picker/dist/style.css";

export interface DatePickerProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  locale?: "es" | "en";
}

const localeMap = {
  es: es,
  en: enUS,
};

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      placeholder = "Select a date",
      disabled,
      minDate,
      maxDate,
      locale = "es",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (date: Date | undefined) => {
      if (!date) return;

      let isValid = true;

      if (minDate && isBefore(date, minDate)) {
        isValid = false;
      }

      if (maxDate && isAfter(date, maxDate)) {
        isValid = false;
      }

      if (isValid) {
        onChange?.(date);
        setOpen(false);
      }
    };

    const formattedValue =
      value && isValid(value) ? format(value, "dd/MM/yyyy") : "";

    const dateLocale = localeMap[locale];

    const disabledMatcher = (date: Date) => {
      if (minDate && isBefore(date, minDate)) return true;
      if (maxDate && isAfter(date, maxDate)) return true;
      return false;
    };

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <input
            ref={ref}
            type="text"
            disabled={disabled}
            placeholder={placeholder}
            value={formattedValue}
            readOnly
            className={cn(
              "flex h-10 w-full rounded-navi-md border border-navi-border bg-navi-surface px-3 py-2 text-base text-navi-ink placeholder:text-navi-ink-muted shadow-navi-sm focus:outline-none focus:ring-2 focus:ring-navi-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-navi-border-strong dark:bg-navi-surface-raised dark:text-navi-ink dark:placeholder:text-navi-ink-muted dark:focus:ring-offset-navi-surface-raised",
              className,
            )}
            {...props}
          />
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            className="z-50 rounded-navi-md border border-navi-border bg-navi-surface p-3 shadow-navi-lg dark:border-navi-border-strong dark:bg-navi-surface-raised"
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={handleSelect}
              disabled={disabledMatcher}
              locale={dateLocale}
              classNames={{
                months: "flex flex-col space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label:
                  "text-sm font-medium text-navi-ink dark:text-navi-ink",
                nav: "space-x-1 flex justify-between",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 rounded-navi-sm hover:bg-navi-neutral/10 dark:hover:bg-navi-neutral/20 text-navi-ink dark:text-navi-ink focus:outline-none focus:ring-2 focus:ring-navi-primary",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                  "text-navi-ink-muted dark:text-navi-ink-muted rounded-navi-sm w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-navi-neutral/10 [&:has([aria-selected])]:bg-navi-neutral/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-navi-neutral/20 dark:[&:has([aria-selected])]:bg-navi-neutral/20",
                day: cn(
                  "h-9 w-9 p-0 rounded-navi-sm hover:bg-navi-neutral/10 dark:hover:bg-navi-neutral/20 focus:outline-none focus:ring-2 focus:ring-navi-primary aria-selected:opacity-100",
                ),
                day_selected:
                  "bg-navi-primary text-navi-primary-foreground hover:bg-navi-primary hover:text-navi-primary-foreground focus:bg-navi-primary focus:text-navi-primary-foreground",
                day_today:
                  "bg-navi-neutral/10 text-navi-primary dark:bg-navi-neutral/20",
                day_outside:
                  "day-outside text-navi-ink-muted opacity-50 dark:text-navi-ink-muted aria-selected:bg-navi-neutral/10 aria-selected:text-navi-ink-muted aria-selected:opacity-50 dark:aria-selected:bg-navi-neutral/20",
                day_disabled:
                  "text-navi-ink-muted opacity-50 dark:text-navi-ink-muted",
                day_range_middle:
                  "aria-selected:bg-navi-neutral/10 aria-selected:text-navi-ink dark:aria-selected:bg-navi-neutral/20 dark:aria-selected:text-navi-ink",
                day_hidden: "invisible",
              }}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
