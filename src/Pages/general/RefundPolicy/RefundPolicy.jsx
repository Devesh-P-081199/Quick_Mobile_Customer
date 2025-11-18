import React from "react";
import styles from "./RefundPolicy.module.css";

const RefundPolicy = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Refund & Return Policy – Quick Mobile</h2>
        <p className={styles.date}>Last Updated: [Insert Date]</p>
        <p className={styles.intro}>
          At Quick Mobile, we strive to make your experience smooth and
          hassle-free. This Refund & Return Policy explains the conditions under
          which you may return a product or request a refund for our selling,
          buying, and repair services.
        </p>

        <h2 className={styles.sectionTitle}>1 – When Can You Request a Return or Refund?</h2>

        <h3 className={styles.subTitle}>(a) Buying a Device</h3>
        <p className={styles.text}>You may request a return or refund if:</p>
        <ul className={styles.list}>
          <li>You receive a wrong device or wrong model.</li>
          <li>The device is not working or has a major functional defect at the time of delivery.</li>
          <li>
            The device condition does not match the description (e.g., "Like
            New" vs. "Fair").
          </li>
        </ul>
        <p className={styles.text}>
          <strong>Timeframe:</strong> Requests must be raised within 7 days of delivery.
        </p>

        <h3 className={styles.subTitle}>(b) Selling a Device</h3>
        <ul className={styles.list}>
          <li>
            Once you sell your device and receive payment, the transaction is
            considered final and non-returnable.
          </li>
          <li>Refunds are not applicable after ownership is transferred to Quick Mobile.</li>
        </ul>

        <h3 className={styles.subTitle}>(c) Repair Services</h3>
        <p className={styles.text}>You may request a re-service or partial refund if:</p>
        <ul className={styles.list}>
          <li>The repair issue persists within the repair warranty period.</li>
          <li>Parts used are defective or not functioning as promised.</li>
          <li>Partial refund if device not repairable.</li>
          <li>
            <strong>Note:</strong> Refunds are not applicable for accidental damage, water
            damage, or customer mishandling after repair.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>2 – How Refunds Are Processed</h2>
        <ul className={styles.list}>
          <li>
            Refunds will be initiated via the original payment method (UPI, bank
            transfer, card, etc.).
          </li>
          <li>Refunds may take 5–7 business days to reflect in your account.</li>
          <li>
            In case of Cash-on-Delivery orders, refunds will be processed via
            bank transfer or UPI only.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>3 – Non-Refundable Situations</h2>
        <ul className={styles.list}>
          <li>Change of mind or buyer’s remorse.</li>
          <li>Minor scratches or cosmetic issues not affecting functionality.</li>
          <li>Devices damaged after delivery or repair.</li>
        </ul>

        <h2 className={styles.sectionTitle}>4 – Contact for Returns & Refunds</h2>
        <p className={styles.text}>
          To raise a request, please contact: <br />
          <strong>Email:</strong> [support@quickmobile.in]
        </p>

        <p className={styles.legal}>
          Legal Note: Refunds are governed by applicable consumer protection
          laws. Quick Mobile reserves the right to reject claims found to be
          fraudulent or outside policy terms.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
