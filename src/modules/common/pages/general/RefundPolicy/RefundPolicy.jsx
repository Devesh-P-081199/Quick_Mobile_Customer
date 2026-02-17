import { Helmet } from "react-helmet-async";
import styles from "./RefundPolicy.module.css";

const RefundPolicy = () => {
  return (

    <div className="page-content-wrapper">
      <Helmet>
        <title>Refund & Return Policy | Quick Mobile
        </title>
        <meta name="description" content="Quick Mobile want you to feel secure. Our Refund Policy clearly explains when you can receive a refund and how the process works." />

      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Refund & Return Policy – Quick Mobile

        </h1>
        <p className={styles.date}>Last Updated: 11-02-2026</p>
        <p className={styles.intro}>
          At Quick Mobile, we strive to make your experience smooth and hassle-free. This Refund & Return Policy explains the conditions under which you may return a product or request a refund for our selling, buying, and repair services.


        </p>

        <h2 className={styles.sectionTitle}>
          1 – When Can You Request a Return or Refund?

        </h2>

        <h3 className={styles.subTitle}>(a) Buying a Device
        </h3>
        <p className={styles.text}>You may request a return or refund if:
        </p>
        <ul className={styles.list}>
          <li>You receive a wrong device or wrong model.</li>
          <li>
            The device is not working or has a major functional defect at the time of delivery.

          </li>
          <li>
            The device condition does not match the description (e.g., "Like New" vs. "Fair").

          </li>
        </ul>
        <p className={styles.text}>
          <strong>Timeframe:</strong> Requests must be raised within 7 days of delivery.

        </p>

        <h3 className={styles.subTitle}>(b) Selling a Gadget</h3>
        <ul className={styles.list}>
          <li>
            The sale is final and you can't return the gadget after you get paid for it.

          </li>
          <li>
            Once you give Quick Mobile ownership, you can't get your money back.
          </li>
        </ul>

        <h3 className={styles.subTitle}>(c) Repair Services</h3>
        <p className={styles.text}>
          You may request a re-service or partial refund if:
        </p>
        <ul className={styles.list}>
          <li>The repair issue persists within the repair warranty period.</li>
          <li>Parts used are defective or not functioning as promised.
          </li>
          <li>If the gadget can't be fixed, you'll get a partial refund.

          </li>
          <li>
            <strong>Please Note:</strong>  that you can't get your money back if you accidentally damage something, get it wet, or don't take care of it after the repair.

          </li>
        </ul>

        <h2 className={styles.sectionTitle}>2. How refunds are handled
        </h2>
        <ul className={styles.list}>
          <li>
            the same way you purchased the item (for example, using a bank transfer, UPI, or credit card) will be used to start the refund.

          </li>
          <li>
            It could take up to 7 business days for refunds to show up in your account.
            For cash-on-delivery orders, you can only get your money back through a bank transfer or UPI.

          </li>
          <li>
            In case of Cash-on-Delivery orders, refunds will be processed via
            bank transfer or UPI only.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>3. When Refunds Are Not Possible
</h2>
        <ul className={styles.list}>
          <li>Feeling guilty about a purchase or changing your mind.
</li>
          <li>
           Cosmetic issues or tiny defects that don't affect how well the item works.

          </li>
          <li>Devices that break after they are delivered or repaired.</li>
        </ul>

        <h2 className={styles.sectionTitle}>
        4. Contact Information for Returns and Refunds

        </h2>
        <p className={styles.text}>
         To submit a request, please reach out to: <br />
          <strong>Email:</strong> [support@quickmobile.in]
        </p>

        <p className={styles.legal}>
     Legal Note: Refunds are governed by applicable consumer protection laws. Quick Mobile reserves the right to reject claims found to be fraudulent or outside policy terms.

        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
