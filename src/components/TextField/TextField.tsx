import React, { useState } from "react";
import classes from "./TextField.module.scss";
import clsx from "clsx";

type TTextFieldProps = {
  placeholder: string;
  type: "text" | "password" | "email";
  disabled?: boolean;
  error?: boolean;
  message?: string;
};

const TextField: React.FC<TTextFieldProps> = ({
  placeholder,
  type,
  disabled = false,
  error,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  return (
    <div
      className={clsx({
        [classes.input]: true,
        [classes["input_active"]]: isActive,
        [classes["input_error"]]: error,
      })}
    >
      <p>{placeholder}</p>
      <input
        type={type}
        disabled={disabled}
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
