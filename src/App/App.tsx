import React, { useCallback, useEffect } from "react";
import "src/assets/css/reset.css";
import "src/assets/css/global.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { appSelector, initializeApp } from "src/App/App.slice";
import { authSelector } from "src/features/Auth/Auth.slice";
import Router from "src/features/Router/Router";

const App = () => {
  const app = useAppSelector(appSelector);
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const initialize = useCallback(() => dispatch(initializeApp()), [dispatch]);

  useEffect(() => {
    initialize();
  }, [dispatch]);

  if (!app.isInitialized)
    return (
      <div className="preloader preloader_app">
        <SvgSelector id="preloader" />
      </div>
    );
  return <Router auth={auth} />;
};

export default App;
