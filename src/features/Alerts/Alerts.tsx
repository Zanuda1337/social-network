import React, { useCallback, useEffect } from "react";
import Alert from "src/components/Alert/Alert";
import classes from "./Alerts.module.scss";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import {
  addAlert,
  alertsSelector,
  removeAlert,
} from "src/features/Alerts/Alerts.slice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Alerts: React.FC = () => {
  const alerts = useAppSelector(alertsSelector);
  const dispatch = useAppDispatch();

  const handleTimeout = useCallback(
    (id: number) => dispatch(removeAlert(id)),
    [dispatch, alerts.length]
  );
  // useEffect(() => {
  //   const timeout = setTimeout(() => dispatch(removeAlert()), 6000);
  //   // return () => clearTimeout(timeout);
  // }, [alerts.length]);
  return (
    <div className={classes.wrapper}>
      <TransitionGroup>
        {alerts.map((alert) => (
          <CSSTransition
            key={alert.id}
            timeout={250}
            classNames={{ enter: classes.enter, exit: classes.exit }}
          >
            <Alert
              className={classes.alert}
              variant={alert.type}
              message={alert.message}
              timeout={4000}
              onTimeout={() => handleTimeout(alert.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Alerts;
