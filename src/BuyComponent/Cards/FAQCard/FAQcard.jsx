import React from 'react';
import styles from './FAQcard.module.css';

const FAQcard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img
          src="https://ourfootprints.in/admin/assets/img/pages/thumbs/download1.jpg"
          alt="Card"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Designing for Impact: Trends That Matter</h3>
        <div className={styles.tags}>
          <span>Designing</span>
          <span>• By writer name</span>
        </div>
        <p className={styles.date}>21st May 2025</p>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>
  );
};

export default FAQcard;
