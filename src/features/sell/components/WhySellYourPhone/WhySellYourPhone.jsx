import React from "react";
import styles from "./WhySell.module.css";

import whyicon1 from "../../../../assets/images/static/time.png";
import whyicon2 from "../../../../assets/images/static/truck.png";
import whyicon3 from "../../../../assets/images/static/money.png";

function WhySellYourPhone() {
  return (
    <section className="default-padding-section md-none">
      <div className="wrapper">
        <div className={styles.wrapper}>
          <h1
            className={`${styles.sectionHeading} section-heading font-hedving`}
          >
            Why sell your phone to Quick Mobile
          </h1>

          <div className={styles.cardsBox}>
            {/* Card 1 */}
            <div className={styles.card}>
              <div className={styles.upper}>
                <img src={whyicon1} alt="icon" title="icon" />
                <h3 className="text-lg font-semibold">
                  Quick and{" "}
                  <span className="underline text-[#EBFFCB] px-1">Easy</span>{" "}
                  Quotes.
                </h3>
              </div>
              <div className={styles.lower}>
                <span>Get quote for your phone in just few cliks</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.card}>
              <div className={styles.upper}>
                <img src={whyicon2} alt="icon" title="icon" />
                <h3 className="text-lg font-semibold">
                  <span className="underline text-[#D2CBFF] px-1">Instant</span>{" "}
                  <br /> Cash.
                </h3>
              </div>
              <div className={styles.lower}>
                <span>Get quote for your phone in just few cliks</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.card}>
              <div className={styles.upper}>
                <img src={whyicon3} alt="icon" title="icon" />
                <h3 className="text-lg font-semibold">
                  Assured Pickup within{" "}
                  <span className="underline text-[#FFEACB] px-1">
                    24 Hours
                  </span>
                  .
                </h3>
              </div>
              <div className={styles.lower}>
                <span>Get quote for your phone in just few cliks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySellYourPhone;
