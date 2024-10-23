import { create } from "zustand";

interface MediaControlState {
  isPlaying: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  setIsPlaying: (isPlaying: boolean) => void;
}

const useMediaControlStore = create<MediaControlState>((set) => ({
  isPlaying: false,
  status: "idle",
  error: null,
  setIsPlaying: (isPlaying: boolean) =>
    set((state) => ({ ...state, isPlaying })),
}));

export default useMediaControlStore;
