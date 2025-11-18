import { useState } from "react";
import styles from "./FAQ.module.css";
import DownArrow from "../../../assets1/images/icons/back.png";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What exactly is a refurbished phone?",
      answer:
        "A refurbished phone is a pre-owned device that has been tested, repaired, and restored to working condition.",
    },
    {
      question: "What are the warranty and return terms for smartphones?",
      answer:
        "Refurbished phones usually come with a limited warranty and a return policy, depending on the seller.",
    },
    {
      question: "What comes with purchasing a refurbished phone?",
      answer:
        "Typically, a refurbished phone comes with a charger, accessories, and a warranty, but this may vary by seller.",
    },
    {
      question: "Are refurbished phones tested before being sold?",
      answer:
        "Yes, all refurbished phones undergo testing to ensure they are fully functional before being resold.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`${styles.faqSection} homepage-section`}>
      <h2 className={styles.faqTitle}>FAQs</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span
                className={`${styles.faqIcon} ${
                  openIndex === index ? styles.open : ""
                }`}
              >
                <img src={DownArrow} alt="" />
              </span>
            </div>
            <div
              className={`${styles.faqAnswer} ${
                openIndex === index ? styles.visible : ""
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
