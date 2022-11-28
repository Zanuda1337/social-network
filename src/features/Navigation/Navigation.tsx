import React from "react";
import { useAppSelector, useWindowSize } from "src/hooks/hooks";
import { authSelector } from "src/features/Auth/Auth.slice";
import MobileNavigation from "src/features/Navigation/MobileNavigation/MobileNavigation";
import UserLinksSkeleton from "src/features/Navigation/UserLinks/UserLinksSkeleton";
import UserLinks from "src/features/Navigation/UserLinks/UserLinks";
import NavigationLink from "src/features/Navigation/NavigationLink/NavigationLink";

const Navigation: React.FC = () => {
  const user = useAppSelector(authSelector);
  const windowSize = useWindowSize();
  const isMobile = windowSize.x <= 480;

  if (isMobile) return <MobileNavigation />;

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
            <NavigationLink to="/friends" svgId="friends" label="Friends" />
            <NavigationLink
              to="/messenger"
              svgId="messenger"
              label="Messenger"
            />
            <NavigationLink
              to="communities"
              svgId="communities"
              label="Communities"
            />
            <NavigationLink to="/music" svgId="audio" label="Music" />
            <NavigationLink to="/videos" svgId="video" label="Videos" />
            <NavigationLink to="/feed" svgId="feed" label="Feed" />
            <NavigationLink to="/settings" svgId="settings" label="Settings" />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
