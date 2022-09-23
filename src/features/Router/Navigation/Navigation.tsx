import React from "react";
import classes from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const Navigation: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className={classes.profile}>
          <NavLink to="profile" className={classes.block}>
            <Avatar />
            <div className={classes.text}>
              <p>Polina As Fuck</p>
              <p>@pizdosovaya</p>
            </div>
          </NavLink>
          <div className={`${classes.block} ${classes.counters}`}>
            <NavLink to="/profile">
              <p>5.5k</p>
              <p>Friends</p>
            </NavLink>
            <NavLink to="/profile">
              <p>55k</p>
              <p>Followers</p>
            </NavLink>
            <NavLink to="/profile">
              <p>112</p>
              <p>Posts</p>
            </NavLink>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="friends"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="friends" />
                <p>Friends</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messenger"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="messenger" />
                <p>Messenger</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/communities"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="communities" />
                <p>Communities</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="music"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="audio" />
                <p>Music</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="videos"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="video" />
                <p>Videos</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="feed"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="feed" />
                <p>Feed</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="settings"
                className={(data) => (data.isActive ? classes.active : "")}
              >
                <SvgSelector id="settings" />
                <p>Settings</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
