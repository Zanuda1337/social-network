import React, { useState } from "react";
import classes from "./Select.module.scss";
import clsx from "clsx";
import { useClickAway } from "src/hooks/hooks";
import { TOption } from "src/components/Select/Select.types";

type TSelectProps = {
  value: string | number;
  direction?: "up" | "down";
  options: TOption[];
  onChange: (value: string) => void;
};

const Select: React.FC<TSelectProps> = ({
  value,
  direction = "down",
  options,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dropdown = useClickAway(() => setIsVisible(false));

  return (
    <div className={classes.wrapper}>
      <button
        className={classes.select}
        onClick={() => setIsVisible(!isVisible)}
      >
        <p className={classes.option}>{value}</p>
        <div>
          <p className={classes.arrow}>❮</p>
        </div>
      </button>
      <div
        className={clsx(classes.dropdown, {
          [classes.dropdown_visible]: isVisible,
        })}
        style={direction === "up" ? { bottom: ".75rem" } : { top: ".75rem" }}
        ref={dropdown}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onChange(option.value.toString());
              setIsVisible(false);
            }}
            className={classes.option}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
