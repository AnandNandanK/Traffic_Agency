import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"
import agencyReducer from "../slices/agencySlice"
import campaignReducer from "../slices/campaignSlice"

export const store = configureStore({
  
  reducer: {
    user:userReducer,
    agency:agencyReducer,
    campaign:campaignReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
