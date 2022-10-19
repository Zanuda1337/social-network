import React, { useState } from "react";
import classes from "./TextField.module.scss";
import clsx from "clsx";

type TTextFieldProps = {
  placeholder: string;
  type: "text" | "password";
};

const TextField: React.FC<TTextFieldProps> = ({ placeholder, type }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <div
      className={clsx({
        [classes.input]: true,
        [classes["input_active"]]: isActive,
      })}
    >
      <p>{placeholder}</p>
      <input
        type={type}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(!!input.length)}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
    </div>
  );
};

export default TextField;
