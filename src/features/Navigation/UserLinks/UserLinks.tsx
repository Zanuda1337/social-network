import React from "react";
import classes from "src/features/Navigation/Navigation.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar";

interface IUserLinksProps {
  userId: number | null;
  photo: string | null;
  name: string | null;
  uniqueUrlName: string | null;
}

const UserLinks: React.FC<IUserLinksProps> = ({
  userId,
  photo,
  name,
  uniqueUrlName,
}) => (
  <div className={classes.profile}>
    <NavLink to={`profile/${userId}`} className={classes.block}>
      <Avatar src={photo} />
      <div className={classes.text}>
        <p>{name}</p>
        <p>{uniqueUrlName}</p>
      </div>
    </NavLink>
    <div className={`${classes.block} ${classes.counters}`}>
      <NavLink to={`profile/${userId}`}>
        <p>5.5k</p>
        <p>Friends</p>
      </NavLink>
      <NavLink to={`profile/${userId}`}>
        <p>55k</p>
        <p>Followers</p>
      </NavLink>
      <NavLink to={`profile/${userId}`}>
        <p>112</p>
        <p>Posts</p>
      </NavLink>
    </div>
  </div>
);

export default UserLinks;
