"use client";
import { fetchStreamURL } from "@/service/stationInfoService";
import useStationStore from "@/store/stationStore";
import { stat } from "fs";
import { useEffect, useState } from "react";

const StationInfo = () => {

  const { fetchStations, stations, currentStation, setCurrentStation,fetchStationsStatus } =
    useStationStore();

  useEffect(() => {
    

    if (fetchStationsStatus === "idle" || fetchStationsStatus === "loading") {
      const fetchData = async () => {
        try {
          await fetchStations(); // fetchStationsがPromiseを返す非同期関数であることを確認
          console.log("staions:", stations);
        } catch (error) {
          console.error(error);
          // エラーハンドリングをここに追加
        }
      };
      fetchData();
    }
    if (fetchStationsStatus === "succeeded")
    {
      const fetchMetaURL = async () =>
      {
        if (stations) {
            // fetchStreamURLを各ステーションに対して非同期に実行し、その完了を待つ
            await Promise.all(
              stations.map((station) => fetchStreamURL(station.shoutcastURL))
            );
            setCurrentStation(stations[0].presetID);
        }
      }
      fetchMetaURL();
      console.log("infopage", stations);
      if (stations && stations.length > 0) {
        setCurrentStation(stations[0].presetID);
      } else {
        console.log("No stations found");
      }
    }
  }, [fetchStationsStatus]);



  const handleShow = () => {
    console.log(currentStation?.metaURL);
  };

  return (
    <>
      <div className="relative h-1/2 bg-gray-200 text-black">
        {fetchStationsStatus === "idle" || fetchStationsStatus === "loading" ? (
          <p
            className={`absolute bottom-6 left-0 text-7xl font-sfPro font-bold`}
          >
            Loading...
          </p>
        ) : (
          <p
            className={`absolute bottom-6 left-0 font-sfPro font-bold`}
            style={{ fontSize: "12rem", padding: 0, lineHeight: 1 }}
          >
            {"00." + (currentStation ? currentStation.presetID : "N/A")}
          </p>
        )}
        <button onClick={handleShow}>consoleに表示</button>

        <p
          className={`absolute bottom-0 left-5 text-2xl font-sfPro  font-light`}
        >
          {currentStation?.stationName}
        </p>

        <p className="absolute bottom-1 right-6 text-sm text-gray-400 transform rotate-90 origin-bottom-right">
          {currentStation?.shoutcastURL}
        </p>
      </div>
    </>
  );
};

export default StationInfo;
