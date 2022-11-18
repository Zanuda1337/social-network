import classes from "src/features/Profile/Info/Info.module.scss";
import headerPicture from "src/assets/images/header.png";
import Avatar from "src/components/Avatar/Avatar";
import React, { useState } from "react";
import { useClickAway } from "src/hooks/hooks";
import clsx from "clsx";
import { IProfileState } from "src/features/Profile/Profile.slice";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

type TInfoProps = {
  status: string | null;
  statusInput: string;
  uniqueUrlName: string;
  userName: string;
  isCurrentUserProfile: boolean;
  photos: { small: null | string; large: null | string };
  isStatusUpdating: boolean;
  isEdit: boolean;
  onStatusClick: () => void;
  onClickAwayStatus: () => void;
  onStatusChange: (status: string) => void;
  onStatusInputChange: (status: string) => void;
};

const Info: React.FC<TInfoProps> = ({
  status,
  statusInput,
  uniqueUrlName,
  isCurrentUserProfile,
  photos,
  userName,
  isStatusUpdating,
  isEdit,
  onClickAwayStatus,
  onStatusClick,
  onStatusChange,
  onStatusInputChange,
}) => {
  const editor: React.RefObject<HTMLDivElement> = useClickAway(() =>
    onClickAwayStatus()
  );

  const changeStatusButton = status ? (
    <button
      onClick={() => {
        onStatusClick();
        // setInput(status);
      }}
      className={classes.status}
    >
      {status}
    </button>
  ) : (
    <button
      onClick={() => {
        onStatusClick();
      }}
      className={clsx(classes.status, classes["set-status"])}
    >
      Set status
    </button>
  );

  const getStatusElement = () => {
    if (isCurrentUserProfile) return changeStatusButton;
    else return <div className={classes.status}>{status}</div>;
  };

  return (
    <div className={`block`}>
      <div className={classes.header}>
        <img src={headerPicture} alt="" />
      </div>
      <div className={classes.info}>
        <Avatar src={photos.large} className={classes.avatar} />
        <p>{uniqueUrlName}</p>
      </div>
      <div className={classes.about}>
        <div>
          <p>{userName}</p>
          <p className={classes.online}>Last online 22 minutes ago</p>
        </div>
        {isEdit && (
          <div className={classes.edit} ref={editor}>
            <input
              type="text"
              className={classes.status}
              value={statusInput}
              onChange={(event) =>
                onStatusInputChange(event.target.value.substring(0, 100))
              }
              autoFocus={true}
              onFocus={(event) => event.target.select()}
            />
            <button
              onClick={() => {
                onStatusChange(statusInput.trim());
              }}
              className={classes.button}
              disabled={isStatusUpdating}
            >
              {isStatusUpdating ? (
                <SvgSelector className={classes.preloader} id="preloader" />
              ) : (
                "save"
              )}
            </button>
          </div>
        )}
        {getStatusElement()}
      </div>
      <div className={classes.separator} />
      <div className={classes.footer}>
        <div className={classes.tabs}>
          <button>
            <p>68</p>
            <p>Photos</p>
          </button>
          <button>
            <p>568</p>
            <p>Followers</p>
          </button>
          <button>
            <p>5.5k</p>
            <p>Friends</p>
          </button>
        </div>
        <button className={clsx(classes.more, "more")}>
          <div />
        </button>
      </div>
    </div>
  );
};
export default Info;
