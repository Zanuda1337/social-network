import classes from "src/features/Profile/Info/Info.module.scss";
import headerPicture from "src/assets/images/header.png";
import Avatar from "src/components/Avatar/Avatar";
import React from "react";
import clsx from "clsx";

const InfoSkeleton: React.FC = () => (
  <div className={`block`}>
    <div className={clsx(classes.header)}>
      <div className={"skeleton"} />
    </div>
    <div className={classes.info}>
      <Avatar src={null} className={clsx(classes.avatar, "skeleton")} />
      <p className={clsx("skeleton", classes["skeleton-subtext"])} />
    </div>
    <div className={classes.about}>
      <div>
        <p className={clsx("skeleton", classes["skeleton-text"])} />
        <p
          className={clsx(
            classes.online,
            "skeleton",
            classes["skeleton-subtext"]
          )}
        />
      </div>
      <div
        className={clsx(classes.status, "skeleton", classes["skeleton-status"])}
      />
    </div>
    <div className={classes.separator} />
    <div className={classes.footer}>
      <div className={classes.tabs}>
        <button className={clsx("skeleton", classes["skeleton-button"])} />
        <button className={clsx("skeleton", classes["skeleton-button"])} />
        <button className={clsx("skeleton", classes["skeleton-button"])} />
      </div>
      <button className={clsx(classes.more, "more")}>
        <div />
      </button>
    </div>
  </div>
);
export default InfoSkeleton;
