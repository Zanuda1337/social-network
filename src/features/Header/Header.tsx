import React, { useCallback } from "react";
import classes from "./Header.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { NavLink } from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { authSelector, logout } from "src/features/Auth/Auth.slice";

const Header: React.FC = () => {
  const user = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <header>
      <NavLink to="/feed" className={`sidebar ${classes["sidebar-header"]}`}>
        <div className={classes["logo-image"]}></div>
        <p className={classes["logo-title"]}>chebur.net</p>
      </NavLink>
      <div className={`container ${classes["header-container"]}`}>
        <p>Profile</p>
        <div className={classes.search}>
          <SvgSelector id="search" />
          <input
            type="text"
            placeholder="Find friends, communities and more here"
          />
        </div>
      </div>
      <div className={`sidebar ${classes["sidebar-header"]}`}>
        <div className={classes.notifications}>
          <button>
            <SvgSelector id="comment" />
          </button>
          <button>
            <SvgSelector id="bell" />
          </button>
        </div>
        <button className={classes.profile} onClick={handleLogout}>
          <Avatar className={classes.avatar} src={user.photos.small} />
          <p>❮</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
