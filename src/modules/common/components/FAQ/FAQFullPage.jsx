import { useState } from "react";
import styles from "./FAQFullPage.module.css";
import uparrow from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";

const allFaqs = Array.from({ length: 20 }, (_, index) => ({
  question: `${index + 1} - What exactly is a refurbished phone?`,
  answer:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec nunc vitae nulla.",
}));

export default function FAQFullPage() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [openIndex, setOpenIndex] = useState(null);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-content-wrapper">
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h2>

        <div className={styles.faqList}>
          {allFaqs.slice(0, visibleCount).map((faq, index) => (
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

        {visibleCount < allFaqs.length && (
          <button className={styles.viewMore} onClick={handleViewMore}>
            View more
          </button>
        )}
      </div>
    </div>
  );
}
