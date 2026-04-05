import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cn";

export type TabsVariant = "default" | "pills" | "underline";

export type TabsOrientation = "horizontal" | "vertical";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant;
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default:
      "h-10 items-center justify-center rounded-navi-md bg-navi-neutral/10 p-1 dark:bg-navi-neutral/20",
    pills:
      "h-10 items-center justify-center rounded-navi-md bg-navi-neutral/10 p-1 dark:bg-navi-neutral/20",
    underline:
      "h-10 items-center justify-center border-b border-navi-border dark:border-navi-border-strong",
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("inline-flex", variantStyles[variant], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: TabsVariant;
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default:
      "inline-flex items-center justify-center whitespace-nowrap rounded-navi-sm px-3 py-1.5 text-sm font-medium ring-offset-navi-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-navi-surface data-[state=active]:text-navi-primary data-[state=active]:shadow-navi-sm dark:ring-offset-navi-surface-raised dark:data-[state=active]:bg-navi-surface-raised",
    pills:
      "inline-flex items-center justify-center whitespace-nowrap rounded-navi-full px-3 py-1.5 text-sm font-medium ring-offset-navi-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-navi-primary data-[state=active]:text-navi-primary-foreground data-[state=active]:shadow-navi-sm dark:ring-offset-navi-surface-raised",
    underline:
      "inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 py-1.5 text-sm font-medium ring-offset-navi-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-navi-primary data-[state=active]:text-navi-primary dark:ring-offset-navi-surface-raised",
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-navi-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navi-primary focus-visible:ring-offset-2 dark:ring-offset-navi-surface-raised",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
