import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginFields } from "src/features/Auth/Auth.types";
import { AppDispatch, RootState } from "src/redux/store";
import { IGetProfileResponse } from "src/api/profileApi/profileApi.types";
import profileApi from "src/api/profileApi/profileApi";
import authApi from "src/api/authApi/authApi";
import { TDefaultResponse } from "src/api/types";
import { ILoginResponse } from "src/api/authApi/authApi.types";

const fetchUser = createAsyncThunk(
  "profile/fetchUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await profileApi.getProfile(userId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authMe = createAsyncThunk(
  "auth/authMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authApi.me();
      if (data.resultCode !== 0) return rejectWithValue(data.messages.join());
      await dispatch(fetchUser(data.data.id));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password, rememberMe, captcha }: ILoginFields,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { data } = await authApi.login(
        email,
        password,
        rememberMe,
        captcha
      );
      await dispatch(resetCaptcha());
      if (data.resultCode !== 0) {
        data.resultCode === 10 && (await dispatch(getCaptcha()));
        return rejectWithValue(data.messages.join());
      }
      await dispatch(authMe());
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authApi.logout();
      if (data.resultCode !== 0) rejectWithValue("Server error");
      dispatch(authMe());
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const getCaptcha = createAsyncThunk(
  "auth/getCaptcha",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getCaptcha();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export interface IAuthState {
  userId: number | null;
  login: string | null;
  email: string | null;
  isLoggedIn: boolean;
  isFetching: boolean;
  isSubmitting: boolean;
  name: string | null;
  photos: { small: string | null; large: string | null };
  uniqueUrlName: string;
  captcha: string | null;
  isCaptchaRequired: boolean;
}

const initialState: IAuthState = {
  userId: null,
  login: null,
  email: null,
  isLoggedIn: false,
  isFetching: false,
  isSubmitting: false,
  name: "",
  photos: {
    small: null,
    large: null,
  },
  uniqueUrlName: "@Zanuda",
  captcha: null,
  isCaptchaRequired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCaptcha: (state) => {
      state.captcha = null;
      state.isCaptchaRequired = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMe.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(authMe.fulfilled, (state, { payload }) => {
      state.userId = payload.data.id;
      state.login = payload.data.login;
      state.email = payload.data.email;
      state.isLoggedIn = true;
      state.isFetching = false;
    });
    builder.addCase(authMe.rejected, (state, { payload }) => {
      Object.assign(state, initialState);
      console.error(payload);
    });

    builder.addCase(login.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      console.error(payload);
      state.isSubmitting = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      console.error(payload);
      state.isSubmitting = false;
    });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.name = payload.fullName;
      state.photos = payload.photos;
      state.userId = payload.userId;
    });

    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      console.error(payload);
    });

    builder.addCase(getCaptcha.fulfilled, (state, { payload }) => {
      state.captcha = payload.url;
      state.isCaptchaRequired = true;
    });
  },
});

const { resetCaptcha } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;
export const userIdSelector = (state: RootState) => state.auth.userId;

export default authSlice.reducer;
