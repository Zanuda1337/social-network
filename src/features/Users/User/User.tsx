import React from "react";
import classes from "./User.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { TFrontendUser } from "src/features/Users/Users.types";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

interface IUserProps extends TFrontendUser {
  followingInProgressList: number[];
  onFollowClick: (id: number) => void;
  onUnfollowClick: (id: number) => void;
}

const User: React.FC<IUserProps> = ({
  id,
  name,
  isFollowed,
  photos,
  followingInProgressList,
  onFollowClick,
  onUnfollowClick,
}) => {
  const inProgress = followingInProgressList.some((userId) => userId === id);

  return (
    <div className={classes.user}>
      <NavLink to={`/profile/${id}`}>
        <Avatar src={photos.large} className={classes.avatar} />
      </NavLink>
      <NavLink to={`/profile/${id}`}>
        <p className={classes.title}>{name}</p>
      </NavLink>
      {isFollowed ? (
        <button
          className={clsx(classes.button, classes.button_clicked)}
          disabled={inProgress}
          onClick={() => onUnfollowClick(id)}
        >
          {inProgress ? (
            <SvgSelector
              id="preloader"
              className={clsx("preloader", classes.preloader)}
            />
          ) : (
            "Unfollow"
          )}
        </button>
      ) : (
        <button
          className={classes.button}
          disabled={inProgress}
          onClick={() => onFollowClick(id)}
        >
          {inProgress ? (
            <SvgSelector
              id="preloader"
              className={clsx("preloader", classes.preloader)}
            />
          ) : (
            "Follow"
          )}
        </button>
      )}
    </div>
  );
};

export default User;
