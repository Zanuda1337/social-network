import React from "react";
import classes from "./SmallMessenger.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import { NavLink } from "react-router-dom";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const SmallMessenger: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="wrapper">
        <p className={classes.header}>Friends ( 354 Online )</p>
        <div className={classes.friends}>
          <div className={classes.friend}>
            <div className={classes.block}>
              <NavLink to="/profile">
                <Avatar />
              </NavLink>
              <div className={classes.text}>
                <p>Richard</p>
                <p>
                  <span>Me:</span> Hey
                </p>
              </div>
            </div>
            <button>
              <SvgSelector id="comment" />
            </button>
          </div>
          <div className={classes.friend}>
            <div className={classes.block}>
              <NavLink to="/profile">
                <Avatar />
              </NavLink>
              <div className={classes.text}>
                <p>Violet</p>
                <p>sup</p>
              </div>
            </div>
            <button>
              <SvgSelector id="comment" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallMessenger;
