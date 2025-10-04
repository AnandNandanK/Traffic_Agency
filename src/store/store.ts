import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"
import agencyReducer from "../slices/agencySlice"
import campaignReducer from "../slices/campaignSlice"
import vendorReducer from "../slices/vendorSlice"

export const store = configureStore({
  
  reducer: {
    user:userReducer,
    agency:agencyReducer,
    campaign:campaignReducer,
    vendor:vendorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
