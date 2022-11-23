import React, { ReactNode } from "react";
import classes from "./Modal.module.scss";

type TModalProps = {
  children: ReactNode;
  open: boolean;
};

const Modal: React.FC<TModalProps> = ({ children, open }) => {
  return (
    <div className={classes.wrapper}>
      {open && <div className={classes.children}>{children}</div>}
    </div>
  );
};

export default Modal;
