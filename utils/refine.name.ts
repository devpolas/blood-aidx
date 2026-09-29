export function namePerfect(name: string | null): string {
  if (!name?.trim()) return "—";

  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
