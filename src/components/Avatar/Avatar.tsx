import React from "react";
import classes from "./Avatar.module.scss";
type TAvatarProps = {
  className?: string;
  style?: Record<string, string>;
};
const Avatar: React.FC<TAvatarProps> = ({ className, style }) => {
  return <div className={`${classes.avatar} ${className}`} style={style}></div>;
};

export default Avatar;
