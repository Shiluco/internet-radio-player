"use client";
import useMediaControlStore from "@/store/mediaControlStore";
import useStationStore from "@/store/stationStore";
import { useEffect, useState } from "react";

const AudioController = () => {
  const { isPlaying, setIsPlaying } = useMediaControlStore();
  const { currentStation } = useStationStore();
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById(
      "audio-player"
    ) as HTMLAudioElement;

    if (audioElement) {
      const handleCanPlay = () =>
      {
        
        setIsPlayable(true);
        audioElement.play();
        setIsPlaying(true);
      };
      const handleError = () => {
        setIsPlayable(false);
        alert("音声を再生できません。");
      };

      audioElement.addEventListener("canplaythrough", handleCanPlay);
      audioElement.addEventListener("error", handleError);

      return () => {
        audioElement.removeEventListener("canplaythrough", handleCanPlay);
        audioElement.removeEventListener("error", handleError);
      };
    }
  }, [currentStation]);

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
    <div className=" h-[8vh] bg-gray-950 text-white">
      {currentStation?.metaURL ? (
        <>
          <audio id="audio-player" src={currentStation.metaURL}></audio>
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handlePlayPause}
              className="text-white"
              style={{ padding: "10px 20px" }}
              disabled={!isPlayable}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default AudioController;
