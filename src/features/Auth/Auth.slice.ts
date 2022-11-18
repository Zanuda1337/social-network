import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "src/api/api";
import { IAuthMeResponse } from "src/features/Auth/Auth.types";
import { RootState } from "src/redux/store";

export const authMeApi = createAsyncThunk(
  "auth/authMe",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get<IAuthMeResponse>(`auth/me`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export interface IAuthState {
  userId: number | null;
  login: string | null;
  email: string | null;
  isLoggedIn: boolean;
  isFetching: boolean;
}

const initialState: IAuthState = {
  userId: null,
  login: null,
  email: null,
  isLoggedIn: false,
  isFetching: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authMeApi.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(authMeApi.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.userId = payload.data.id;
        state.login = payload.data.login;
        state.email = payload.data.email;
        state.isLoggedIn = true;
      }
      state.isFetching = false;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
