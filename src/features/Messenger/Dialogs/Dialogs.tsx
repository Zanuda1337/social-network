import React, { useState } from "react";
import classes from "./Dialogs.module.scss";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import User from "src/features/Messenger/User/User";
import { TDialog } from "src/features/Messenger/Messenger.types";
import { useWindowSize } from "src/hooks/hooks";
import { useLocation } from "react-router-dom";

type TDialogsProps = {
  dialogs: TDialog[];
};

const Dialogs: React.FC<TDialogsProps> = ({ dialogs }) => {
  const screenSize = useWindowSize();
  const location = useLocation();
  const isDialogsLocation = location.pathname === "/messenger";
  const isScreenSmall = screenSize.x < 480;

  const [searchValue, setSearchValue] = useState<string>("");

  if (!isDialogsLocation && isScreenSmall) return <></>;

  return (
    <div className={classes.dialogs}>
      <div className={classes.header}>
        <button className={classes.options}>
          <div />
        </button>
        <div className={classes.search}>
          <SvgSelector id="search" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
      </div>
      <div className={classes.users}>
        {dialogs.map((dialog) => (
          <User
            key={dialog.id}
            id={dialog.id}
            username={dialog.userName}
            message={dialog.lastMessage}
          />
        ))}
      </div>
    </div>
  );
};
export default Dialogs;
