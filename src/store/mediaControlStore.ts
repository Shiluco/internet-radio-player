import { create } from "zustand";

interface MediaControlState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const useMediaControlStore = create<MediaControlState>((set) => ({
  //状態
  isPlaying: false,
  //関数
  setIsPlaying: (isPlaying: boolean) =>
    set((state) => ({ ...state, isPlaying })),
}));

export default useMediaControlStore;
