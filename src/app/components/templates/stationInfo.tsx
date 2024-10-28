"use client";

import useStationStore from "@/store/stationStore";

import { useEffect } from "react";

const StationInfo = () => {
  const {
    fetchStations,
    stations,
    currentStation,
    setCurrentStation,
    fetchStationsStatus,
    fetchStreamURL,
  } = useStationStore();

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
    if (fetchStationsStatus === "succeeded") {
      const fetchMetaURL = async () => {
        if (stations) {
          // fetchStreamURLを各ステーションに対して非同期に実行し、その完了を待つ
          await fetchStreamURL();
          setCurrentStation(stations[0].presetID);
        }
      };
      fetchMetaURL();
      console.log("infopage", stations);
      if (stations && stations.length > 0) {
        setCurrentStation(stations[0].presetID);
      } else {
        console.log("No stations found");
      }
    }
  }, [fetchStationsStatus]);

  return (
    <>
      <div className="relative h-1/2 bg-gray-100 text-black">
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

        <p
          className="absolute bottom-0 left-5 text-2xl font-sfPro font-light truncate"
          style={{
            maxWidth: "calc(100% - 1rem)", // 右側の余白を確保
            whiteSpace: "nowrap", // 1行で表示
            overflow: "hidden", // 画面から飛び出た部分を隠す
            textOverflow: "ellipsis", // 飛び出た部分に「…」を表示
          }}
        >
          {currentStation?.stationName}
        </p>

        <p className="absolute bottom-1 right-6 text-sm text-gray-400 transform rotate-90 origin-bottom-right">
          {currentStation?.metaURL}
        </p>
      </div>
    </>
  );
};

export default StationInfo;
