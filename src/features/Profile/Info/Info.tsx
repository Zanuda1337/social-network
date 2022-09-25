import classes from "src/features/Profile/Info/Info.module.scss";
import headerPicture from "src/assets/images/header.png";
import Avatar from "src/components/Avatar/Avatar";
import React, { EventHandler, useEffect, useRef, useState } from "react";

const useClickAway = (handleClickAway: () => void) => {
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!node.current?.contains(target)) {
        handleClickAway();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return node;
};

const Info: React.FC = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Learning React and Redux");
  const [input, setInput] = useState<string>("");
  const editor: React.RefObject<HTMLDivElement> = useClickAway(() => {
    setEdit(false);
    console.log("click");
  });
  return (
    <div className={`block`}>
      <div className={classes.header}>
        <img src={headerPicture} alt="" />
      </div>
      <div className={classes.info}>
        <Avatar className={classes.avatar} />
        <p>@pizdosovaya</p>
      </div>
      <div className={classes.about}>
        <div>
          <p>Polina As Fuck</p>
          <p className={classes.online}>Last online 22 minutes ago</p>
        </div>
        {isEdit && (
          <div className={classes.edit} ref={editor}>
            <input
              type="text"
              className={classes.status}
              value={input}
              onChange={(event) =>
                setInput(event.target.value.substring(0, 50))
              }
              autoFocus={true}
              onFocus={(event) => event.target.select()}
            />
            <button
              onClick={() => {
                setEdit(false);
                setStatus(input.trim());
              }}
              className={classes.button}
            >
              save
            </button>
          </div>
        )}
        <button
          onClick={() => {
            setEdit(true);
            setInput(status);
          }}
          className={classes.status}
        >
          {status}
        </button>
      </div>
      <div className={classes.separator}></div>
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
          <div></div>
        </button>
      </div>
    </div>
  );
};
export default Info;
