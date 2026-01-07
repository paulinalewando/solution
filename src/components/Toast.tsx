import React from "react";
import { Notification, NotificationType } from "../types";
import styles from "./Toast.module.scss";

interface ToastProps {
  notification: Notification;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const { type, message } = notification;

  const iconMap = {
    [NotificationType.SUCCESS]: "✓",
    [NotificationType.ERROR]: "✕",
    [NotificationType.INFO]: "ℹ",
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}>{iconMap[type]}</span>
      <span className={styles.message}>{message}</span>
      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};
