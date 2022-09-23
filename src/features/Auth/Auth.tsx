import React from "react";
import { Route, Routes } from "react-router-dom";
import classes from "./Auth.module.scss";
import Login from "src/features/Auth/Login/Login";
import welcomeImage from "src/assets/images/welcome.png";
import Registration from "src/features/Auth/Registration/Registration";

const Auth: React.FC = () => {
  return (
    <div className={classes.auth}>
      <div className={classes.container}>
        <div className={classes["picture-container"]}>
          <img src={welcomeImage} alt="" />
        </div>
        <div className={classes.wrapper}>
          <div className={classes.form}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
