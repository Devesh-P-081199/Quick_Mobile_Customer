import styles from "./TopSellingModel.module.css";
import { useNavigate } from "react-router-dom";
import leftCircleIcon from "../../../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";

// Dynamically import all images from TopSellingModel folder using Vite's import.meta.glob
const images = import.meta.glob("../../../../assets/TopSellingModel/*.avif", {
  eager: true,
});

// Helper function to get image path based on model name
const getImageForModel = (modelName) => {
  // Try exact match first (case-sensitive)
  const exactPath = `../../../../assets/TopSellingModel/${modelName}.avif`;
  if (images[exactPath]) {
    return images[exactPath].default;
  }

  // Try case-insensitive match by finding the matching file
  const matchingPath = Object.keys(images).find((path) => {
    const fileName = path.split("/").pop().replace(".avif", "");
    return fileName.toLowerCase() === modelName.toLowerCase();
  });

  return matchingPath ? images[matchingPath].default : null;
};

const brands = [
  {
    name: "Apple iPhone 12",
    url: "/sell-old-mobile-phone/sell-used-apple-iphone-12",
  },
  {
    name: "Apple iPhone 12 Pro",
    url: "/sell-old-mobile-phone/sell-used-apple-iphone-12-pro",
  },
  {
    name: "Apple iPhone 14",
    url: "/sell-old-mobile-phone/sell-used-apple-iphone-14",
  },
  { name: "OnePlus 11", url: "/sell-old-mobile-phone/sell-used-oneplus-11-5g" },
  {
    name: "Oppo F21 Pro",
    url: "/sell-old-mobile-phone/sell-old-oppo-f21-pro-8gb128gb",
  },
  { name: "Poco M3", url: "/sell-old-mobile-phone/sell-used-poco-m3" },
  { name: "Realme 8", url: "/sell-old-mobile-phone/sell-used-realme-8" },
  {
    name: "Realme Narzo 20A",
    url: "/sell-old-mobile-phone/sell-used-realme-narzo-20a",
  },
  {
    name: "Xiaomi Redmi Note 9 Pro",
    url: "/sell-old-mobile-phone/sell-used-xiaomi-redmi-note-9-pro",
  },
  {
    name: "Xiaomi Redmi Note 7",
    url: "/sell-old-mobile-phone/sell-used-xiaomi-redmi-note-7",
  },
  {
    name: "Samsung Galaxy S21",
    url: "/sell-old-mobile-phone/sell-used-samsung-galaxy-s21-5g",
  },
  {
    name: "Samsung Galaxy A14",
    url: "/sell-old-mobile-phone/sell-used-samsung-galaxy-a14-5g",
  },
  {
    name: "Samsung Galaxy M14",
    url: "/sell-old-mobile-phone/sell-used-samsung-galaxy-m14-5g",
  },
  {
    name: "Samsung Galaxy Note 20",
    url: "/sell-old-mobile-phone/sell-old-samsung-galaxy-note-20-8gb256gb",
  },
  { name: "Vivo V25", url: "/sell-old-mobile-phone/sell-used-vivo-v25-5g" },
  { name: "Mi note 14 pro", url: "/sell-old-mobile-phone/sell-old-mi-note-14-pro-128gb" },
]
  .map((brand) => ({
    ...brand,
    icon: getImageForModel(brand.name),
  }));

function TopSellingModel() {
  const navigate = useNavigate();
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
              <div
                className={styles.brandSingleBox}
                key={index}
                onClick={() => navigate(item.url)}
                style={{ cursor: "pointer" }}
              >
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
