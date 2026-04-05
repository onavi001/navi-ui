import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  emptyMessage?: string;
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      placeholder = "Search...",
      disabled,
      emptyMessage = "No results",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);

    const filteredOptions = React.useMemo(() => {
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue]);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setSearchValue("");
      setOpen(false);
      setHighlightedIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setOpen(true);
        return;
      }

      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredOptions[highlightedIndex]) {
            const option = filteredOptions[highlightedIndex];
            handleSelect(option.value);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <input
            ref={ref}
            type="text"
            disabled={disabled}
            placeholder={placeholder}
            value={searchValue || selectedOption?.label || ""}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen(true)}
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
            className="z-50 w-[var(--radix-popover-trigger-width)] rounded-navi-md border border-navi-border bg-navi-surface p-1 shadow-navi-lg dark:border-navi-border-strong dark:bg-navi-surface-raised"
          >
            {filteredOptions.length > 0 ? (
              <div className="space-y-1">
                {filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full rounded-navi-sm px-2 py-1.5 text-left text-sm transition-colors",
                      index === highlightedIndex
                        ? "bg-navi-primary/10 text-navi-primary dark:bg-navi-primary/20 dark:text-navi-primary"
                        : "text-navi-ink hover:bg-navi-neutral/10 dark:text-navi-ink dark:hover:bg-navi-neutral/20",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="px-2 py-1.5 text-sm text-navi-ink-muted dark:text-navi-ink-muted">
                {emptyMessage}
              </p>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);
Combobox.displayName = "Combobox";

export { Combobox };
