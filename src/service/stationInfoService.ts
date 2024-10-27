"use server";

export const fetchStreamURL = async (URL: string) => {
  const response = await fetch(URL);
  const playlistText = await response.text();
  const lines = playlistText
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"));
  console.log(lines);
  return lines.length > 0 ? lines[0] : "";
};

// サーバーサイドでの絶対URLを指定
export const fetchStations = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/data/stationList.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch station list");
  }
  const stations = await response.json();
  console.log(stations);
  return stations;
};
