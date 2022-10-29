import classes from "./Message.module.scss";
import React from "react";
import clsx from "clsx";

type TMessageProps = {
  id: number;
  text: string;
  isSenderUser: boolean;
};

const Message: React.FC<TMessageProps> = ({ id, text, isSenderUser }) => {
  return (
    <button
      className={clsx(classes.message, {
        [classes["message-companion"]]: !isSenderUser,
      })}
    >
      <div className={classes.block}>
        <p>{text}</p>
      </div>
    </button>
  );
};

export default Message;
