import React from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";

import styles from "./Timer.module.css";

const Timer = ({ time }) => {
  const navigate = useNavigate();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => navigate("/exam"),
    autoStart: true,
  });

  return (
    <div className={styles.time}>
      <h3>Time Left</h3>
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default React.memo(Timer);
