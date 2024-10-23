import { createSlice } from "@reduxjs/toolkit";

interface mediaControlState {
  isPlaying: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: mediaControlState = {
  isPlaying: false,
  status: "idle",
  error: null,
};

export const mediaControlSlice = createSlice({
  name: "mediaControl",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setIsPlaying } = mediaControlSlice.actions;
export default mediaControlSlice.reducer;
