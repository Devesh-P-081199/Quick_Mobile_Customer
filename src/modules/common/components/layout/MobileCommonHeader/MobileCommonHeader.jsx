import { useState } from "react";
import styles from "./MobileCommonHeader.module.css";
import newSearchIcon from "../../../../../assets/QuickSellNewIcons/Search.svg";
import newBackIcon from "../../../../../assets/QuickSellNewIcons/BackArrow.svg";
import useBack from "../../../../../Utils/useBack";

const MobileCommonHeader = ({ title, onBack }) => {
  const goBack = useBack();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBack = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    } else if (onBack) {
      onBack();
    } else {
      goBack();
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
        </>
      )}
    </div>
  );
};

export default MobileCommonHeader;
