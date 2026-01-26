import styles from "./offer.module.css";
// Import ProfileCard
import ProfileCard from "../ProfileCard";
import MobileBackHeader from "../../../common/components/layout/MobileCommonHeader/MobileBackHeader";
import no_offer from "../../../../assets/QuickSellNewIcons/notfound/no_offers_found.png";

const NoOffer = () => {
  return (
    <>
      <MobileBackHeader title="Offer" />
      <section className="zero-padding-section">
        <div className={styles.panelWrapper}>
          <div className={styles.right}>
            <ProfileCard />
          </div>
          <div className={styles.left}>
            <div className={styles.wrapper}>
              <div className={styles.iconWrapper}>
                <img src={no_offer} alt="No Offer" title="No Offer" className={styles.icon} />
              </div>
              <p className={styles.text}>No Offer Found!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoOffer;
