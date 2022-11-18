import React from "react";
import classes from "src/features/Navigation/Navigation.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import clsx from "clsx";

const UserLinksSkeleton: React.FC = () => (
  <div className={clsx(classes.profile, "skeleton", classes.skeleton)}>
    <div className={classes.block} />
  </div>
);

export default UserLinksSkeleton;
