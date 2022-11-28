import React from "react";
import NavigationLink from "src/features/Navigation/NavigationLink/NavigationLink";
import classes from "src/features/Navigation/Navigation.module.scss";

const MobileNavigation: React.FC = () => (
  <nav className={classes["navigation-mobile"]}>
    <ul>
      <NavigationLink to="/feed" svgId="feed" />
      <NavigationLink to="/friends" svgId="friends" />
      <NavigationLink to="/messenger" svgId="messenger" />
      <NavigationLink to="/music" svgId="audio" />
      <NavigationLink to="/navigation" svgId="burger" />
    </ul>
  </nav>
);

export default MobileNavigation;
