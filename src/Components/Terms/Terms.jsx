import React from "react";
import styles from "./Terms.module.css";

const TermsOfServies = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Terms of Use – Quick Mobile</h2>
        <p className={styles.intro}>
          Welcome to Quick Mobile. These Terms of Use (“Terms”) govern your access to and use of our
          platform, services, and applications related to selling, buying, and repairing devices. By
          using our website or services, you agree to these Terms. Please read them carefully before
          proceeding. If you do not agree with any part of these Terms, kindly stop using our
          services immediately.
        </p>

        <p className={styles.date}>October 2024</p>

        <ol className={styles.toc}>
          <li>About Quick Mobile</li>
          <li>Eligibility</li>
          <li>Selling a Device</li>
          <li>Buying a Device</li>
          <li>Repairing a Device</li>
          <li>Payments & Pricing</li>
          <li>Prohibited Activities</li>
          <li>Limitation of Liability</li>
          <li>Intellectual Property</li>
          <li>Privacy & Data Security</li>
          <li>Changes to Terms</li>
          <li>Contact Us</li>
        </ol>

        {/* About Section */}
        <h2>About Quick Mobile</h2>
        <ul>
          <li>Quick Mobile provides an online platform that allows users to:</li>
          <li>Sell their used mobile phones and gadgets for instant cash.</li>
          <li>Buy certified pre-owned devices at fair prices.</li>
          <li>Repair mobile phones and gadgets through trusted technicians.</li>
          <li>We aim to make the process simple, transparent, and secure for everyone.</li>
        </ul>

        {/* Eligibility */}
        <h2>Eligibility</h2>
        <ul>
          <li>You must be 18 years or older to use our services.</li>
          <li>
            By using our services, you confirm that you have the legal right and authority to
            transact.
          </li>
          <li>
            Devices sold must be legally owned by you and not involved in theft, fraud, unpaid EMIs,
            or other disputes.
          </li>
        </ul>

        {/* Selling a Device */}
        <h2>Selling a Device</h2>
        <p>When you sell your device to Quick Mobile, you agree to the following:</p>
        <ul>
          <li>
            Accurate Information: You must provide true and complete details about the device (model,
            storage, condition, functionality, age, accessories, etc.).
          </li>
          <li>
            Device Ownership: You confirm that the device is legally yours, and is not stolen, lost,
            counterfeit, or under unpaid EMI/finance.
          </li>
          <li>
            IMEI Verification: All devices may be verified against official databases. If found
            stolen, blacklisted, or reported lost, Quick Mobile is legally bound to report the case
            to authorities, and no payment will be made.
          </li>
          <li>
            Condition Check: The final price is confirmed only after physical inspection. If there is
            any discrepancy, a revised price will be offered.
          </li>
          <li>
            Data & Security: You must remove SIM cards, memory cards, and sign out of all accounts
            (Cloud, Google, Samsung ID, etc.). Failure to do so may result in cancellation.
          </li>
          <li>
            Accessories: Chargers, earphones, or original boxes are optional, but including them may
            improve your device’s value.
          </li>
          <li>
            Non-Returnable: Once the sale and payment is made, the device cannot be returned under
            any circumstances.
          </li>
          <li>
            Fraud Prevention: Selling counterfeit, tampered, or stolen devices may result in
            permanent account suspension, forfeiture of payment, and legal action under applicable
            laws.
          </li>
        </ul>

        {/* Buying a Device */}
        <h2>Buying a Device</h2>
        <ul>
          <li>
            Quality Assurance: All devices go through a multi-point quality check before being listed
            for sale.
          </li>
          <li>
            Device Condition: Each device is sold with a clear label (Brand New, Like New, Good, or
            Fair) so you know exactly what to expect.
          </li>
          <li>
            Warranty Coverage: If a warranty applies, it will be clearly mentioned. Warranty does not
            cover physical or liquid damage.
          </li>
          <li>
            Returns: Return requests are accepted only under our Return & Refund Policy (e.g., wrong
            item delivered, device not working on arrival).
          </li>
          <li>
            Payments: Orders must be prepaid unless Cash-on-Delivery is explicitly offered in your
            location.
          </li>
          <li>
            Delivery Timeline: Delivery times may vary depending on stock and location.
          </li>
          <li>
            Ownership Transfer: Once purchased, the device legally belongs to you. Quick Mobile is
            not responsible for how the device is used afterward.
          </li>
          <li>
            Device Authenticity: All devices sold are genuine and sourced from trusted suppliers.
            Quick Mobile does not sell counterfeit or illegal products.
          </li>
        </ul>

        {/* Repairing a Device */}
        <h2>Repairing a Device</h2>
        <ul>
          <li>
            Diagnosis First: A technician may diagnose the device before confirming the final repair
            cost.
          </li>
          <li>
            Parts Used: We use high-quality genuine or compatible parts depending on availability and
            your preference (with price variations).
          </li>
          <li>
            Warranty: Repairs may come with a limited warranty (e.g., 3–6 months for screens, 6–12
            months for batteries). Warranty will not apply to accidental or water damage after
            repair.
          </li>
          <li>
            Repair Timelines: While we aim for fast service, actual repair time may vary depending on
            issue complexity and parts availability.
          </li>
          <li>
            Data Safety: While technicians take precautions, Quick Mobile is not responsible for data
            loss during repair. Please back up your data before handing over the device.
          </li>
          <li>
            Third-Party Service: Some repairs may be performed by authorized third-party technicians.
            Quick Mobile is not liable for delays or failures beyond its control.
          </li>
          <li>
            Device Responsibility: If a device is not collected within 30 days after repair, Quick
            Mobile reserves the right to charge storage fees or responsibly recycle it.
          </li>
          <li>
            Non-Repairable Devices: If a device cannot be repaired, you may be offered options
            (return-as-is or sell it at salvage value).
          </li>
        </ul>

        {/* Payments */}
        <h2>Payments & Pricing</h2>
        <ul>
          <li>
            All payments are processed through secure channels (UPI, bank transfer, cash, or card).
          </li>
          <li>
            Prices displayed online are indicative and subject to revision based on market
            fluctuations and physical verification.
          </li>
          <li>
            Quick Mobile reserves the right to modify prices at any time without prior notice.
          </li>
        </ul>

        {/* Prohibited Activities */}
        <h2>Prohibited Activities</h2>
        <p>By using our platform, you agree not to:</p>
        <ul>
          <li>Sell or attempt to sell stolen, counterfeit, or blacklisted devices.</li>
          <li>Provide false, misleading, or incomplete information.</li>
          <li>Engage in fraudulent transactions or misuse our services.</li>
          <li>Violate applicable laws, intellectual property rights, or third-party rights.</li>
        </ul>
        <p className={styles.note}>
          Quick Mobile reserves the right to suspend or terminate accounts found violating these
          terms and may cooperate with law enforcement agencies if required.
        </p>

        {/* Limitation */}
        <h2>Limitation of Liability</h2>
        <ul>
          <li>
            Quick Mobile is not liable for indirect, incidental, or consequential damages arising
            from the use of our services.
          </li>
          <li>
            Our maximum liability is limited to the amount paid to or received from you for the
            transaction in question.
          </li>
        </ul>

        {/* Intellectual */}
        <h2>Intellectual Property</h2>
        <p>
          All trademarks, logos, and brand names belong to their respective owners. Any company,
          product, or service names mentioned on this site are used purely for identification and
          reference. Their appearance here does not suggest any partnership, sponsorship, or
          endorsement.
        </p>

        {/* Privacy */}
        <h2>Privacy & Data Security</h2>
        <p>
          We value your privacy. Please review our Privacy Policy to understand how we collect, use,
          and protect your personal information.
        </p>

        {/* Changes */}
        <h2>Changes to Terms</h2>
        <p>
          Quick Mobile may update these Terms from time to time. Any changes will be posted on this
          page with a revised date. Continued use of our services means you accept the updated
          Terms.
        </p>

        {/* Contact */}
        <h2>Contact Us</h2>
        <p>
          If you have questions about these Terms or our services, you can reach us at: <br />
          <b>Email: [support@quickmobile.in]</b>
        </p>
        <p className={styles.note}>
          <b>Important Legal Note:</b> Selling stolen, counterfeit, or blacklisted devices is a
          criminal offense under Indian law (including the Information Technology Act, 2000 and
          Indian Penal Code). Quick Mobile fully cooperates with law enforcement and reserves the
          right to report such cases, withhold payment, and assist in investigations.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServies;
