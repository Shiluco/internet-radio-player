"use client";
import useStationStore from "@/store/stationStore";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material"; // or the appropriate library

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
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="h1">{currentStation?.presetID}</Typography>
          <Typography variant="h6">{currentStation?.stationName}</Typography>
        </Box>
        <Box sx={{ transform: "rotate(90deg)", alignSelf: "flex-end" }}>
          <Typography variant="body1">
            {currentStation?.shoutcastURL}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default StationInfo;
