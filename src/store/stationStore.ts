import { create } from "zustand";
import {
  fetchStations as fetchStationsService,
  fetchStreamURL as fetchStreamURLService,
} from "../service/stationInfoService";
import { Station } from "../types/stations";

interface StationState {
  stations: Station[] | null;
  currentStation: Station | null;
  streamUrl: string | null; // streamUrl を状態に追加
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fetchStations: () => Promise<void>;
  fetchStreamURL: (station: Station) => Promise<void>;
  setCurrentStation: (station: Station) => void;
}

const useStationStore = create<StationState>((set) => ({
  stations: null,
  currentStation: null,
  streamUrl: null, // 初期値をnullに設定
  status: "idle",
  error: null,

  // fetchStationsの処理
  fetchStations: async () => {
    set({ status: "loading", error: null });
    try {
      const stations = await fetchStationsService();
      set({ stations, status: "succeeded" });
    } catch (error) {
      set({
        status: "failed",
        error: (error as Error).message || "Failed to fetch stations",
      });
    }
  },

  // fetchStreamURLの処理
  fetchStreamURL: async (station: Station) => {
    set({ status: "loading", error: null });
    try {
      const streamUrl = await fetchStreamURLService(station.shoutcastURL);
      set({ streamUrl, status: "succeeded" }); // streamUrl を保存
    } catch (error) {
      set({
        status: "failed",
        error: (error as Error).message || "Failed to fetch stream URL",
      });
    }
  },

  // currentStationの設定
  setCurrentStation: (station: Station) => {
    set({ currentStation: station });
  },
}));

export default useStationStore;
