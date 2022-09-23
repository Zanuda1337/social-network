import React from "react";
import classes from "../Auth.module.scss";
import TextField from "src/components/TextField/TextField";
import { NavLink } from "react-router-dom";

const Registration: React.FC = () => {
  return (
    <>
      <div className={classes.title}>
        <h1>Create account</h1>
      </div>
      <div className={classes.body}>
        <TextField placeholder="Username" type="text" />
        <TextField placeholder="Password" type="password" />
        <TextField placeholder="Confirm password" type="password" />
        <button className={classes.button}>Sign up</button>
        <p className={classes.separator}>or</p>
        <NavLink to="/auth/login" className={classes.link}>
          sign in
        </NavLink>
      </div>
    </>
  );
};

export default Registration;
