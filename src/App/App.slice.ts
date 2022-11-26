import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "src/redux/store";
import { authMe } from "src/features/Auth/Auth.slice";

export interface IAppState {
  isInitialized: boolean;
}

const initialState: IAppState = {
  isInitialized: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {},
});

const { setInitialized } = appSlice.actions;

export const initializeApp = (): AppThunk => async (dispatch) => {
  await dispatch(authMe());
  dispatch(setInitialized());
};

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
