import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted/50 bg-gradient-to-r from-gray-900/50 to-gray-800/50", className)} {...props} />;
}

export { Skeleton };
