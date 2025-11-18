import React from "react";
import styles from "./MobileCommonHeader.module.css";
import { useNavigate } from "react-router-dom";
import newBackIcon from "../../../assets/QuickSellNewIcons/BackArrow.svg";

const MobileCommonHeaderthree = ({ title, onSearch }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // ✅ go back one page
  };

  return (
    <div className={styles.header}>
      <button className={styles.iconButton} onClick={handleBack}>
        <img src={newBackIcon} alt="Back" />
      </button>
      <h2 className={styles.title}>{title}</h2>
      <button className={styles.iconButton} onClick={onSearch}>
        {/* Search button content if needed */}
      </button>
    </div>
  );
};

export default MobileCommonHeaderthree;
