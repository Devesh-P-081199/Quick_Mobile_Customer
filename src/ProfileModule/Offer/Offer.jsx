import React from "react";
import { FaTicketAlt } from "react-icons/fa"; // Ticket icon
import styles from "./Offer.module.css";
import MobileCommonHeaderthree from "../../Common/MobileCommonHeader/MobileCommonHeaderthree";

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
