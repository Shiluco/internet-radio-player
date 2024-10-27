import StationInfo from "./components/templates/stationInfo";
import StationController from "./components/templates/stationController";
import AudioController from "./components/templates/audioController";


export default function Home() {


  return (
    <>
      <div className="h-screen">
        <StationInfo />
        <StationController />
        <AudioController />
      </div>
    </>
  );
}
