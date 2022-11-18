import React from "react";
import classes from "./Avatar.module.scss";
type TAvatarProps = {
  src: string | null;
  className?: string;
  style?: Record<string, string>;
};
const Avatar: React.FC<TAvatarProps> = ({ className, style, src }) => {
  return (
    <div className={`${classes.avatar} ${className}`} style={style}>
      {src && <img src={src} alt="avatar" />}
    </div>
  );
};

export default Avatar;
