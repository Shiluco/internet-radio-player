"use client";

import useMediaControlStore from "@/store/mediaControlStore";
import useStationStore from "@/store/stationStore";

const AudioController = () => {
  const { isPlaying, setIsPlaying } = useMediaControlStore();
  const { currentStation } = useStationStore();

  const handlePlayPause = () => {
    const audioElement = document.getElementById(
      "audio-player"
    ) as HTMLAudioElement;
    if (!audioElement) {
      console.error("Audio element not found.");
      return;
    }

    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative h-1/8 bg-gray-500">
      {currentStation?.metaURL ? (
        <>
          <audio id="audio-player" src={currentStation.metaURL + "/stream"}></audio>
          <button
            onClick={handlePlayPause}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <p>{currentStation.metaURL}</p>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default AudioController;
