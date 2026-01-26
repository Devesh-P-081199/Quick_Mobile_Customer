import styles from "./SellingPhoneIsSimple.module.css";
import phone from "../../../../assets/QuickSellNewIcons/bannerimages/device_sold.png";
import bag from "../../../../assets/QuickSellNewIcons/bannerimages/cash_paid.png";
import cloud from "../../../../assets/QuickSellNewIcons/bannerimages/co2_saved.png";

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
            <img src={phone} alt="Device Sold" title="Device Sold" />
            <span>1 lakh+ Device Sold</span>
          </div>
          <div className={styles.statBox}>
            <img src={bag} alt="Cash Paid" title="Cash Paid" />

            <span>78 Cr cash paid</span>
          </div>
          <div className={styles.statBox}>
            <img src={cloud} alt="Co2 Saved" title="Co2 Saved" />

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
