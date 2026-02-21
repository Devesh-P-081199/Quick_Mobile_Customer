import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopSellingBrand.module.css";
import api from "../../../../Utils/api";
import leftCircleIcon from "../../../../assets/icons/Frame 32.svg";
import rightCircleIcon from "../../../../assets/icons/Frame 42.svg";
import CommonSlider from "../ui/Slider/CommonSlider";
import appleLogo from "../../../../assets/TopSellingBrands/apple-logo.png";
import xiaomiLogo from "../../../../assets/TopSellingBrands/xiaomi-logo.png";
import samsungLogo from "../../../../assets/TopSellingBrands/samsung-logo.png";
import oneplusLogo from "../../../../assets/TopSellingBrands/oneplus-logo.png";
import vivoLogo from "../../../../assets/TopSellingBrands/vivo-logo.png";
import oppoLogo from "../../../../assets/TopSellingBrands/oppo-logo.png";
import realmeLogo from "../../../../assets/TopSellingBrands/realme-logo.png";
import pocoLogo from "../../../../assets/TopSellingBrands/poco-logo.png";
import iqooLogo from "../../../../assets/TopSellingBrands/iqoo-logo.png";
import nothingLogo from "../../../../assets/TopSellingBrands/nothing_logo.png";

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
  const navigate = useNavigate();
  const [apiBrands, setApiBrands] = useState([]);
  const [mobileCategoryId, setMobileCategoryId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch Brands
        const brandResponse = await api.get("/common-module/getBrandsAndProducts");
        setApiBrands(brandResponse.data?.BrandsWithProducts || []);

        // Fetch Categories to identify Mobile Category ID
        const categoryResponse = await api.get("/common-module/category?option=Sell&all=true");
        const categories = categoryResponse.data?.categories || [];
        const mobileCat = categories.find(c => c.categoryName === "Mobile");
        if (mobileCat) {
          setMobileCategoryId(mobileCat._id);
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleBrandClick = useCallback(
    (brandName) => {
      const normalizedQuery = brandName.toLowerCase().replace(/\s+/g, "");

      // Filter brands that match the name AND belong to the Mobile category
      let matchedBrand = apiBrands.find((b) => {
        const normalizedApiName = b.brandName.toLowerCase().replace(/\s+/g, "");
        const isNameMatch = normalizedApiName.includes(normalizedQuery) || normalizedQuery.includes(normalizedApiName);
        return isNameMatch && b.categoryId === mobileCategoryId;
      });

      // Fallback: If no Mobile-specific match, try any category but prefer Mobile
      if (!matchedBrand) {
        matchedBrand = apiBrands.find((b) => {
          const normalizedApiName = b.brandName.toLowerCase().replace(/\s+/g, "");
          return normalizedApiName.includes(normalizedQuery) || normalizedQuery.includes(normalizedApiName);
        });
      }

      if (matchedBrand?.slugSell) {
        navigate(`/sell-old-mobile-phone/${matchedBrand.slugSell}`);
      } else {
        console.warn(`No slug found for brand: ${brandName}`);
      }
    },
    [apiBrands, mobileCategoryId, navigate],
  );

  return (
    <section className="page-content-wrapper">
      <div className="wrapper">
        <div className={styles.topSellingWrapper}>
          <div className={styles.headingFlex}>
            <h2 className={styles.sectionHeading}>Top Selling Brand</h2>
          </div>

          <CommonSlider
            items={brands}
            renderItem={(item, index) => (
              <div
                className={styles.brandSingleBox}
                key={index}
                onClick={() => handleBrandClick(item.name)}
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
    </section>
  );
}

export default TopSellingBrand;
