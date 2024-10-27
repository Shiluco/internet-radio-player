"use client";
import { create, StateCreator } from "zustand";
import {
  fetchStations as fetchStationsService,
  fetchStreamURL as fetchStreamURLService,
} from "../service/stationInfoService";
import { Station } from "../types/stations";

interface StationState {
  stations: Station[] | null;
  currentStation: Station | null;
  fetchStationsStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchStreamURLStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fetchStations: () => Promise<void>;
  fetchStreamURL: () => Promise<void>;
  setCurrentStation: (presetID: number) => void;
}

const useStationStore = create<StationState>((set) => ({
  stations: null,
  currentStation: null,
  fetchStationsStatus: "idle",
  fetchStreamURLStatus: "idle",
  error: null,

  fetchStations: async () => {
    set({ fetchStationsStatus: "loading", error: null });
    try {
      const stations = await loadStations();
      updateStationsState(set, stations);
    } catch (error) {
      set({
        fetchStationsStatus: "failed",
        error: (error as Error).message || "Failed to fetch stations",
      });
    }
  },

  fetchStreamURL: async () => {
    set({ fetchStreamURLStatus: "loading", error: null });
    try {
      const stations = useStationStore.getState().stations;
      if (!stations) throw new Error("No stations available");

      const updatedStations = await Promise.all(
        stations.map(async (station) => {
          const streamUrl = await fetchStreamURLService(station.shoutcastURL);
          return { ...station, metaURL: streamUrl };
        })
      );

      set({
        stations: updatedStations,
        fetchStreamURLStatus: "succeeded",
      });
    } catch (error) {
      set({
        fetchStreamURLStatus: "failed",
        error: (error as Error).message || "Failed to fetch stream URLs",
      });
    }
  },

  setCurrentStation: (presetID: number) => {
    set((state) => {
      const station =
        state.stations?.find((station) => station.presetID === presetID) ||
        null;
      return { currentStation: station };
    });
  },
}));

const loadStations = async (): Promise<Station[]> => {
  const fetchStationsResult = await fetchStationsService();
  if (
    Array.isArray(fetchStationsResult.stations) &&
    fetchStationsResult.stations.every(
      (station: Station) => typeof station === "object"
    )
  ) {
    return fetchStationsResult.stations;
  } else {
    throw new Error("Invalid station data format");
  }
};

// 状態を更新する関数
const updateStationsState = (
  set: Parameters<StateCreator<StationState>>[0],
  stations: Station[]
) => {
  console.log("stations:", stations);
  set({
    stations,
    fetchStationsStatus: "succeeded",
    error: null,
  });
};

export default useStationStore;
