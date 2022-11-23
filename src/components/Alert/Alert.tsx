import React, { useEffect } from "react";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import { TAlertVariants, variants } from "src/components/Alert/Alert.types";
import { getSvgId } from "src/components/Alert/Alert.utils";
import classes from "./Alert.module.scss";
import clsx from "clsx";

type TAlertProps = {
  variant: TAlertVariants;
  message: string;
  className?: string;
  timeout: number;
  onTimeout: (id: number) => void;
};

const Alert: React.FC<TAlertProps> = ({
  variant,
  message,
  className,
  timeout,
  onTimeout,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div
      className={clsx(classes.alert, className, {
        [classes.alert_warning]: variant === variants.warning,
        [classes.alert_error]: variant === variants.error,
        [classes.alert_success]: variant === variants.success,
        [classes.alert_info]: variant === variants.info,
      })}
    >
      <SvgSelector id={getSvgId(variant)} />
      <p>{message}</p>
    </div>
  );
};

export default Alert;
