import React from "react";
import { useAppSelector, useWindowSize } from "src/hooks/hooks";
import { authSelector } from "src/features/Auth/Auth.slice";
import classes from "./NavPage.module.scss";
import UserLinksSkeleton from "src/features/Navigation/UserLinks/UserLinksSkeleton";
import UserLinks from "src/features/Navigation/UserLinks/UserLinks";
import NavigationLink from "src/features/Navigation/NavigationLink/NavigationLink";

const NavPage: React.FC = () => {
  const user = useAppSelector(authSelector);
  const windowSize = useWindowSize();
  const isMobile = windowSize.x <= 480;

  if (!isMobile) return <></>;
  return (
    <div className={classes.navigation}>
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
          <NavigationLink
            to="communities"
            svgId="communities"
            label="Communities"
          />
          <NavigationLink to="/videos" svgId="video" label="Videos" />
          <NavigationLink to="/settings" svgId="settings" label="Settings" />
        </ul>
      </nav>
    </div>
  );
};

export default NavPage;
