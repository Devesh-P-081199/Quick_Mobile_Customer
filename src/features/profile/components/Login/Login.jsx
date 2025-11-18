import React, { useContext, useState, useRef, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./Login.module.css";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserContext } from "../../../../Context/contextAPI";
import api from "../../../../Utils/api";
import loginVector from "../../../../assets/icons/login-vector.png";
import newCloseBtn from "../../../../assets/QuickSellNewIcons/Cross.svg";

const Login = ({ setShowLoginModal }) => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isTermsChecked, setIsTermsChecked] = useState(true);
  const [timer, setTimer] = useState(0); // ⬅️ Timer state
  const otpRefs = useRef([]);
  const { setUser, setIsLoginModalOpen } = useContext(UserContext);

  // Timer effect
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setOtpSent(true);
      setTimer(60); // start 60 sec countdown
      toast.success("OTP sent successfully", {
        autoClose: 3000, // Disappears after 3 seconds
        position: "bottom-center",
        className: "custom-toast",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  const handleOtpChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/sell-module/user/signUp", {
        phone: mobile,
        verifyOtp: otp.join(""),
      });

      if (data?.token) {
        Cookies.set("auth-token", JSON.stringify(data?.token), {
          expires: 2,
          sameSite: "strict",
        });
        setUser(data?.user);
        setIsLoginModalOpen(false);
        setShowLoginModal(false);
      }
    } catch (err) {
      // OTP verification failed - no toast notification
    }
  };

  return (
    <section className={styles.loginWrapper}>
      <div className={styles.modalBox}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <h2 className={styles.greeting}>
            Hi!
            <br />
            <span>Please Login/Signup</span>
          </h2>
          <p className={styles.description}>
            For the best experience and customized offer
          </p>
          <img
            src={loginVector}
            alt=" img"
            title="login-illustration"
            className={styles.illustration}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setIsLoginModalOpen(false);
              setShowLoginModal(false);
            }}
          >
            <img src={newCloseBtn} alt="close-button" title="close" />
          </button>

          <form
            onSubmit={otpSent ? handleSignUp : handleSendOtp}
            className={styles.form}
          >
            {!otpSent ? (
              <>
                <h3 className={styles.heading}>Login/Signup</h3>
                <p className={styles.mobileLoginTagLine}>
                  For the best experience and customized offer
                </p>
                <label className={styles.label}>Enter Your Mobile Number</label>

                <div className={styles.inputWrapper}>
                  <span className={styles.countryCode}>+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Only allow digits
                      setMobile(value);
                    }}
                    className={styles.inputField}
                  />
                </div>
                <p className={styles.terms}>
                  <input
                    type="checkbox"
                    checked={isTermsChecked}
                    onChange={() => setIsTermsChecked(!isTermsChecked)}
                    className={styles.termClickInput}
                  />
                  <span>
                    I agree Quick Mobile's{" "}
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink> &{" "}
                    <NavLink to="/terms-and-conditions">
                      Terms and Condition
                    </NavLink>
                    .
                  </span>
                </p>
              </>
            ) : (
              <>
                <h3 className={styles.heading}>Login/Signup</h3>
                <p className={styles.otpSentText}>
                  We’ve sent an OTP to your registered mobile number{" "}
                  <strong>+91-{mobile}</strong>{" "}
                  <span
                    className={styles.editLink}
                    onClick={() => setOtpSent(false)}
                  >
                    Edit
                  </span>
                </p>

                <div className={styles.otpBox}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      className={styles.otpInput}
                      value={digit}
                      ref={(el) => (otpRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    />
                  ))}
                </div>

                <div className={styles.otpActions}>
                  {timer === 0 && (
                    <span className={`${styles.link} ${styles.active}`}>
                      Get on call
                    </span>
                  )}
                  {timer > 0 ? (
                    <span className={`${styles.link} ${styles.disabled}`}>
                      Resend OTP in {timer}s
                    </span>
                  ) : (
                    <span
                      className={`${styles.link} ${styles.active}`}
                      onClick={handleSendOtp}
                    >
                      Resend OTP
                    </span>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!otpSent && !isTermsChecked}
              style={
                !otpSent && !isTermsChecked
                  ? {
                      backgroundColor: "#e0e0e0",
                      color: "#aaa",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              {otpSent ? "Login" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
