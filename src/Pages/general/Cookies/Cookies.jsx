import React, { useState } from "react";
import styles from "./Cookies.module.css";

const Cookies = () => {
  const [functional] = useState(true);
  const [personalisation, setPersonalisation] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Cookies</h2>
        <p className={styles.sectionTitle}>
          Your Cookie Preferences and Rights to Opt Out of Sharing Personal
          Information.
        </p>
        <p className={styles.sectionTitle}>
          At Quick Mobile and with our trusted partners, we use cookies and
          similar technologies (like small <br /> tracking pixels) to store and
          access certain information on your device, like the pages you visit or
          your login times.
        </p>

        <p className={styles.text}>
          Some cookies are essential for you to browse our website and app
          smoothly.
          <br />
          To make your experience better, we also use cookies to:
        </p>

        <ul className={styles.list}>
          <li>Measure how many people use our site and app</li>
          <li>See how well ads are performing</li>
          <li>Show you personalized content and ads</li>
        </ul>

        <p className={styles.text}>
          We only place these cookies and share your data with your permission.
          <br />
          You are in full control and can choose how your information is used.
        </p>

        {/* Functional Cookies */}
        <div className={styles.cookieBox}>
          <div className={styles.headerRow}>
            <h4>Functional Cookies</h4>
            <label className={styles.switch}>
              <input type="checkbox" checked={functional} readOnly />
              <span className={`${styles.slider} ${styles.disabled}`}></span>
            </label>
          </div>
          <p className={styles.subText}>
            These cookies are necessary for the website and app to work
            properly.
            <br />
            You cannot turn these off.
          </p>
          <a href="#">Learn more about our partners</a>
        </div>

        {/* Personalisation Cookies */}
        <div className={styles.cookieBox}>
          <div className={styles.headerRow}>
            <h4>Personalisation Cookies</h4>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={personalisation}
                onChange={() => setPersonalisation(!personalisation)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p className={styles.subText}>
            Do you agree to allow Quick Mobile and our partners to personalize
            your experience?
            <br /> If you say “Yes”, the website will adjust content and offers
            to fit your needs and device better.
          </p>
          <a href="#">Learn more about our partners</a>
        </div>

        {/* Analytics Cookies */}
        <div className={styles.cookieBox}>
          <div className={styles.headerRow}>
            <h4>Analytics Cookies</h4>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={() => setAnalytics(!analytics)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p className={styles.subText}>
            Do you agree to allow us to collect information like your location
            and browsing behavior? <br />
            This helps Quick Mobile and our partners understand how visitors use
            the site and improve it.
          </p>
          <p className={styles.note}>
            Note: Some basic analytics cookies are required and cannot be turned
            off.
          </p>
          <a href="#">Learn more about our partners</a>
        </div>

        {/* Ads Cookies */}
        <div className={styles.cookieBox}>
          <div className={styles.headerRow}>
            <h4>
              “Do Not Sell or Share My Personal Information” + Cookies for
              Tailored Ads
            </h4>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={ads}
                onChange={() => setAds(!ads)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <p className={styles.subText}>
            Do you agree to allow us to collect data about your interests to
            show you relevant ads?
            <br />
            <ul className={styles.notelist}>
              <li>
                If you say “Yes”, you’ll see ads that match what you like.
              </li>
              <li>
                If you say “No”, we will not use or share your personal
                information for advertising
              </li>
            </ul>
          </p>
          <a href="#">Learn more about our partners</a>
        </div>

        <p className={styles.bottomtext}>
          To know more about the cookies our partners use and the data they
          collect, you can contact them directly or read their privacy policies.
        </p>
        <p className={styles.bottomtext}>
          For full details, please read our{" "}
          <a href="#" className={styles.link}>
            Cookie Policy
          </a>{" "}
          and{" "}
          <a href="#" className={styles.link}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Cookies;
