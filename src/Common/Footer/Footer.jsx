import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

import footerstore1 from "../../assets/images/icons/playstore.png";
import footerstore2 from "../../assets/images/icons/appstore.png";
import facebookIcon from "../../assets/QuickSellNewIcons/facebook.png";
import instagramIcon from "../../assets/QuickSellNewIcons/instagram.png";
import xIcon from "../../assets/QuickSellNewIcons/x.png";
import youtubeIcon from "../../assets/QuickSellNewIcons/youtube.png";
import logo from "../../assets/newicons/logo.svg";
import chatIcon from "../../assets/QuickSellNewIcons/proicons_chat.svg";
import uparrow from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import downarrow from "../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import FooterContent from "./FooterContent";
import { Link } from "react-router-dom";

const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.footerSection}>
      <div
        className={styles.footerSectionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        {isOpen ? (
          <img src={downarrow} alt="" className={styles.downarrow} />
        ) : (
          <img src={uparrow} alt="" className={styles.uparrow} />
        )}
      </div>
      {isOpen && (
        <div className={styles.footerLinks}>
          {links.map((link, idx) => (
            <Link to={link.path || "#"} key={idx}>
              {link.text || link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const location = useLocation();

  // Paths where footer should be hidden
  const hiddenPaths = [
    "/FAQPage",
    "/404",
    "/Cookies",
    "/About-us",
    "/terms",
    "/Refund",
    "/Contact-us",
    "/Impact",
    "/Search",
    "/thank-you",
    "/my-profile-orders",
    "/Address",
    "/my-profile",
    "/edit-my-profile",
    "/my-profile-payments",
    "/offers"

  ]
  const shouldHideFooterContent = hiddenPaths.includes(location.pathname);

  // If current route is in hiddenPaths → don’t render footer


  return (
    <>
      {!shouldHideFooterContent && <FooterContent />}

      {/* Desktop Footer */}
      <footer className={`${styles.footerContainer} md-none`}>
        <div className={styles.footerContent}>
          {/* Services Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Services</h3>
            <div className={styles.footerLinks}>
              <a href="#">Sell Phone</a>
              <a href="#">Sell Tablet</a>
              <a href="#">Sell Laptop</a>
              <a href="#">Sell Smartwatch</a>
              <a href="#">Sell Earbuds</a>
              <a href="#">Sell Gaming Console</a>
              <a href="#">Recycle Phone/Other Device</a>
              <a href="#">Retire Phone</a>
              <a href="#">Buy Phone</a>
              <a href="#">Buy Accessories</a>
            </div>
          </div>

          {/* About Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>About</h3>
            <div className={styles.footerLinks}>
              <Link to="/About-us">About us</Link>
              <Link to="/Impact">Impact</Link>
              <a href="#">Press Release</a>
              <a href="#">Blogs</a>
              <a href="#">Career</a>
            </div>
          </div>

          {/* Help Center */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Help Center</h3>
            <div className={styles.footerLinks}>
              <a href="#">FAQ</a>
              <Link to="/Contact-us">Contact Us</Link>
              <Link to="/Refund">Return & Refund</Link>
              <a href="#">Shipment</a>
              <a href="#">Warranty Policy</a>
            </div>
          </div>

          {/* Law and Orders */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Law and Orders</h3>
            <div className={styles.footerLinks}>
              <Link to="/terms">Terms of Use</Link>
              <a href="#">Terms and Conditions</a>
              <Link to="/Cookies">Cookies</Link>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookies Policy</a>
            </div>
          </div>

          {/* Others */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Others</h3>
            <div className={styles.footerLinks}>
              <a href="#">Register Warranty</a>
              <a href="#">Claim Warranty</a>
              <a href="#">Become Partner</a>
              <a href="#">Frenchies</a>
              <a href="#">Bulk Buying</a>
              <a href="#">Become Partner Store</a>
            </div>
          </div>

          {/* Logo + Socials */}
          <div className={styles.footerColumn}>
            <a href="#">
              <img src={logo} alt="Logo" className={styles.logo} />
            </a>
            <p>follow us on</p>
            <div className={styles.socialIcons}>
              <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
              <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
              <a href="#"><img src={xIcon} alt="X" /></a>
              <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
            </div>
            <button className={styles.chatButton}>
              <div className={styles.chatbox}>
                <img src={chatIcon} alt="chat" />
                <div className={styles.chatText}>
                  <h5>Chat With Us</h5>
                  <p>We are here to help you</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>All trademarks, logos, and brand names are the property of their respective owners.All the company, brand or logos  use here on website is for identification purpose only and does not imply ownership or endorsement.</p>
          <p>© 2025 Quick Mobile</p>
          {/* <div className={styles.footerRightBox}>
            <a href="#"><img src={footerstore1} alt="Play Store" /></a>
            <a href="#"><img src={footerstore2} alt="App Store" /></a>
          </div> */}
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className={`${styles.footerContainer} md-block`}>
        <div className={styles.mobileFooterContent}>
          <FooterSection
            title="Services"
            links={[
              "Sell Phone", "Sell Tablet", "Sell Laptop", "Sell Smartwatch",
              "Sell Earbuds", "Sell Gaming Console", "Recycle Phone/Other Device",
              "Retire Phone", "Buy Phone", "Buy Accessories",
            ]}
          />
          <FooterSection
            title="About"
            links={[
              { text: "About Us", path: "/About-us" },
              { text: "Impact", path: "/Impact" },
              { text: "Press Release", path: "/press" },
              { text: "Blogs", path: "/blogs" },
              { text: "Career", path: "/career" },
            ]}
          />
          <FooterSection
            title="Help Center"
            links={["FAQ", "Contact Us", "Return & Refund", "Shipment", "Warranty Policy"]}
          />
          <FooterSection
            title="Law and Order"
            links={[
              { text: "Terms to Use", path: "/terms" },
              { text: "Terms and Conditions", path: "#" },
              { text: "Cookies", path: "/Cookies" },
              { text: "Privacy Policy", path: "/Privacy" },
              { text: "Cookies Policy", path: "#" }
            ]}
          />
          <FooterSection
            title="Others"
            links={[
              "Register Warranty", "Claim Warranty", "Become Partner", "Frenchies", "Bulk Buying", "Become Partner Store",
            ]}
          />



          <div className={styles.logoSection}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <p>Let's Connect</p>
            <div className={styles.socialIcons}>
              <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
              <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
              <a href="#"><img src={xIcon} alt="X" /></a>
              <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
            </div>
          </div>

          <div className={styles.chatbox}>
            <img src={chatIcon} alt="" />
            <div className={styles.chatText}>
              <h5>Chat With Us</h5>
              <p>We are here to help you</p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.notice}>** All trademarks, logos, and brand names are the property of their respective owners.All the company, brand or logos  use here on website is for identification purpose only and does not imply ownership or endorsement.</p>

            <p>© 2025 Quick Mobile All Right Reserved</p>
            {/* <div className={styles.footerRightBox}>
              <a href="#"><img src={footerstore1} alt="Play Store" /></a>
              <a href="#"><img src={footerstore2} alt="App Store" /></a>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
