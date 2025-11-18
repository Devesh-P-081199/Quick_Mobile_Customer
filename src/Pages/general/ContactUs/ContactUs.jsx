import React from "react";
import styles from "./ContactUs.module.css";
import bannerImg from "../../../assets/banner_img.png";
import { FaWhatsapp } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";

const ContactUs = () => {
  const sendData = (e) => {
    e.preventDefault();
    alert("Data Submitted");
  };
  return (
    <section>
      <div className={styles.contactPage}>
        <form onSubmit={sendData}>
          <div className={styles.contactSection}>
            <div className={styles.formContainer}>
              <h2>Contact Us</h2>
              <h4>Submit a form</h4>
              <p>
                For any queries, please submit the form below with correct
                information.
              </p>

              <form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.inputBox}>
                    <label>Name*</label>
                    <input type="text" placeholder="Name" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Phone*</label>
                    <input type="text" placeholder="Phone" />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputBox}>
                    <label>Email*</label>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Subject*</label>
                    <select>
                      <option value="">Subject</option>
                      <option value="order">Order</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputBox}>
                  <label>Order Number</label>
                  <input type="text" placeholder="Enter order number" />
                </div>

                <div className={styles.inputBox}>
                  <label>Description</label>
                  <textarea placeholder="Please add maximum information possible to serve you better." />
                </div>

                <div className={styles.inputBox}>
                  <label>Upload Image</label>
                  <input type="file" />
                  <small>Attach reference file (if any).</small>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Submit
                </button>
              </form>
            </div>
            <div className={styles.imageBox}>
              <img src={bannerImg} alt="Contact Illustration" />
            </div>
          </div>
        </form>
        <div className={styles.help}>
          <div className={styles.helpSection}>
            <h3>Need help ?</h3>
            <p>
              Connect through whatsapp and live chat for instant response to
              your queries.
            </p>
            <div className={styles.helpButtons}>
              <button className={styles.outlineBtn}>
                <BsChatText size={20} /> Live Chat
              </button>
              <button className={styles.outlineBtn}>
                <FaWhatsapp size={20} /> Chat with us
              </button>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <h3>Get in Touch With Us</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h4>📩 Business Inquiry</h4>
              <p>business@quickmobile.in</p>
              <small>
                For any business related inquiry such as buy back partner,
                exchange or trade-in program
              </small>
            </div>
            <div className={styles.infoCard}>
              <h4>📰 Media Inquiry</h4>
              <p>media@quickmobile.in</p>
              <small>
                For any inquiry related to PR Media and collaboration
              </small>
            </div>
            <div className={styles.infoCard}>
              <h4>🤝 Quick Mobile Partner</h4>
              <p>partner@quickmobile.in</p>
              <small>
                Are you a professional used phone buyer and wish to become quick
                mobile partner
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
