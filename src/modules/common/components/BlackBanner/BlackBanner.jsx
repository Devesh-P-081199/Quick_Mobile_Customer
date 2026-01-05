import styles from "./BlackBanner.module.css";

const BlackBanner = () => {
  return (
    <div className={styles.blackBanner}>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          India's most transparent mobile selling platform
        </p>
      </div>
    </div>
  );
};

export default BlackBanner;
