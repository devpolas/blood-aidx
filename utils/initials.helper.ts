export function getInitials(name: string): string {
  const value = name.trim();

  if (!value) return "";

  return value
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
