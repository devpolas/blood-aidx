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

export interface PlaceCountry {
  id: number;
  code: string;
  iso_3166_1_alpha3: string;
  name: string;
  regions: number;
  settlements: number;
}

export interface PlaceRegion {
  id: number;
  iso_3166_2: string;
  name: string;
  lat: number;
  lon: number;
  population?: number;
  settlements: number;
  slug: string;
}

export interface PlaceSettlement {
  id: number;
  name: string;
  lat: number;
  lon: number;
  population?: number;
  type?: string;
}

interface CountriesResponse {
  countries: PlaceCountry[];
}

interface RegionsResponse {
  country: string;
  regions: PlaceRegion[];
}

interface CitiesResponse {
  country: string;
  region: number;
  settlements: PlaceSettlement[];
}
