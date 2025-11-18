import mobileImage from "../../assets/QuickSellNewIcons/ty-mobile.png";
import styles from "./Download.module.css";

const Download = () => {
  return (
    <div className={styles.container}>
      <div className={styles.downloadContainer}>
        <div className={styles.downloadBox}>
          <div className={styles.imageWrapper}>
            <img
              src={mobileImage}
              alt="Mobile Preview"
              className={styles.mobileImage}
            />
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.heading}>Download Our App</h2>
            <p className={styles.description}>
              For exciting offer on, buy sell repair
            </p>
            <div className={styles.storeButtons}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                className={styles.storeImage}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Download_on_the_App_Store_Badge.svg/512px-Download_on_the_App_Store_Badge.svg.png"
                alt="Get it on Apple Store"
                className={styles.storeImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
