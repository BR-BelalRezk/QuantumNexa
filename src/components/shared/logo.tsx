import { cn } from "@/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const variants = {
  sm: {
    container: "gap-2",
    iconBox: "size-10 rounded-xl",
    icon: "text-xl",
    text: "text-2xl",
  },
  md: {
    container: "gap-3",
    iconBox: "size-12 rounded-2xl",
    icon: "text-2xl",
    text: "text-3xl",
  },
  lg: {
    container: "gap-4",
    iconBox: "size-16 rounded-3xl",
    icon: "text-4xl",
    text: "text-5xl md:text-6xl",
  },
} as const;

export default function Logo({ size = "md", className }: LogoProps) {
  const variant = variants[size];

  return (
    <div
      className={cn(
        "flex select-none items-center justify-center",
        variant.container,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center",
          "bg-primary/10 ring-primary/15 ring-1",
          variant.iconBox,
        )}
      >
        <span className={cn("text-primary drop-shadow-sm", variant.icon)}>
          ⚙
        </span>
      </div>

      <h1
        className={cn(
          "whitespace-nowrap font-black tracking-tight",
          variant.text,
        )}
      >
        <span className="text-white/70">Quantum</span>
        <span className="text-primary">Nexa</span>
      </h1>
    </div>
  );
}
