import React, { useState } from "react";
import { MdPhoneAndroid, MdLock } from "react-icons/md";
import styles from "./Login.module.css"; // Reusing the same CSS module
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      return;
    }
    // Handle login logic here
    alert("Logged in successfully!");
  };

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.leftPanel}>
        <div className={styles.leftHeader}>
          <h1 className={styles.brand}>Quick Mobile</h1>
          <h2 className={styles.tagline}>Welcome Back</h2>
          <p className={styles.subtext}>
            Login to access your Quick Mobile dashboard.
          </p>
        </div>
        <div className={styles.leftButtons}>
          <button className={styles.primaryBtn}>1. Login your account</button>
          {/* <button className={styles.secondaryBtn}>Sell Now</button> */}
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Login to Account</h2>
            <p className={styles.formSubtitle}>
              Enter your credentials to continue.
            </p>
          </div>

          {/* Mobile Number */}
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.icon}>
                <MdPhoneAndroid size={24} />
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

          {/* Password */}
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.icon}>
                <MdLock size={24} />
              </div>
              <div className={styles.inputContent}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.mobileInput}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <button className={styles.submitBtn} onClick={handleLogin}>
            Log In
          </button>

          <p className={styles.loginLink}>Don't have an account? 
          <NavLink to="/signup" className={styles.loginLink}>
             Sign Up
          </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
