import styles from "./FullScreenModal.module.css";
// Using a modern close icon from react-icons
import backarrow from "../../../../../assets/QuickSellNewIcons/BackArrow.svg";
import closeIcon from "../../../../../assets/QuickSellNewIcons/Cross.svg";

const MobileFullScreenModal = ({ title, children, onClose, onCloseBtn }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.header}>
        <button
          onClick={onClose}
          className={styles.backButton}
          aria-label="Go back"
        >
          <img src={backarrow} alt="" aria-hidden="true" />
        </button>
        <h2 className={styles.title}>{title}</h2>
        {onCloseBtn && (
          <button
            onClick={onCloseBtn}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <img src={closeIcon} alt="" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MobileFullScreenModal;
