import { useState } from "react";
import styles from "./FAQ.module.css";
import uparrow from "../../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I sell my old mobile phone on Quick Mobile?",
      answer:
        "Select your phone’s brand and model, answer a few questions about its condition, and receive an instant price quote. If you’re happy with the offer, schedule a free pickup and get paid instantly after device verification.",
    },
    {
      question: "Do you offer doorstep pickup services?",
      answer:
        "Yes, we provide free doorstep pickup across most cities in India. Our executive will visit at your chosen time and location.",
    },
    {
      question: "When will I receive the payment?",
      answer:
        "You will get instant payment via UPI, bank transfer, or cash right after the device is verified during pickup.",
    },
    {
      question: "Is it safe to sell my phone on Quick Mobile?",
      answer:
        "Absolutely. We ensure 100% data privacy with secure data wiping. Our trained agents and transparent process make selling safe and reliable.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-content-wrapper">
      <div className={`${styles.faqSection}`}>
        <h2 className={styles.faqTitle}>FAQs</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <div
                  className={`${styles.faqIcon} ${openIndex === index ? styles.open : ""
                    }`}
                >
                  <img src={uparrow} alt="" />
                </div>
              </div>
              <div
                className={`${styles.faqAnswer} ${openIndex === index ? styles.visible : ""
                  }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
