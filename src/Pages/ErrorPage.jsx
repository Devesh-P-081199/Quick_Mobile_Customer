import React from "react";
import styles from "./ErrorPage.module.css";
import illustration from "../assets/QuickSellNewIcons/illustration.png";

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      {/* Left Side Illustration */}
      <div className={styles.imageSection}>
        <div className={styles.illustration}>
          <img src={illustration} alt="error" title="error" />
        </div>
      </div>

      {/* Right Side Text */}
      <div className={styles.textSection}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>OOOps! Page Not Found</h2>
        <p className={styles.subtitle}>
          This page doesn’t exist or was removed! We suggest you go back to
          home.
        </p>
        <a href="/" className={styles.backButton}>
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
