"use client";
import useStationStore from "@/store/stationStore";
import { useEffect } from "react";

const StationInfo = () => {
  const { fetchStations, stations, currentStation, setCurrentStation, status } =
    useStationStore();
  useEffect(() => {
    if (status === "idle" || status === "loading") {
      fetchStations();
    }
    if (status === "succeeded") {
      console.log("infopage", stations);
      if (stations && stations.length > 0) {
        setCurrentStation(stations[0]);
      } else {
        console.log("No stations found");
      }
    }
    console.log("running");
  }, [status]);

  return (
    <>
      <div className="h-screen">
        <div className="relative h-1/2 bg-gray-200 text-black">
          <p
            className={`absolute bottom-6 left-0 font-sfPro font-bold`}
            style={{ fontSize: "12rem", padding: 0, lineHeight: 1 }}
          >
            {currentStation?.presetID}
          </p>
          <p
            className={`absolute bottom-0 left-5 text-2xl font-sfPro  font-light`}
          >
            {currentStation?.stationName}
          </p>

          <p className="absolute bottom-1 right-6 text-sm text-gray-400 transform rotate-90 origin-bottom-right">
            {currentStation?.shoutcastURL}
          </p>
        </div>
      </div>
    </>
  );
};

export default StationInfo;
