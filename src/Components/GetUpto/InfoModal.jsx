import React from 'react';
import styles from './InfoModal.module.css';

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.show : ''}`}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Average Price Info</h2>
        <p>This price range is calculated based on recent transactions by users. It helps give you a realistic idea of what to expect!</p>
      </div>
    </div>
  );
};

export default InfoModal;
