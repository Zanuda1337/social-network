import React from "react";
import classes from "../Auth.module.scss";
import TextField from "src/components/TextField/TextField";
import { NavLink } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <>
      <div className={classes.title}>
        <h1>Welcome back</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.phrase}>
          <h2>Please enter your details</h2>
          <a href="#">Forget password?</a>
        </div>
        <TextField placeholder="Username" type="text" />
        <TextField placeholder="Password" type="password" />
        <button className={classes.button}>Sign in</button>
        <p className={classes.separator}>or</p>
        <NavLink to="/auth/registration" className={classes.link}>
          sign up
        </NavLink>
      </div>
    </>
  );
};

export default Login;
