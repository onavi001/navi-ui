import * as React from "react";
import { cn } from "@/utils/cn";
import { Avatar, type AvatarProps, type AvatarSize } from "./Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  overlap?: boolean;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, avatars, max = 4, size = "md", overlap = true, ...props },
    ref,
  ) => {
    const displayedAvatars = avatars.slice(0, max);
    const overflowCount = avatars.length - max;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {displayedAvatars.map((avatarProps, index) => (
          <Avatar
            key={index}
            {...avatarProps}
            size={size}
            className={cn(
              overlap && index > 0 && "-ml-2",
              avatarProps.className,
            )}
          />
        ))}
        {overflowCount > 0 && (
          <Avatar
            fallback={`+${overflowCount}`}
            size={size}
            className={cn(overlap && "-ml-2")}
          />
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
