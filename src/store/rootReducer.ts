import { combineReducers } from "@reduxjs/toolkit";
import stationSlice from "./stationSlice";
import mediaControlSlice from "./mediaControlSlice";

// すべてのスライスを1つのrootReducerに結合
const rootReducer = combineReducers({
  station: stationSlice,
  mediaControl: mediaControlSlice,
});

export default rootReducer;
