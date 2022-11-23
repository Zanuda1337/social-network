import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost, TProfile } from "src/features/Profile/Profile.types";
import { AppThunk, RootState } from "src/redux/store";
import { TDefaultResponse } from "src/api/types";
import profileApi from "src/api/profileApi/profileApi";
import { IGetProfileResponse } from "src/api/profileApi/profileApi.types";
import { addAlert } from "../Alerts/Alerts.slice";

export const fetchProfile = createAsyncThunk<
  IGetProfileResponse,
  number,
  { rejectValue: string }
>("profile/fetchProfile", async (userId: number, { rejectWithValue }) => {
  try {
    const { data } = await profileApi.getProfile(userId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
export const fetchProfileStatus = createAsyncThunk<
  string | null,
  number,
  {
    rejectValue: string;
  }
>("profile/fetchProfileStatus", async (userId, { rejectWithValue }) => {
  try {
    const { data } = await profileApi.getStatus(userId);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
export const putProfileStatus = createAsyncThunk<
  TDefaultResponse,
  string,
  { rejectValue: string; state: RootState }
>("profile/updateProfileStatus", async (status, { rejectWithValue }) => {
  try {
    const { data } = await profileApi.updateStatus(status);
    if (data.resultCode !== 0) return rejectWithValue(data.messages.join());
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export interface IProfileState extends TProfile {
  uniqueUrlName: string;
  status: string | null;
  statusInput: string;
  postText: string;
  posts: IPost[];
  isProfileFetching: boolean;
  isStatusUpdating: boolean;
  isStatusEditing: boolean;
}

const initialState: IProfileState = {
  userId: 1,
  fullName: "",
  aboutMe: null,
  contacts: {
    facebook: null,
    website: null,
    vk: null,
    twitter: null,
    instagram: null,
    youtube: null,
    github: null,
    mainLink: null,
  },
  lookingForAJob: true,
  lookingForAJobDescription: null,
  photos: {
    small: null,
    large: null,
  },
  uniqueUrlName: "@Zanuda",
  status: null,
  statusInput: "kekmek",
  postText: "",
  isProfileFetching: false,
  isStatusUpdating: false,
  isStatusEditing: false,
  posts: [
    {
      id: 1,
      authorId: 1,
      authorName: "Ivan Pashkin",
      date: 1636021591756,
      postText: "Hello world!",
      likesCount: 1,
      commentsCount: 0,
      repostsCount: 3,
    },
    {
      id: 2,
      authorId: 1,
      authorName: "Ivan Pashkin",
      date: 1664672891756,
      postText: "Hello world!",
      likesCount: 2,
      commentsCount: 5,
      repostsCount: 0,
    },
    {
      id: 3,
      authorId: 1,
      authorName: "Ivan Pashkin",
      date: 1666092991756,
      postText: "Hello world!",
      likesCount: 2,
      commentsCount: 5,
      repostsCount: 0,
    },
  ],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatusInput: (state, action: PayloadAction<string>) => {
      state.statusInput = action.payload;
    },
    setStatusEditing: (state, action: PayloadAction<boolean>) => {
      state.isStatusEditing = action.payload;
    },
    createPost: (state, action: PayloadAction<IPost>) => {
      action.payload.id = state.posts[state.posts.length - 1].id + 1;
      state.posts.push(action.payload);
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.isProfileFetching = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      Object.assign(state, payload);
      state.isProfileFetching = false;
    });
    builder.addCase(fetchProfile.rejected, (state, { payload }) => {
      console.error(payload);
      state.isProfileFetching = false;
    });

    builder.addCase(fetchProfileStatus.fulfilled, (state, { payload }) => {
      state.status = payload;
    });
    builder.addCase(fetchProfileStatus.rejected, (state, { payload }) => {
      console.error(payload);
    });

    builder.addCase(putProfileStatus.pending, (state) => {
      state.isStatusUpdating = true;
    });
    builder.addCase(putProfileStatus.fulfilled, (state, { payload }) => {
      state.status = state.statusInput;
      state.isStatusUpdating = false;
      state.isStatusEditing = false;
    });
    builder.addCase(putProfileStatus.rejected, (state, { payload }) => {
      console.error(payload);
      state.isStatusUpdating = false;
    });
  },
});

export const { setStatusInput, setPostText, setStatusEditing } =
  profileSlice.actions;
const { createPost } = profileSlice.actions;

export const addPost =
  (post: IPost): AppThunk =>
  (dispatch) => {
    dispatch(createPost(post));
    dispatch(setPostText(""));
  };

export const getProfileData =
  (userId: number): AppThunk =>
  async (dispatch) => {
    await dispatch(fetchProfile(userId));
    await dispatch(fetchProfileStatus(userId));
  };
export const updateProfileStatus =
  (): AppThunk => async (dispatch, getState) => {
    await dispatch(putProfileStatus(getState().profile.statusInput))
      .unwrap()
      .catch((payload) =>
        dispatch(addAlert({ type: "error", message: payload }))
      );
  };

export const profileSelector = (state: RootState) => state.profile;

export default profileSlice.reducer;
