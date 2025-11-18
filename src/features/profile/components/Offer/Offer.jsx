import React from "react";
import { FaTicketAlt } from "react-icons/fa"; // Ticket icon
import styles from "./offer.module.css";
import MobileCommonHeaderthree from "../../../../Components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const NoOffer = () => {
  return (
    <>
      <MobileCommonHeaderthree title="Offer" />
      <div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
          <FaTicketAlt className={styles.icon} />
        </div>
        <p className={styles.text}>No Offer Found!</p>
      </div>
    </>
  );
};

export default NoOffer;
