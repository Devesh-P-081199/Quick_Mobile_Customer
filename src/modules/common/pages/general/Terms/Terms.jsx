import styles from "./Terms.module.css";

const TermsOfServies = () => {
  return (
    <div className="page-content-wrapper">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Terms of Use</h2>

        <p className={styles.intro}>
          Please read these Terms of Use carefully before using the Quick Mobile
          website, mobile application, or services (“Platform”).
        </p>

        <p className={styles.intro}>
          By accessing or using our Platform, you agree to be bound by these
          Terms of Use. If you do not agree with any part of these terms, please
          do not use our services.
        </p>

        <p className={styles.intro}>
          These Terms form a legally binding agreement between you (the seller
          of the device) and Quick Mobile LLP (“Quick Mobile”, “we”, “our”, or
          “us”), along with our authorised third-party buyers where applicable.
        </p>

        <ol className={styles.toc}>
          <li>About Quick Mobile</li>
          <li>Ownership of Device</li>
          <li>Price Quotes & Inspection</li>
          <li>Binding Sale</li>
          <li>Change in Offer</li>
          <li>Required Documents</li>
          <li>Lawful Sale Only</li>
          <li>Data Deletion Responsibility</li>
          <li>No Return Policy</li>
          <li>Restricted Devices</li>
          <li>Right to Modify Terms</li>
          <li>Fraud & Cancellation</li>
          <li>Limitation of Liability</li>
          <li>Governing Law</li>
        </ol>

        <h2>1. About Quick Mobile</h2>
        <ul>
          <li>
            Quick Mobile LLP operates a platform that allows users to sell used
            mobile phones and other eligible electronic devices.
          </li>
          <li>
            Quick Mobile acts only as a facilitator. The actual sale may be
            completed either with Quick Mobile or with an authorised third-party
            buyer.
          </li>
          <li>
            Unless clearly stated otherwise, Quick Mobile is not the final buyer
            and does not control or take responsibility for the actions of
            third-party buyers.
          </li>
        </ul>

        <h2>2. Ownership of Device</h2>
        <p>You confirm that:</p>
        <ul>
          <li>You are the legal owner of the device you are selling.</li>
          <li>
            The device is not stolen, lost, financed, blacklisted, or involved
            in any legal dispute.
          </li>
          <li>You have full rights to sell the device.</li>
        </ul>

        <h2>3. Price Quotes & Inspection</h2>
        <ul>
          <li>
            Any price shown on our website/app is an initial estimate based on
            the details provided by you.
          </li>
          <li>
            The final price is decided only after physical inspection of the
            device.
          </li>
          <li>
            We reserve the right to change or refuse a quote if the device
            condition, model, or details do not match what was declared.
          </li>
          <li>No sale is final until the device is inspected and accepted.</li>
        </ul>

        <h2>4. Binding Sale</h2>
        <p>If:</p>
        <ul>
          <li>You receive a quote on the Platform, and</li>
          <li>After inspection, we agree to pay that quoted price,</li>
        </ul>
        <p>
          then you are legally bound to sell the device at that agreed price.
        </p>

        <h2>5. Change in Offer</h2>
        <p>We may revise the quoted price if:</p>
        <ul>
          <li>The device model is different</li>
          <li>Parts are missing</li>
          <li>The condition is worse than stated</li>
          <li>The device is not working as declared</li>
        </ul>
        <p>
          In such cases, you may choose to accept or reject the revised offer.
        </p>

        <h2>6. Required Documents</h2>
        <p>At the time of pickup, you must provide:</p>
        <ul>
          <li>A self-attested government-approved ID proof</li>
          <li>A self-attested indemnity bond, if requested by us</li>
        </ul>
        <p className={styles.note}>
          Failure to provide documents may lead to cancellation of the order.
        </p>

        <h2>7. Lawful Sale Only</h2>
        <p>You agree that:</p>
        <ul>
          <li>The sale does not violate any law or regulation</li>
          <li>
            The device does not contain illegal, harmful, offensive, or
            copyrighted content
          </li>
          <li>
            You are not transferring any restricted software or licensed
            material unlawfully
          </li>
        </ul>
        <p>
          You agree to indemnify and hold Quick Mobile harmless against any
          claims, losses, or legal actions arising from violation of these
          terms.
        </p>

        <h2>8. Data Deletion Responsibility</h2>
        <ul>
          <li>
            You are fully responsible for backing up and deleting all personal
            data from the device before handing it over.
          </li>
          <li>
            Once the device is collected, Quick Mobile or the buyer is not
            responsible for any remaining data.
          </li>
          <li>We will not assist in data recovery after pickup.</li>
        </ul>

        <h2>9. No Return Policy</h2>
        <p>Once the device is sold and picked up:</p>
        <ul>
          <li>It cannot be returned under any circumstances.</li>
        </ul>

        <h2>10. Restricted Devices</h2>
        <p>Devices received as:</p>
        <ul>
          <li>Government-funded,</li>
          <li>NGO-distributed,</li>
          <li>Gifted under state or sponsored schemes</li>
        </ul>
        <p>are not accepted on the Quick Mobile platform.</p>

        <h2>11. Right to Modify Terms</h2>
        <ul>
          <li>
            We may update or change these Terms of Use at any time without prior
            notice.
          </li>
          <li>
            Continued use of the Platform after changes means you accept the
            updated terms.
          </li>
          <li>Changes become effective immediately after being published.</li>
        </ul>

        <h2>12. Fraud & Cancellation</h2>
        <p>Quick Mobile reserves the right to:</p>
        <ul>
          <li>
            Cancel any transaction that appears fraudulent, suspicious, or
            unlawful
          </li>
          <li>Block users who misuse the Platform or violate these Terms</li>
        </ul>

        <h2>13. Limitation of Liability</h2>
        <p>Quick Mobile shall not be responsible for:</p>
        <ul>
          <li>Disputes between sellers and third-party buyers</li>
          <li>Loss of data</li>
          <li>
            Indirect or consequential damages arising from use of the Platform
          </li>
        </ul>

        <h2>14. Governing Law</h2>
        <p>
          These Terms of Use are governed by the laws of India, and courts of
          appropriate jurisdiction shall have exclusive authority.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact Quick
          Mobile through our official website or customer support channels.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServies;
