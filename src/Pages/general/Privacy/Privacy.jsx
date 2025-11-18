import React from "react";
import styles from "./Privacy.module.css";

const guideData = [
  {
    title: "Comprehensive Guide for a Seamless Experience",
    description:
      "Our guide is designed to provide you with all the information you need to navigate our platform with ease. From creating an account to making a purchase, we’ve broken down each step to ensure a smooth experience. Whether you're new to our website or a seasoned shopper, this guide will help you understand how to take full advantage of all the features we offer. Learn how to search for products, manage your orders, and access customer support, all in one place.",
  },
  {
    title: "Understanding Our Privacy Policy",
    description:
      "Your privacy is our priority. Our Privacy Policy clearly explains how we handle your personal data. We outline the types of information we collect, how it’s used, and the steps we take to safeguard your privacy. We are committed to being transparent about how your data is handled and providing you with a secure, trusted experience on our platform. This policy includes details on your rights and how you can manage your data preferences.",
  },
  {
    title: "Why Reading Our Guide and Privacy Policy Matters",
    description:
      "By reading our guide, you’ll gain valuable insights into making the most of our services, ensuring you have a positive shopping experience. Our Privacy Policy, on the other hand, helps you understand the measures we take to protect your personal information. It’s important for us to maintain trust and transparency with our users, which is why we encourage you to read both documents thoroughly. Understanding these key aspects will empower you to shop confidently, knowing that your data is safe and your needs are prioritized.",
  },
  {
    title: "Your Data, Our Responsibility",
    description:
      "We believe in offering not only the best service but also the highest level of protection for your personal data. Our Privacy Policy emphasizes our commitment to safeguarding your information, ensuring it’s used responsibly and securely. We comply with all relevant data protection regulations to provide you with peace of mind while using our services.",
  },
];

export default function GuidePrivacyPolicy() {
  return (
    <section>
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Explore Our Guide and Privacy Policy
      </h2>
      <div className={styles.contentWrapper}>
        {guideData.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3 className={styles.subheading}>{section.title}</h3>
            <p className={styles.description}>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
