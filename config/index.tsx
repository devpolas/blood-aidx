import { SignUpInput } from "@/validators/auth.validator";

export const PUBLIC_NAVIGATION = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Find Donors",
    href: "/donors",
  },
  {
    title: "Blood Requests",
    href: "/blood-requests",
  },
  {
    title: "Organizations",
    href: "/organizations",
  },
];

export const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
] as const;

export const ROLE_CONFIG = {
  donor: {
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    submitLabel: "Become a Donor",
  },

  recipient: {
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    submitLabel: "Create Recipient Account",
  },

  volunteer: {
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    submitLabel: "Join as a Volunteer",
  },

  hospital: {
    nameLabel: "Hospital Name",
    namePlaceholder: "Enter your hospital name",
    submitLabel: "Register Hospital",
  },

  blood_bank: {
    nameLabel: "Blood Bank Name",
    namePlaceholder: "Enter your blood bank name",
    submitLabel: "Register Blood Bank",
  },
} as const satisfies Record<
  SignUpInput["role"],
  {
    nameLabel: string;
    namePlaceholder: string;
    submitLabel: string;
  }
>;
