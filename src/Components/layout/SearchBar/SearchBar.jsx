import React from "react";
import styles from "./SearchModal.module.css";
import newBackIcon from "../../../assets/QuickSellNewIcons/BackArrow.svg";
import newSearchIcon from "../../../assets/QuickSellNewIcons/Search.svg";

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.searchBox}>
        <button className={styles.iconButton} onClick={onClose}>
          <img src={newBackIcon} alt="Back" />
        </button>
        <input
          type="text"
          className={styles.input}
          placeholder="Search..."
          autoFocus
        />
        <button className={styles.iconButton}>
          <img src={newSearchIcon} alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
