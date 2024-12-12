import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlices";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    alert: alertReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
