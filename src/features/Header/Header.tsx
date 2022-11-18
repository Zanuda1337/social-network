import React from "react";
import classes from "./Header.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { NavLink } from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar";
import { useAppSelector } from "src/hooks/hooks";

const Header: React.FC = () => {
  const user = useAppSelector((state) => state.user);

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
        <button className={classes.profile}>
          <Avatar className={classes.avatar} src={user.photos.small} />
          <p>❮</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
