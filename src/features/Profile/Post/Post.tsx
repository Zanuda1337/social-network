import classes from "src/features/Profile/Post/Post.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import React from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import postPicture from "src/assets/images/post.png";

const Post: React.FC = () => (
  <div className={`${classes["post"]} block`}>
    <div className={classes.information}>
      <Avatar className={classes.avatar} />
      <div className={classes.name}>
        <p>Polina As Fuck</p>
        <p>25 minutes ago</p>
      </div>
    </div>
    <div className={classes.content}>
      <p>Ivan Pashkin is the best person ever!</p>
      <div className={classes.picture}>
        <img src={postPicture} alt="" />
      </div>
    </div>
    <div className={classes.tooltip}>
      <button>
        <SvgSelector id="like" />
        <p>2</p>
      </button>
      <button>
        <SvgSelector id="comment" />
        <p></p>
      </button>
      <button>
        <SvgSelector id="repost" />
        <p>3</p>
      </button>
    </div>
  </div>
);
export default Post;
