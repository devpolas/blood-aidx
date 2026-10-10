import { ListingFilterField } from "@/components/shared/query";

export const donorFilters: ListingFilterField[] = [
  {
    name: "bloodGroup",
    label: "Blood group",
    type: "select",
    options: [
      { label: "A+", value: "a_positive" },
      { label: "A−", value: "a_negative" },
      { label: "B+", value: "b_positive" },
      { label: "B−", value: "b_negative" },
      { label: "AB+", value: "ab_positive" },
      { label: "AB−", value: "ab_negative" },
      { label: "O+", value: "o_positive" },
      { label: "O−", value: "o_negative" },
    ],
  },
  {
    name: "availability",
    label: "Availability",
    type: "select",
    options: [
      { label: "Available", value: "available" },
      { label: "Unavailable", value: "unavailable" },
      {
        label: "Temporarily unavailable",
        value: "temporarily_unavailable",
      },
    ],
  },
  { name: "country", label: "Country", type: "text" },
  { name: "division", label: "Division", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "village", label: "Area / village", type: "text" },
  { name: "postalCode", label: "Postal code", type: "text" },
  {
    name: "sortBy",
    label: "Sort by",
    type: "select",
    options: [
      { label: "Recently created", value: "createdAt" },
      { label: "Recently updated", value: "updatedAt" },
      { label: "Last donation", value: "lastDonationAt" },
      { label: "Total donations", value: "totalDonations" },
      { label: "Blood group", value: "bloodGroup" },
      { label: "Availability", value: "availability" },
    ],
  },
  {
    name: "sortOrder",
    label: "Order",
    type: "select",
    options: [
      { label: "Newest first / descending", value: "desc" },
      { label: "Oldest first / ascending", value: "asc" },
    ],
  },
];
