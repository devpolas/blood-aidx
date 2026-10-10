import { ListingFilterField } from "@/components/shared/query";

export const organizationFilters: ListingFilterField[] = [
  {
    name: "search",
    label: "Search",
    type: "search",
    placeholder: "Organization name",
  },
  {
    name: "types",
    label: "Organization type",
    type: "select",
    options: [
      { label: "Hospital", value: "hospital" },
      { label: "Blood bank", value: "blood_bank" },
      { label: "Clinic", value: "clinic" },
      { label: "NGO", value: "ngo" },
      { label: "Other", value: "other" },
    ],
  },
  { name: "country", label: "Country", type: "text" },
  { name: "division", label: "Division", type: "text" },
  { name: "city", label: "City", type: "text" },
  {
    name: "sortBy",
    label: "Sort by",
    type: "select",
    options: [
      { label: "Recently created", value: "createdAt" },
      { label: "Recently updated", value: "updatedAt" },
      { label: "Organization name", value: "name" },
      { label: "Organization type", value: "type" },
      { label: "Status", value: "status" },
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
