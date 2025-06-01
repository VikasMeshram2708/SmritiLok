import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Coords = {
  lat: number;
  lon: number;
};
type StoreState = {
  coords: Coords | null;
  addCoords: (coords: Coords) => void;
  removeCoords: () => void;
  fetchCoords: () => Coords | null;
};
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "smritiLok",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
