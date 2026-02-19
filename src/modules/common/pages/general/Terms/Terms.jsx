import { Helmet } from "react-helmet-async";
import styles from "./Terms.module.css";

const TermsOfServies = () => {
  return (
    <div className="page-content-wrapper">
      <Helmet>
        <title>Terms of Use | Quick Mobile


        </title>
        <meta
          name="description"
          content={` Our Terms of Use explain what “use” means between Quick Mobile and our customers, so you can clearly understand how our policies work.
`}
        />        <meta property="og:title" content="Terms of Use | Quick Mobile" />
        <meta property="og:description" content="Our Terms of Use explain what use means between Quick Mobile and our customers, so you can clearly understand how our policies work." />      </Helmet>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Terms of Use</h1>

        <p className={styles.intro}>
          Please read these Terms of Use carefully before using the Quick Mobile website, mobile application, or services (“Platform”).

        </p>

        <p className={styles.intro}>
          By accessing or using our Platform, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our services.

        </p>

        <p className={styles.intro}>
          These Terms form a legally binding agreement between you (the seller of the device) and Quick Mobile LLP (“Quick Mobile”, “we”, “our”, or “us”), along with our authorised third-party buyers where applicable.

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
            Quick Mobile LLP operates a platform that allows users to sell used mobile phones and other eligible electronic devices.
          </li>
          <li>
            Quick Mobile acts only as a facilitator. The actual sale may be completed either with Quick Mobile or with an authorised third-party buyer.

          </li>
          <li>
            Unless clearly stated otherwise, Quick Mobile is not the final buyer and does not control or take responsibility for the actions of third-party buyers.

          </li>
        </ul>

        <h2>2. Ownership of Device</h2>
        <p>You confirm that:</p>
        <ul>
          <li>You are the legal owner of the device you are selling.</li>
          <li>
            The device is not stolen, lost, financed, blacklisted, or involved in any legal dispute.

          </li>
          <li>We reserve the right to change or refuse a quote if the device condition, model, or details do not match what was declared.
          </li>
          <li>No sale is final until the device is inspected and accepted.
          </li>
          <li>You have all the rights to sell the device.
          </li>
        </ul>

        <h2>3. Quotes and Inspections</h2>
        <ul>
          <li>
            The prices on our website and app are just rough estimates based on the information you gave us.

          </li>
          <li>
            The price is only set after the device has been looked at in person.

          </li>
          <li>
            If the model, condition, or details of the device do not match what was said, we have the right to change or refuse a quote.

          </li>
          <li>The sale is not final until the device has been looked at and accepted.
          </li>
        </ul>

        <h2>4. Sale that is binding</h2>
        <p>If:</p>
        <ul>
          <li>You get a quote on the Platform, and
          </li>
          <li>After looking at the device, we agree to pay the price you quoted. You are then legally required to sell it for that price.
          </li>
        </ul>


        <h2>5. Change in Offer</h2>
        <p>We may change the price we quoted if:
        </p>
        <ul>
          <li>The model of the device is different.</li>
          <li>Some parts are missing.
          </li>
          <li>The situation is worse than what was said.
          </li>
          <li>The device is not working as it should.
          </li>
          <li>In these situations, you can either accept or reject the new offer.

          </li>
        </ul>


        <h2>6. Documents Needed</h2>
        <p>You must give the following at the time of pickup:
        </p>
        <ul>
          <li>A government-approved ID proof that you signed yourself
          </li>
          <li>A self-attested indemnity bond, if we ask for one
          </li>
        </ul>
        {/* <p className={styles.note}>
          Failure to provide documents may lead to cancellation of the order.
        </p> */}

        <h2>7. Only legal sales</h2>
        <p>You agree that:</p>
        <ul>
          <li>The sale is not against any laws or rules.
          </li>
          <li>
            The device does not have any content that is illegal, harmful, offensive, or copyrighted.

          </li>
          <li>
            You are not illegally sending any software or licensed material that is not allowed.

          </li>
          <li>
            If you break these terms, you agree to pay Quick Mobile for any claims, losses, or legal actions that come up as a result.

          </li>
        </ul>
        {/* <p>
          You agree to indemnify and hold Quick Mobile harmless against any
          claims, losses, or legal actions arising from violation of these
          terms.
        </p> */}

        <h2>8.  Who is responsible for deleting data
        </h2>
        <ul>
          <li>
            Before giving the device to someone else, you are completely responsible for backing up and deleting all of your personal data.
          </li>
          <li>
            Quick Mobile or the buyer are not responsible for any data that is still on the device after it is picked up.
          </li>
          <li>After we pick up your data, we won't help you get it back.
          </li>
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
            If you keep using the Platform after changes, you agree to the new terms.
            Changes go into effect as soon as they are made public.

          </li>
          {/* <li>Changes become effective immediately after being published.</li> */}
        </ul>

        <h2>12. Fraud & Cancellation</h2>
        <p>Quick Mobile reserves the right to:</p>
        <ul>
          <li>
            Stop any transaction that looks like it could be fake, shady, or illegal.

          </li>
          <li>Block users who break these Terms or use the Platform inappropriately.
          </li>
        </ul>

        <h2>13. Limitation of Liability</h2>
        <p>Quick Mobile is not responsible for:</p>
        <ul>
          <li>Problems between sellers and buyers who are not the seller
          </li>
          <li>Data loss</li>
          <li>
            Indirect or consequential damages that happen because of using the Platform
          </li>
        </ul>

        <h2>14. Governing Law</h2>
        <p>
          These Terms of Use are governed by the laws of India, and courts of appropriate jurisdiction shall have exclusive authority.

        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact Quick Mobile through our official website or customer support channels.

        </p>
      </div>
    </div>
  );
};

export default TermsOfServies;
