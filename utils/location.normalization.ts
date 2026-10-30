export type LocationNameType = "country" | "division" | "city" | "village";

const ADMINISTRATIVE_SUFFIXES = [
  "administrative region",
  "autonomous region",
  "administrative area",
  "special administrative region",
  "province",
  "division",
  "district",
  "region",
  "territory",
  "prefecture",
  "governorate",
  "municipality",
  "department",
  "oblast",
  "county",
  "state",
  "canton",
  "emirate",
  "parish",
  "zila",
  "জেলা",
  "বিভাগ",
];

const ADMINISTRATIVE_PREFIXES = [
  "state of",
  "province of",
  "region of",
  "department of",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeAdministrativeSuffix(value: string): string {
  const suffixPattern = new RegExp(
    `\\s+(?:${ADMINISTRATIVE_SUFFIXES.sort((a, b) => b.length - a.length)
      .map(escapeRegExp)
      .join("|")})$`,
    "iu",
  );

  let result = value;

  while (suffixPattern.test(result)) {
    result = result.replace(suffixPattern, "").trim();
  }

  return result;
}

function removeAdministrativePrefix(value: string): string {
  const prefixPattern = new RegExp(
    `^(?:${ADMINISTRATIVE_PREFIXES.map(escapeRegExp).join("|")})\\s+`,
    "iu",
  );

  return value.replace(prefixPattern, "").trim();
}

export function normalizeLocationName(
  value: string | null | undefined,
  type: LocationNameType,
): string {
  if (!value) return "";

  let normalized = value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Country names must remain intact.
  if (type === "country") {
    return normalized;
  }

  // Do not remove words like "City" from genuine city names.
  if (type === "city" || type === "village") {
    return normalized;
  }

  if (type === "division") {
    normalized = removeAdministrativePrefix(normalized);
    normalized = removeAdministrativeSuffix(normalized);
  }

  return normalized;
}
