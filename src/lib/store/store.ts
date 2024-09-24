import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./globalDataSlice";

export const store = configureStore({
	reducer: {
		globalData: globalDataReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
