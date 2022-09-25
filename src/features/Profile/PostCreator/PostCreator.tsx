import classes from "src/features/Profile/PostCreator/PostCreator.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import React from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";

const PostCreator: React.FC = () => (
  <div className={`${classes["input-container"]} block`}>
    <Avatar className={classes.avatar} />
    <div className={classes.editor}>
      <div className={classes.input}>
        <textarea placeholder="What's on your mind?" />
      </div>
      <div className={classes.tooltip}>
        <button>
          <SvgSelector id="photo" />
          <p>Picture</p>
        </button>
        <button>
          <SvgSelector id="audio" />
          <p>Audio</p>
        </button>
        <button>
          <SvgSelector id="video" />
          <p>Video</p>
        </button>
      </div>
    </div>
  </div>
);
export default PostCreator;
