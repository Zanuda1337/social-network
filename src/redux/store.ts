import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "src/App/App.slice";
import counterReducer from "src/features/counter/counterSlice";
import profileReducer from "src/features/Profile/Profile.slice";
import messengerReducer from "src/features/Messenger/Messenger.slice";
import alertsReducer from "src/features/Alerts/Alerts.slice";
import usersReducer from "src/features/Users/Users.slice";
import authReducer from "src/features/Auth/Auth.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    counter: counterReducer,
    profile: profileReducer,
    messenger: messengerReducer,
    users: usersReducer,
    auth: authReducer,
    alerts: alertsReducer,
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
