import styles from "./Offer.module.css";
import no_offer from "../../../../assets/QuickSellNewIcons/notfound/NoOffersFound.png";

const NoOffer = () => {
  return (
    <>
      <div className={styles.left}>
        <div className={styles.wrapper}>
          <div className={styles.iconWrapper}>
            <img
              src={no_offer}
              alt="No Offer"
              title="No Offer"
              className={styles.icon}
            />
          </div>
          <p className={styles.text}>No Offer Found!</p>
        </div>
      </div>
    </>
  );
};

export default NoOffer;
