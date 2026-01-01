import React, { Suspense, useContext, useState } from "react";
import { MdClose, MdPhoneAndroid } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import Login from "../Login/Login";
import styles from "../../../../Components/layout/Header/Header.module.css";
import NewCloseIcon from "../../../../assets/QuickSellNewIcons/Cross.svg";
import Loader from "../../../../Components/layout/Loader/Loader";

const SignUpModal = ({ isOpen, onClose }) => {

  //     // Focus next input

  //       Cookies.set("auth-token", JSON.stringify(token), {

  if (!isOpen) return null;
  // handleloginclose

  const handleSignupClick = () => {};

  return (
    <div className={styles.loginmodalBackdrop}>
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
