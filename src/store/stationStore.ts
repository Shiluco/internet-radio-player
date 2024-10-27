"use client";
import { create } from "zustand";
import {
  fetchStations as fetchStationsService,
  fetchStreamURL as fetchStreamURLService,
} from "../service/stationInfoService";
import { Station } from "../types/stations";

interface StationState {
  stations: Station[] | null;
  currentStation: Station | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fetchStations: () => Promise<void>;
  fetchStreamURL: (presetID: number) => Promise<void>;
  setCurrentStation: (presetID: number) => void;
}

const useStationStore = create<StationState>((set) => ({
  stations: null,
  currentStation: null,
  status: "idle",
  error: null,

  // fetchStationsの処理
  fetchStations: async () => {
    set({ status: "loading", error: null });
    try {
      const stations = await loadStations(); // データ取得関数を呼び出し
      updateStationsState(set, stations); // 状態更新関数を呼び出し
    } catch (error) {
      set({
        status: "failed",
        error: (error as Error).message || "Failed to fetch stations",
      });
    }
  },

  // fetchStreamURLの処理
  fetchStreamURL: async (presetID: number) => {
    set({ status: "loading", error: null });
    try {
      const station = useStationStore
        .getState()
        .stations?.find((station) => station.presetID === presetID);
      if (!station) throw new Error("Station not found");

      const streamUrl = await fetchStreamURLService(station.shoutcastURL);
      set((state) => ({
        stations:
          state.stations?.map((station) =>
            station.presetID === presetID
              ? { ...station, metaURL: streamUrl }
              : station
          ) || state.stations,
        status: "succeeded",
      }));
    } catch (error) {
      set({
        status: "failed",
        error: (error as Error).message || "Failed to fetch stream URL",
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

// データ取得ロジックのみ担当する関数
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
const updateStationsState = (set: any, stations: Station[]) =>
{
  console.log("stations:",stations);
  set({
    stations,
    status: "succeeded",
    error: null,
  });
};

export default useStationStore;
