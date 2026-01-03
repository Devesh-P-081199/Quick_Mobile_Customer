import { FaTicketAlt } from "react-icons/fa";
import styles from "./offer.module.css";
// Import ProfileCard
import ProfileCard from "../ProfileCard";
import MobileBackHeader from "../../../common/components/layout/MobileCommonHeader/MobileBackHeader";

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
                <FaTicketAlt className={styles.icon} />
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
