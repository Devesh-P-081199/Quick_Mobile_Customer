import { FaMobileAlt, FaRupeeSign, FaCloud } from "react-icons/fa";
import styles from "./SellingPhoneIsSimple.module.css";
import phone from "../../../../assets/QuickSellNewIcons/BannerPhone.svg";
import bag from "../../../../assets/QuickSellNewIcons/BannerRupee.svg";
import cloud from "../../../../assets/QuickSellNewIcons/BannerCloud.svg";

const SellingPhoneIsSimple = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerWrapper}>
        <h2>
          Trusted by <span className={styles.highlight}>600k+</span> customers,
          <br /> India’s most transparent mobile selling platform
        </h2>

        <div className={styles.statsContainer}>
          <div className={styles.statBox}>
            <img src={phone} alt="phone" title="phone" />
            <span>1 lakh+ Device Sold</span>
          </div>
          <div className={styles.statBox}>
            <img src={bag} alt="bag" title="bag" />

            <span>78 Cr cash paid</span>
          </div>
          <div className={styles.statBox}>
            <img src={cloud} alt="star" title="star" />

            <span>8km Co2 Saved</span>
          </div>
        </div>

        <p className={styles.ewasteHelp}>
          Help us to reduce <span className={styles.ewaste}>e-waste</span>
        </p>
        <p className={styles.ewasteInfo}>
          1.5 Billion tons of e-waste generated every year in india.
        </p>
      </div>
    </div>
  );
};

export default SellingPhoneIsSimple;
