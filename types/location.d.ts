import { ID, ISODateString } from "./enum";

export interface Location {
  id: ID;
  latitude: string | null;
  longitude: string | null;
  country: string;
  division: string;
  district: string;
  city: string;
  village: string;
  postalCode: string;
  addressLine: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
