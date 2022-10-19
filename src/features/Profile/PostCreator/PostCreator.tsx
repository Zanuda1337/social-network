import classes from "src/features/Profile/PostCreator/PostCreator.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import React, { useRef, useState } from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import clsx from "clsx";
import { IPost } from "src/features/Profile/Profile.types";
import { getCurrentGmtDate } from "src/utils/utils";

type TPostCreatorProps = {
  postText: string;
  onPostTextChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPublish: (post: IPost) => void;
};

const PostCreator: React.FC<TPostCreatorProps> = ({
  postText,
  onPostTextChange,
  onPublish,
}) => {
  const [isTextAreaActive, setIsTextAreaActive] = useState<boolean>(!!postText);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const onTextAreaFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsTextAreaActive(true);
  };
  const onTextAreaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (postText) return;
    setIsTextAreaActive(false);
    event.target.removeAttribute("style");
  };

  const handlePublish = () => {
    onPublish({
      id: 0,
      authorId: 1,
      authorName: "Ivan Pashkin",
      date: getCurrentGmtDate(),
      postText: postText,
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
    });
    setIsTextAreaActive(false);
  };

  return (
    <div className={`${classes["input-container"]} block`}>
      <Avatar className={classes.avatar} />
      <div className={classes.editor}>
        <div
          className={clsx(classes.input, {
            [classes["input-active"]]: isTextAreaActive,
          })}
        >
          <textarea
            ref={textArea}
            placeholder="What's on your mind?"
            value={postText}
            onChange={onPostTextChange}
            onFocus={onTextAreaFocus}
            onBlur={onTextAreaBlur}
          />
        </div>
        <div className={classes["buttons-wrapper"]}>
          <div className={classes.buttons}>
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
          {postText && (
            <button className={classes.publish} onClick={handlePublish}>
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostCreator;
