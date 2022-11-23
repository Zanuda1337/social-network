import React from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import classes from "./Checkbox.module.scss";
import clsx from "clsx";

type TCheckboxProps = {
  value: boolean;
  className?: string;
  onChange: () => void;
};
const Checkbox: React.FC<TCheckboxProps> = ({ value, className, onChange }) => {
  return (
    <div className={clsx(className, classes.checkbox)} onClick={onChange}>
      <SvgSelector id={value ? "checkbox-checked" : "checkbox-unchecked"} />
    </div>
  );
};

export default Checkbox;
