import * as React from "react";
import { cn } from "@/utils/cn";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  maxItems?: number;
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrentPage?: boolean;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, maxItems, separator = "/", children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(
      (child): child is React.ReactElement<BreadcrumbItemProps> =>
        React.isValidElement(child) && child.type === BreadcrumbItem,
    );

    let displayItems = items;

    if (maxItems && items.length > maxItems) {
      const firstItem = items[0];
      const lastItems = items.slice(-Math.max(1, maxItems - 2));
      const ellipsis = <BreadcrumbEllipsis key="ellipsis" />;

      displayItems = [firstItem, ellipsis, ...lastItems];
    }

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("flex items-center space-x-1", className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {displayItems.map((item, index) => (
            <React.Fragment key={item.key || index}>
              {item}
              {index < displayItems.length - 1 && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, isCurrentPage, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center", className)}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "text-navi-ink hover:text-navi-primary dark:text-navi-ink dark:hover:text-navi-primary",
      className,
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-navi-ink-muted dark:text-navi-ink-muted", className)}
    {...props}
  />
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
      <circle cx={5} cy={12} r={1} />
    </svg>
    <span className="sr-only">More</span>
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
