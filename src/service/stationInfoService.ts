export const fetchStreamURL = async (URL:string) => {
  const response = await fetch(
    URL
  );
  const playlistText = await response.text();
  const lines = playlistText
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"));
  console.log(lines);
  return lines.length > 0 ? lines[0] : "";
};

export const fetchStations = async () => { 
  const response = await fetch("/data/stationList.json");
  if (!response.ok) {
    throw new Error("Failed to fetch station list");
  }
  const stations = await response.json();
  return stations;
}
