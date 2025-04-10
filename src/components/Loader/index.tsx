import React from "react";
import styles from "./index.module.css";

interface LoaderProps {
  message?: string;
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Loading...",
  fullPage = false,
}) => {
  return (
    <div className={`${styles.loader} ${fullPage ? styles.fullPage : ""}`}>
      <div className={styles.spinner}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;
