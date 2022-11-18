import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGetProfileResponse } from "src/features/Profile/Profile.types";
import { instance } from "src/api/api";
import { RootState } from "src/redux/store";

export const fetchUserApi = createAsyncThunk(
  "user/fetchUser",
  async (userId: number, thunkAPI) => {
    try {
      const profile = await instance.get<IGetProfileResponse>(
        `profile/${userId}`
      );
      return profile.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export interface IUserState {
  userId: number | null;
  name: string;
  photos: { small: string | null; large: string | null };
  uniqueUrlName: string;
  isUserFetching: boolean;
}

const initialState: IUserState = {
  userId: null,
  name: "",
  photos: {
    small: null,
    large: null,
  },
  uniqueUrlName: "@Zanuda",
  isUserFetching: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserApi.pending, (state) => {
      state.isUserFetching = true;
    });
    builder.addCase(fetchUserApi.fulfilled, (state, { payload }) => {
      state.name = payload.fullName;
      state.photos = payload.photos;
      state.userId = payload.userId;
      state.isUserFetching = false;
    });
  },
});

export const userSelector = (state: RootState) => state.user;

export default profileSlice.reducer;
