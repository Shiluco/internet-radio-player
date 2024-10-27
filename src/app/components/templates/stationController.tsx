"use client";

import useStationStore from "@/store/stationStore";

const AudioController = () => {
  const { stations, currentStation, setCurrentStation } = useStationStore();

  // 型を指定
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStation(Number(event.target.value)); // Numberに変換してセット
  };

  return (
    <div className="relative h-1/8 bg-gray-500 text-red ">
      <div className="w-11/12 mx-auto">
        <input
          className="w-full"
          type="range"
          id="slider"
          min={1}
          max={stations ? stations.length : 1}
          value={currentStation?.presetID ?? 1} // currentStationがundefinedの場合1を設定
          onChange={handleChange}
          aria-label="Slider for selecting a value"
        />
      </div>
    </div>
  );
};

export default AudioController;
