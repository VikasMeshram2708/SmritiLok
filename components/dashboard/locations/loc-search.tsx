/**
 * This component is responsible for searching the locations all over the world using open-streets api
 */

"use client";

import { useDebounce } from "@/lib/useDebounce";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Loader2, Globe } from "lucide-react";

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
  display_name: string;
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

export default function LocSearch() {
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(null);
  const [error, setError] = useState<string>("");
  const debounceText = useDebounce(text, 500);

  // Search locations using OpenStreetMap Nominatim API
  const searchLocations = async (query: string): Promise<LocationResult[]> => {
    if (!query.trim()) return [];

    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
      q: query,
      format: "json",
      addressdetails: "1",
      limit: "10",
      countrycodes: "", // Leave empty to search worldwide
      dedupe: "1",
    });

    const response = await fetch(`${baseUrl}?${params}`, {
      headers: {
        "User-Agent": "SmritiLok-LocationSearch/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimResult[] = await response.json();

    // Transform the API response to our internal format
    return data.map(
      (item): LocationResult => ({
        id: item.place_id,
        name: item.name || item.display_name.split(",")[0],
        displayName: item.display_name,
        coordinates: {
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
        },
        address: {
          city: item.address?.city || item.address?.suburb,
          state: item.address?.state,
          country: item.address?.country,
          countryCode: item.address?.country_code?.toUpperCase(),
        },
        type: item.type,
        class: item.class,
      })
    );
  };

  // Effect to trigger search when debounced text changes
  useEffect(() => {
    if (debounceText.trim()) {
      // Only search if the text is different from selected location to avoid unnecessary searches
      if (!selectedLocation || debounceText !== selectedLocation.name) {
        startTransition(async () => {
          try {
            setError("");
            const searchResults = await searchLocations(debounceText);
            setResults(searchResults);
          } catch (e) {
            console.error("Search error:", e);
            setError("Failed to search locations. Please try again.");
            setResults([]);
          }
        });
      }
    } else {
      setResults([]);
      setError("");
      setSelectedLocation(null); // Clear selection when search is cleared
    }
  }, [debounceText, selectedLocation]);

  // Handle location selection
  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocation(location);
    setText(location.name);
    setResults([]); // Clear results immediately
    setError(""); // Clear any errors
  };

  // Handle save location
  const handleSaveLocation = () => {
    if (selectedLocation) {
      console.log("Saving location:", {
        id: selectedLocation.id,
        name: selectedLocation.name,
        displayName: selectedLocation.displayName,
        coordinates: selectedLocation.coordinates,
        address: selectedLocation.address,
        type: selectedLocation.type,
        class: selectedLocation.class,
        savedAt: new Date().toISOString(),
      });
      // You can add your save logic here (API call, local storage, etc.)
      alert(`Location "${selectedLocation.name}" saved successfully!`);
    }
  };

  // Clear search
  const handleClear = () => {
    setText("");
    setResults([]);
    setSelectedLocation(null);
    setError("");
  };

  // Get location type badge color
  const getTypeColor = (type: string, className: string) => {
    const typeColors: Record<string, string> = {
      city: "bg-blue-100 text-blue-800",
      town: "bg-green-100 text-green-800",
      village: "bg-yellow-100 text-yellow-800",
      country: "bg-purple-100 text-purple-800",
      state: "bg-indigo-100 text-indigo-800",
      administrative: "bg-gray-100 text-gray-800",
    };

    return (
      typeColors[type] || typeColors[className] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Search Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Location Search</h2>
        </div>
        <p className="text-muted-foreground">
          Search for any location worldwide using OpenStreetMap
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for cities, countries, landmarks..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="pl-10 pr-20"
          />
          {text && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-2"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Loading indicator */}
        {isPending && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Selected Location */}
      {selectedLocation && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{selectedLocation.name}</h3>
                  <Badge
                    variant="secondary"
                    className={getTypeColor(
                      selectedLocation.type,
                      selectedLocation.class
                    )}
                  >
                    {selectedLocation.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.displayName}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Lat: {selectedLocation.coordinates.lat.toFixed(6)}
                  </span>
                  <span>
                    Lon: {selectedLocation.coordinates.lon.toFixed(6)}
                  </span>
                  {selectedLocation.address.countryCode && (
                    <Badge variant="outline" className="text-xs">
                      {selectedLocation.address.countryCode}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveLocation}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Save Location
                  </Button>
                  <Button variant="outline" onClick={handleClear} size="sm">
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {results.map((location, index) => (
                <div
                  key={location.id}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                    index !== results.length - 1 ? "border-b" : ""
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">
                          {location.name}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getTypeColor(
                            location.type,
                            location.class
                          )}`}
                        >
                          {location.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {location.displayName}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          {location.coordinates.lat.toFixed(4)},{" "}
                          {location.coordinates.lon.toFixed(4)}
                        </span>
                        {location.address.countryCode && (
                          <Badge variant="outline" className="text-xs">
                            {location.address.countryCode}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {debounceText &&
        !isPending &&
        results.length === 0 &&
        !error &&
        !selectedLocation &&
        debounceText.trim() !== "" && (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No locations found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords or check your spelling.
              </p>
            </CardContent>
          </Card>
        )}

      {/* Instructions */}
      {!text && (
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center space-y-3">
            <Search className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="space-y-2">
              <h3 className="font-medium">Start typing to search</h3>
              <p className="text-sm text-muted-foreground">
                Search for cities, countries, landmarks, or any location
                worldwide
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Badge variant="outline">Cities</Badge>
              <Badge variant="outline">Countries</Badge>
              <Badge variant="outline">Landmarks</Badge>
              <Badge variant="outline">Streets</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
