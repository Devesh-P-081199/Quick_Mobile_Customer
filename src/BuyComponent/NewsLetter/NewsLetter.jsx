import mail from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import styles from "./NewsLetter.module.css";

export default function NewsLetter() {
  return (
    <section>
      <div className={(styles.container, styles.newsletterwrapper)}>
        <div className={styles.wrapper}>
          <div className={styles.textSection}>
            <h2 className={styles.heading}>Love gadgets? We do too.</h2>
            <p className={styles.subheading}>
              Join our newsletter for fresh deals, cool tech drops, and zero
              spam promise!
            </p>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
              />
              <span className={styles.iconWrapper}>
                <img src={mail} className={styles.icon} alt="mail icon" />
              </span>
            </div>
            {/* <button className={styles.submitButton}>Submit</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
