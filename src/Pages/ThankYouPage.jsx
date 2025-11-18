// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import FinalOrderCard from './FinalOrderCard';
// import mobilety from "../assets/ty-mobile-bg.png"

// const ThankYouPage = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="final-order-card">
//       <div className="mobile-ty">
//         <img src={mobilety} alt="" />
//       </div>
//       <FinalOrderCard/>
//     </section>
//   );
// };

// export default ThankYouPage;

import React from "react";
import styles from "./ThankYou.module.css";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { BsPersonVcard } from "react-icons/bs";
import { PiBankBold } from "react-icons/pi";
import { FaHeadphones } from "react-icons/fa6";
import tyimg from "../assets/QuickSellNewIcons/ty-mobile.png";

const ThankYouPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.iconBox}>
          <span className={styles.checkIcon}>✔</span>
        </div>

        {/* Heading */}
        <h2 className={styles.title}>
          Thank you for selling your phone with Quick Mobile
        </h2>
        <p className={styles.subtitle}>
          We are exited to give your phone a second life!
        </p>
        <p className={styles.desc}>
          Your device details has been received successfully our pickup partner
          will connect you shortly for the further process
        </p>

        <div className={styles.offerBox}>
          <img
            src={tyimg}
            alt="Refurbished Phone"
            title="Refurbished Phone"
            className={styles.offerImage}
          />
          <div className={styles.offerContent}>
            <p className={styles.offerTitle}>
              Also checkout the exiting offer on refurbished mobile phone
              <p className={styles.offerSubtext}>
                25 quality check points | 6-12 Months Warranty | 15 Days easy
                returns
              </p>
            </p>
            <button className={styles.buyBtn}>Buy now</button>
          </div>
        </div>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <RiBattery2ChargeLine size={40} />
            </div>
            <div>
              <h4>Charge Your Device</h4>
              <p>
                Keep your phone 60% charge to avoid delay in check in process
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaHeadphones size={40} />
            </div>
            <div>
              <h4>Accessories</h4>
              <p>
                Keep all the accessories handy, which was selected at the time
                of sell
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <BsPersonVcard size={40} />
            </div>
            <div>
              <h4>Documents</h4>
              <p>
                Keep your valid government ID proof (Aadhar Card) more documents
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <PiBankBold size={40} />
            </div>
            <div>
              <h4>Payment Details</h4>
              <p>
                Bank account or UPI details should match the seller’s government
                ID
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.btnBox}>
          <button className={styles.homeBtn}>Home</button>
          <button className={styles.orderBtn}>View My Order</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
