import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IAppState {
  isInitialized: boolean;
}

const initialState: IAppState = {
  isInitialized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const {} = appSlice.actions;

export default appSlice.reducer;
