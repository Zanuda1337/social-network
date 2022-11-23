import React, { useEffect, useState } from "react";
import classes from "../Auth.module.scss";
import TextField from "src/components/TextField/TextField";
import { NavLink } from "react-router-dom";
import Checkbox from "src/components/Checkbox/Checkbox";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginFields } from "src/features/Auth/Auth.types";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { authSelector, login } from "src/features/Auth/Auth.slice";
import { addAlert } from "src/features/Alerts/Alerts.slice";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import Modal from "src/components/Modal/Modal";

const Login: React.FC = () => {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const { handleSubmit, control, setValue, watch } = useForm<ILoginFields>({
    mode: "all",
    defaultValues: { email: "", password: "", rememberMe: false, captcha: "" },
  });
  const [isCaptchaVisible, setCaptchaVisible] = useState<boolean>(
    auth.isCaptchaRequired
  );
  useEffect(() => {
    setCaptchaVisible(auth.isCaptchaRequired);
  }, [auth.isCaptchaRequired]);
  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    setValue("captcha", "");
    setCaptchaVisible(!!auth.captcha);
    dispatch(
      login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        captcha: data.captcha,
      })
    )
      .unwrap()
      .catch((payload) =>
        dispatch(addAlert({ type: "error", message: payload }))
      );
  };
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              validate: {
                hasCharsAfterAt: (value) =>
                  /.+./.test(value) || "Enter the email part before @",
                hasAtChar: (value) =>
                  /.+@/.test(value) ||
                  "The email address must contain the @ symbol",
                hasDotChar: (value) =>
                  /.+@.+\..+/i.test(value) || "Enter the email part after @",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextField
                placeholder="Email"
                type="email"
                error={!!error}
                message={error?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                value={value}
                placeholder="Password"
                type="password"
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                message={error?.message}
              />
            )}
          />
          {auth.isCaptchaRequired && (
            <div className={classes.captcha}>
              <div className={classes.image}>
                <img src={auth.captcha ? auth.captcha : ""} alt="captcha" />
              </div>
              <Controller
                control={control}
                name="captcha"
                rules={{ required: "This field is required" }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value}
                    placeholder="Code"
                    type="text"
                    error={!!error}
                    message={error?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </div>
          )}
          <div className={classes["checkbox-row"]}>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { value, onChange } }) => (
                <Checkbox value={value} onChange={() => onChange(!value)} />
              )}
            />
            <p>Remember me</p>
          </div>
          <button className={classes.button} onClick={handleSubmit(onSubmit)}>
            {auth.isSubmitting ? <SvgSelector id={"preloader"} /> : "Sign in"}
          </button>
        </form>
        <span className={classes.separator}>or</span>
        <NavLink to="/auth/registration" className={classes.link}>
          sign up
        </NavLink>
      </div>
    </>
  );
};

export default Login;
