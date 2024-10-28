"use client";

import useMediaControlStore from "@/store/mediaControlStore";
import useStationStore from "@/store/stationStore";

const AudioController = () => {
  const { stations, currentStation, setCurrentStation } = useStationStore();
  const { setIsPlaying } = useMediaControlStore();

  // 型を指定
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false); // 再生中の場合は停止
    setCurrentStation(Number(event.target.value)); // Numberに変換してセット
  };

  return (
    <div className="h-[2vh] bg-gray-100 ">
      <div className="w-[100vw] mx-auto">
        <input
          className="w-full appearance-none h-1 bg-black rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-900"
          type="range"
          id="slider"
          min={1}
          max={stations ? stations.length : 1}
          value={currentStation?.presetID ?? 1}
          onChange={handleChange}
          aria-label="Slider for selecting a value"
        />
      </div>
    </div>
  );
};

<style jsx>{`
  #slider::-webkit-slider-thumb {
    appearance: none;
    height: 16px; /* サムの高さ */
    width: 16px; /* サムの幅 */
    background-color: orange; /* サムの色 */
    border-radius: 50%; /* 丸い形にする */
    cursor: pointer;
  }

  #slider::-moz-range-thumb {
    height: 16px;
    width: 16px;
    background-color: orange;
    border-radius: 50%;
    cursor: pointer;
  }
`}</style>;

export default AudioController;
