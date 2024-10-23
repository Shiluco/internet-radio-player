import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchStations as fetchStationsService,
  fetchStreamURL as fetchStreamURLService,
} from "../service/stationInfoService";
import { Station } from "../types/stations";

interface stationState {
  stations: Station[] | null;
  currentStation: Station | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: stationState = {
  stations: null,
  currentStation: null,
  status: "idle",
  error: null,
};

export const fetchStations = createAsyncThunk<Station[]>(
  "stations/fetchStations",
  async () => {
    const stations = await fetchStationsService();
    return stations;
  }
);

export const fetchStreamURL = createAsyncThunk(
  "stations/fetchStreamURL",
  async (station: Station) => {
    const streamUrl = await fetchStreamURLService(station.shoutcastURL);
    return streamUrl;
  }
);

// Redux sliceの作成
const stationsSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setCurrentStation: (state, action) => {
      state.currentStation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchStationsの処理
      .addCase(fetchStations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.stations = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stations";
      })
      // fetchStreamURLの処理
      .addCase(fetchStations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.stations = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch stations";
      });
  },
});
export const { setCurrentStation } = stationsSlice.actions;
export default stationsSlice.reducer;
