import React, { Suspense, useContext, useState } from "react";
import { MdClose, MdPhoneAndroid } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// import styles from "./SignUpModal.module.css";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import Login from "../Login/Login";
import styles from "../../../../Components/layout/Header/Header.module.css";
import NewCloseIcon from "../../../../assets/QuickSellNewIcons/Cross.svg";
import Loader from "../../../../Components/layout/Loader/Loader";

const SignUpModal = ({ isOpen, onClose }) => {
  // const [mobile, setMobile] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  // const [otp, setOtp] = useState(Array(6).fill(""));
  // const { setUser } = useContext(UserContext);

  // const handleSendOtp = () => {
  //   if (mobile.length === 10) {
  //     setOtpSent(true);
  //   } else {
  //     toast.error("Enter a valid 10-digit mobile number");
  //   }
  // };
  //   const handleOtpKeyDown = (e, index) => {
  //   if (e.key === "Backspace") {
  //     if (otp[index] === "") {
  //       if (index > 0) {
  //         otpInputs[index - 1]?.focus();
  //         const updatedOtp = [...otp];
  //         updatedOtp[index - 1] = "";
  //         setOtp(updatedOtp);
  //       }
  //     } else {
  //       const updatedOtp = [...otp];
  //       updatedOtp[index] = "";
  //       setOtp(updatedOtp);
  //     }
  //   }
  // };

  // const otpInputs = [];

  // const handleOtpChange = (value, index) => {
  //   if (!isNaN(value) && value.length <= 1) {
  //     const updatedOtp = [...otp];
  //     updatedOtp[index] = value;
  //     setOtp(updatedOtp);

  //     // Focus next input
  //     if (value && index < otp.length - 1) {
  //       otpInputs[index + 1]?.focus();
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await api.post("/sell-module/user/signUp", {
  //       phone: mobile,
  //       verifyOtp: otp.join(""),
  //     });

  //     if (response.data) {
  //       // alert(`${response?.data?.message}`);
  //       const token = response.data.token;
  //       Cookies.set("auth-token", JSON.stringify(token), {
  //         expires: 2,
  //         sameSite: "strict",
  //       });
  //       setUser(response.data?.user);
  //     }
  //     toast.success("Signed up successfully");
  //     onClose();
  //   } catch (err) {
  //     // console.log("Error Occured", err);

  //     toast.error("Error verifying OTP");
  //   }
  // };

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
          {/* <Login onSwitchToSignup={handleSignupClick} /> */}

          <Login onSwitchToSignup={handleSignupClick} />

          {/* {authType === "setup" && <SetupProfile />} */}
        </Suspense>
      </div>
    </div>
  );
};

export default SignUpModal;
