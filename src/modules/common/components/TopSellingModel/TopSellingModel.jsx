import styles from "./TopSellingModel.module.css";
import leftCircleIcon from "../../../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";

// Import individual phone images
import appleIPhone12 from "../../../../assets/TopSellingModel/Apple iphone 12.avif";
import appleIPhone12Pro from "../../../../assets/TopSellingModel/Apple iphone 12 Pro.avif";
import appleIPhone14 from "../../../../assets/TopSellingModel/Apple iphone 14.avif";
import onePlus11 from "../../../../assets/TopSellingModel/OnePlus 11.avif";
import oppoF21Pro from "../../../../assets/TopSellingModel/Oppo F21 Pro.avif";
import pocoM3 from "../../../../assets/TopSellingModel/POCO M3.avif";
import realme8 from "../../../../assets/TopSellingModel/Realme 8.avif";
import realmeNarzo20A from "../../../../assets/TopSellingModel/Realme Narzo 20A.avif";
import xiaomiRedmiNote9Pro from "../../../../assets/TopSellingModel/Xiaomi Redmi Note 9 Pro.avif";
import xiaomiRedmiNote7 from "../../../../assets/TopSellingModel/Xiaomi Redmi Note 7.avif";
import samsungGalaxyS21 from "../../../../assets/TopSellingModel/Samsung Galaxy S21.avif";
import samsungGalaxyA14 from "../../../../assets/TopSellingModel/Samsung Galaxy A14.avif";
import samsungGalaxyM14 from "../../../../assets/TopSellingModel/Samsung Galaxy M14.avif";
import samsungGalaxyNote20 from "../../../../assets/TopSellingModel/Samsung Galaxy Note 20.avif";
import vivoV25 from "../../../../assets/TopSellingModel/Vivo V25.avif";

const brands = [
  { name: "Apple iPhone 12", icon: appleIPhone12 },
  { name: "Apple iPhone 12 Pro", icon: appleIPhone12Pro },
  { name: "Apple iPhone 14", icon: appleIPhone14 },
  { name: "OnePlus 11", icon: onePlus11 },
  { name: "Oppo F21 Pro", icon: oppoF21Pro },
  { name: "Poco M3", icon: pocoM3 },
  { name: "Realme 8", icon: realme8 },
  { name: "Realme Narzo 20A", icon: realmeNarzo20A },
  { name: "Xiaomi Redmi Note 9 Pro", icon: xiaomiRedmiNote9Pro },
  { name: "Xiaomi Redmi Note 7", icon: xiaomiRedmiNote7 },
  { name: "Samsung Galaxy S21", icon: samsungGalaxyS21 },
  { name: "Samsung Galaxy A14", icon: samsungGalaxyA14 },
  { name: "Samsung Galaxy M14", icon: samsungGalaxyM14 },
  { name: "Samsung Galaxy Note 20", icon: samsungGalaxyNote20 },
  { name: "Vivo V25", icon: vivoV25 },
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
