"use client";

import { Map, Marker, NavigationControl } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState, useCallback } from "react";
import MapPin from "@/public/map/pin.png";

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

export default function MapContainer() {
  const [coords, setCoords] = useState<Coordinates>({
    lat: 28.6448,
    lon: 77.216721,
  });

  const [viewState, setViewState] = useState<ViewState>({
    longitude: 77.216721,
    latitude: 28.6448,
    zoom: 7.5,
  });

  const [locationDetails, setLocationDetails] =
    useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setLocationDetails(json);
    } catch (err) {
      console.error("Failed to fetch location details:", err);
      setError("Failed to load location details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [coords.lat, coords.lon]);

  useEffect(() => {
    getLocationDetails();
  }, [getLocationDetails]);

  const handleMapClick = useCallback(
    ({ lngLat }: { lngLat: { lat: number; lng: number } }) => {
      setCoords({ lat: lngLat.lat, lon: lngLat.lng });
    },
    []
  );

  const handleMapMove = useCallback(
    ({ viewState: newViewState }: { viewState: ViewState }) => {
      setViewState(newViewState); // This now preserves zoom level
    },
    []
  );

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewState}
        style={{ width: "100%", height: "400px" }}
        mapStyle="https://tiles.stadiamaps.com/styles/alidade_smooth.json"
        onClick={handleMapClick}
        onMove={handleMapMove}
        reuseMaps
      >
        <Marker longitude={coords.lon} latitude={coords.lat} anchor="bottom">
          <img
            src={MapPin.src}
            className="w-7 h-10 bg-transparent"
            alt="Map pin marker"
          />
        </Marker>
        <NavigationControl showZoom showCompass />
      </Map>

      <div className="mt-2 p-2 bg-white rounded shadow">
        {isLoading ? (
          <p>Loading location details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : locationDetails ? (
          <div>
            <h3 className="font-semibold">Location Details</h3>
            <p>{locationDetails.display_name || "Unknown location"}</p>
            {locationDetails.address && (
              <p>
                {locationDetails.address.city &&
                  `${locationDetails.address.city}, `}
                {locationDetails.address.state &&
                  `${locationDetails.address.state}, `}
                {locationDetails.address.country}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
              <br />
              Zoom: {viewState.zoom.toFixed(2)}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
