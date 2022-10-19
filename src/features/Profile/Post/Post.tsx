import classes from "src/features/Profile/Post/Post.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import React, { useEffect, useState } from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { IPost } from "src/features/Profile/Profile.types";
import {
  formatDate,
  getLocalDate,
  isHourPassed,
  isMinutePassed,
} from "src/utils/utils";

type TPostProps = {
  post: IPost;
};

const Post: React.FC<TPostProps> = ({ post }) => {
  const [timerInterval, setTimerInterval] = useState<number>(5 * 1000);
  const [isTimerOn, setIsTimerOn] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    setTimerInterval(isMinutePassed(post.date) ? 60 * 1000 : 5 * 1000);
    setIsTimerOn(!isHourPassed(post.date));
    if (isTimerOn) {
      interval = setTimeout(() => {
        setTimer((prevState) => prevState + timerInterval);
      }, timerInterval);
    }

    return () => (interval ? clearTimeout(interval) : undefined);
  }, [timer]);

  return (
    <div className={`${classes["post"]} block`}>
      <div className={classes.information}>
        <Avatar className={classes.avatar} />
        <div className={classes.name}>
          <p>{post.authorName}</p>
          <p>{formatDate(getLocalDate(post.date))}</p>
        </div>
      </div>
      <div className={classes.content}>
        <p>{post.postText}</p>
      </div>
      <div className={classes.buttons}>
        <button>
          <SvgSelector id="like" />
          <p>{post.likesCount ? post.likesCount : null}</p>
        </button>
        <button>
          <SvgSelector id="comment" />
          <p>{post.commentsCount ? post.commentsCount : null}</p>
        </button>
        <button>
          <SvgSelector id="repost" />
          <p>{post.repostsCount ? post.repostsCount : null}</p>
        </button>
      </div>
    </div>
  );
};
export default Post;
