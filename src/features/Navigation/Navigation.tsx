import React from "react";
import classes from "./Navigation.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "src/hooks/hooks";
import UserLinks from "src/features/Navigation/UserLinks/UserLinks";
import UserLinksSkeleton from "src/features/Navigation/UserLinks/UserLinksSkeleton";
import { authSelector } from "src/features/Auth/Auth.slice";

const Navigation: React.FC = () => {
  const user = useAppSelector(authSelector);

  return (
    <div className="sidebar">
      <div className="wrapper">
        {user.isFetching ? (
          <UserLinksSkeleton />
        ) : (
          <UserLinks
            userId={user.userId}
            photo={user.photos.small}
            uniqueUrlName={user.uniqueUrlName}
            name={user.name}
          />
        )}
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
