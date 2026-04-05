import * as React from "react";
import { cn } from "@/utils/cn";
import { Label } from "../primitives";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  children?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      label,
      required,
      helperText,
      errorMessage,
      children,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(errorMessage);

    return (
      <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
        {label && <Label required={required}>{label}</Label>}
        {children}
        {hasError && errorMessage ? (
          <p
            className="text-sm text-navi-destructive dark:text-navi-destructive"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="text-sm text-navi-neutral/60 dark:text-navi-neutral/60">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = "FormField";

export { FormField };
