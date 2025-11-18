import React from "react";
import styles from "./FullScreenModal.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Using a modern close icon from react-icons
import backarrow from "../../../assets/QuickSellNewIcons/BackArrow.svg";
import closeIcon from "../../../assets/QuickSellNewIcons/Cross.svg";

const MobileFullScreenModal = ({ title, children, onClose, onCloseBtn }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.header}>
        <button onClick={onClose} className={styles.backButton}>
          <img src={backarrow} alt="" />
        </button>
        <h2 className={styles.title}>{title}</h2>
        {onCloseBtn && (
          <button onClick={onCloseBtn} className={styles.closeButton}>
            <img src={closeIcon} alt="Close" />
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MobileFullScreenModal;
