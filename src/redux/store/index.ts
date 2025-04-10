import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "../slices/marketSlice";
import assetReducer from "../slices/assetSlice";

export const store = configureStore({
  reducer: {
    market: marketReducer,
    asset: assetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
