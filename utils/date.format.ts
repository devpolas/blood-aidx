export function dateFormat(date: Date | string | null) {
  if (!date) return "—";

  const d = new Date(date);

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
