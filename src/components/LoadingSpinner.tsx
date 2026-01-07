import React from "react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  size = "medium",
}) => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
