import React from "react";
import classes from "./../TextField.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const Message: React.FC<{ message: string }> = ({ message }) => {
  return (
    <>
      <div className={classes.triangle} />
      <div className={classes.triangle_after} />
      <div className={classes.modal}>
        <SvgSelector id="exclamation-mark" />
        <span>{message}</span>
      </div>
    </>
  );
};

export default Message;
