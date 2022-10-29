import React from "react";
import classes from "./User.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type TUserProps = {
  id: number;
  username: string;
  message: string;
};

const User: React.FC<TUserProps> = ({ id, username, message }) => {
  return (
    <NavLink
      to={`${id}`}
      className={(link) =>
        clsx("user", classes.user, { [classes["user-active"]]: link.isActive })
      }
    >
      <Avatar />
      <div className={clsx("text", classes.text)}>
        <p className={clsx("title", classes.title)}>{username}</p>
        <p className={clsx("subtext", classes.subtext)}>{message}</p>
      </div>
    </NavLink>
  );
};

export default User;
