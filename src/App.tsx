import React, { useCallback, useEffect } from "react";
import "./App.scss";
import "src/assets/css/reset.css";
import "src/assets/css/global.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { fetchUserApi } from "src/redux/reducers/User.slice";
import { authMeApi, authSelector } from "src/features/Auth/Auth.slice";
import Router from "src/features/Router/Router";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const App = () => {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const setAuth = useCallback(() => dispatch(authMeApi()), [dispatch]);
  const setUser = useCallback(
    (id: number) => dispatch(fetchUserApi(id)),
    [dispatch]
  );

  useEffect(() => {
    setAuth();
    if (auth.userId) setUser(auth.userId);
  }, [auth.isLoggedIn]);

  if (auth.isFetching)
    return (
      <div className="preloader preloader_app">
        <SvgSelector id="preloader" />
      </div>
    );
  return <Router auth={auth} />;
};

export default App;
