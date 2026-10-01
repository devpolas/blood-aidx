import { CheckIcon, CircleIcon, LoaderIcon } from "lucide-react";
import type {
  ComponentProps,
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
} from "react";

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { cn } from "@/lib/utils";

type ShimmerStyle = CSSProperties & {
  "--shimmer-duration"?: string;
  "--shimmer-spread"?: string;
  "--shimmer-angle"?: string;
  "--shimmer-color"?: string;
};

type SpinnerProps = ComponentProps<"svg">;

export function Loader({ className, ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      aria-hidden='true'
      className={cn(
        "size-4 animate-spin motion-reduce:animate-none",
        "text-brand-foreground",
        className,
      )}
      {...props}
    />
  );
}

type ShimmerProps = ComponentPropsWithoutRef<"span"> & {
  once?: boolean;
  reverse?: boolean;
  disabled?: boolean;
  duration?: number;
  spread?: number | string;
  angle?: number;
  color?: string;
};

export function Shimmer({
  children,
  className,
  style,
  once = false,
  reverse = false,
  disabled = false,
  duration,
  spread,
  angle,
  color,
  ...props
}: ShimmerProps) {
  const shimmerStyle: ShimmerStyle = {
    ...style,
    ...(duration !== undefined && {
      "--shimmer-duration": `${duration}ms`,
    }),
    ...(spread !== undefined && {
      "--shimmer-spread":
        typeof spread === "number"
          ? `calc(var(--spacing) * ${spread})`
          : spread,
    }),
    ...(angle !== undefined && {
      "--shimmer-angle": `${angle}deg`,
    }),
    ...(color !== undefined && {
      "--shimmer-color": color,
    }),
  };

  return (
    <span
      className={cn(
        !disabled && "shimmer",
        once && "shimmer-once",
        reverse && "shimmer-reverse",
        disabled && "shimmer-none",
        "motion-reduce:animate-none",
        className,
      )}
      style={shimmerStyle}
      {...props}
    >
      {children}
    </span>
  );
}

type LoadingSpinnerProps = {
  text?: ReactNode;
  children?: ReactNode;
  className?: string;
  spinnerClassName?: string;
  textClassName?: string;
  shimmer?: boolean;
  duration?: number;
  color?: string;
};

export function LoadingSpinner({
  text,
  children,
  className,
  spinnerClassName,
  textClassName,
  shimmer = false,
  duration,
  color,
}: LoadingSpinnerProps) {
  const content = children ?? text;

  return (
    <span
      role='status'
      aria-live='polite'
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Loader className={spinnerClassName} />

      {content &&
        (shimmer ? (
          <Shimmer
            duration={duration}
            color={color}
            className={cn(
              "font-medium text-muted-foreground text-sm",
              textClassName,
            )}
          >
            {content}
          </Shimmer>
        ) : (
          <span
            className={cn(
              "font-medium text-muted-foreground text-sm",
              textClassName,
            )}
          >
            {content}
          </span>
        ))}
    </span>
  );
}

export type LoadingMarkerState = "completed" | "active" | "pending";

type LoadingMarkerProps = {
  children?: ReactNode;
  text?: ReactNode;
  announcement?: string;
  className?: string;
  contentClassName?: string;
  iconClassName?: string;
  state?: LoadingMarkerState;
  shimmer?: boolean;
  duration?: number;
  color?: string;
  variant?: ComponentProps<typeof Marker>["variant"];
};

export function LoadingMarker({
  children,
  text,
  announcement,
  className,
  contentClassName,
  iconClassName,
  state = "active",
  shimmer,
  duration,
  color,
  variant = "default",
}: LoadingMarkerProps) {
  const content = children ?? text;
  const shouldShimmer = shimmer ?? state === "active";

  const statusLabel =
    announcement ??
    (state === "completed"
      ? "Completed"
      : state === "active"
        ? "In progress"
        : "Pending");

  return (
    <Marker
      variant={variant}
      className={cn(
        "transition-colors motion-reduce:transition-none",
        className,
      )}
    >
      <span className='sr-only'>
        {statusLabel}
        {announcement ? "" : content ? ": " : ""}
        {!announcement && content
          ? typeof content === "string"
            ? content
            : ""
          : ""}
      </span>

      <MarkerIcon
        aria-hidden='true'
        className={cn(
          "size-4 text-brand-foreground",
          state === "pending" && "text-muted-foreground",
          iconClassName,
        )}
      >
        {state === "completed" ? (
          <CheckIcon className='size-4' />
        ) : state === "active" ? (
          <Loader />
        ) : (
          <CircleIcon className='fill-current size-3' />
        )}
      </MarkerIcon>

      {content && (
        <MarkerContent
          className={cn(
            "text-sm",
            state === "pending" && "text-muted-foreground",
            contentClassName,
          )}
        >
          {shouldShimmer ? (
            <Shimmer duration={duration} color={color}>
              {content}
            </Shimmer>
          ) : (
            <span>{content}</span>
          )}
        </MarkerContent>
      )}
    </Marker>
  );
}

export type LoadingStep = {
  id?: string;
  label: ReactNode;
  announcement?: string;
  state?: LoadingMarkerState;
};

type LoadingStepsProps = {
  steps: LoadingStep[];
  activeStep?: number;
  className?: string;
  duration?: number;
  color?: string;
};

export function LoadingSteps({
  steps,
  activeStep = 0,
  className,
  duration = 2000,
  color,
}: LoadingStepsProps) {
  if (steps.length === 0) {
    return null;
  }

  const normalizedActiveStep = Math.min(Math.max(activeStep, 0), steps.length);

  return (
    <div
      role='status'
      aria-live='polite'
      aria-label='Progress'
      aria-atomic='false'
      className={cn("flex flex-col gap-3 w-full", className)}
    >
      {steps.map((step, index) => {
        const state =
          step.state ??
          (index < normalizedActiveStep
            ? "completed"
            : index === normalizedActiveStep
              ? "active"
              : "pending");

        return (
          <LoadingMarker
            key={step.id ?? index}
            state={state}
            announcement={step.announcement}
            variant={index === 0 ? "default" : "separator"}
            duration={duration}
            color={color}
          >
            {step.label}
          </LoadingMarker>
        );
      })}
    </div>
  );
}
