import { cn } from "./lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "font-label text-xs font-semibold uppercase tracking-wider text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
