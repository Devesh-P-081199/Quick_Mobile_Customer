import React, { useState } from "react";
import styles from "./FAQFullPage.module.css";

const faqTabs = [
  "Sell Phone - FAQ",
  "Buy Phone - FAQ",
  "Repair Phone - FAQ",
  "Exchange Phone - FAQ",
  "Other - FAQ",
];

const allFaqs = Array.from({ length: 20 }, (_, index) => ({
  question: `${index + 1} - What exactly is a refurbished phone?`,
  answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec nunc vitae nulla.",
}));

export default function FAQFullPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [openIndex, setOpenIndex] = useState(null);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.container}>
        <div className="wrapper">
  <h2 className={styles.heading}>Frequently Asked Questions (FAQ)</h2>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          {faqTabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tabButton} ${activeTab === index ? styles.active : ""}`}
              onClick={() => {
                setActiveTab(index);
                setVisibleCount(10);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className={styles.faqContent}>
          {allFaqs.slice(0, visibleCount).map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className={styles.icon}>{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className={styles.faqAnswer}>{faq.answer}</div>
              )}
            </div>
          ))}
          {visibleCount < allFaqs.length && (
            <button className={styles.viewMore} onClick={handleViewMore}>
              View more
            </button>
          )}
        </div>
      </div>
        </div>
    
    </section>
  );
}
