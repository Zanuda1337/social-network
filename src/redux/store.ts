import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "src/features/counter/counterSlice";
import profileReducer from "src/features/Profile/Profile.slice";
import messengerReducer from "src/features/Messenger/Messenger.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    messenger: messengerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
