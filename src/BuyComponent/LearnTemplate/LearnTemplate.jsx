import {
  FaSearch,
  FaMedal,
  FaShieldAlt,
  FaCreditCard,
  FaCalendarAlt,
} from "react-icons/fa";
import styles from "./LearnTemplate.module.css"

const features = [
  { icon: <FaSearch />, text: "20-point professional inspection" },
  { icon: <FaMedal />, text: "Strict quality charter that protects you" },
  { icon: <FaShieldAlt />, text: "Strict quality charter that protects you" },
  { icon: <FaCreditCard />, text: "Free warranty with every purchase" },
  { icon: <FaCalendarAlt />, text: "30 days to change your mind" },
];

const LearnTemplate = () => {
  return (
    <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.leftSection}>
          <h2 className={styles.heading}>What is Verifies Refurbished?</h2>
          <p className={styles.subheading}>How we ensure quality for you.</p>
          {/* <button className={styles.learnMoreButton}>Learn more</button> */}
        </div>

        <div className={styles.rightSection}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span className={styles.featureText}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default LearnTemplate;
