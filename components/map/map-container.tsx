"use client";

import { Map, Marker, NavigationControl } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState, useCallback } from "react";
import MapPin from "@/public/map/pin.png";
import { useStore } from "@/app/context/store";
import SaveJourney from "../dashboard/locations/save-journey";

export default function MapContainer() {
  // store
  const { coords: selectedCoords, addCoords } = useStore();

  const [coords, setCoords] = useState<Coordinates>({
    lat: selectedCoords?.lat ?? 28.6448,
    lon: selectedCoords?.lon ?? 77.216721,
  });

  const [viewState, setViewState] = useState<ViewState>({
    longitude: selectedCoords?.lon ?? 77.216721,
    latitude: selectedCoords?.lat ?? 28.6448,
    zoom: 7.5,
  });

  const [locationDetails, setLocationDetails] =
    useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationDetails = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
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
  }, []);

  useEffect(() => {
    if (selectedCoords) {
      setCoords({
        lat: selectedCoords.lat,
        lon: selectedCoords.lon,
      });
      setViewState((prev) => ({
        ...prev,
        longitude: selectedCoords.lon,
        latitude: selectedCoords.lat,
      }));
      // Fetch details for the new coordinates immediately
      getLocationDetails(selectedCoords.lat, selectedCoords.lon);
    }
  }, [selectedCoords, getLocationDetails]);

  const handleMapClick = useCallback(
    ({ lngLat }: { lngLat: { lat: number; lng: number } }) => {
      const newCoords = { lat: lngLat.lat, lon: lngLat.lng };
      addCoords(newCoords);
      setCoords(newCoords);
      getLocationDetails(newCoords.lat, newCoords.lon);
    },
    [getLocationDetails, coords]
  );

  const handleMapMove = useCallback(
    ({ viewState: newViewState }: { viewState: ViewState }) => {
      setViewState(newViewState);
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
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Location Details</h3>
              {/* save journey */}
              <SaveJourney />
            </div>
            <p className="text-sm line-clamp-2 text-muted-foreground">
              {locationDetails.display_name || "Unknown location"}
            </p>
            {locationDetails.address && (
              <p className="text-muted-foreground">
                {locationDetails.address.city &&
                  `${locationDetails.address.city}, `}
                {locationDetails.address.state &&
                  `${locationDetails.address.state}, `}
                {locationDetails.address.country}
              </p>
            )}
            <p className="text-sm font-bold mt-1">
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
