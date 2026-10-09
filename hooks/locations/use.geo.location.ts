"use client";

import { useCallback, useState } from "react";
import { ofetch } from "ofetch";
export type Coordinates = {
  lat: number;
  lng: number;
};

type NominatimAddress = {
  country?: string;
  state?: string;
  city?: string;
  town?: string;
  municipality?: string;
  village?: string;
  hamlet?: string;
  suburb?: string;
  neighbourhood?: string;
  quarter?: string;
  residential?: string;
  postcode?: string;
};

type NominatimResponse = {
  lat: string;
  lon: string;
  display_name: string;
  address?: NominatimAddress;
};

export type PropertyLocationPayload = {
  latitude: string;
  longitude: string;
  country: string;
  division: string;
  city: string;
  village: string;
  postalCode: string;
  addressLine?: string;
};

const LOCATION_API_BASE_URL =
  process.env.NEXT_PUBLIC_LOCATION_API_BASE_URL?.replace(/\/+$/, "");

function getGeoErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied. Allow access and try again.";

    case error.POSITION_UNAVAILABLE:
      return "Unable to determine your current location.";

    case error.TIMEOUT:
      return "Location request timed out. Please try again.";

    default:
      return "Failed to get your location.";
  }
}

function cleanAdministrativeName(
  value: string | undefined,
  suffix: string,
): string {
  if (!value) return "";

  return value.replace(new RegExp(`\\s+${suffix}$`, "i"), "").trim();
}

function mapGeoAddressToLocation(
  coordinates: Coordinates,
  data: NominatimResponse,
): PropertyLocationPayload {
  const address = data.address ?? {};

  return {
    latitude: String(coordinates.lat),
    longitude: String(coordinates.lng),
    country: address.country ?? "",
    division: cleanAdministrativeName(address.state, "Division"),
    city: address.city ?? address.town ?? address.municipality ?? "",
    village:
      address.village ??
      address.hamlet ??
      address.suburb ??
      address.neighbourhood ??
      address.quarter ??
      address.residential ??
      "",
    postalCode: address.postcode ?? "",
    addressLine: data.display_name ?? "",
  };
}

export function useGeoLocation(defaultLocation: Coordinates | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    defaultLocation,
  );
  const [address, setAddress] = useState<NominatimResponse | null>(null);
  const [locationPayload, setLocationPayload] =
    useState<PropertyLocationPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPosition = useCallback(() => {
    if (isLoading) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    if (!LOCATION_API_BASE_URL) {
      setError("Location service is not configured.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAddress(null);
    setLocationPayload(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCoordinates(coords);

        try {
          const response = await ofetch<NominatimResponse>(
            `${LOCATION_API_BASE_URL}/reverse`,
            {
              query: {
                lat: coords.lat,
                lon: coords.lng,
                format: "jsonv2",
                addressdetails: 1,
                "accept-language": "en",
              },
            },
          );

          setAddress(response);
          setLocationPayload(mapGeoAddressToLocation(coords, response));
        } catch {
          setError("Failed to find an address for your location.");
        } finally {
          setIsLoading(false);
        }
      },
      (positionError) => {
        setError(getGeoErrorMessage(positionError));
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15_000,
        maximumAge: 60_000,
      },
    );
  }, [isLoading]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setCoordinates(null);
    setAddress(null);
    setLocationPayload(null);
    setError(null);
  }, []);

  return {
    isLoading,
    coordinates,
    address,
    locationPayload,
    error,
    getPosition,
    reset,
  };
}
