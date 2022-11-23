import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAlert, TAlertTypes } from "src/features/Alerts/Alerts.types";
import { RootState } from "src/redux/store";

export interface IAlertsState {
  list: TAlert[];
}

const initialState: IAlertsState = {
  list: [],
};

export const alertsSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addAlert: (
      state,
      action: PayloadAction<{ type: TAlertTypes; message: string }>
    ) => {
      const length = state.list.length;
      state.list.push({
        id: length ? state.list[length - 1].id + 1 : 1,
        ...action.payload,
      });
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { addAlert, removeAlert } = alertsSlice.actions;

export const alertsSelector = (state: RootState) => state.alerts.list;

export default alertsSlice.reducer;
