export function normalizeBloodGroup(value: string): string {
  const normalized = value.trim().toLowerCase();

  const bloodGroups: Record<string, string> = {
    a_positive: "A+",
    a_negative: "A-",
    b_positive: "B+",
    b_negative: "B-",
    ab_positive: "AB+",
    ab_negative: "AB-",
    o_positive: "O+",
    o_negative: "O-",
  };

  return bloodGroups[normalized] ?? value;
}
