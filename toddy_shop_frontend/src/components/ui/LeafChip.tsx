export function LeafChip({
  children,
  variant = "secondary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const colors =
    variant === "primary"
      ? "bg-primary/5 text-primary"
      : "bg-secondary/10 text-secondary";

  return (
    <span className={`leaf-chip ${colors} px-3 py-1 text-[11px] font-bold`}>
      {children}
    </span>
  );
}
