import React from "react";
// import CommonSlider from "../CommonSlider/CommonSlider";
import styles from "./TopSellingBrand.module.css";
// import GoogleIcon from "../../assets/TopSellingBrands";
import leftCircleIcon from "../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";
import appleLogo from "../../assets/TopSellingBrands/apple-logo.png";
import xiaomiLogo from "../../assets/TopSellingBrands/xiaomi-logo.png";
import samsungLogo from "../../assets/TopSellingBrands/samsung-logo.png";
import oneplusLogo from "../../assets/TopSellingBrands/oneplus-logo.png";
import vivoLogo from "../../assets/TopSellingBrands/vivo-logo.png";
import oppoLogo from "../../assets/TopSellingBrands/oppo-logo.png";
import realmeLogo from "../../assets/TopSellingBrands/realme-logo.png";
import pocoLogo from "../../assets/TopSellingBrands/poco-logo.png";
import iqooLogo from "../../assets/TopSellingBrands/iqoo-logo.png";
import nothingLogo from "../../assets/TopSellingBrands/iqoo-logo.png";

const brands = [
  { name: "Apple", icon: appleLogo },
  { name: "Xiaomi", icon: xiaomiLogo },
  { name: "Samsung", icon: samsungLogo },
  { name: "One Plus", icon: oneplusLogo },
  { name: "Vivo", icon: vivoLogo },
  { name: "Oppo", icon: oppoLogo },
  { name: "Realme", icon: realmeLogo },
  { name: "Poco", icon: pocoLogo },
  { name: "iQOO", icon: iqooLogo },
  { name: "Nothing", icon: nothingLogo },
];

function TopSellingBrand() {
  return (
    <section className="default-padding-section">
      <div className="wrapper">
        <div className={styles.topSellingWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Top Selling Brand</h2>
          </div>

          <CommonSlider
            items={brands}
            renderItem={(item, index) => (
              <div className={styles.brandSingleBox} key={index}>
                <div className={styles.imgIndividual}>
                  <img src={item.icon} alt={item.name} title={item?.name} />
                </div>
                <span>{item.name}</span>
              </div>
            )}
            scrollAmount={300}
            leftIcon={leftCircleIcon}
            rightIcon={rightCircleIcon}
          />

          {/* <hr
            style={{
              border: "none",
              margin: "10px 0px",
              maxHeight: "1px",
              height: "1px",
            }}
          /> */}
        </div>
      </div>
    </section>
  );
}

export default TopSellingBrand;
