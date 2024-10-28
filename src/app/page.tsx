import StationInfo from "./components/templates/stationInfo";
import StationController from "./components/templates/stationController";
import AudioVisualizer from "./components/templates/audioVisualizer";
import AudioController from "./components/templates/audioController";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <StationInfo />
        <div className="h-1/2">
          <StationController />
          <AudioVisualizer />
          <AudioController />
        </div>
      </div>
    </>
  );
}
