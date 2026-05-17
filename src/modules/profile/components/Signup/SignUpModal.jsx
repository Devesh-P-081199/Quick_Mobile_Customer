import { Suspense } from "react";

import Login from "../Login/Login";
import styles from "../../../common/components/layout/Header/Header.module.css";
import NewCloseIcon from "../../../../assets/QuickSellNewIcons/Cross.svg";
import Loader from "../../../common/components/layout/Loader/Loader";

const SignUpModal = ({ isOpen, onClose }) => {
  //     // Focus next input

  //       Cookies.set("accessToken", JSON.stringify(token), {

  if (!isOpen) return null;
  // handleloginclose

  const handleSignupClick = () => { };

  return (
    <div className={styles.loginmodalBackdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside modal
      >
        <button className={styles.closebtn}>
          <img
            src={NewCloseIcon}
            alt="close-icon"
            title="close-icon"
            onClick={onClose}
          />
        </button>
        <Suspense fallback={<Loader />}>
          <Login onSwitchToSignup={handleSignupClick} />
        </Suspense>
      </div>
    </div>
  );
};

export default SignUpModal;
