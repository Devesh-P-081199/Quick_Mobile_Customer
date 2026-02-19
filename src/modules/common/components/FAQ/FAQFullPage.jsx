import { useState } from "react";
import styles from "./FAQFullPage.module.css";
import uparrow from "../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import { Helmet } from "react-helmet-async";

const allFaqs = [
  {
    question: "What happens to my personal data?",
    answer:
      "We recommend factory resetting your phone. In addition, we perform professional data wiping during refurbishment to ensure complete data removal.",
  },
  {
    question: "What if my phone is damaged or not working?",
    answer:
      "We accept phones in all conditions, including broken, cracked, or non-functional devices. Your final value depends on the device condition.",
  },
  {
    question: "Which brands can I sell?",
    answer:
      "You can sell phones from all major brands, including: Apple, Samsung, Xiaomi, OnePlus, Realme, Oppo, Vivo, Motorola, and more.",
  },
  {
    question: "Can I sell multiple phones at once?",
    answer:
      "Yes, you can sell more than one device. Just mention the quantity or contact our support team.",
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. There are no service fees, pickup charges, or hidden costs.",
  },
  {
    question: "Do I need the original box or accessories?",
    answer:
      "Not mandatory, but including them may increase your resale value.",
  },
  {
    question: "How is the price calculated?",
    answer:
      "Your phone’s price is based on: Brand & model, Storage capacity, Physical & functional condition, and Current market demand. We use real-time pricing tools for the best value.",
  },
  {
    question: "Is a bill or invoice required?",
    answer:
      "No, it’s not mandatory. However, having the bill may help in rare ownership checks or slightly improve the price.",
  },
  {
    question: "Can I cancel my pickup?",
    answer:
      "Yes, you can cancel or reschedule anytime. There are no cancellation fees.",
  },
  {
    question: "What if I don’t agree with the final price?",
    answer:
      "If the phone condition differs from what was declared, the price may change. You are free to reject the offer—no obligation, no charges.",
  },
  {
    question: "Do you buy EMI or financed phones?",
    answer:
      "Currently, we only accept phones that are fully paid and not under any EMI or loan.",
  },
  {
    question: "Can I sell a locked phone?",
    answer:
      "Phones must be unlocked and factory reset. We do not accept iCloud/Google-locked devices.",
  },
  {
    question: "Is this service available in my city?",
    answer:
      "We operate in most metro and many tier-2 cities across India. You can check availability during pickup scheduling.",
  },
  {
    question: "Will I receive a receipt?",
    answer:
      "Yes, after pickup and payment, you’ll receive an official confirmation via SMS or email.",
  },
  {
    question: "What happens to my phone after selling?",
    answer:
      "Based on condition, your phone is refurbished and resold or recycled responsibly to reduce e-waste.",
  },
  {
    question: "Do you support bulk or business sellers?",
    answer:
      "Yes, we work with corporates and resellers. Contact us for bulk quotes and custom pickup.",
  },
  {
    question: "How can I contact Quick Mobile support?",
    answer: "📧 Email: support@quickmobile.in, 💬 Live Chat: Available on our website (10 AM – 7 PM)",
  },
];

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
       <Helmet>
        <title> Frequently Asked Questions | Quick Mobile


</title>
        <meta
          name="description"
          content={` Find out how to sell, buy, exchange, or repair your phone with Quick Mobile, plus answers to common questions for a hassle-free experience.
`}
        />
        <meta property="og:title" content="Frequently Asked Questions | Quick Mobile" />
        <meta property="og:description" content="Find out how to sell, buy, exchange, or repair your phone with Quick Mobile, plus answers to common questions for a hassle-free experience." />
      </Helmet>
      <div className={styles.faqSection}>
        <h1 className={styles.faqTitle}>Frequently Asked Questions (FAQ)</h1>

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
