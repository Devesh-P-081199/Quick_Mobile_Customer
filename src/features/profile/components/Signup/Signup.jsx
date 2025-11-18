import React, { useContext, useState, useRef } from "react";
import { MdEmail } from "react-icons/md";
import styles from "./SignUp.module.css";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import api from "../../../../Utils/api";
import { UserContext } from "../../../../Context/contextAPI";

const SignUp = ({ onSwitchToLogin, onSuccessSignup }) => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "/";

  const handleSendOtp = (e) => {
    e.preventDefault(); // ← this is crucial
    if (mobile.length === 10) {
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } else {
      toast.warning("Please enter a valid 10-digit mobile number.");
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
        Cookies.set("auth-token", JSON.stringify(data.token), {
          expires: 2,
          sameSite: "strict",
        });
        setUser(data.user);
        toast.success("Signup Successful!");

        // navigate("/setup-profile"); ❌ remove this
        onSuccessSignup(); // ✅ open SetupProfile inside modal
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.formCard}>
        <form
          className={styles.formContainer}
          onSubmit={otpSent ? handleSignUp : handleSendOtp}
        >
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign Up Account</h2>
            <p className={styles.formSubtitle}>
              Enter your mobile number to create your account.
            </p>
          </div>

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
                  disabled={otpSent} // disable once OTP is sent
                  onChange={(e) => setMobile(e.target.value)}
                  className={styles.mobileInput}
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
          </div>

          {otpSent && (
            <div className={styles.otpBoxContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                />
              ))}
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            {otpSent ? "Sign Up" : "Send OTP"}
          </button>

          <p className={styles.loginLink}>
            Already have an account?{" "}
            <span className={styles.link} onClick={onSwitchToLogin}>
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
