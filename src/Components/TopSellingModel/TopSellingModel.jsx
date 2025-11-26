import React from "react";
import styles from "./TopSellingModel.module.css";
import leftCircleIcon from "../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";

// Import phone icon as fallback for all models
import phoneIcon from "../../assets/icons/iPhone.svg";

const brands = [
  { name: "Apple iPhone 12", icon: phoneIcon },
  { name: "Apple iPhone 12 Pro", icon: phoneIcon },
  { name: "Apple iPhone 14", icon: phoneIcon },
  { name: "OnePlus 11", icon: phoneIcon },
  { name: "Oppo F21 Pro", icon: phoneIcon },
  { name: "Poco M3", icon: phoneIcon },
  { name: "Realme 8", icon: phoneIcon },
  { name: "Realme Narzo 20A", icon: phoneIcon },
  { name: "Xiaomi Redmi Note 9 Pro", icon: phoneIcon },
  { name: "Xiaomi Redmi Note 7", icon: phoneIcon },
  { name: "Samsung Galaxy S21", icon: phoneIcon },
  { name: "Samsung Galaxy A14", icon: phoneIcon },
  { name: "Samsung Galaxy M14", icon: phoneIcon },
  { name: "Samsung Galaxy Note 20", icon: phoneIcon },
  { name: "Vivo V25", icon: phoneIcon },
];

function TopSellingModel() {
  return (
    <div className="page-content-wrapper">
      <div className="wrapper">
        <div className={styles.topSellingWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Top Selling Model</h2>
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
        </div>
      </div>
    </div>
  );
}

export default TopSellingModel;
