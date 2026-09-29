import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
type SpinnerProps = React.ComponentProps<"svg">;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      role='status'
      aria-label='Loading'
      className={cn("size-4 text-red-500 animate-spin", className)}
      {...props}
    />
  );
}

type LoadingSpinnerProps = {
  text?: string;
  className?: string;
};

export default function LoadingSpinner({
  text,
  className,
}: LoadingSpinnerProps) {
  return (
    <span
      role='status'
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Spinner />
      {text && <span className='font-medium text-sm'>{text}</span>}
    </span>
  );
}
