import React, { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./SignUp.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import api from "../../../Utils/api";
import { UserContext } from "../../../Context/contextAPI";

const SignUp = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "/"; // fallback to home if direct
    const { setUser } =
      useContext(UserContext);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    }
  };


  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/sell-module/user/signUp",
        {
          phone: mobile,
          verifyOtp: otp.join(""),
        }
      );

      // console.log(response.data);

      if (response.data) {
        alert(`${response?.data?.message}`);
        const token = response.data.token;
        Cookies.set("auth-token", JSON.stringify(token), {
          expires: 2,
          sameSite: "strict",
        });
        setUser(response.data?.user);
      }
      toast.success("Signed up successfully");
      navigate(fromPage)
    } catch (err) {
      // console.log("Error Occured",err);

      toast.error("Error verifying OTP");
    }
  };
  // console.log("Number : ", mobile);
  // console.log("OTP : ", otp.join(''));
  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.leftPanel}>
        <div className={styles.leftHeader}>
          <h1 className={styles.brand}>Quick Mobile</h1>
          <h2 className={styles.tagline}>Get Started with Us</h2>
          <p className={styles.subtext}>
            Complete these easy steps to register your account.
          </p>
        </div>
        <div className={styles.leftButtons}>
          <button className={styles.primaryBtn}>1. Signup your account </button>
          <button className={styles.secondaryBtn}>Setup your profile</button>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign Up Account</h2>
            <p className={styles.formSubtitle}>
              Enter your personal data to create your account.
            </p>
          </div>

          {/* Mobile Input */}
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.icon}>
                <MdEmail size={24} />
              </div>
              <div className={styles.inputContent}>
                <label htmlFor="mobile" className={styles.label}>
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  maxLength="10"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={styles.mobileInput}
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
          </div>

          {/* OTP Input (only visible when otpSent is true) */}
          {otpSent && (
            <div className={styles.otpBoxContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                />
              ))}
            </div>
          )}

          <button
            className={styles.submitBtn}
            onClick={!otpSent ? handleSendOtp : formSubmit}
          >
            {otpSent ? "Sign Up" : "Send OTP"}
          </button>

          <p className={styles.loginLink}>
            Already have an account?
            <NavLink to="/login" className={styles.loginLink}>
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
