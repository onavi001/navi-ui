import * as React from "react";
import { cn } from "@/utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarShape = "circle" | "square";

export type AvatarStatus = "online" | "offline" | "away" | "busy" | undefined;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "size-6 text-xs",
  sm: "size-8 text-sm",
  md: "size-10 text-base",
  lg: "size-12 text-lg",
  xl: "size-16 text-xl",
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-navi-md",
};

const statusStyles: Record<NonNullable<AvatarStatus>, string> = {
  online: "bg-navi-success",
  offline: "bg-navi-neutral/50",
  away: "bg-navi-warning",
  busy: "bg-navi-destructive",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size = "md",
      shape = "circle",
      status,
      ...props
    },
    ref,
  ) => {
    const [hasError, setHasError] = React.useState(false);

    const handleImageError = () => {
      setHasError(true);
    };

    const showFallback = hasError || !src;

    const fallbackContent = React.isValidElement(fallback) ? (
      fallback
    ) : typeof fallback === "string" ? (
      <span className="font-medium text-navi-ink dark:text-navi-neutral-light">
        {fallback.slice(0, 2).toUpperCase()}
      </span>
    ) : (
      <svg
        className="size-1/2 text-navi-neutral/60 dark:text-navi-neutral/40"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-navi-neutral/10 dark:bg-navi-neutral/20",
          sizeStyles[size],
          shapeStyles[shape],
          className,
        )}
        role="img"
        aria-label={alt}
        {...props}
      >
        {showFallback ? (
          fallbackContent
        ) : (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={handleImageError}
          />
        )}
        {status && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 size-2 rounded-full border border-navi-surface dark:border-navi-surface-hover",
              statusStyles[status],
            )}
            aria-hidden
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar };
