import React, { useState } from "react";
import styles from "./MobileCommonHeader.module.css";
import { useNavigate } from "react-router-dom";
import newSearchIcon from "../../../assets/QuickSellNewIcons/Search.svg";
import newBackIcon from "../../../assets/QuickSellNewIcons/BackArrow.svg";

const MobileCommonHeader = ({ title, onBack }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBack = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false); // close search instead of navigating
    } else if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.header}>
      {isSearchOpen ? (
        <div className={styles.searchBox}>
          <button className={styles.iconButton} onClick={handleBack}>
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
      ) : (
        <>
          <button className={styles.iconButton} onClick={handleBack}>
            <img src={newBackIcon} alt="Back" />
          </button>
          <h2 className={styles.title}>{title}</h2>
          {/* <button
            className={styles.iconButton}
            onClick={() => setIsSearchOpen(true)}
          >
            <img src={newSearchIcon} alt="Search" />
          </button> */}
        </>
      )}
    </div>
  );
};

export default MobileCommonHeader;
