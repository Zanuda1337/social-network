import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TFrontendUser,
  TGetUsersResponse,
} from "src/features/Users/Users.types";
import { instance } from "src/api/api";
import { convertBackToFrontUsers } from "src/features/Users/Users.utils";
import { TResponse } from "src/api/types";
import { AppThunk } from "src/redux/store";

export const fetchUsersApi = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const users = await instance.get<TGetUsersResponse>(
        `users?page=${page}&count=${limit}`
      );
      return users.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const followApi = createAsyncThunk(
  "users/follow",
  async (userId: number, thunkAPI) => {
    try {
      const { data } = await instance.post<TResponse>(`follow/${userId}`);
      return { ...data, userId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const unfollowApi = createAsyncThunk(
  "users/unfollow",
  async (userId: number, thunkAPI) => {
    try {
      const { data } = await instance.delete<TResponse>(`follow/${userId}`);
      return { ...data, userId };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export interface IUsersState {
  usersList: TFrontendUser[];
  totalCount: number;
  isUsersFetching: boolean;
  followingInProgressList: number[];
}
const initialState: IUsersState = {
  usersList: [],
  totalCount: 0,
  isUsersFetching: false,
  followingInProgressList: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFollowingInProgress: (
      state,
      action: PayloadAction<{ inProgress: boolean; id: number }>
    ) => {
      action.payload.inProgress
        ? state.followingInProgressList.push(action.payload.id)
        : (state.followingInProgressList = state.followingInProgressList.filter(
            (id) => id != action.payload.id
          ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersApi.pending, (state) => {
      state.isUsersFetching = true;
    });
    builder.addCase(fetchUsersApi.fulfilled, (state, { payload }) => {
      if (!payload) return;
      state.usersList = convertBackToFrontUsers(payload.items);
      state.totalCount = payload.totalCount;
      state.isUsersFetching = false;
    });
    builder.addCase(followApi.pending, (state, { payload }) => {});
    builder.addCase(followApi.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.usersList.map((user) =>
          user.id === payload.userId ? (user.isFollowed = true) : user
        );
      }
    });
    builder.addCase(unfollowApi.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.usersList.map((user) =>
          user.id === payload.userId ? (user.isFollowed = false) : user
        );
      }
    });
  },
});

export const follow =
  (id: number): AppThunk =>
  async (dispatch) => {
    await dispatch(setFollowingInProgress({ inProgress: true, id }));
    await dispatch(followApi(id));
    dispatch(setFollowingInProgress({ inProgress: false, id }));
  };
export const unfollow =
  (id: number): AppThunk =>
  async (dispatch) => {
    await dispatch(setFollowingInProgress({ inProgress: true, id }));
    await dispatch(unfollowApi(id));
    dispatch(setFollowingInProgress({ inProgress: false, id }));
  };

const { setFollowingInProgress } = usersSlice.actions;

export default usersSlice.reducer;
