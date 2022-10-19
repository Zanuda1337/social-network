import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "src/features/Profile/Profile.types";
import { AppThunk } from "src/redux/store";

export interface IProfileState {
  userId: number;
  userName: string;
  uniqueUrlName: string;
  status: string;
  postText: string;
  posts: IPost[];
}

const initialState: IProfileState = {
  userId: 1,
  userName: "Ivan Pashkin",
  uniqueUrlName: "@Zanuda1337",
  status:
    "So much depends upon a red wheel barrow glazed with rain water beside the white chickens",
  postText: "",
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
    createPost: (state, action: PayloadAction<IPost>) => {
      action.payload.id = state.posts[state.posts.length - 1].id + 1;
      state.posts.push(action.payload);
    },
    setPostText: (state, action: PayloadAction<string>) => {
      state.postText = action.payload;
    },
  },
});

export const { setStatus, setPostText } = profileSlice.actions;
const { createPost } = profileSlice.actions;

export const addPost =
  (post: IPost): AppThunk =>
  (dispatch) => {
    dispatch(createPost(post));
    dispatch(setPostText(""));
  };

export default profileSlice.reducer;
