import React from "react";
import styles from "./TopSellingModel.module.css";
import leftCircleIcon from "../../assets/icons/frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";
import CommonSlider from "../../Shared/Slider/CommonSlider";

// Import all top selling model images
import iphone12 from "../../assets/TopSellingModels/iphone12.avif";
import iphone12pro from "../../assets/TopSellingModels/iphone12pro.avif";
import iphone14 from "../../assets/TopSellingModels/iphone14.avif";
import oneplus11 from "../../assets/TopSellingModels/oneplus11.avif";
import oppof21pro from "../../assets/TopSellingModels/oppof21pro.avif";
import pocom3 from "../../assets/TopSellingModels/pocom3.avif";
import realme8 from "../../assets/TopSellingModels/realme8.avif";
import realmenarzo20a from "../../assets/TopSellingModels/realmenarzo20.avif";
import redminote9pro from "../../assets/TopSellingModels/redminote9pro.avif";
import redminote7 from "../../assets/TopSellingModels/redminote7.avif";
import s21 from "../../assets/TopSellingModels/s21.avif";
import samsungA14 from "../../assets/TopSellingModels/samsungA14.avif";
import samsungM14 from "../../assets/TopSellingModels/samsungM14.avif";
import samsungnote20 from "../../assets/TopSellingModels/samsungnote20.avif";
import vivov25 from "../../assets/TopSellingModels/vivov25.avif";

const brands = [
  { name: "Apple iPhone 12", icon: iphone12 },
  { name: "Apple iPhone 12 Pro", icon: iphone12pro },
  { name: "Apple iPhone 14", icon: iphone14 },
  { name: "OnePlus 11", icon: oneplus11 },
  { name: "Oppo F21 Pro", icon: oppof21pro },
  { name: "Poco M3", icon: pocom3 },
  { name: "Realme 8", icon: realme8 },
  { name: "Realme Narzo 20A", icon: realmenarzo20a },
  { name: "Xiaomi Redmi Note 9 Pro", icon: redminote9pro },
  { name: "Xiaomi Redmi Note 7", icon: redminote7 },
  { name: "Samsung Galaxy S21", icon: s21 },
  { name: "Samsung Galaxy A14", icon: samsungA14 },
  { name: "Samsung Galaxy M14", icon: samsungM14 },
  { name: "Samsung Galaxy Note 20", icon: samsungnote20 },
  { name: "Vivo V25", icon: vivov25 },
];

function TopSellingModel() {
  return (
    <section className="default-padding-section">
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
    </section>
  );
}

export default TopSellingModel;
