export function Rule({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <hr
      className={`border-0 border-t ${className}`}
      style={{ borderColor: tone === "light" ? "var(--rule-light)" : "var(--rule-dark)" }}
    />
  );
}
