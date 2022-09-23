import React from "react";
import classes from "./Header.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
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
          <div className={classes["logo-image"]}></div>
          <p>❮</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
