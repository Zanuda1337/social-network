import classes from "src/features/Users/User/User.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import React from "react";
import clsx from "clsx";

const UsersSkeleton = () => {
  const users = [];
  for (let i = 0; i < 30; i++)
    users.push(
      <div key={i} className={clsx(classes.user, classes.skeleton)}>
        <Avatar src={null} className={clsx(classes.avatar, "skeleton")} />
        <p className={clsx(classes.title, "skeleton")} />
        <button className={clsx(classes.button, "skeleton")} />
      </div>
    );
  return <>{users}</>;
};

export default UsersSkeleton;
