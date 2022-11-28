import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFrontendUser } from "src/features/Users/Users.types";
import { convertBackToFrontUsers } from "src/features/Users/Users.utils";
import { AppThunk, RootState } from "src/redux/store";
import usersApi from "src/api/usersApi/usersApi";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await usersApi.getUsers(page, limit);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const followUser = createAsyncThunk(
  "users/followUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await usersApi.follow(userId);
      if (data.resultCode !== 0) return rejectWithValue(data.messages.join());
      return { ...data, userId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await usersApi.unfollow(userId);
      if (data.resultCode !== 0) return rejectWithValue(data.messages.join());
      return { ...data, userId };
    } catch (error: any) {
      return rejectWithValue(error.message);
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
    clearUsers: (state) => {
      state.usersList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isUsersFetching = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.usersList = [
        ...state.usersList,
        ...convertBackToFrontUsers(payload.items),
      ];
      state.totalCount = payload.totalCount;
      state.isUsersFetching = false;
    });
    builder.addCase(followUser.pending, (state, { payload }) => {});
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.usersList.map((user) =>
          user.id === payload.userId ? (user.isFollowed = true) : user
        );
      }
    });
    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
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
    await dispatch(followUser(id));
    dispatch(setFollowingInProgress({ inProgress: false, id }));
  };
export const unfollow =
  (id: number): AppThunk =>
  async (dispatch) => {
    await dispatch(setFollowingInProgress({ inProgress: true, id }));
    await dispatch(unfollowUser(id));
    dispatch(setFollowingInProgress({ inProgress: false, id }));
  };

export const { clearUsers } = usersSlice.actions;
const { setFollowingInProgress } = usersSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export default usersSlice.reducer;
