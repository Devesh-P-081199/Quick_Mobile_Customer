import { useState, useEffect } from "react";
import styles from "./ErrorPage.module.css";

const NotFoundPage = () => {
  const [illustration, setIllustration] = useState(null);

  useEffect(() => {
    const loadIllustration = async () => {
      const randomIndex = Math.floor(Math.random() * 5) + 1;
      try {
        /* @vite-ignore */
        const image = await import(
          `../../../../assets/QuickSellNewIcons/notfound/404Page0${randomIndex}.png`
        );
        setIllustration(image.default);
      } catch (error) {
        console.error("Failed to load illustration:", error);
      }
    };

    loadIllustration();
  }, []);

  return (
    <div className={styles.errorPage}>
      {/* Left Side Illustration */}
      <div className={styles.imageSection}>
        <div className={styles.illustration}>
          {illustration && (
            <img src={illustration} alt="not-found" title="not-found" />
          )}
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
        <button
          onClick={() => (window.location.href = "/")}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
