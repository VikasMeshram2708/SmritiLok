import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Coords = {
  lat: number;
  lon: number;
};
type StoreState = {
  locationDetails: NominatimResult | null;
  coords: Coords | null;
  addCoords: (coords: Coords) => void;
  fillFormDetails: (data: NominatimResult) => void;
  removeCoords: () => void;
  fetchCoords: () => Coords | null;
};
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      locationDetails: null,
      coords: { lon: 77.216721, lat: 28.6448 },
      addCoords: (coords) => {
        set(() => ({
          coords: {
            lat: coords.lat,
            lon: coords.lon,
          },
        }));
      },
      removeCoords: () =>
        set(() => ({
          coords: null,
        })),
      fetchCoords: () => get().coords,
      fillFormDetails: (data) => {
        console.log("form-details", data);
        set(() => ({
          locationDetails: data,
        }));
      },
    }),
    {
      name: "smritiLok",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
