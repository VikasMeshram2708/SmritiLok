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
};
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      coords: { lon: 77.216721, lat: 28.6448 },
      addCoords: (coords) => {
        // TODO: logic to save the lat && lng
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
    }),
    {
      name: "smritiLok",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
