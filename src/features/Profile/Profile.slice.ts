import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGetProfileResponse,
  IPost,
  TProfile,
} from "src/features/Profile/Profile.types";
import { AppThunk } from "src/redux/store";
import { instance } from "src/api/api";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId: number, thunkAPI) => {
    try {
      const { data } = await instance.get<IGetProfileResponse>(
        `profile/${userId}`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchProfileStatus = createAsyncThunk(
  "profile/fetchProfileStatus",
  async (userId: number, thunkAPI) => {
    try {
      const { data } = await instance.get<string | null>(
        `profile/status/${userId}`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const putProfileStatus = createAsyncThunk(
  "profile/updateProfileStatus",
  async (status: string, thunkAPI) => {
    try {
      const { data } = await instance.put<{
        resultCode: number;
        messages: string[] | null;
        data: [];
      }>(`profile/status`, { status });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

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
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
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
    builder.addCase(fetchProfileStatus.fulfilled, (state, { payload }) => {
      state.status = payload;
    });
    builder.addCase(putProfileStatus.pending, (state) => {
      state.isStatusUpdating = true;
    });
    builder.addCase(putProfileStatus.fulfilled, (state, { payload }) => {
      if (payload.resultCode === 0) {
        state.status = state.statusInput;
      }
      state.isStatusUpdating = false;
    });
  },
});

export const { setStatus, setStatusInput, setPostText, setStatusEditing } =
  profileSlice.actions;
const { createPost } = profileSlice.actions;

export const addPost =
  (post: IPost): AppThunk =>
  (dispatch) => {
    dispatch(createPost(post));
    dispatch(setPostText(""));
  };
export const updateProfileStatus =
  (): AppThunk => async (dispatch, getState) => {
    await dispatch(putProfileStatus(getState().profile.statusInput));
    dispatch(setStatusEditing(false));
  };

export default profileSlice.reducer;
