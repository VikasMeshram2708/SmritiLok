// Type definitions for OpenStreetMap Nominatim API response

interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string?;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: string[];
}

interface LocationResult {
  id: number;
  name: string;
  displayName: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  address: {
    city?: string;
    state?: string;
    country?: string;
    countryCode?: string;
  };
  type: string;
  class: string;
}

// map container types

interface Coordinates {
  lat: number;
  lon: number;
}

interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface LocationDetails {
  display_name?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
}
