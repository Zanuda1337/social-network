import React, { ChangeEvent, useState } from "react";
import classes from "./TextField.module.scss";
import clsx from "clsx";
import Message from "src/components/TextField/Message/Message";

type TTextFieldProps = {
  value?: string;
  placeholder: string;
  type: "text" | "password" | "email";
  disabled?: boolean;
  error?: boolean;
  message?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

const TextField: React.FC<TTextFieldProps> = ({
  value = "",
  placeholder,
  type,
  disabled = false,
  error = false,
  message,
  onChange,
  onBlur,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
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
        value={value}
        type={type}
        disabled={disabled}
        onFocus={() => setIsActive(true)}
        onBlur={(event) => {
          setIsActive(!!value.length);
          onBlur && onBlur();
        }}
        onChange={onChange}
      />
      {message && <Message message={message} />}
    </div>
  );
};

export default React.memo(TextField);
