import styles from "./MobileCommonHeader.module.css";
import newBackIcon from "../../../../../assets/QuickSellNewIcons/BackArrow.svg";
import useBack from "../../../../../Utils/useBack";

const MobileBackHeader = ({ title, onSearch, onBack }) => {
  const goBack = useBack();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
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

export default MobileBackHeader;
