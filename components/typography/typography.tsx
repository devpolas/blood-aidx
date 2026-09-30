import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

/* Headings */

export function Heading1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-extrabold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "font-bold text-foreground text-2xl sm:text-3xl md:text-4xl text-balance tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "font-semibold text-foreground text-xl sm:text-2xl md:text-3xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "font-semibold text-foreground text-lg sm:text-xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function Heading5({ children, className }: TypographyProps) {
  return (
    <h5
      className={cn(
        "font-semibold text-foreground text-base sm:text-lg tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h5>
  );
}

export function Heading6({ children, className }: TypographyProps) {
  return (
    <h6
      className={cn(
        "font-semibold text-foreground text-sm sm:text-base tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h6>
  );
}

/* Body */

export function Lead({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "max-w-3xl text-muted-foreground text-base sm:text-lg md:text-xl leading-7 sm:leading-8",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "mt-4 first:mt-0 text-muted-foreground text-sm sm:text-base leading-6 sm:leading-7",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* Supporting text */

export function Large({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "font-semibold text-foreground text-base sm:text-lg leading-6 sm:leading-7",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small
      className={cn(
        "font-medium text-muted-foreground text-xs sm:text-sm leading-5 sm:leading-none",
        className,
      )}
    >
      {children}
    </small>
  );
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-xs sm:text-sm leading-5",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "text-[11px] text-muted-foreground sm:text-xs leading-4",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-medium text-foreground text-xs sm:text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Brand({ children, className }: TypographyProps) {
  return (
    <span className={cn("font-semibold text-brand", className)}>
      {children}
    </span>
  );
}
