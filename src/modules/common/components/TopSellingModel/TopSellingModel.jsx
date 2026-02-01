import styles from "./TopSellingModel.module.css";
import leftCircleIcon from "../../../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";
import AppImage from "../Image/AppImage";

// Dynamically import all images from TopSellingModel folder using Vite's import.meta.glob
const images = import.meta.glob("../../../../assets/TopSellingModel/*.avif", { eager: true });

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
  { name: "Apple iPhone 12" },
  { name: "Apple iPhone 12 Pro" },
  { name: "Apple iPhone 14" },
  { name: "OnePlus 11" },
  { name: "Oppo F21 Pro" },
  { name: "Poco M3" },
  { name: "Realme 8" },
  { name: "Realme Narzo 20A" },
  { name: "Xiaomi Redmi Note 9 Pro" },
  { name: "Xiaomi Redmi Note 7" },
  { name: "Samsung Galaxy S21" },
  { name: "Samsung Galaxy A14" },
  { name: "Samsung Galaxy M14" },
  { name: "Samsung Galaxy Note 20" },
  { name: "Vivo V25" },
].map((brand) => ({
  ...brand,
  icon: getImageForModel(brand.name),
}));

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
                  <AppImage
                    src={item.icon}
                    alt={item.name}
                    title={item?.name}
                    width="60px"
                    height="60px"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
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
