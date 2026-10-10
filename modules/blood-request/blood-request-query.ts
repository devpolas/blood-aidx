"use client";

import { ListingFilterField } from "@/components/shared/query";

export const bloodRequestFilters: ListingFilterField[] = [
  {
    name: "search",
    label: "Search",
    type: "search",
    placeholder: "Patient or request details",
  },
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
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { label: "Urgent", value: "urgent" },
      { label: "High", value: "high" },
      { label: "Low", value: "low" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Open", value: "open" },
      { label: "Partially fulfilled", value: "partially_fulfilled" },
      { label: "Fulfilled", value: "fulfilled" },
      { label: "Cancelled", value: "cancelled" },
      { label: "Expired", value: "expired" },
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
      { label: "Required date", value: "requiredAt" },
      { label: "Expiration date", value: "expiresAt" },
      { label: "Units required", value: "unitsRequired" },
      { label: "Units fulfilled", value: "unitsFulfilled" },
      { label: "Priority", value: "priority" },
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
