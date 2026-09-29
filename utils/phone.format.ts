import { parsePhoneNumberFromString } from "libphonenumber-js";

export function formatPhone(phone: string | null) {
  if (!phone) return "—";
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.isValid() ? phoneNumber.formatInternational() : phone;
}
