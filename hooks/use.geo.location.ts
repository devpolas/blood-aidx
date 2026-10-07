import { useState } from "react";

import { ofetch } from "ofetch";

interface Coordinates {
  lat: number;
  lng: number;
}

interface NominatimAddress {
  country?: string;
  state?: string;
  county?: string;
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
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
  address: NominatimAddress;
}

export interface PropertyLocationPayload {
  latitude: string;
  longitude: string;
  country: string;
  division: string;
  district: string;
  city: string;
  village: string;
  postalCode: string;
  addressLine?: string;
}

const LOCATION_API_BASE_URL = process.env.NEXT_PUBLIC_LOCATION_API_BASE_URL;

function getGeoErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location permission denied";

    case error.POSITION_UNAVAILABLE:
      return "Unable to determine your location";

    case error.TIMEOUT:
      return "Location request timed out";

    default:
      return "Failed to get your location";
  }
}

function mapGeoAddressToLocation(
  coordinates: Coordinates,
  data: NominatimResponse,
): PropertyLocationPayload {
  const { address } = data;

  return {
    latitude: coordinates.lat.toString(),
    longitude: coordinates.lng.toString(),
    country: address.country ?? "",
    division: address.state?.replace(" Division", "") ?? "",
    district: address.county?.replace(" District", "") ?? "",
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
    addressLine: data.display_name,
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

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    if (!LOCATION_API_BASE_URL) {
      setError("Location service is not configured");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCoordinates(coords);

        try {
          const geoAddress = await ofetch<NominatimResponse>(
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

          setAddress(geoAddress);
          setLocationPayload(mapGeoAddressToLocation(coords, geoAddress));
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to reverse geocode location",
          );
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError(getGeoErrorMessage(error));
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return {
    isLoading,
    coordinates,
    address,
    locationPayload,
    error,
    getPosition,
  };
}
