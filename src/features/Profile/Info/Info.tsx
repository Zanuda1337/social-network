import classes from "src/features/Profile/Info/Info.module.scss";
import headerPicture from "src/assets/images/header.png";
import Avatar from "src/components/Avatar/Avatar";
import React, { useState } from "react";
import { useClickAway } from "src/hooks/hooks";
import clsx from "clsx";
import { IProfileState } from "src/features/Profile/Profile.slice";

type TInfoProps = {
  profile: IProfileState;
  onStatusChange: (status: string) => void;
};

const Info: React.FC<TInfoProps> = ({ profile, onStatusChange }) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [input, setInput] = useState<string>(profile.status);
  const editor: React.RefObject<HTMLDivElement> = useClickAway(() =>
    setEdit(false)
  );

  return (
    <div className={`block`}>
      <div className={classes.header}>
        <img src={headerPicture} alt="" />
      </div>
      <div className={classes.info}>
        <Avatar className={classes.avatar} />
        <p>{profile.uniqueUrlName}</p>
      </div>
      <div className={classes.about}>
        <div>
          <p>{profile.userName}</p>
          <p className={classes.online}>Last online 22 minutes ago</p>
        </div>
        {isEdit && (
          <div className={classes.edit} ref={editor}>
            <input
              type="text"
              className={classes.status}
              value={input}
              onChange={(event) =>
                setInput(event.target.value.substring(0, 100))
              }
              autoFocus={true}
              onFocus={(event) => event.target.select()}
            />
            <button
              onClick={() => {
                setEdit(false);
                onStatusChange(input.trim());
              }}
              className={classes.button}
            >
              save
            </button>
          </div>
        )}
        {profile.status ? (
          <button
            onClick={() => {
              setEdit(true);
              setInput(profile.status);
            }}
            className={classes.status}
          >
            {profile.status}
          </button>
        ) : (
          <button
            onClick={() => {
              setEdit(true);
            }}
            className={clsx(classes.status, classes["set-status"])}
          >
            Set status
          </button>
        )}
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
        <button className={classes.more}>
          <div />
        </button>
      </div>
    </div>
  );
};
export default Info;
