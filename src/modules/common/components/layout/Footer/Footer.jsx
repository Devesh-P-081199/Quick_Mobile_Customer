import { useState } from "react";
import styles from "./Footer.module.css";

import facebookIcon from "../../../../../assets/images/icons/facebook-b&w.png";
import instagramIcon from "../../../../../assets/images/icons/instagram-b&w.png";
import xIcon from "../../../../../assets/images/icons/twitter-b&w.png";
import youtubeIcon from "../../../../../assets/images/icons/youtube-b&w.png";
import linkedIn from "../../../../../assets/images/icons/linkedin-b&w.png";
import logo from "../../../../../assets/QuickSellNewIcons/New_icon_18-10-25.jpg";
import uparrow from "../../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
import downarrow from "../../../../../assets/QuickSellNewIcons/BackArrowwithouttail.svg";
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
  // const location = useLocation();

  // Paths where footer should be hidden
  // Paths where footer should be hidden
  // const hiddenPaths = [
  //   "/FAQPage",
  //   "/404",
  //   "/Cookies",
  //   "/About-us",
  //   "/terms",
  //   "/Refund",
  //   "/Contact-us",
  //   "/Impact",
  //   "/Search",
  //   "/thank-you",
  //   "/my-profile-orders",
  //   "/Address",
  //   "/my-profile",
  //   "/edit-my-profile",
  //   "/my-profile-payments",
  //   "/offers",
  // ];

  // If current route is in hiddenPaths → don’t render footer

  return (
    <>
      {/* Desktop Footer */}
      <footer className={`${styles.footerContainer} ${styles.mdNone}`}>
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
              {/* <a href="#">Recycle Phone/Other Device</a>
              <a href="#">Repair Phone</a>
              <a href="#">Buy Phone</a>
              <a href="#">Buy Accessories</a> */}
            </div>
          </div>

          {/* About Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>About</h3>
            <div className={styles.footerLinks}>
              <Link to="/About-us">About us</Link>
              <Link to="/Impact">Impact</Link>
              {/* <a href="#">Press Release</a> */}
              <Link to="/blogs">Blogs</Link>
              {/* <a href="#">Career</a> */}
            </div>
          </div>

          {/* Help Center */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Help Center</h3>
            <div className={styles.footerLinks}>
              <Link to="/FAQPage">FAQ</Link>
              <Link to="/Contact-us">Contact Us</Link>
              <Link to="/Refund">Return & Refund</Link>
              {/* <a href="#">Shipment</a>
              <a href="#">Warranty Policy</a> */}
            </div>
          </div>

          {/* Law and Orders */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Law and Orders</h3>
            <div className={styles.footerLinks}>
              <Link to="/terms-of-use">Terms of Use</Link>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
              <Link to="/cookies">Cookies</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/cookies-policy">Cookies Policy</Link>
            </div>
          </div>

          {/* Others */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerHeading}>Others</h3>
            <div className={styles.footerLinks}>
              <Link to="/our-stores">Our Stores</Link>
              {/* <a href="#">Register Warranty</a>
              <a href="#">Claim Warranty</a> */}
              <a href="#">Become Partner</a>
              <a href="#">Franchise</a>
              {/* <a href="#">Bulk Buying</a> */}
              {/* <a href="#">Become Partner Store</a> */}
            </div>
          </div>

          {/* Logo + Get Answers */}
          <div className={styles.footerColumn}>
            <div className={styles.logoContainer}>
              <a href="#">
                {/* Explicit width/height to prevent reflow */}
                <img
                  src={logo}
                  alt="Logo"
                  className={styles.logo}
                  width="120"
                  height="50"
                  style={{ aspectRatio: "120/50" }}
                />
              </a>
            </div>

            {/* Follow Us Section - Moved to logo column */}
            <div className={styles.followUsSection}>
              <div className={styles.socialIconsLarge}>
                <a href="#" className={styles.socialIconLink}>
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <img src={xIcon} alt="X" />
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
                <a href="#" className={styles.socialIconLink}>
                  <img src={linkedIn} alt="LinkediIn" />
                </a>
              </div>
            </div>

            {/* Help Center Section - Split into two side-by-side sections */}
            <h3 className={styles.helpCenterTitle}>Help Center</h3>
            <p className={styles.helpCenterSubtitle}>
              Do you have any questions?
            </p>
            <div className={styles.helpCenterAction}>
              <a href="/contact-us" className={styles.getAnswersBtn}>
                GET ANSWERS
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>
            Quickmobile LLP.  Mumbai, Maharashtra, Registration Number :
            <b> AAJ-9650</b>. For
            complaint or greviences email :<b> grevience@quickmobile.in</b>
            <br />
            ** All trademarks, logos, and brand names are the property of their
            respective owners. All the company, brand or logos use here on
            website is for identification purpose only and does not imply
            ownership or endorsement.
          </p>
          <p>&copy; 2026 Quick Mobile All Right Reserved</p>
        </div>
      </footer>

      {/* Mobile Footer */}
      <footer className={`${styles.footerContainer} ${styles.mdBlock}`}>
        <div className={styles.mobileFooterContent}>
          <FooterSection
            title="Services"
            links={[
              "Sell Phone",
              "Sell Tablet",
              "Sell Laptop",
              "Sell Smartwatch",
              "Sell Earbuds",
              "Sell Gaming Console",
              // "Recycle Phone/Other Device",
              // "Repair Phone",
              // "Buy Phone",
              // "Buy Accessories",
            ]}
          />
          <FooterSection
            title="About"
            links={[
              { text: "About Us", path: "/About-us" },
              { text: "Impact", path: "/Impact" },
              // { text: "Press Release", path: "/press" },
              { text: "Blogs", path: "/blogs" },
              // { text: "Career", path: "/career" },
            ]}
          />
          <FooterSection
            title="Help Center"
            links={[
              { text: "FAQ", path: "/FAQPage" },
              { text: "Contact Us", path: "/Contact-us" },
              { text: "Return & Refund", path: "/Refund" },
              // "Shipment",
              // "Warranty Policy",
            ]}
          />
          <FooterSection
            title="Law and Order"
            links={[
              { text: "Terms to Use", path: "/terms-of-use" },
              { text: "Terms and Conditions", path: "/terms-and-conditions" },
              { text: "Cookies", path: "/cookies" },
              { text: "Privacy Policy", path: "/privacy-policy" },
              { text: "Cookies Policy", path: "/cookies-policy" },
            ]}
          />
          <FooterSection
            title="Others"
            links={[
              { text: "Our Stores", path: "/our-stores" },
              // "Register Warranty",
              // "Claim Warranty",
              "Become Partner",
              "Franchise",
              // "Bulk Buying",
              // "Become Partner Store",
            ]}
          />

          {/* Logo + Social + Help Center Section - Matches Desktop */}
          <div className={styles.mobileFooterColumn}>
            <div className={styles.topContent}>
              <div className={styles.logoContainer}>
                <p>Follow us at</p>
              </div>

              {/* Follow Us Section */}
              <div className={styles.followUsSection}>
                <div className={styles.socialIconsLarge}>
                  <a href="#" className={styles.socialIconLink}>
                    <img src={facebookIcon} alt="Facebook" />
                  </a>
                  <a href="#" className={styles.socialIconLink}>
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a href="#" className={styles.socialIconLink}>
                    <img src={xIcon} alt="X" />
                  </a>
                  <a href="#" className={styles.socialIconLink}>
                    <img src={youtubeIcon} alt="YouTube" />
                  </a>
                  <a href="#" className={styles.socialIconLink}>
                    <img src={linkedIn} alt="LinkediIn" />
                  </a>
                </div>
              </div>
            </div>

            {/* Help Center Section */}
            <div className={styles.getHelpcenter}>
              <div className={styles.content}>
                <h3 className={styles.helpCenterTitle}>Help Center</h3>
                <p className={styles.helpCenterSubtitle}>
                  Do you have any questions?
                </p>
              </div>
              <div className={styles.helpCenterAction}>
                <a href="/contact-us" className={styles.getAnswersBtn}>
                  GET ANSWERS
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.logoHeader}>Registered company</p>
            <p className={styles.notice}>
              Quickmobile LLP. Mumbai, Maharashtra.<br></br>
              Registration Number : AAJ-9650<br></br>
              For complaint or greviences email : grevience@quickmobile.in
              <br></br>
              <br></br>
              ** All trademarks, logos, and brand names are the property of
              their respective owners. All the company, brand or logos use here
              on website is for identification purpose only and does not imply
              ownership or endorsement.
            </p>

            <p>&copy; 2026 Quick Mobile All Right Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
